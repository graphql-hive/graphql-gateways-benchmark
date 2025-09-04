#!/usr/bin/env bash
set -Eeuo pipefail

export HIVE__SUPERGRAPH__SOURCE=file
export HIVE__SUPERGRAPH__PATH=./supergraph.graphql

exec env -i RUST_LOG=info ./hive_router > ./gateway_log.txt 2>&1
