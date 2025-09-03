#!/usr/bin/env bash
set -Eeuo pipefail

# Usage: ./test.sh <gateway_name>
# Optional env:
#   GATEWAY_CPUSET="0-2"   # CPU cores for the gateway
#   LOAD_CPUSET="3"        # CPU cores for k6
#   WAIT_FOR_URL="http://127.0.0.1:4000/health"  # healthcheck URL
#   WARMUP_SECONDS=15
#   MEASURE_SECONDS=60
#   LOAD_MODE="constant"        # "constant" or "stress"

command -v realpath >/dev/null || { echo "realpath required"; exit 1; }
SCRIPT_DIR="$(dirname "$(realpath "$0")")"

get_logical_cores() {
  if command -v nproc >/dev/null 2>&1; then
    nproc                    # respects cgroups/cpuset if applicable
  elif [[ "$(uname -s)" == "Darwin" ]]; then
    sysctl -n hw.logicalcpu
  else
    grep -c ^processor /proc/cpuinfo 2>/dev/null || echo 1
  fi
}

if [[ $# -lt 2 ]]; then
  echo "Usage: $0 <gateway_name> <mode>"
  exit 1
fi

GATEWAY_NAME="$1"
LOAD_MODE="$2"
GATEWAY_DIR="$SCRIPT_DIR/gateways/$GATEWAY_NAME"
[[ -d "$GATEWAY_DIR" ]] || { echo "Error: Gateway '$GATEWAY_NAME' not found at '$GATEWAY_DIR'."; exit 1; }
[[ -x "$GATEWAY_DIR/run.sh" ]] || { echo "Error: '$GATEWAY_DIR/run.sh' missing or not executable. It should 'exec' the binary."; exit 1; }

# Defaults
WARMUP_SECONDS="${WARMUP_SECONDS:-15}"
MEASURE_SECONDS="${MEASURE_SECONDS:-60}"
K6_API_ADDR="127.0.0.1:6565"
# If it is CI
if [[ "${CI:-}" == "true" ]]; then
  EXTRA_OUT=" --out=experimental-prometheus-rw"
fi

# Check for required commands
HAS_SETSID=false
if command -v setsid >/dev/null; then
  HAS_SETSID=true
fi

HAS_TASKSET=false
if command -v taskset >/dev/null; then
  HAS_TASKSET=true
fi

CORES="$(get_logical_cores)"
echo "Host logical CPU cores: $CORES"

if $CPU_LIMIT; then
  CORES="$CPU_LIMIT"
  echo "Using CPU_LIMIT for cores: $CORES"
fi

# --- Automatic CPU Allocation ---
# Default LOAD_CPUSET to the first core (0) if not provided by the user.
LOAD_CPUSET="${LOAD_CPUSET:-0}"

# Default GATEWAY_CPUSET to all other cores if not provided by the user.
if [[ -z "${GATEWAY_CPUSET:-}" ]]; then
  if (( CORES > 1 )); then
    # If more than 1 core, use cores 1 to N-1 for the gateway.
    GATEWAY_CPUSET="1-$((CORES - 1))"
  else
    # On a single-core machine, use core 0 for the gateway as well.
    # This is not ideal for benchmarking but prevents the script from failing.
    GATEWAY_CPUSET="0"
  fi
fi

if $HAS_TASKSET; then
  [[ -n "${GATEWAY_CPUSET:-}" ]] && echo "Gateway pinned to CPU set: $GATEWAY_CPUSET"
  [[ -n "${LOAD_CPUSET:-}"    ]] && echo "Load gen pinned to CPU set: $LOAD_CPUSET"
fi

maybe_taskset() {
  local cpus="$1"; shift
  if $HAS_TASKSET && [[ -n "${cpus:-}" ]]; then
    taskset -c "$cpus" "$@"
  else
    [[ -n "${cpus:-}" ]] && echo "WARN: taskset not found; cannot pin to CPUs: $cpus" >&2
    "$@"
  fi
}

set_affinity_group() {
  local pgid="$1" cpus="$2"
  [[ -z "${cpus:-}" ]] && return 0
  ! $HAS_TASKSET && { echo "WARN: taskset not found; skipping gateway pinning" >&2; return 0; }
  local pids
  pids="$(pgrep -g "$pgid" || true)"
  [[ -z "$pids" ]] && return 0
  while read -r pid; do
    [[ -z "$pid" ]] && continue
    taskset -pc "$cpus" "$pid" >/dev/null 2>&1 || true
  done <<< "$pids"
}

cd "$GATEWAY_DIR"

echo "Starting gateway: $GATEWAY_NAME ..."
# Build the startup command, using setsid for process group management if available.
start_cmd=("./run.sh")
if $HAS_TASKSET && [[ -n "${GATEWAY_CPUSET:-}" ]]; then
    start_cmd=("taskset" "-c" "${GATEWAY_CPUSET}" "${start_cmd[@]}")
fi
if $HAS_SETSID; then
    start_cmd=("setsid" "${start_cmd[@]}")
fi

# Start the gateway in the background.
"${start_cmd[@]}" >/dev/null 2>&1 &
GATEWAY_LEADER_PID=$!
sleep 2

# Get the process group ID (PGID) if setsid was used.
GATEWAY_PGID=""
if $HAS_SETSID; then
    GATEWAY_PGID="$(ps -o pgid= -p "$GATEWAY_LEADER_PID" | tr -d ' ')"
fi
# Basic check to ensure the gateway process is still alive.
if ! ps -p "$GATEWAY_LEADER_PID" >/dev/null; then
  echo "Error: Gateway process died shortly after starting."
  exit 1
fi
if $HAS_SETSID && [[ -z "$GATEWAY_PGID" ]]; then
  echo "Error: failed to determine PGID even with setsid. Gateway might have crashed."
  exit 1
fi

# (Optional) pin gateway group to dedicated cores
if [[ -n "$GATEWAY_PGID" ]]; then
    set_affinity_group "$GATEWAY_PGID" "${GATEWAY_CPUSET}"
fi

# Readiness check (optional)
if [[ -n "${WAIT_FOR_URL:-}" ]]; then
  echo "Waiting for readiness at $WAIT_FOR_URL ..."
  for _ in {1..60}; do
    if curl -fsS --max-time 1 "$WAIT_FOR_URL" >/dev/null 2>&1; then
      break
    fi
    sleep 0.5
  done
fi

if [[ -n "$GATEWAY_PGID" ]]; then
  echo "Gateway PGID: $GATEWAY_PGID"
else
  echo "Gateway Leader PID: $GATEWAY_LEADER_PID"
fi

# Cleanup handler to stop all related processes.
cleanup() {
  echo ""
  echo "Cleaning up ..."
  if [[ -n "${MONITOR_PID:-}" ]] && ps -p "$MONITOR_PID" >/dev/null 2>&1; then
    echo "Stopping monitor (PID $MONITOR_PID) ..."
    kill "$MONITOR_PID" >/dev/null 2>&1 || true
  fi

  # Check if gateway process exists before trying to kill.
  if ! ps -p "$GATEWAY_LEADER_PID" >/dev/null 2>&1; then
    return # Gateway process is already gone.
  fi

  if [[ -n "$GATEWAY_PGID" ]]; then
    echo "Stopping gateway group (-$GATEWAY_PGID) ..."
    kill -TERM "-$GATEWAY_PGID" >/dev/null 2>&1 || true
    sleep 2
    kill -KILL "-$GATEWAY_PGID" >/dev/null 2>&1 || true
  else
    # Without a PGID, we kill the process tree starting from the leader PID.
    # This is a fallback for non-Linux systems.
    echo "Stopping gateway process tree (PID $GATEWAY_LEADER_PID) ..."
    pkill -P "$GATEWAY_LEADER_PID" >/dev/null 2>&1 || true # Kill children
    kill -TERM "$GATEWAY_LEADER_PID" >/dev/null 2>&1 || true
    sleep 2
    kill -KILL "$GATEWAY_LEADER_PID" >/dev/null 2>&1 || true
  fi
}
trap cleanup EXIT INT TERM

# Warmup
echo "Warmup ($WARMUP_SECONDS s) ..."
maybe_taskset "${LOAD_CPUSET}" k6 run -e SUMMARY_PATH="$(pwd)" \
  -e MODE="constant" -e BENCH_GATEWAY_PID="$GATEWAY_LEADER_PID" -e BENCH_OVER_TIME="${WARMUP_SECONDS}s" "$SCRIPT_DIR/k6.js" >/dev/null

# Start monitor, passing PGID if available, otherwise leader PID.
monitor_target_opts=()
if [[ -n "$GATEWAY_PGID" ]]; then
  monitor_target_opts=("-g" "$GATEWAY_PGID")
else
  monitor_target_opts=("-p" "$GATEWAY_LEADER_PID")
fi
echo "Starting monitoring for ${monitor_target_opts[0]} ${monitor_target_opts[1]} ..."
"$SCRIPT_DIR/monitor.sh" "${monitor_target_opts[@]}" -k "$K6_API_ADDR" -o data.csv -i "0.2" >/dev/null 2>&1 &
MONITOR_PID=$!
echo "Monitoring started (PID $MONITOR_PID)."

# Measure
echo "Load test ($MEASURE_SECONDS s) ..."

export K6_PROMETHEUS_RW_SERVER_URL=http://localhost:9090/api/v1/write
export K6_PROMETHEUS_RW_TREND_AS_NATIVE_HISTOGRAM=true

export START_TIME="$(date +%s)"
maybe_taskset "${LOAD_CPUSET}" k6 run$EXTRA_OUT --out json=$GATEWAY_DIR/k6_metrics.json --address "$K6_API_ADDR" -e SUMMARY_PATH="$(pwd)" \
  -e MODE="$LOAD_MODE" -e BENCH_GATEWAY_PID="$GATEWAY_LEADER_PID" -e BENCH_OVER_TIME="${MEASURE_SECONDS}s" "$SCRIPT_DIR/k6.js"

sleep 2

export END_TIME="$(date +%s)"

# If CI
if [[ "${CI:-}" == "true" ]]; then
  rm -rf $GATEWAY_DIR/overview.png || echo ""
  npx --quiet capture-website-cli "http://localhost:3000/d/01npcT44k/k6?orgId=1&from=${START_TIME}000&to=${END_TIME}000&kiosk" --output $GATEWAY_DIR/overview.png --width 1200 --height 850

  rm -rf $GATEWAY_DIR/http.png || echo ""
  npx --quiet capture-website-cli "http://localhost:3000/d-solo/01npcT44k/k6?orgId=1&from=${START_TIME}000&to=${END_TIME}000&panelId=41" --output $GATEWAY_DIR/http.png --width 1200 --height 850

  # rm -rf $GATEWAY_DIR/containers.png || echo ""
  # npx --quiet capture-website-cli "http://localhost:3000/d/pMEd7m0Mz/cadvisor-exporter?orgId=1&var-host=All&var-container=accounts&var-container=inventory&var-container=products&var-container=reviews&from=${START_TIME}000&to=${END_TIME}000&kiosk" --output $GATEWAY_DIR/containers.png --width 1200 --height 850
fi
echo "Summary:"
cargo run -p toolkit report "$(pwd)"

echo "Test for gateway '$GATEWAY_NAME' completed successfully."
