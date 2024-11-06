FROM inigohub/gateway:v0.30.13

COPY supergraph.graphql ./
COPY config.yaml ./

EXPOSE 4000

CMD ["--schema", "supergraph.graphql", "--config", "config.yaml"]
