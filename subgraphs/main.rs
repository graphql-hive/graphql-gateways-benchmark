use async_graphql_axum::GraphQL;
use axum::{
    extract::{Query, Request},
    http::header,
    middleware::{self, Next},
    response::Response,
    routing::post_service,
    Router,
};
use std::{
    collections::HashMap,
    env::var,
    sync::{
        atomic::{AtomicBool, AtomicU64, Ordering},
        Mutex,
    },
    time::Instant,
};
use tokio::net::TcpListener;

mod accounts;
mod ecommerce;
mod inventory;
mod products;
mod reviews;

extern crate lazy_static;

/// One subgraph request seen while tracing, in microseconds since the trace
/// started.
struct Fetch {
    path: String,
    start: u128,
    end: u128,
}

// Fetch tracing, used by the planning benchmark to look at the shape of the
// query plan a gateway executes: `POST /_trace/start?delay_ms=<n>` starts
// recording every subgraph request (delaying each by `delay_ms`, so requests
// that wait on one another are clearly separated in time) and
// `POST /_trace/stop` returns what was recorded.
static TRACING: AtomicBool = AtomicBool::new(false);
static TRACE_DELAY_MS: AtomicU64 = AtomicU64::new(0);
static TRACE: Mutex<Option<(Instant, Vec<Fetch>)>> = Mutex::new(None);

async fn trace_start(Query(params): Query<HashMap<String, String>>) -> &'static str {
    let delay_ms = params
        .get("delay_ms")
        .and_then(|d| d.parse().ok())
        .unwrap_or(0);
    *TRACE.lock().unwrap() = Some((Instant::now(), Vec::new()));
    TRACE_DELAY_MS.store(delay_ms, Ordering::SeqCst);
    TRACING.store(true, Ordering::SeqCst);
    "OK"
}

async fn trace_stop() -> ([(header::HeaderName, &'static str); 1], String) {
    TRACING.store(false, Ordering::SeqCst);
    TRACE_DELAY_MS.store(0, Ordering::SeqCst);
    let fetches = TRACE
        .lock()
        .unwrap()
        .take()
        .map(|(_, fetches)| fetches)
        .unwrap_or_default();
    let items: Vec<String> = fetches
        .iter()
        .map(|f| {
            // Paths are route names (`/ecommerce/<subgraph>`), nothing to escape.
            format!(
                r#"{{"subgraph":"{}","start":{},"end":{}}}"#,
                f.path.trim_start_matches('/'),
                f.start,
                f.end
            )
        })
        .collect();
    (
        [(header::CONTENT_TYPE, "application/json")],
        format!("[{}]", items.join(",")),
    )
}

async fn delay_middleware(req: Request, next: Next) -> Response {
    let delay_ms: Option<u64> = std::env::var("SUBGRAPH_DELAY_MS")
        .ok()
        .and_then(|s| s.parse().ok())
        .filter(|d| *d != 0);

    if let Some(delay_ms) = delay_ms {
        tokio::time::sleep(tokio::time::Duration::from_millis(delay_ms)).await;
    }

    // Health checks are GET requests; only subgraph fetches are traced.
    if !TRACING.load(Ordering::Relaxed) || req.method() != axum::http::Method::POST {
        return next.run(req).await;
    }

    let received = Instant::now();
    let path = req.uri().path().to_string();
    let trace_delay_ms = TRACE_DELAY_MS.load(Ordering::Relaxed);
    if trace_delay_ms != 0 {
        tokio::time::sleep(tokio::time::Duration::from_millis(trace_delay_ms)).await;
    }
    let response = next.run(req).await;
    let finished = Instant::now();

    if let Some((started, fetches)) = TRACE.lock().unwrap().as_mut() {
        fetches.push(Fetch {
            path,
            start: received.saturating_duration_since(*started).as_micros(),
            end: finished.saturating_duration_since(*started).as_micros(),
        });
    }
    response
}

#[tokio::main]
async fn main() {
    let host = var("HOST").unwrap_or("0.0.0.0".to_owned());
    let port = var("PORT").unwrap_or("4200".to_owned());

    let mut app = Router::new()
        .route(
            "/accounts",
            post_service(GraphQL::new(accounts::get_subgraph())),
        )
        .route(
            "/inventory",
            post_service(GraphQL::new(inventory::get_subgraph())),
        )
        .route(
            "/products",
            post_service(GraphQL::new(products::get_subgraph())),
        )
        .route(
            "/reviews",
            post_service(GraphQL::new(reviews::get_subgraph())),
        )
        .route("/health", axum::routing::get(|| async { "OK" }));

    // Generated subgraphs of the large supergraph (`planning-large` benchmark).
    let ecommerce = ecommerce::get_subgraphs();
    println!("Serving {} subgraphs under /ecommerce", ecommerce.len());
    for (name, schema) in ecommerce {
        app = app.route(
            &format!("/ecommerce/{}", name),
            post_service(GraphQL::new(schema)),
        );
    }

    let app = app
        .route_layer(middleware::from_fn(delay_middleware))
        .route("/_trace/start", axum::routing::post(trace_start))
        .route("/_trace/stop", axum::routing::post(trace_stop));

    println!("Starting server on http://localhost:4200");

    axum::serve(
        TcpListener::bind(&format!("{}:{}", host, port))
            .await
            .unwrap(),
        app,
    )
    .await
    .unwrap();
}
