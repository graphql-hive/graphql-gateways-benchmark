#!/usr/bin/env bash
# Installs and starts Prometheus and Grafana as native binaries (no Docker required).
# Versions are kept in sync with docker-compose.metrics.yaml.
# Usage: ./scripts/setup-metrics.sh
set -Eeuo pipefail

SCRIPT_DIR="$(dirname "$(realpath "$0")")"
ROOT_DIR="$(dirname "$SCRIPT_DIR")"

PROMETHEUS_VERSION="3.10.0"
GRAFANA_VERSION="12.4.1"

# Detect architecture
ARCH="$(uname -m)"
case "$ARCH" in
  x86_64)  ARCH="amd64" ;;
  aarch64) ARCH="arm64" ;;
  *) echo "Unsupported architecture: $ARCH"; exit 1 ;;
esac

PROM_INSTALL_DIR="/tmp/prometheus"
GRAFANA_INSTALL_DIR="/tmp/grafana"

# ---------------------------------------------------------------------------
# Prometheus
# ---------------------------------------------------------------------------
echo "Setting up Prometheus ${PROMETHEUS_VERSION} (${ARCH}) ..."
mkdir -p "$PROM_INSTALL_DIR/data"
curl -fsSL \
  "https://github.com/prometheus/prometheus/releases/download/v${PROMETHEUS_VERSION}/prometheus-${PROMETHEUS_VERSION}.linux-${ARCH}.tar.gz" \
  | tar -xz -C "$PROM_INSTALL_DIR" --strip-components=1

"$PROM_INSTALL_DIR/prometheus" \
  --web.enable-remote-write-receiver \
  --enable-feature=native-histograms \
  --config.file="$ROOT_DIR/prometheus/prometheus.yaml" \
  --storage.tsdb.path="$PROM_INSTALL_DIR/data" \
  >/tmp/prometheus.log 2>&1 &

echo "Prometheus started (PID $!)."

# ---------------------------------------------------------------------------
# Grafana
# ---------------------------------------------------------------------------
echo "Setting up Grafana ${GRAFANA_VERSION} (${ARCH}) ..."
mkdir -p "$GRAFANA_INSTALL_DIR"
curl -fsSL \
  "https://dl.grafana.com/oss/release/grafana-${GRAFANA_VERSION}.linux-${ARCH}.tar.gz" \
  | tar -xz -C "$GRAFANA_INSTALL_DIR" --strip-components=1

GF_AUTH_ANONYMOUS_ENABLED=true \
GF_AUTH_ANONYMOUS_ORG_ROLE=Admin \
GF_AUTH_BASIC_ENABLED=false \
GF_PATHS_PROVISIONING="$ROOT_DIR/grafana" \
"$GRAFANA_INSTALL_DIR/bin/grafana" server \
  --homepath "$GRAFANA_INSTALL_DIR" \
  >/tmp/grafana.log 2>&1 &

echo "Grafana started (PID $!)."

# ---------------------------------------------------------------------------
# Wait for both services to be ready
# ---------------------------------------------------------------------------
echo "Waiting for Prometheus on :9090 ..."
prometheus_ready=false
for _ in $(seq 1 30); do
  if curl -fsS http://localhost:9090/-/ready >/dev/null 2>&1; then
    prometheus_ready=true
    echo "Prometheus is ready."
    break
  fi
  sleep 1
done
if ! $prometheus_ready; then
  echo "Error: Prometheus did not become ready in time. Logs:" >&2
  cat /tmp/prometheus.log >&2
  exit 1
fi

echo "Waiting for Grafana on :3000 ..."
grafana_ready=false
for _ in $(seq 1 30); do
  if curl -fsS http://localhost:3000/api/health >/dev/null 2>&1; then
    grafana_ready=true
    echo "Grafana is ready."
    break
  fi
  sleep 1
done
if ! $grafana_ready; then
  echo "Error: Grafana did not become ready in time. Logs:" >&2
  cat /tmp/grafana.log >&2
  exit 1
fi
