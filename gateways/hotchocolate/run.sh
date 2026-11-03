#!/usr/bin/env bash
set -Eeuo pipefail

# Prefer the SDK that install.sh installed locally (if any).
if [ -x "$(pwd)/.dotnet/dotnet" ]; then
  export DOTNET_ROOT="$(pwd)/.dotnet"
fi

export ASPNETCORE_ENVIRONMENT=Production
export ASPNETCORE_URLS=http://0.0.0.0:4000
# Complete socket operations inline on the I/O thread (see Program.cs).
export DOTNET_SYSTEM_NET_SOCKETS_INLINE_COMPLETIONS=1

exec ./out/Gateway > ./gateway_log.txt 2>&1
