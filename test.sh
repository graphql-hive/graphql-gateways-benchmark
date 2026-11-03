#!/usr/bin/env bash
set -Eeuo pipefail

# Usage: ./test.sh <gateway_name> <constant|stress>
# Optional env:
#   GATEWAY_CPUSET="1-2"   # CPU cores for the gateway (default: 1..CPU_LIMIT-1)
#   LOAD_CPUSET="0"        # CPU cores for k6 (default: 0)
#   SUBGRAPH_CPUSET="3"    # CPU cores for the already-running subgraphs
#                          # (default: every core above CPU_LIMIT, when CPU_LIMIT is set)
#   SUBGRAPHS_PORT=4200    # port the subgraphs listen on (used to find them for pinning)
#   WAIT_FOR_URL="http://127.0.0.1:4000/health"  # healthcheck URL
#   WARMUP_SECONDS=15      # one warmup run, discarded
#   MEASURE_SECONDS=60     # duration of each measured run
#   BENCH_RUNS=1           # measured runs; the median run (by RPS) is reported
#   BENCH_COOLDOWN_TARGET_C=45  # before each measured run, wait until the CPU is this cool ...
#   BENCH_COOLDOWN_MAX_S=0      # ... or this many seconds passed (0 disables the cooldown)
#   BENCH_CPU_PERFORMANCE=1     # try (with sudo -n) to disable boost and use the performance governor
#
# Output (in gateways/<gateway_name>/):
#   runs/<n>/{data.csv,k6_summary.json,k6_summary.txt,stats.json,error_responses.jsonl}  per measured run
#   data.csv, k6_summary.*, stats.json, error_responses.jsonl  copied from the median run
#   runs.json  median/best/worst RPS, CV% across runs, gateway version

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
BENCH_RUNS="${BENCH_RUNS:-1}"
BENCH_COOLDOWN_TARGET_C="${BENCH_COOLDOWN_TARGET_C:-45}"
BENCH_COOLDOWN_MAX_S="${BENCH_COOLDOWN_MAX_S:-0}"
BENCH_CPU_PERFORMANCE="${BENCH_CPU_PERFORMANCE:-1}"
SUBGRAPHS_PORT="${SUBGRAPHS_PORT:-4200}"
K6_API_ADDR="127.0.0.1:6565"

if ! [[ "$BENCH_RUNS" =~ ^[1-9][0-9]*$ ]]; then
  echo "Error: BENCH_RUNS must be a positive integer (got '$BENCH_RUNS')"
  exit 1
fi

EXTRA_OUT=""
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

TOTAL_CORES="$(get_logical_cores)"
CORES="$TOTAL_CORES"
echo "Host logical CPU cores: $CORES"

CPU_LIMIT="${CPU_LIMIT:-}"
if [[ -n "$CPU_LIMIT" ]]; then
  CORES="$CPU_LIMIT"
  echo "Using CPU_LIMIT for cores: $CORES"
fi

# The subgraphs are started before this script. Give them the cores that k6 and
# the gateway do not use, so they never compete with the gateway for CPU time.
if [[ -z "${SUBGRAPH_CPUSET:-}" && -n "$CPU_LIMIT" ]] && (( CORES < TOTAL_CORES )); then
  SUBGRAPH_CPUSET="${CORES}-$((TOTAL_CORES - 1))"
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

# PIDs listening on a TCP port (ss, lsof or fuser, whichever exists).
listener_pids_for_port() {
  local port="$1" pids=""
  if command -v ss >/dev/null 2>&1; then
    pids="$(ss -ltnpH "sport = :$port" 2>/dev/null | grep -o 'pid=[0-9]*' | cut -d= -f2 | sort -u || true)"
  fi
  if [[ -z "$pids" ]] && command -v lsof >/dev/null 2>&1; then
    pids="$(lsof -nP -iTCP:"$port" -sTCP:LISTEN -t 2>/dev/null | sort -u || true)"
  fi
  if [[ -z "$pids" ]] && command -v fuser >/dev/null 2>&1; then
    pids="$(fuser -n tcp "$port" 2>/dev/null | tr ' ' '\n' | grep -E '^[0-9]+$' | sort -u || true)"
  fi
  echo "$pids"
}

