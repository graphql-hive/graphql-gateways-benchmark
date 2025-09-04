#!/usr/bin/env bash
set -Eeuo pipefail

NODE_ENV=production npm start > ./gateway_log.txt 2>&1