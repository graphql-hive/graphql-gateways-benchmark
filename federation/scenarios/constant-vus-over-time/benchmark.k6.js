import {
  makeGraphQLRequest,
  handleBenchmarkSummary,
  sendGraphQLRequest,
} from "../k6.shared.js";

const vus = __ENV.BENCH_VUS ? parseInt(__ENV.BENCH_VUS) : 100;
const time = __ENV.BENCH_OVER_TIME || "30s";

export const options = {
  vus: vus,
  duration: time,
};

export function setup() {
  for (let i = 0; i < 20; i++) {
    sendGraphQLRequest();
  }
}

export default function() {
  makeGraphQLRequest()
}

export function handleSummary(data) {
  return handleBenchmarkSummary(data, { vus, time });
}