#!/usr/bin/env bash
#
NODE_ENV=production JIT=true npx bun hive-gateway supergraph supergraph.graphql > ./gateway_log.txt 2>&1
