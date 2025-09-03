#!/usr/bin/env bash
NODE_ENV=production yarn hive-gateway supergraph supergraph.graphql --jit > ./gateway_log.txt 2>&1
