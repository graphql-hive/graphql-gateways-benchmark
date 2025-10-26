#!/usr/bin/env bash
__EXPERIMENTAL__HIVE_ROUTER_QUERY_PLANNER=1 NODE_ENV=production npx bun hive-gateway supergraph supergraph.graphql > ./gateway_log.txt 2>&1
