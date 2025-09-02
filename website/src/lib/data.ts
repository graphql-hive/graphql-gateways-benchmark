import type { ChartConfig } from "@/components/ui/chart";
import stressDataCSV from "../../stress-data.csv?raw";
import constantDataCSV from "../../constant-data.csv?raw";

export type TestName = "stress" | "constant";

const defaultRange = {
  max: -Infinity,
  min: 0,
};

function calculateDataSet(csv: string) {
  const lines = csv.split("\n").filter((line) => line.trim() !== "");

  const data: {
    p95: MetricRecord[];
    rps: MetricRecord[];
    cpu: MetricRecord[];
    mem: MetricRecord[];
    success_rate: MetricRecord[];
  } = {
    p95: [],
    rps: [],
    cpu: [],
    mem: [],
    success_rate: [],
  };

  const p95Map: MetricMap = {};
  const rpsMap: MetricMap = {};
  const cpuMap: MetricMap = {};
  const memMap: MetricMap = {};
  const successRateMap: MetricMap = {};

  const ranges: Record<
    keyof typeof data,
    {
      min: number;
      max: number;
    }
  > &
    Record<
      "vus",
      {
        min: number;
        max: number;
      }
    > = {
    vus: { ...defaultRange },
    p95: { ...defaultRange },
    rps: { ...defaultRange },
    cpu: { ...defaultRange },
    mem: { ...defaultRange },
    success_rate: { min: 100, max: 100 },
  };

  // gateway,tick,vus,rps,p95,req_success_rate,cpu,mem
  for (let i = 1; i < lines.length; i++) {
    const line = lines[i].trim();
    if (!line) continue;

    const parts = line
      .split(",")
      .map((p, idx) => (idx === 0 ? p.trim() : parseFloat(p)));

    const gateway = parts[0] as GatewayName;
    const tick = parts[1] as number;
    const vus = parts[2] as number;
    const rps = parts[3] as number;
    const p95 = parts[4] as number;
    const successRate = (parts[5] as number) * 100;
    const cpu = parts[6] as number;
    const mem = parts[7] as number;

    if (rps > ranges.rps.max) {
      ranges.rps.max = rps;
    }

    if (p95 > ranges.p95.max) {
      ranges.p95.max = p95;
    }

    if (cpu > ranges.cpu.max) {
      ranges.cpu.max = cpu;
    }

    if (mem > ranges.mem.max) {
      ranges.mem.max = mem;
    }

    if (vus > ranges.vus.max) {
      ranges.vus.max = vus;
    }

    if (successRate <= ranges.success_rate.min) {
      ranges.success_rate.min = successRate;
    }

    if (!p95Map[tick]) p95Map[tick] = {};
    p95Map[tick][gateway] = { value: p95, vus };

    if (!rpsMap[tick]) rpsMap[tick] = {};
    rpsMap[tick][gateway] = { value: rps, vus };

    if (!cpuMap[tick]) cpuMap[tick] = {};
    cpuMap[tick][gateway] = { value: cpu, vus };

    if (!memMap[tick]) memMap[tick] = {};
    memMap[tick][gateway] = { value: mem, vus };

    if (!successRateMap[tick]) successRateMap[tick] = {};
    successRateMap[tick][gateway] = { value: successRate, vus };
  }

  // Filter ticks for which all gateways have data across all metrics.
  const commonTicks = Object.keys(p95Map)
    .map(Number)
    .filter((tick) =>
      allGateways.every(
        (gw) =>
          p95Map[tick]?.[gw] !== undefined &&
          rpsMap[tick]?.[gw] !== undefined &&
          cpuMap[tick]?.[gw] !== undefined &&
          memMap[tick]?.[gw] !== undefined &&
          successRateMap[tick]?.[gw] !== undefined,
      ),
    )
    .sort((a, b) => a - b);

  // Build the flattened record for each metric from the common ticks.
  // Each record now contains for example: `cosmo` and `cosmoVus`, etc.
  for (const tick of commonTicks) {
    data.p95.push({
      tick,
      cosmo: p95Map[tick].cosmo!.value,
      cosmoVus: p95Map[tick].cosmo!.vus,
      grafbase: p95Map[tick].grafbase!.value,
      grafbaseVus: p95Map[tick].grafbase!.vus,
      apollo: p95Map[tick].apollo!.value,
      apolloVus: p95Map[tick].apollo!.vus,
      hive: p95Map[tick].hive!.value,
      hiveVus: p95Map[tick].hive!.vus,
    });

    data.rps.push({
      tick,
      cosmo: rpsMap[tick].cosmo!.value,
      cosmoVus: rpsMap[tick].cosmo!.vus,
      grafbase: rpsMap[tick].grafbase!.value,
      grafbaseVus: rpsMap[tick].grafbase!.vus,
      apollo: rpsMap[tick].apollo!.value,
      apolloVus: rpsMap[tick].apollo!.vus,
      hive: rpsMap[tick].hive!.value,
      hiveVus: rpsMap[tick].hive!.vus,
    });

    data.cpu.push({
      tick,
      cosmo: cpuMap[tick].cosmo!.value,
      cosmoVus: cpuMap[tick].cosmo!.vus,
      grafbase: cpuMap[tick].grafbase!.value,
      grafbaseVus: cpuMap[tick].grafbase!.vus,
      apollo: cpuMap[tick].apollo!.value,
      apolloVus: cpuMap[tick].apollo!.vus,
      hive: cpuMap[tick].hive!.value,
      hiveVus: cpuMap[tick].hive!.vus,
    });

    data.mem.push({
      tick,
      cosmo: memMap[tick].cosmo!.value,
      cosmoVus: memMap[tick].cosmo!.vus,
      grafbase: memMap[tick].grafbase!.value,
      grafbaseVus: memMap[tick].grafbase!.vus,
      apollo: memMap[tick].apollo!.value,
      apolloVus: memMap[tick].apollo!.vus,
      hive: memMap[tick].hive!.value,
      hiveVus: memMap[tick].hive!.vus,
    });

    data.success_rate.push({
      tick,
      cosmo: successRateMap[tick].cosmo!.value,
      cosmoVus: successRateMap[tick].cosmo!.vus,
      grafbase: successRateMap[tick].grafbase!.value,
      grafbaseVus: successRateMap[tick].grafbase!.vus,
      apollo: successRateMap[tick].apollo!.value,
      apolloVus: successRateMap[tick].apollo!.vus,
      hive: successRateMap[tick].hive!.value,
      hiveVus: successRateMap[tick].hive!.vus,
    });
  }

  ranges.cpu.max = ranges.cpu.max * 1.1;
  ranges.mem.max = ranges.mem.max * 1.1;
  ranges.p95.max = ranges.p95.max * 1.1;
  ranges.rps.max = ranges.rps.max * 1.1;
  ranges.vus.max = ranges.vus.max * 1.1;
  ranges.success_rate.min = ranges.success_rate.min * 0.995;

  return {
    data,
    ranges,
  };
}

