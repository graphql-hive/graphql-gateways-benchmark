#!/usr/bin/env bash
set -Eeuo pipefail
exec env -i LOG_LEVEL=fatal \
    LISTEN_ADDR=0.0.0.0:4000 \
    TRACING_ENABLED=false \
    METRICS_ENABLED=false \
    METRICS_OTLP_ENABLED=false \
    GRAPHQL_METRICS_ENABLED=false \
    PROMETHEUS_ENABLED=false \
    ROUTER_CONFIG_PATH=config.json \
    ./cosmo > ./gateway_log.txt 2>&1
