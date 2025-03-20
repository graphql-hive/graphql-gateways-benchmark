use async_graphql::{
    http::GraphiQLSource, ComplexObject, EmptyMutation, EmptySubscription, Object,
    SDLExportOptions, Schema, SimpleObject, ID,
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
    static ref INVENTORY: Vec<Product> = vec![
        Product {
            upc: "1".to_string(),
            in_stock: Some(true),
            price: None,
            weight: None,
        },
        Product {
            upc: "2".to_string(),
            in_stock: Some(false),
            price: None,
            weight: None,
        },
        Product {
            upc: "3".to_string(),
            in_stock: Some(false),
            price: None,
            weight: None,
        },
        Product {
            upc: "4".to_string(),
            in_stock: Some(false),
            price: None,
            weight: None,
        },
        Product {
            upc: "5".to_string(),
            in_stock: Some(true),
            price: None,
            weight: None,
        },
        Product {
            upc: "6".to_string(),
            in_stock: Some(true),
            price: None,
            weight: None,
        },
        Product {
            upc: "7".to_string(),
            in_stock: Some(true),
            price: None,
            weight: None,
        },
        Product {
            upc: "8".to_string(),
            in_stock: Some(false),
            price: None,
            weight: None,
        },
        Product {
            upc: "9".to_string(),
            in_stock: Some(true),
            price: None,
            weight: None,
        }
    ];
}

#[derive(SimpleObject, Clone)]
#[graphql(extends, complex)]
struct Product {
    #[graphql(external)]
    upc: String,
    #[graphql(external)]
    weight: Option<i64>,
    #[graphql(external)]
    price: Option<i64>,
    in_stock: Option<bool>,
}

#[ComplexObject]
impl Product {
    #[graphql(requires = "price weight")]
    pub async fn shipping_estimate(&self) -> Option<i64> {
        if let Some(price) = self.price {
            if price > 1000 {
                return Some(0);
            }

            if let Some(weight) = self.weight {
                return Some(weight / 2);
            }
        }

        None
    }
}

struct Query;

#[Object(extends = true)]
impl Query {
    #[graphql(entity)]
    async fn find_product_by_id(&self, upc: ID) -> Product {
        INVENTORY
            .iter()
            .find(|product| product.upc == upc.to_string())
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
    println!("GraphQL Federation SDL:\n{}", sdl);
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