export type GatewayName = "cosmo" | "grafbase" | "apollo" | "hive";

export function fullGatewayName(name: GatewayName) {
  if (name === "cosmo") {
    return "Cosmo Router";
  }

  if (name === "grafbase") {
    return "Grafbase Gateway";
  }

  if (name === "apollo") {
    return "Apollo Router";
  }

  return "Hive Router";
}

export interface MetricRecord {
  tick: number;
  cosmo: number;
  cosmoVus: number;
  grafbase: number;
  grafbaseVus: number;
  apollo: number;
  apolloVus: number;
  hive: number;
  hiveVus: number;
}

const allGateways: GatewayName[] = ["cosmo", "grafbase", "apollo", "hive"];

// Create maps to group values by tick for each metric.
// For each tick we store an object that maps each gateway to an object containing
// both the metric value and that gateway’s VUs.
type GatewayMetric = { value: number; vus: number };
type MetricMap = Record<number, Partial<Record<GatewayName, GatewayMetric>>>;

export const chartConfig = {
  hive: {
    label: "Hive",
    color: "#e1ff00",
  },
  cosmo: {
    label: "Cosmo",
    color: "#ea4899",
  },
  apollo: {
    label: "Apollo",
    color: "#fc5200",
  },
  grafbase: {
    label: "Grafbase",
    color: "#4A9C6D",
  },
  vus: {
    label: "VUS",
    color: "#444",
  },
} satisfies ChartConfig;

const stress = calculateDataSet(stressDataCSV);
const constant = calculateDataSet(constantDataCSV);

export function pickDataSet(test: TestName) {
  return test === "stress" ? stress : constant;
}
