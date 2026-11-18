#!/usr/bin/env bash
set -Eeuo pipefail

exec env -i APOLLO_TELEMETRY_DISABLED=true ./router --supergraph "${SUPERGRAPH_PATH:-./supergraph.graphql}" --config config.yaml > ./gateway_log.txt 2>&1
