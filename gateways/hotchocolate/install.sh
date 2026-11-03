#!/usr/bin/env bash
set -Eeuo pipefail

# Hot Chocolate Fusion gateway (https://chillicream.com/docs/fusion)
# Version is pinned in Gateway.csproj (HotChocolate.Fusion.AspNetCore).
NITRO_VERSION="16.7.3"
DOTNET_CHANNEL="10.0"

# Use an existing .NET SDK of the required major version when one is
# available, otherwise install one locally into ./.dotnet (run.sh picks it up).
if ! command -v dotnet >/dev/null 2>&1 || ! dotnet --list-sdks 2>/dev/null | grep -q "^${DOTNET_CHANNEL%%.*}\."; then
  export DOTNET_ROOT="$(pwd)/.dotnet"
  if [ ! -x "$DOTNET_ROOT/dotnet" ]; then
    curl -sSfL https://dot.net/v1/dotnet-install.sh -o dotnet-install.sh
    bash ./dotnet-install.sh --channel "$DOTNET_CHANNEL" --install-dir "$DOTNET_ROOT"
    rm -f dotnet-install.sh
  fi
  export PATH="$DOTNET_ROOT:$PATH"
fi

# Compose the Fusion archive from the subgraph schemas (Apollo Federation SDL as served by `_service { sdl }`).
npx -y "@chillicream/nitro@$NITRO_VERSION" fusion compose \
  -f subgraphs/accounts.graphqls \
  -f subgraphs/inventory.graphqls \
  -f subgraphs/products.graphqls \
  -f subgraphs/reviews.graphqls \
  -a gateway.far

DOTNET_CLI_TELEMETRY_OPTOUT=1 DOTNET_NOLOGO=1 dotnet publish Gateway.csproj -c Release -o out

# Record the benchmarked version for the report.
grep -o 'HotChocolate.Fusion.AspNetCore" Version="[^"]*"' Gateway.csproj | sed 's/.*Version="//; s/"$//' > version.txt
