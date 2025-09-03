#!/usr/bin/env bash
NODE_ENV=production ~/.bun/bin/bun hive-gateway supergraph supergraph.graphql --jit > ./gateway_log.txt 2>&1