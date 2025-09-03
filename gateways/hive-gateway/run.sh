#!/usr/bin/env bash
NODE_ENV=production yarn hive-gateway supergraph supergraph.graphql --host 0.0.0.0 --port 4000 --jit > /gateway_log.txt 2>&1
