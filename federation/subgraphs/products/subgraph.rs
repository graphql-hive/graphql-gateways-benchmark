use async_graphql::{
    http::GraphiQLSource, EmptyMutation, EmptySubscription, Object, SDLExportOptions, Schema,
    SimpleObject, ID,
};
use async_graphql_axum::GraphQL;
use axum::{
    http::{Request, StatusCode},
    middleware::{from_fn, Next},
    response::{self, IntoResponse, Response},
    routing::get,
    Router, Server,
};
use lazy_static::lazy_static;
use rand::Rng;
use std::env::var;
async fn graphiql() -> impl IntoResponse {
    response::Html(GraphiQLSource::build().endpoint("/graphql").finish())
}

lazy_static! {
    static ref PRODUCTS: Vec<Product> = vec![
        Product {
            upc: "1".to_string(),
            name: Some("Table".to_string()),
            price: Some(899),
            weight: Some(100),
        },
        Product {
            upc: "2".to_string(),
            name: Some("Couch".to_string()),
            price: Some(1299),
            weight: Some(1000),
        },
        Product {
            upc: "3".to_string(),
            name: Some("Glass".to_string()),
            price: Some(15),
            weight: Some(20),
        },
        Product {
            upc: "4".to_string(),
            name: Some("Chair".to_string()),
            price: Some(499),
            weight: Some(100),
        },
        Product {
            upc: "5".to_string(),
            name: Some("TV".to_string()),
            price: Some(1299),
            weight: Some(1000),
        },
        Product {
            upc: "6".to_string(),
            name: Some("Lamp".to_string()),
            price: Some(6999),
            weight: Some(300),
        },
        Product {
            upc: "7".to_string(),
            name: Some("Grill".to_string()),
            price: Some(3999),
            weight: Some(2000),
        },
        Product {
            upc: "8".to_string(),
            name: Some("Fridge".to_string()),
            price: Some(100000),
            weight: Some(6000),
        },
        Product {
            upc: "9".to_string(),
            name: Some("Sofa".to_string()),
            price: Some(9999),
            weight: Some(800),
        }
    ];
}
#[derive(SimpleObject, Clone)]
struct Product {
    upc: String,
    name: Option<String>,
    price: Option<i64>,
    weight: Option<i64>,
}

struct Query;

#[Object(extends = true)]
impl Query {
    async fn top_products(
        &self,
        #[graphql(default = 5)] first: Option<i32>,
    ) -> Option<Vec<Option<Product>>> {
        Some(
            PRODUCTS
                .iter()
                .take(first.unwrap_or(5) as usize)
                .map(|product| Some(product.clone()))
                .collect(),
        )
    }

    #[graphql(entity)]
    async fn find_product_by_upc(&self, upc: ID) -> Product {
        PRODUCTS
            .iter()
            .find(|product| product.upc == upc.as_str())
            .unwrap()
            .clone()
    }
}

async fn delay_middleware<B>(req: Request<B>, next: Next<B>) -> Result<Response, StatusCode> {
    let delay_ms: Option<u64> = std::env::var("SUBGRAPH_DELAY_MS").ok().and_then(|s| s.parse().ok()).filter(|d| *d != 0);;

    if let Some(delay_ms) = delay_ms {
        tokio::time::sleep(tokio::time::Duration::from_millis(delay_ms)).await;
    }

    Ok(next.run(req).await)
}

#[tokio::main]
async fn main() {
    let schema = Schema::build(Query, EmptyMutation, EmptySubscription)
        .enable_federation()
        .finish();
    let sdl = schema.sdl_with_options(SDLExportOptions::new().federation().compose_directive());
    println!("GraphQL federation SDL:\n{}", sdl);
    let host = var("HOST").unwrap_or("0.0.0.0".to_owned());
    let port = var("PORT").unwrap_or("4001".to_owned());
    let path = "/graphql";
    let app = Router::new()
        .route(path, get(graphiql).post_service(GraphQL::new(schema)))
        .route_layer(from_fn(delay_middleware))
        .route("/sdl", get(|| async move { response::Html(sdl.clone()) }));

    println!("GraphiQL IDE: http://{}:{}{}", host, port, path);
    Server::bind(&format!("{}:{}", host, port).parse().unwrap())
        .serve(app.into_make_service())
        .await
        .unwrap();
}
