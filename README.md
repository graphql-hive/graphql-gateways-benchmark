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
- **Query Planning**: Time spent preparing (parsing, validating, normalizing and query planning) an operation the gateway has never seen before

The benchmark supports three testing modes:
- **Constant Load**: Steady traffic with 50 virtual users to measure baseline efficiency
- **Stress Testing**: Gradually increasing load to find breaking points and maximum capacity
- **Query Planning**: Sequential cold vs. warm requests to measure per-operation planning cost

## Overview

The benchmark process is orchestrated by a `Makefile` and a series of bash scripts that coordinate multiple tools. For each gateway defined in the `gateways/` directory, the process is as follows:

### Tools and Scripts

- **`Makefile`**: Provides convenient commands (`install`, `run-subgraphs`, `test`, `test-all`) that orchestrate the entire benchmarking workflow
- **`test.sh`**: Main test orchestration script that manages gateway lifecycle, CPU pinning, and resource monitoring
- **`monitor.sh`**: Continuous monitoring script that tracks CPU and memory usage of gateway processes and collects k6 performance metrics via REST API
- **`k6.js`**: Load testing script that defines the GraphQL queries and load patterns (constant or stress testing modes)
- **`toolkit`**: Rust-based CLI utility for processing raw data and generating reports

### Benchmark Process

1.  **Gateway Setup**: The `test.sh` script starts the gateway server using `setsid` for process group management and optionally pins it to specific CPU cores using `taskset`
2.  **Warmup Phase**: A brief warmup period with constant load to stabilize the gateway before measurement begins
3.  **Monitoring**: The `monitor.sh` script continuously tracks:
     - CPU and memory usage of the gateway process group
     - k6 performance metrics (VUs, RPS, P95 latency, success rate) via k6's REST API
     - All data is logged to `data.csv` with timestamps
4.  **Load Testing**: The `k6` tool executes the specified test mode (constant or stress) while monitoring continues, saving detailed results to `k6_summary.json`
5.  **Data Processing**: The `toolkit` utility processes the raw monitoring data (`data.csv`) and k6 results (`k6_summary.json`) to generate a unified `stats.json` with key metrics
6.  **Report Generation**: The `toolkit` provides summary views aggregating results across all tested gateways into comparative tables

## Project Structure

- `gateways/`: Contains subdirectories for each gateway to be benchmarked. Each gateway needs an `install.sh` to set up dependencies and a `run.sh` to start the server.
- `toolkit/`: A Rust crate with a command-line tool to process and summarize benchmark results.
- `subgraphs/`: Contains the Rust source for the GraphQL subgraphs used for testing.
- `k6.js`: The k6 script for load testing.
- `k6-planning.js`: The k6 script for the query planning benchmark.
- `large-graph/`: The generated ~80 subgraph ecommerce supergraph used by `mode=planning-large` (subgraph SDLs, composed supergraph, Cosmo config and queries).
- `scripts/generate-large-graph.ts`: Generates `large-graph/`.
- `monitor.sh`: Script to monitor CPU and memory usage of a process.
- `test.sh`: Script to run the benchmark for a single gateway.
- `Makefile`: Provides convenience commands to run the benchmarks.

## Prerequisites

