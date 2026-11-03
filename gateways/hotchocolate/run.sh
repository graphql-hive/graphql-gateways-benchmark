#!/usr/bin/env bash
set -Eeuo pipefail

# Prefer the SDK that install.sh installed locally (if any).
if [ -x "$(pwd)/.dotnet/dotnet" ]; then
  export DOTNET_ROOT="$(pwd)/.dotnet"
fi

export ASPNETCORE_ENVIRONMENT=Production
export ASPNETCORE_URLS=http://0.0.0.0:4000

exec ./out/Gateway > ./gateway_log.txt 2>&1
