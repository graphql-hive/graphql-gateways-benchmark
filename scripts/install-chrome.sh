#!/usr/bin/env bash
#
# Install the Chrome build that `puppeteer-core` is pinned to.
#
# Why this script exists:
# `extract-zip` (used internally by `@puppeteer/browsers`) silently aborts
# part-way through unpacking Chrome on Node 22+ (reproduced on Node 26.1.0
# and seen in CI). The installer process exits 0 but `chrome-linux64/`
# only contains a few stub files (`ABOUT`, `MEIPreload/`, ...) -- the
# actual `chrome` binary is missing. See:
#   https://github.com/maxogden/extract-zip/issues/94
#
# To work around it we still let the official installer run first (it
# resolves the URL and downloads the zip), and if the resulting tree is
# missing the chrome binary we re-extract the zip with the system
# `unzip`. As a last resort we fetch the zip ourselves from the
# Chrome-for-Testing CDN.
set -euo pipefail

BUILD_ID="$(node -p "require('puppeteer-core/lib/cjs/puppeteer/revisions.js').PUPPETEER_REVISIONS.chrome")"
PLATFORM="linux64"
CACHE_DIR="${PUPPETEER_CACHE_DIR:-$HOME/.cache/puppeteer}/chrome"
INSTALL_ROOT="$CACHE_DIR/linux-$BUILD_ID"
CHROME_BIN="$INSTALL_ROOT/chrome-$PLATFORM/chrome"
ZIP_PATH="$CACHE_DIR/$BUILD_ID-chrome-$PLATFORM.zip"

if [ -x "$CHROME_BIN" ]; then
  echo "chrome@$BUILD_ID already installed at $CHROME_BIN"
  exit 0
fi

mkdir -p "$CACHE_DIR"

echo "Trying official puppeteer installer for chrome@$BUILD_ID..."
./node_modules/.bin/puppeteer browsers install chrome || true

if [ -x "$CHROME_BIN" ]; then
  echo "chrome@$BUILD_ID installed via puppeteer at $CHROME_BIN"
  exit 0
fi

echo "Puppeteer installer left the cache in a partial state; re-extracting with unzip..."

if [ ! -f "$ZIP_PATH" ]; then
  URL="https://storage.googleapis.com/chrome-for-testing-public/$BUILD_ID/$PLATFORM/chrome-$PLATFORM.zip"
  echo "Downloading $URL"
  curl -fsSL -o "$ZIP_PATH" "$URL"
fi

rm -rf "$INSTALL_ROOT"
mkdir -p "$INSTALL_ROOT"
unzip -q "$ZIP_PATH" -d "$INSTALL_ROOT"
rm -f "$ZIP_PATH"

if [ ! -x "$CHROME_BIN" ]; then
  echo "ERROR: Chrome install failed even after manual extraction" >&2
  ls -la "$INSTALL_ROOT" || true
  ls -la "$INSTALL_ROOT/chrome-$PLATFORM" 2>/dev/null || true
  exit 1
fi

echo "chrome@$BUILD_ID installed manually at $CHROME_BIN"