- [Rust](https://www.rust-lang.org/tools/install)
- [k6](https://k6.io/docs/getting-started/installation/)
- A running instance of the subgraphs.

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
    You can test a single gateway or all of them. You must specify a testing mode: `constant`, `stress`, `planning` or `planning-large`.

    *   **Test a single gateway:**
        ```bash
        make test gateway=<gateway_name> mode=<constant|stress|planning|planning-large>
        ```
        Replace `<gateway_name>` with one of: `apollo-gateway`, `apollo-router`, `apollo-router-v3`, `apollo-router-v3-incremental`, `cosmo`, `grafbase`, `hive-gateway`, `hive-gateway-router-runtime`, or `hive-router`.

        Examples:
        ```bash
        make test gateway=apollo-router mode=constant
        make test gateway=hive-router mode=stress
        make test gateway=apollo-router-v3-incremental mode=planning
        ```

    *   **Test all gateways:**
        This will run the test for every gateway in the `gateways` directory and then print a summary table.
        ```bash
        make test-all mode=<constant|stress|planning|planning-large>
        ```

        Examples:
        ```bash
        make test-all mode=constant
        make test-all mode=stress
        make test-all mode=planning
        ```

4.  **View Summary Manually**:
    If you have already run the tests and just want to see the summary table again:
    ```bash
    cargo run -p toolkit summary
    cargo run -p toolkit planning-summary   # query planning results
    cargo run -p toolkit planning-summary gateways large   # planning-large results
    ```

    The summary output will look something like this:

    ```
    | Gateway    | RPS     | P99 (ms)   | P95 (ms)   | Count   | CPU (max %) | MEM (max MB) | Success Rate (%) |
    | ---------- | ------- | ---------- | ---------- | ------- | ----------- | ------------ | ---------------- |
    | hive-router       | 1826.91 | 78.56      | 48.34      | 109861  | 166.00      | 53           | 100.00           |
    | cosmo      | 570.79  | 348.17     | 128.25     | 34327   | 263.00      | 119          | 100.00           |
    | grafbase   | 451.24  | 400.35     | 139.79     | 27148   | 136.00      | 94           | 100.00           |
    | apollo-router     | 317.45  | 495.61     | 201.34     | 19098   | 273.00      | 193          | 100.00           |
    ```

     ---
    🌐 **Want the full, up-to-date benchmark results (with all gateways compared)?**
    Check them out here: [the-guild.dev/graphql/hive/federation-gateway-performance](http://the-guild.dev/graphql/hive/federation-gateway-performance)

## Testing Modes

- **Constant Mode** (`mode=constant`): Maintains steady traffic with 50 virtual users for 60 seconds to measure baseline performance and efficiency under normal load conditions.

- **Stress Mode** (`mode=stress`): Gradually increases load to find the breaking point of each gateway, helping identify maximum capacity and reliability under pressure.

- **Planning Mode** (`mode=planning`): Measures query planning cost. See [Query Planning Benchmark](#query-planning-benchmark).

- **Planning Large Mode** (`mode=planning-large`): The planning benchmark against a generated ecommerce supergraph with ~80 subgraphs. See [Large supergraph](#large-supergraph).

## Query Planning Benchmark

Gateways cache the result of parsing, validating and planning an operation, so the throughput benchmarks above (which send the same query over and over) almost never plan anything. The planning benchmark (`k6-planning.js`) measures what the first request for a new operation costs.

A single VU runs a fixed number of iterations (`PLANNING_ITERATIONS`, default `1000`, after `PLANNING_WARMUP_ITERATIONS`, default `50`). In each iteration, for each query tier, it sends:

- **warm**: the exact same document every time, served from the gateway's caches.
- **cold**: the same document with a unique operation name and unique aliases. Aliases shape the response, so they can't be normalized away, and every gateway's plan cache misses.

Both requests do identical subgraph work, so the paired difference `cold - warm` (**planning overhead**) is the time the gateway spent preparing a new operation: parsing, validation, normalization and query planning. This works the same way for every gateway, but it isn't pure planner time. For example, Apollo Router's own `apollo.router.query_planning.plan.duration` metric accounts for roughly half of its overhead on these queries. Iterations alternate which request goes first so neither one consistently benefits from running second.

Query tiers:

| Tier | Description |
| --- | --- |
| `simple` | A single root field resolved by one subgraph |
| `federated` | The query used by the throughput benchmarks: 4 subgraphs, `@requires`, `@provides`, nested entity fetches |
| `complex` | 6 root fields with overlapping selections and deep chains of entity jumps across all subgraphs |

Results are written to `gateways/<gateway>/planning_stats.json` and summarized with `cargo run -p toolkit planning-summary`.

### Plan quality

A planner that answers quickly can still hand back a worse plan, so the benchmark also reports what each gateway's plan costs to execute. Before measuring, the k6 script asks the subgraph server to record every request it receives while each query runs once (`POST /_trace/start` and `POST /_trace/stop`), and reports per query:

- **Sequential steps**: the longest chain of subgraph fetches that each had to wait for the previous one. This is how many subgraph round trips a client waits for, so it sets the latency of the query when subgraphs aren't instant.
- **Subgraph fetches**: how many requests the gateway sent in total.
- **Subgraphs**: how many distinct subgraphs those requests went to.

The plan is observed from the subgraphs rather than read from each gateway's own plan output, so the numbers mean the same thing for every gateway. Two things to keep in mind when reading them:

- Steps are inferred from timing. Every traced request is delayed by `PLAN_TRACE_DELAY_MS` (default `50`), a fetch counts as waiting on another one only if it arrived after that one's response was sent, and the shallowest of `PLAN_TRACE_RUNS` (default `3`) executions is reported.
- Fetch counts depend on the mock data as well as the plan. Gateways skip entity fetches for types that aren't in the response, and the mock subgraphs return two items per list.

### Large supergraph

The 4 subgraph schema above is too small to make a query planner work hard. `mode=planning-large` runs the same benchmark against a generated ecommerce supergraph with 80 subgraphs (`large-graph/`), modelled on a store whose graph grew one team at a time:

- **Wide entities**: `Product`, `Variant`, `Customer`, `Order` and `Cart` each get a couple of fields from dozens of subgraphs (`Product` has fields from 29 of them), so a single page fans out across most of the graph.
- **Interfaces and unions**: `Product` (6 implementations), `Promotion` (5) and `PaymentMethod` (5) are interfaces whose implementations are entities extended across subgraphs, next to the `SearchResult` (10 members) and `ContentBlock` (6 members) unions. Planners have to expand every selection per concrete type.
- **`@requires` chains**: computed fields that depend on fields computed by other subgraphs, several hops deep. For example `Cart.pointsToEarn` requires `grandTotalCents` (checkout), which requires `taxTotalCents` (tax), which requires `shippingTotalCents` (shipping-rates), which requires `discountTotalCents` (discounts), which requires `subtotalCents` (cart-totals).
- `@provides` and a second `@key` (`Variant.sku`, the only key the inventory subgraph knows).

Query tiers:

| Tier | Description |
| --- | --- |
| `product_page` | Product detail page: every field of the `Product` interface across all of its implementations, plus variants, reviews, promotions and recommendations |
| `search` | Search results page: the `SearchResult` union, the `ContentBlock` union of the landing page and product listings nested under them |
| `checkout` | Checkout page: cart and line item totals computed through `@requires` chains 5 subgraphs deep, with products, promotions and payment methods around them |
| `order_history` | Account page: customer, orders, line items, shipments and payment methods, with ranked products (the product `@requires` chain) 4 entity hops deep |

Everything in `large-graph/` is generated by `scripts/generate-large-graph.ts` and committed, so running the benchmark needs no extra steps:

```bash
make test gateway=hive-router mode=planning-large
make test-all mode=planning-large
```

`PLANNING_ITERATIONS` defaults to `200` in this mode, because planning one of these operations takes some gateways hundreds of milliseconds. Results are written to `gateways/<gateway>/planning_large_stats.json`.

To change the schema or the queries, edit the generator and run it again. It composes the supergraph with `@apollo/composition`, builds the Cosmo router config with `wgc`, and validates the queries against the composed schema:

```bash
npm run generate-large-graph
SUBGRAPHS=60 npm run generate-large-graph   # fewer subgraphs (38 to 80)
```

The subgraphs themselves are mocks: the `subgraphs` binary turns every SDL file in `large-graph/subgraphs` into a schema that answers with deterministic fake data (`subgraphs/ecommerce.rs`), served under `http://localhost:4200/ecommerce/<name>`. That is enough here, because the warm and the cold request do identical subgraph work and only their difference is reported.

### Apollo Router v3 incremental planner

`apollo-router-v3` and `apollo-router-v3-incremental` both run Apollo Router `v3.0.0-preview.0`. The only difference is that `apollo-router-v3-incremental` enables the new incremental (BULB) query planner (`supergraph.query_planning.incremental_planner.enabled: true`, default `beam_width: 16` and `fuel: 5000`). It builds plans field by field with bounded backtracking instead of exhaustively enumerating plan candidates.

The incremental planner targets large supergraphs, where exhaustively enumerating plan candidates gets expensive. The 4-subgraph schema used here is small, so expect the two variants to be close.

