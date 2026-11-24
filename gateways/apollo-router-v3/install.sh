#!/usr/bin/env bash
set -Eeuo pipefail

# Apollo Router 3.x (pre-release). https://github.com/apollographql/router/releases
# The hosted installer (router.apollo.dev/download/nix/<version>) only serves
# stable releases, so the pre-release binary is fetched from GitHub directly.
VERSION="v3.0.0-preview.0"

case "$(uname -ms)" in
  'Darwin x86_64') target=x86_64-apple-darwin ;;
  'Darwin arm64') target=aarch64-apple-darwin ;;
  'Linux aarch64' | 'Linux arm64') target=aarch64-unknown-linux-gnu ;;
  'Linux x86_64' | *) target=x86_64-unknown-linux-gnu ;;
esac

url="https://github.com/apollographql/router/releases/download/$VERSION/router-$VERSION-$target.tar.gz"
echo "Downloading $url"
tmp="$(mktemp -d)"
curl -sSfL -o "$tmp/router.tar.gz" "$url"
tar xzf "$tmp/router.tar.gz" -C "$tmp"
mv "$tmp/dist/router" ./router
chmod +x ./router
rm -rf "$tmp"
./router --version
