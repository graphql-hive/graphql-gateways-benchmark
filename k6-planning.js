// Query planning benchmark.
//
// Measures how long a gateway spends preparing an operation it has never seen
// before (parse + validate + normalize + query plan), compared to executing
// the very same operation from its caches.
//
// For every query tier, each iteration sends two requests back to back:
//   - "warm": the exact same document every time, so it is served from the
//     gateway's operation/plan caches.
//   - "cold": the same document with a unique operation name and unique
//     aliases, so every gateway cache misses and the operation is planned
//     from scratch. Aliases can't be normalized away (they shape the response),
//     so this busts plan caches in every gateway.
// Both requests hit the subgraphs identically, so the paired difference
// (cold - warm) isolates the per-operation preparation cost, which for the
// Rust gateways is dominated by query planning.
//
// A single VU runs everything sequentially so planning work never queues
// behind other requests.
//
// Before measuring, setup() also looks at the plan each gateway came up with:
// it asks the subgraph server to record every request it receives while one
// query executes, and reports how many subgraph fetches the plan needed and
// how many of them had to run one after another (see tracePlan below).

import http from "k6/http";
import exec from "k6/execution";
import { check } from "k6";
import { Rate, Trend } from "k6/metrics";
import { textSummary } from "https://jslib.k6.io/k6-summary/0.0.1/index.js";
import { QUERIES as LARGE_QUERIES } from "./large-graph/queries.js";

// "large" runs the queries generated for the ~80 subgraph ecommerce supergraph
// (scripts/generate-large-graph.ts) instead of the 4 subgraph ones below.
const scenario = __ENV.PLANNING_SCENARIO || "default";
const summaryName =
  scenario === "large" ? "k6_planning_large_summary" : "k6_planning_summary";

const endpoint = __ENV.GATEWAY_ENDPOINT || "http://0.0.0.0:4000/graphql";
const iterations = parseInt(
  __ENV.PLANNING_ITERATIONS || (scenario === "large" ? "200" : "1000")
);
const warmupIterations = parseInt(__ENV.PLANNING_WARMUP_ITERATIONS || "50");
const subgraphsEndpoint = __ENV.SUBGRAPHS_ENDPOINT || "http://0.0.0.0:4200";
// Delay added to every subgraph request while a plan is traced. It has to be
// long enough that fetches sent in parallel can't be mistaken for fetches
// that waited on one another.
const traceDelayMs = parseInt(__ENV.PLAN_TRACE_DELAY_MS || "50");
const traceRuns = parseInt(__ENV.PLAN_TRACE_RUNS || "3");
// Unique per k6 run, so re-running against an already running gateway still
// produces never-seen-before operations.
const runNonce = Date.now().toString(36);

const productFragment = `fragment Product on Product {
  inStock
  name
  price
  shippingEstimate
  upc
  weight
}`;

const userFragment = `fragment User on User {
  id
  username
  name
}`;

const reviewFragment = `fragment Review on Review {
  id
  body
}`;

// `__ID__` is replaced with a fixed value for warm requests and with a unique
// value for cold requests.
const SMALL_QUERIES = {
  // Single subgraph, no entity fetches.
  simple: `query Simple__ID__ {
  top__ID__: topProducts {
    upc
    name
    price
  }
}`,

  // The query used by the throughput benchmarks (k6.js): 4 subgraphs,
  // @requires and @provides, nested entity fetches.
  federated: `${userFragment}

${reviewFragment}

${productFragment}

query Federated__ID__ {
  users__ID__: users {
    ...User
    reviews {
      ...Review
      product {
        ...Product
        reviews {
          ...Review
          author {
            ...User
            reviews {
              ...Review
              product {
                ...Product
              }
            }
          }
        }
      }
    }
  }
  topProducts__ID__: topProducts {
    ...Product
    reviews {
      ...Review
      author {
        ...User
        reviews {
          ...Review
          product {
            ...Product
          }
        }
      }
    }
  }
}`,

  // Many root fields with overlapping but different selections, deep chains
  // of entity jumps, @requires (shippingEstimate) and @provides
  // (Review.author.username) mixed in at different depths. This gives the
  // planner many fetch groups to build, merge and optimize.
  complex: `${userFragment}

${productFragment}

query Complex__ID__ {
  a__ID__: topProducts(first: 5) {
    ...Product
    reviews {
      id
      body
      author {
        ...User
        birthday
        reviews {
          id
          product {
            ...Product
            reviews {
              id
              author {
                username
              }
            }
          }
        }
      }
    }
  }
  b__ID__: users {
    ...User
    reviews {
      id
      product {
        upc
        inStock
        shippingEstimate
        reviews {
          body
          author {
            name
            birthday
            reviews {
              product {
                name
                weight
              }
            }
          }
        }
      }
    }
  }
  c__ID__: me {
    id
    username
    reviews {
      product {
        ...Product
      }
      author {
        name
      }
    }
  }
  d__ID__: user(id: "1") {
    name
    reviews {
      product {
        shippingEstimate
        reviews {
          author {
            reviews {
              product {
                inStock
                price
              }
            }
          }
        }
      }
    }
  }
  e__ID__: topProducts(first: 2) {
    name
    inStock
    reviews {
      author {
        username
        name
        reviews {
          body
          product {
            shippingEstimate
            name
          }
        }
      }
    }
  }
  f__ID__: users {
    username
    reviews {
      author {
        birthday
      }
      product {
        price
        weight
        inStock
      }
    }
  }
}`,
};

