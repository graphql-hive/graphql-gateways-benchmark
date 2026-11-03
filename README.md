# GraphQL Federation Gateways Benchmark

> 📊 **Live Results Available Here:**
> 👉 [the-guild.dev/graphql/hive/federation-gateway-performance](http://the-guild.dev/graphql/hive/federation-gateway-performance)

This project contains a suite of tools to benchmark and compare the performance of different GraphQL federation gateways.

## What This Benchmark Measures

This benchmark evaluates GraphQL federation gateways across multiple performance dimensions:

- **Throughput (RPS)**: Requests per second handled by each gateway
- **Latency**: Response times including P95 and P99.9 percentiles
- **Resource Usage**: Maximum CPU and memory consumption during load
- **Reliability**: Success rate under different load conditions

The benchmark supports two testing modes:
- **Constant Load**: Steady traffic with 50 virtual users to measure baseline efficiency
- **Stress Testing**: Gradually increasing load to find breaking points and maximum capacity

## Overview

The benchmark process is orchestrated by a `Makefile` and a series of bash scripts that coordinate multiple tools. For each gateway defined in the `gateways/` directory, the process is as follows:

### Tools and Scripts

- **`Makefile`**: Provides convenient commands (`install`, `run-subgraphs`, `test`, `test-all`) that orchestrate the entire benchmarking workflow
- **`test.sh`**: Main test orchestration script that manages gateway lifecycle, CPU pinning, and resource monitoring
- **`monitor.sh`**: Continuous monitoring script that tracks CPU and memory usage of gateway processes and collects k6 performance metrics via REST API
- **`k6.js`**: Load testing script that defines the GraphQL queries and load patterns (constant or stress testing modes)
- **`toolkit`**: Rust-based CLI utility for processing raw data and generating reports

### Benchmark Process

1.  **CPU partitioning**: `test.sh` pins k6, the gateway and the (already running) subgraphs to disjoint CPU cores with `taskset`, so the load generator and the subgraphs never compete with the gateway for CPU time. With `CPU_LIMIT=3` on an 8-core machine that is core 0 for k6, cores 1-2 for the gateway and cores 3-7 for the subgraphs. The resulting affinities are printed, and when passwordless `sudo` is available, CPU boost is disabled and the `performance` governor is selected for the duration of the run.
2.  **Gateway Setup**: The gateway server is started with `setsid` for process group management
3.  **Warmup Run**: One warmup run with constant load, discarded
4.  **Measured Runs**: `BENCH_RUNS` (default 1, CI uses 3 on pull requests and 5 on the dedicated runner) measured runs of `MEASURE_SECONDS` each. Before every measured run, the machine can cool down to `BENCH_COOLDOWN_TARGET_C` (default 45 °C, for at most `BENCH_COOLDOWN_MAX_S` seconds) so each run starts at the same boost clock. During each run `monitor.sh` samples CPU and memory of the gateway process group and the k6 metrics (VUs, RPS, P95 latency, success rate) via k6's REST API into `runs/<n>/data.csv`, k6 writes `runs/<n>/k6_summary.json`, and a capped sample of failed responses is kept in `runs/<n>/error_responses.jsonl`
5.  **Data Processing**: `toolkit report` turns each run's `data.csv` and `k6_summary.json` into a `stats.json`; `toolkit aggregate` then picks the **median run by RPS**, copies its files to the gateway directory (so `data.csv`, `k6_summary.*` and `stats.json` always describe the median run) and writes `runs.json` with the median, best and worst RPS, the CV% across runs and the gateway version from `version.txt` (written by each `install.sh`)
6.  **Report Generation**: `toolkit summary` prints a comparison table across all tested gateways; in CI `scripts/generate-report.ts` builds the Markdown report with version, median/best/worst RPS, CV%, peak memory and memory per request columns

## Project Structure

- `gateways/`: Contains subdirectories for each gateway to be benchmarked. Each gateway needs an `install.sh` to set up dependencies and a `run.sh` to start the server.
- `toolkit/`: A Rust crate with a command-line tool to process and summarize benchmark results.
- `subgraphs/`: Contains the Rust source for the GraphQL subgraphs used for testing.
- `k6.js`: The k6 script for load testing.
- `monitor.sh`: Script to monitor CPU and memory usage of a process.
- `scripts/wait-cooldown.sh`: Waits for the CPU package temperature to drop before a measured run.
- `test.sh`: Script to run the benchmark for a single gateway.
- `Makefile`: Provides convenience commands to run the benchmarks.

## Prerequisites

- [Rust](https://www.rust-lang.org/tools/install)
- [k6](https://k6.io/docs/getting-started/installation/)
- A running instance of the subgraphs.
- For the `hotchocolate` gateway: the [.NET SDK](https://dotnet.microsoft.com/download) 10 (its `install.sh` installs one into `gateways/hotchocolate/.dotnet` when it is missing).

## System Requirements

**This benchmark only works on macOS and Linux.** Windows is not supported.

The benchmark uses Unix-specific tools and commands that are not available on Windows, including:
- Process monitoring utilities (`taskset`, `setsid`)
- CPU core detection commands (`nproc`, `sysctl`)
- Shell scripts with Unix-specific functionality

**CPU Pinning Behavior**: If `taskset` and `setsid` are not available on your system, the benchmark will still run but processes will not be pinned to specific CPU cores. In this case, both k6 (load generator) and the gateway processes will run on all available cores, which may result in less consistent performance measurements due to CPU contention and context switching.

## Usage

1.  **Install Gateway Dependencies**:
    This will run the `install.sh` script for each gateway.
    ```bash
    make install
    ```

2.  **Run the Subgraphs**:
    The subgraphs need to be running for the gateways to connect to them.
    ```bash
    make run-subgraphs
    ```
    This command will block, so run it in a separate terminal.

3.  **Run Benchmarks**:
    You can test a single gateway or all of them. You must specify a testing mode: `constant` or `stress`.

    *   **Test a single gateway:**
        ```bash
        make test gateway=<gateway_name> mode=<constant|stress>
        ```
        Replace `<gateway_name>` with one of: `apollo-gateway`, `apollo-router`, `apollo-router-v3`, `cosmo`, `grafbase`, `hive-gateway`, `hive-gateway-router-runtime`, `hive-router`, or `hotchocolate`.

        Examples:
        ```bash
        make test gateway=apollo-router mode=constant
        make test gateway=hive-router mode=stress
        ```

    *   **Test all gateways:**
        This will run the test for every gateway in the `gateways` directory and then print a summary table.
        ```bash
        make test-all mode=<constant|stress>
        ```

        Examples:
        ```bash
        make test-all mode=constant
        make test-all mode=stress
        ```

    Useful environment variables (see the header of `test.sh` for the full list):

    | Variable | Default | Description |
    | --- | --- | --- |
    | `BENCH_RUNS` | `1` | Measured runs per gateway; the median run (by RPS) is reported |
    | `MEASURE_SECONDS` | `60` | Duration of each measured run |
    | `WARMUP_SECONDS` | `15` | Duration of the discarded warmup run |
    | `BENCH_COOLDOWN_MAX_S` | `0` | Wait (at most this long) for the CPU to cool to `BENCH_COOLDOWN_TARGET_C` before each measured run; `0` disables |
    | `CPU_LIMIT` | all cores | Cores available to k6 + gateway; the remaining cores are given to the subgraphs |
    | `LOAD_CPUSET` / `GATEWAY_CPUSET` / `SUBGRAPH_CPUSET` | derived | Explicit core sets for k6, the gateway and the subgraphs |

    For example, five 60-second runs with a cooldown between them:
    ```bash
    BENCH_RUNS=5 BENCH_COOLDOWN_MAX_S=90 CPU_LIMIT=3 make test gateway=hive-router mode=constant
    ```

4.  **View Summary Manually**:
    If you have already run the tests and just want to see the summary table again:
    ```bash
    cargo run -p toolkit summary
    ```

    The summary output will look something like this:

    ```
    | Gateway    | Version | RPS     | Runs | CV (%) | P99.9 (ms) | P95 (ms)   | Count   | CPU (max %) | MEM (max MB) | Success Rate (%) |
    | ---------- | ------- | ------- | ---- | ------ | ---------- | ---------- | ------- | ----------- | ------------ | ---------------- |
    | hive-router| v0.3.11 | 1826.91 | 5    | 0.4    | 78.56      | 48.34      | 109861  | 166.00      | 53           | 100.00           |
    | cosmo      | 0.365.2 | 570.79  | 5    | 0.7    | 348.17     | 128.25     | 34327   | 263.00      | 119          | 100.00           |
    ```

    `runs/<n>/` holds every measured run, and `runs.json` the spread across them.

     ---
    🌐 **Want the full, up-to-date benchmark results (with all gateways compared)?**
    Check them out here: [the-guild.dev/graphql/hive/federation-gateway-performance](http://the-guild.dev/graphql/hive/federation-gateway-performance)

## Testing Modes

- **Constant Mode** (`mode=constant`): Maintains steady traffic with 50 virtual users for 60 seconds to measure baseline performance and efficiency under normal load conditions.

- **Stress Mode** (`mode=stress`): Gradually increases load to find the breaking point of each gateway, helping identify maximum capacity and reliability under pressure.

CI runs three scenarios: `constant-vus-over-time` (constant mode), `constant-vus-subgraphs-delay` (constant mode, with every subgraph call delayed by 4 ms, like a subgraph that talks to a database would be; this keeps the gateway's own overhead from dominating the measurement) and `ramping-vus` (stress mode). The scenario matrix is built from the directories under `gateways/`, so adding a gateway directory is enough to get it benchmarked. Locally, set `SUBGRAPH_DELAY_MS=4` when starting the subgraphs to reproduce the delay scenario.