# A process and all of its descendants.
process_tree() {
  local queue=("$1") current child
  while [[ ${#queue[@]} -gt 0 ]]; do
    current="${queue[0]}"; queue=("${queue[@]:1}")
    echo "$current"
    while read -r child; do
      [[ -n "$child" ]] && queue+=("$child")
    done < <(pgrep -P "$current" 2>/dev/null || true)
  done
}

print_affinity() {
  local label="$1"; shift
  ! $HAS_TASKSET && return 0
  local pid
  for pid in "$@"; do
    [[ -z "$pid" ]] && continue
    local comm affinity
    comm="$(ps -o comm= -p "$pid" 2>/dev/null || true)"
    [[ -z "$comm" ]] && continue
    affinity="$(taskset -cp "$pid" 2>/dev/null | awk -F': ' '{print $2}' || true)"
    echo "  $label pid=$pid ($comm): cores $affinity"
  done
}

# Pin the subgraphs (started outside this script) to SUBGRAPH_CPUSET.
SUBGRAPH_PIDS=""
pin_subgraphs() {
  local root pid
  [[ -z "${SUBGRAPH_CPUSET:-}" ]] && return 0
  ! $HAS_TASKSET && { echo "WARN: taskset not found; skipping subgraph pinning" >&2; return 0; }
  local roots
  roots="$(listener_pids_for_port "$SUBGRAPHS_PORT")"
  [[ -z "$roots" ]] && roots="$(pgrep -x subgraphs || true)"
  if [[ -z "$roots" ]]; then
    echo "WARN: no subgraphs process found on port $SUBGRAPHS_PORT; cannot pin them to $SUBGRAPH_CPUSET" >&2
    return 0
  fi
  for root in $roots; do
    for pid in $(process_tree "$root"); do
      taskset -pc "$SUBGRAPH_CPUSET" "$pid" >/dev/null 2>&1 || true
      SUBGRAPH_PIDS="$SUBGRAPH_PIDS $pid"
    done
  done
  echo "Subgraphs pinned to CPU set: $SUBGRAPH_CPUSET"
}

# Try to keep the CPU clock stable for the whole run. Needs passwordless sudo;
# silently skipped otherwise (e.g. on GitHub-hosted runners).
stabilize_cpu_frequency() {
  [[ "$BENCH_CPU_PERFORMANCE" == "1" && "$(uname -s)" == "Linux" ]] || return 0
  if [[ -f /sys/devices/system/cpu/cpufreq/boost ]]; then
    if echo 0 | sudo -n tee /sys/devices/system/cpu/cpufreq/boost >/dev/null 2>&1; then
      echo "CPU frequency boost: disabled"
    else
      echo "CPU frequency boost: left unchanged (no sudo)"
    fi
  fi
  if ls /sys/devices/system/cpu/cpu*/cpufreq/scaling_governor >/dev/null 2>&1; then
    if echo performance | sudo -n tee /sys/devices/system/cpu/cpu*/cpufreq/scaling_governor >/dev/null 2>&1; then
      echo "CPU governor: performance"
    else
      echo "CPU governor: left unchanged (no sudo)"
    fi
  fi
}

stabilize_cpu_frequency
pin_subgraphs

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
if [[ -n "${MEM_LIMIT:-}" ]]; then
  # Check if cgexec is available
  if command -v cgexec >/dev/null; then
    cgcreate -g memory:gateway_group || true
    cgset -r memory.limit_in_bytes="$mem_bytes" gateway_group
    echo "Applying memory limit of $MEM_LIMIT bytes to gateway group"
    start_cmd=("cgexec" "-g" "memory:gateway_group" "${start_cmd[@]}")
  fi
  if ! command -v cgexec >/dev/null; then
    echo "WARN: cgexec not found; cannot apply memory limit of $MEM_LIMIT" >&2
  fi
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

# Verify the CPU affinity of everything that takes part in the measurement.
if $HAS_TASKSET; then
  echo "CPU affinity:"
  if [[ -n "$GATEWAY_PGID" ]]; then
    print_affinity "gateway " $(pgrep -g "$GATEWAY_PGID" || true)
  else
    print_affinity "gateway " $(process_tree "$GATEWAY_LEADER_PID")
  fi
  [[ -n "$SUBGRAPH_PIDS" ]] && print_affinity "subgraphs" $SUBGRAPH_PIDS
  echo "  k6: cores ${LOAD_CPUSET:-unpinned}"
fi

# Warmup (full k6 run, discarded)
echo "Warmup ($WARMUP_SECONDS s) ..."
maybe_taskset "${LOAD_CPUSET}" k6 run -e SUMMARY_PATH="$(pwd)" \
  -e MODE="constant" -e BENCH_GATEWAY_PID="$GATEWAY_LEADER_PID" -e BENCH_OVER_TIME="${WARMUP_SECONDS}s" "$SCRIPT_DIR/k6.js" >/dev/null

# Monitor target: PGID if available, otherwise leader PID.
monitor_target_opts=()
if [[ -n "$GATEWAY_PGID" ]]; then
  monitor_target_opts=("-g" "$GATEWAY_PGID")
else
  monitor_target_opts=("-p" "$GATEWAY_LEADER_PID")
fi

export K6_PROMETHEUS_RW_SERVER_URL=http://localhost:9090/api/v1/write
export K6_PROMETHEUS_RW_TREND_AS_NATIVE_HISTOGRAM=true

rm -rf runs k6_summary.json k6_summary.txt stats.json data.csv runs.json error_responses.jsonl
mkdir -p runs

for RUN in $(seq 1 "$BENCH_RUNS"); do
  RUN_DIR="$GATEWAY_DIR/runs/$RUN"
  mkdir -p "$RUN_DIR"
  echo ""
  echo "=== Measured run $RUN of $BENCH_RUNS ==="

  # Let the CPU cool down after the warmup / previous run, so every run starts
  # at the same clock speed instead of each one being slower than the last.
  if (( BENCH_COOLDOWN_MAX_S > 0 )); then
    "$SCRIPT_DIR/scripts/wait-cooldown.sh" "$BENCH_COOLDOWN_TARGET_C" "$BENCH_COOLDOWN_MAX_S" | tee "$RUN_DIR/cooldown.txt"
  fi

  "$SCRIPT_DIR/monitor.sh" "${monitor_target_opts[@]}" -k "$K6_API_ADDR" -o "$RUN_DIR/data.csv" -i "0.2" >/dev/null 2>&1 &
  MONITOR_PID=$!
  echo "Monitoring started (PID $MONITOR_PID)."

  echo "Load test ($MEASURE_SECONDS s) ..."
  RUN_START="$(date +%s)"
  maybe_taskset "${LOAD_CPUSET}" k6 run$EXTRA_OUT --out "json=$RUN_DIR/k6_metrics.json" --address "$K6_API_ADDR" \
    --log-output "file=$RUN_DIR/k6_console.log" --log-format raw \
    -e SUMMARY_PATH="$RUN_DIR" \
    -e MODE="$LOAD_MODE" -e BENCH_GATEWAY_PID="$GATEWAY_LEADER_PID" -e BENCH_OVER_TIME="${MEASURE_SECONDS}s" "$SCRIPT_DIR/k6.js"
  sleep 2
  RUN_END="$(date +%s)"
  echo "$RUN_START $RUN_END" > "$RUN_DIR/timestamps.txt"

  kill "$MONITOR_PID" >/dev/null 2>&1 || true
  wait "$MONITOR_PID" 2>/dev/null || true
  MONITOR_PID=""

  # k6.js logs a capped sample of failed responses as "ERRSAMPLE|<json>" lines;
  # keep them next to the run so a failing gateway can be diagnosed from the artifact.
  if [[ -f "$RUN_DIR/k6_console.log" ]]; then
    grep '^ERRSAMPLE|' "$RUN_DIR/k6_console.log" | sed 's/^ERRSAMPLE|//' > "$RUN_DIR/error_responses.jsonl" || true
    [[ -s "$RUN_DIR/error_responses.jsonl" ]] || rm -f "$RUN_DIR/error_responses.jsonl"
    rm -f "$RUN_DIR/k6_console.log"
  fi
  rm -f "$RUN_DIR/k6_metrics.json"

  cargo run -q -p toolkit report "$RUN_DIR"
done

echo ""
echo "Summary across $BENCH_RUNS measured run(s):"
# Picks the median run (by RPS), copies its files to the gateway directory and writes runs.json.
cargo run -q -p toolkit aggregate "$(pwd)"
MEDIAN_RUN="$(jq -r '.median_run' runs.json)"
read -r START_TIME END_TIME < "runs/$MEDIAN_RUN/timestamps.txt"
export START_TIME END_TIME

# If CI
if [[ "${CI:-}" == "true" ]]; then
  rm -rf $GATEWAY_DIR/overview.png || echo ""
  if ! npx --quiet capture-website-cli "http://localhost:3000/d/01npcT44k/k6?orgId=1&from=${START_TIME}000&to=${END_TIME}000&kiosk" --output $GATEWAY_DIR/overview.png --width 1200 --height 950 --wait-for-network-idle --delay 2; then
    echo "WARN: Failed to capture overview.png; continuing benchmark without screenshots." >&2
  fi

  rm -rf $GATEWAY_DIR/http.png || echo ""
  if ! npx --quiet capture-website-cli "http://localhost:3000/d-solo/01npcT44k/k6?orgId=1&from=${START_TIME}000&to=${END_TIME}000&panelId=41" --output $GATEWAY_DIR/http.png --width 1200 --height 950 --wait-for-network-idle --delay 2; then
    echo "WARN: Failed to capture http.png; continuing benchmark without screenshots." >&2
  fi

fi

echo "Test for gateway '$GATEWAY_NAME' completed successfully."
