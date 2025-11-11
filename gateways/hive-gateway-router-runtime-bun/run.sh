#!/usr/bin/env bash
NODE_ENV=production npx bun hive-gateway supergraph supergraph.graphql > ./gateway_log.txt 2>&1
