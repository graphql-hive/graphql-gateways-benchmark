import Fastify from "fastify";
import mercuriusWithGateway from "@mercuriusjs/gateway";

const port = process.env.PORT ? parseInt(process.env.PORT) : 4000;
const gateway = Fastify();

gateway.register(mercuriusWithGateway, {
  graphiql: true,
  jit: 1,
  path: "/graphql",
  gateway: {
    services: [
      {
        name: "accounts",
        url: "http://0.0.0.0:4200/accounts",
        mandatory: true,
      },
      {
        name: "reviews",
        url: "http://0.0.0.0:4200/reviews",
        mandatory: true,
      },
      {
        name: "products",
        url: "http://0.0.0.0:4200/products",
        mandatory: true,
      },
      {
        name: "inventory",
        url: "http://0.0.0.0:4200/inventory",
        mandatory: true,
      },
    ],
  },
});

gateway.listen({ port, host: "0.0.0.0" });
