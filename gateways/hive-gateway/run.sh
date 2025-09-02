#!/usr/bin/env bash
exec env -i NODE_ENV=production ./hive-gateway supergraph supergraph.graphql --port 4000 --jit
