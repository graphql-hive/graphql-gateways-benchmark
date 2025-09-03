#!/usr/bin/env bash
set -Eeuo pipefail

NODE_ENV=production yarn start > /gateway_log.txt 2>&1