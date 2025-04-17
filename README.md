# GraphQL Gateways Benchmark

This repository is a collection is different scenarios and tests performed on different implementations of GraphQL gateways.

This goals of this repo:

1. **Provide a transparent, accurate and descriptive benchmark testing for different tools:**

   ➡️ All tests are running in Docker containers, with the same configuration.

   ➡️ During the test, tools like [cadvisor](https://github.com/google/cadvisor) are monitoring stats.

   ➡️ Promethues and Grafana are stores results and stats for every run, and we export and embed it as PNG.

   ➡️ Every scenario have a different report, based on what it measures.

   ➡️ We are using a dedicated GitHub Actions runners, with `concurrency=1` to make sure tests are running as standalone.

2. **Always be up to date:**

   ➡️ This allows tools to improve over time.

   ➡️ All code in the repository is open and can be changed by the community.

   ➡️ Scenarios are executed for every PR, and reports are generated automatically per scenario.

   ➡️ [Renovate](https://github.com/renovatebot/renovate) keeps all dependencies up-to-date.

3. **Various scenarios**

   ➡️ We are trying to create real-life scenarios based on [our experience and our customers](https://the-guild.dev).

   ➡️ Each scenario has differnt setup and measure different stats.

# Scenarios

## `fed-constant-vus-over-time`

[Latest Results](./federation/scenarios/constant-vus-over-time/README.md)

This scenario runs the following:

1. 4 GraphQL subgraphs in dedicated services
2. A GraphQL gateway compatible with the Apollo Federation spec
3. Constant rate of VUs over fixed time span

This measures the following:

1. Successful RPS (requests that did not fail per second) rate
2. Request duration (average, p95)
3. Request failures (count)
4. CPU usage during the entire execution
5. RAM usage during the entire execution
6. HTTP layer timings

> This scenario uses Federation spec with all gateways that supports this kind of specification (not all gateways supports v2 spec).

## `fed-constant-vus-subgraphs-delay`

[Latest Results](./federation/scenarios/constant-vus-subgraphs-delay/README.md)

This scenario runs the same flow as `fed-constant-vus-over-time` but with an intentional delay on each upstream Subgraph. This creates more stress and increases memory in the server due to the more inflight requests.

## `fed-constant-vus-subgraphs-delay-resources`

[Latest Results](./federation/scenarios/constant-vus-subgraphs-delay-resources/README.md)

This scenario runs the same flow as `fed-constant-vus-subgraphs-delay` but with more resources (CPU and RAM) allocated for the gateway.

## `fed-ramping-vus`

[Latest Results](./federation/scenarios/ramping-vus/README.md)

This scenario runs the following:

1. 4 GraphQL subgraphs in dedicated services
2. A GraphQL gateway compatible with the Apollo Federation spec
3. Gradually ramping VUs to a high number, to demo a stress scenario

This measures the following:

1. Successful RPS (requests that did not fail per second) rate
1. Request duration (average, med, max, p95)
1. Request failures (count)
1. CPU usage during the entire execution
1. RAM usage during the entire execution
1. HTTP layer timings

> This scenario uses Federation spec with all gateways that supports this kind of specification (not all gateways supports v2 spec).
