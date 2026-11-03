#!/usr/bin/env bash
# Wait until the CPU package temperature is at or below a target, or until a
# time limit passes, whichever comes first. Used between benchmark runs so each
# run starts at the same boost clock (a hot CPU clocks down).
#
#   wait-cooldown.sh [target_celsius=45] [max_seconds=90]
#   wait-cooldown.sh --read            # print the current temperature only
#
# Always exits 0. The last stdout line says how the wait ended:
#   cooldown: reached <temp> C after <n>s
#   cooldown: timeout after <n>s at <temp> C
#   cooldown: timeout after <n>s (no sensor)
#
# COOLDOWN_SENSOR can point at a temperature file (millidegrees) to override detection.
set -u

find_sensor() {
  local hw label
  # AMD (k10temp/zenpower): Tctl or Tdie; Intel (coretemp): "Package id 0".
  for hw in /sys/class/hwmon/hwmon*; do
    case "$(cat "$hw/name" 2>/dev/null)" in
      k10temp|zenpower|coretemp)
        for label in "$hw"/temp*_label; do
          [ -e "$label" ] || continue
          case "$(cat "$label")" in
            Tdie|Tctl|"Package id 0") echo "${label%_label}_input"; return 0 ;;
          esac
        done
        [ -e "$hw/temp1_input" ] && { echo "$hw/temp1_input"; return 0; }
        ;;
    esac
  done
  for hw in /sys/class/thermal/thermal_zone*; do
    case "$(cat "$hw/type" 2>/dev/null)" in
      x86_pkg_temp|cpu-thermal|cpu_thermal|soc_thermal) echo "$hw/temp"; return 0 ;;
    esac
  done
  return 1
}

sensor="${COOLDOWN_SENSOR:-$(find_sensor || true)}"
read_temp() { awk '{ printf "%.1f", $1 / 1000 }' "$sensor"; }

if [ "${1:-}" = "--read" ]; then
  [ -n "$sensor" ] && [ -r "$sensor" ] && { read_temp; echo; }
  exit 0
fi

target="${1:-45}"
max="${2:-90}"

if [ -z "$sensor" ] || [ ! -r "$sensor" ]; then
  echo "No CPU temperature sensor found, waiting ${max}s instead" >&2
  sleep "$max"
  echo "cooldown: timeout after ${max}s (no sensor)"
  exit 0
fi

start=$SECONDS
next_report=0
while :; do
  temp="$(read_temp)"
  elapsed=$((SECONDS - start))
  if awk -v t="$temp" -v g="$target" 'BEGIN { exit !(t <= g) }'; then
    echo "cooldown: reached ${temp} C after ${elapsed}s"
    exit 0
  fi
  if [ "$elapsed" -ge "$max" ]; then
    echo "cooldown: timeout after ${elapsed}s at ${temp} C"
    exit 0
  fi
  if [ "$elapsed" -ge "$next_report" ]; then
    echo "CPU at ${temp} C, cooling down to ${target} C (${elapsed}s of max ${max}s)" >&2
    next_report=$((elapsed + 10))
  fi
  sleep 1
done
