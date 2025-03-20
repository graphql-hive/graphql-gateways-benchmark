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
        url: "http://accounts:4001/graphql",
        mandatory: true,
      },
      {
        name: "reviews",
        url: "http://reviews:4004/graphql",
        mandatory: true,
      },
      {
        name: "products",
        url: "http://products:4003/graphql",
        mandatory: true,
      },
      {
        name: "inventory",
        url: "http://inventory:4002/graphql",
        mandatory: true,
      },
    ],
  },
});

gateway.listen({ port, host: "0.0.0.0" });
