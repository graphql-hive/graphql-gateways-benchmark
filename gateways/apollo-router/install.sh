#!/usr/bin/env bash
set -Eeuo pipefail

# https://github.com/apollographql/router/releases
VERSION="v2.19.0"
curl -sSL "https://router.apollo.dev/download/nix/$VERSION" | sh
echo "$VERSION" > version.txt
