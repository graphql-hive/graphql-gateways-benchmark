#!/usr/bin/env bash
NODE_ENV=production ~/.bun/bin/bun hive-gateway supergraph supergraph.graphql --host 0.0.0.0 --port 4000 --jit 2>&1