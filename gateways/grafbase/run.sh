#!/usr/bin/env bash
set -Eeuo pipefail

exec ./grafbase-gateway --schema ./supergraph.graphql --listen-address 127.0.0.1:4000 --log fatal > ./gateway_log.txt 2>&1
