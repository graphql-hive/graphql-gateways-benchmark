use async_graphql::{
    http::GraphiQLSource, EmptyMutation, EmptySubscription, Object, SDLExportOptions, Schema,
    SimpleObject, ID,
};
use async_graphql_axum::GraphQL;
use axum::{
    http::{Request, StatusCode},
    middleware::{self, Next},
    response::{self, IntoResponse, Response},
    routing::get,
    Router, Server,
};
use rand::Rng;
use std::env::var;

#[macro_use]
extern crate lazy_static;

async fn graphiql() -> impl IntoResponse {
    response::Html(GraphiQLSource::build().endpoint("/graphql").finish())
}

lazy_static! {
    static ref USERS: Vec<User> = vec![
        User {
            id: ID("1".to_string()),
            name: Some("Uri Goldshtein".to_string()),
            username: Some("urigo".to_string()),
            birthday: Some(1234567890),
        },
        User {
            id: ID("2".to_string()),
            name: Some("Dotan Simha".to_string()),
            username: Some("dotansimha".to_string()),
            birthday: Some(1234567890),
        },
        User {
            id: ID("3".to_string()),
            name: Some("Kamil Kisiela".to_string()),
            username: Some("kamilkisiela".to_string()),
            birthday: Some(1234567890),
        },
        User {
            id: ID("4".to_string()),
            name: Some("Arda Tanrikulu".to_string()),
            username: Some("ardatan".to_string()),
            birthday: Some(1234567890),
        },
        User {
            id: ID("5".to_string()),
            name: Some("Gil Gardosh".to_string()),
            username: Some("gilgardosh".to_string()),
            birthday: Some(1234567890),
        },
        User {
            id: ID("6".to_string()),
            name: Some("Laurin Quast".to_string()),
            username: Some("laurin".to_string()),
            birthday: Some(1234567890),
        }
    ];
}

#[derive(SimpleObject, Clone)]
struct User {
    id: ID,
    name: Option<String>,
    username: Option<String>,
    birthday: Option<i32>,
}

impl User {
    fn me() -> User {
        USERS[0].clone()
    }
}

struct Query;

#[Object(extends = true)]
impl Query {
    async fn me(&self) -> Option<User> {
        Some(User::me())
    }

    async fn user(&self, id: ID) -> Option<User> {
        USERS.iter().find(|user| user.id == id).cloned()
    }

    async fn users(&self) -> Option<Vec<Option<User>>> {
        Some(USERS.iter().map(|user| Some(user.clone())).collect())
    }

    #[graphql(entity)]
    async fn find_user_by_id(&self, id: ID) -> User {
        USERS.iter().find(|user| user.id == id).cloned().unwrap()
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
        .route_layer(middleware::from_fn(delay_middleware))
        .route("/sdl", get(|| async move { response::Html(sdl.clone()) }));

    println!("GraphiQL IDE: http://{}:{}{}", host, port, path);
    Server::bind(&format!("{}:{}", host, port).parse().unwrap())
        .serve(app.into_make_service())
        .await
        .unwrap();
}
