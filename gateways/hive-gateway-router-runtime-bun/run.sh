#!/usr/bin/env bash
NODE_ENV=production bun start > ./gateway_log.txt 2>&1
