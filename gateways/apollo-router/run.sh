#!/usr/bin/env bash
set -Eeuo pipefail

exec env -i APOLLO_TELEMETRY_DISABLED=true ./router --supergraph ./supergraph.graphql --config config.yaml
