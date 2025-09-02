#!/usr/bin/env bash
set -Eeuo pipefail

export HIVE_SUPERGRAPH_SOURCE=file
export HIVE_SUPERGRAPH_PATH=./supergraph.graphql
exec env -i RUST_LOG=info ./hive_router
