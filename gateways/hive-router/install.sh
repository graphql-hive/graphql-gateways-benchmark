#!/usr/bin/env bash
set -Eeuo pipefail

# https://github.com/graphql-hive/router/releases
VERSION="v0.3.11"
curl -o- https://raw.githubusercontent.com/graphql-hive/router/main/install.sh | sh -s "$VERSION"
echo "$VERSION" > version.txt
