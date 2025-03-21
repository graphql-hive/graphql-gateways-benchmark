# we need curl to perform health checks
# and that's why we start with alpine image
# and copy the gateway binary from the original docker image
FROM alpine:3.19
RUN apk add --no-cache curl

COPY --from=inigohub/gateway:v0.30.15 /usr/bin/gateway .

COPY supergraph.graphql ./
COPY config.yaml ./

EXPOSE 4000

CMD ["./gateway", "--schema", "supergraph.graphql", "--config", "config.yaml"]
