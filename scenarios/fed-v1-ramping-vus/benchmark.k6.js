import { makeGraphQLRequest, handleBenchmarkSummary } from '../k6.shared.js'

const vus = __ENV.BENCH_VUS ? parseInt(__ENV.BENCH_VUS) : 500;
const time = __ENV.BENCH_OVER_TIME || "30s";

export const options = {
  scenarios: {
    test: {
      executor: "ramping-vus",
      startVUs: 50,
      stages: [
        {
          duration: time,
          target: vus,
        },
        { duration: "5s", target: 50 },
        { duration: "5s", target: 0 },
      ],
    },
  },
};

export default function() {
  makeGraphQLRequest()
}

export function handleSummary(data) {
  return handleBenchmarkSummary(data, { vus, time });
}