const QUERIES = scenario === "large" ? LARGE_QUERIES : SMALL_QUERIES;
const TIERS = Object.keys(QUERIES);

const trends = {};
for (const tier of TIERS) {
  trends[tier] = {
    warm: new Trend(`planning_${tier}_warm`, true),
    cold: new Trend(`planning_${tier}_cold`, true),
    overhead: new Trend(`planning_${tier}_overhead`, true),
  };
}
const successRate = new Rate("success_rate");

const summaryTrendStats = [
  "avg",
  "min",
  "med",
  "max",
  "p(75)",
  "p(90)",
  "p(95)",
  "p(99)",
  "p(99.9)",
];

export const options = {
  scenarios: {
    planning: {
      executor: "per-vu-iterations",
      vus: 1,
      iterations,
      maxDuration: "30m",
    },
  },
  setupTimeout: "10m",
  summaryTrendStats,
};

const params = {
  headers: {
    "Content-Type": "application/json",
  },
};

function buildQuery(tier, id) {
  return QUERIES[tier].replaceAll("__ID__", id);
}

function send(tier, id) {
  const res = http.post(
    endpoint,
    JSON.stringify({ query: buildQuery(tier, id) }),
    params
  );
  const ok = check(res, {
    "response code was 200": (r) => r.status == 200,
    "no graphql errors": (r) => !!r.body && !r.body.includes(`"errors"`),
    "has data": (r) => !!r.body && r.body.includes(`"data":{`),
  });
  successRate.add(ok);
  if (!ok && __ENV.PRINT_ONCE) {
    console.log(`‼️ ${tier} request failed (${res.status}): ${res.body}`);
  }
  return ok ? res.timings.duration : null;
}

// Shape of the plan the gateway executes for a query, observed from the
// subgraphs' side:
//   - fetches: subgraph requests sent
//   - subgraphs: distinct subgraphs they went to
//   - depth: the longest chain of fetches that each started only after the
//     previous one had finished, i.e. how many subgraph round trips a client
//     waits for. Every traced request is delayed by `traceDelayMs`, so only
//     fetches that really waited for an earlier response count.
// Fetch counts depend on the mock data as well as on the plan: gateways skip
// entity fetches for types that aren't in the response.
function tracePlan(tier) {
  let best = null;
  for (let run = 0; run < traceRuns; run++) {
    const started = http.post(
      `${subgraphsEndpoint}/_trace/start?delay_ms=${traceDelayMs}`
    );
    if (started.status !== 200) {
      return null;
    }
    const duration = send(tier, "_warm");
    const stopped = http.post(`${subgraphsEndpoint}/_trace/stop`);
    if (duration === null || stopped.status !== 200) {
      return null;
    }

    const fetches = stopped.json().sort((a, b) => a.start - b.start);
    const depths = [];
    let depth = 0;
    for (let i = 0; i < fetches.length; i++) {
      let d = 1;
      for (let j = 0; j < i; j++) {
        if (fetches[j].end <= fetches[i].start && depths[j] + 1 > d) {
          d = depths[j] + 1;
        }
      }
      depths.push(d);
      depth = Math.max(depth, d);
    }

    const plan = {
      fetches: fetches.length,
      subgraphs: new Set(fetches.map((f) => f.subgraph)).size,
      depth,
    };
    // Scheduling hiccups can only make a plan look deeper than it is.
    if (best === null || plan.depth < best.depth) {
      best = plan;
    }
  }
  return best;
}

export function setup() {
  // Warm up the gateway: populate caches for the warm documents (several
  // times, in case the gateway runs multiple workers) and exercise the
  // cold path so JIT-compiled gateways aren't measured while still warming up.
  for (let i = 0; i < warmupIterations; i++) {
    for (const tier of TIERS) {
      send(tier, "_warm");
      send(tier, `_setup_${runNonce}_${i}`);
    }
  }

  const plans = {};
  for (const tier of TIERS) {
    const plan = tracePlan(tier);
    if (plan === null) {
      console.log(`⚠️ could not trace the ${tier} plan`);
      continue;
    }
    plans[tier] = plan;
  }
  return { plans };
}

export default function () {
  const iteration = exec.scenario.iterationInTest;
  const coldId = `_cold_${runNonce}_${iteration}`;

  for (const tier of TIERS) {
    // Alternate the order so neither request systematically benefits from
    // running second.
    let warm, cold;
    if (iteration % 2 === 0) {
      warm = send(tier, "_warm");
      cold = send(tier, coldId);
    } else {
      cold = send(tier, coldId);
      warm = send(tier, "_warm");
    }

    if (warm === null || cold === null) {
      continue;
    }

    trends[tier].warm.add(warm);
    trends[tier].cold.add(cold);
    trends[tier].overhead.add(cold - warm);
  }
}

export function handleSummary(data) {
  const out = {
    stdout: textSummary(data, { indent: " ", enableColors: true }),
  };

  if (__ENV.SUMMARY_PATH) {
    out[`${__ENV.SUMMARY_PATH}/${summaryName}.json`] = JSON.stringify(
      Object.assign(data, {
        tiers: TIERS,
        iterations,
        plans: (data.setup_data && data.setup_data.plans) || {},
      })
    );
    out[`${__ENV.SUMMARY_PATH}/${summaryName}.txt`] = textSummary(data, {
      indent: " ",
      enableColors: false,
    });
  }

  return out;
}
