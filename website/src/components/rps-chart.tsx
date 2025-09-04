import { CartesianGrid, Line, LineChart, YAxis } from "recharts";

import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";

import { chartConfig, fullGatewayName, pickDataSet } from "@/lib/data";
import {
  ChartTitle,
  ChartTooltipLabelValuePair,
  type GatewayChartProps,
} from "./common";

export function RPSChart({
  gateway,
  test,
  showLeftYAxis = false,
  showRightYAxis = false,
}: GatewayChartProps) {
  const { data, ranges } = pickDataSet(test);
  const chartData = data.rps.map((record) => ({
    tick: record.tick,
    rps: record[gateway],
    vus: record[`${gateway}Vus` as const],
  }));

  return (
    <div>
      <ChartTitle title={fullGatewayName(gateway)} />
      <ChartContainer config={chartConfig}>
        <LineChart data={chartData}>
          <CartesianGrid vertical={false} />
          <ChartTooltip
            cursor={false}
            formatter={(value, name) => {
              return (
                <ChartTooltipLabelValuePair
                  name={name}
                  value={
                    name.toString() === "vus"
                      ? value
                      : (value as number).toFixed(2)
                  }
                />
              );
            }}
            content={<ChartTooltipContent hideLabel />}
          />
          <YAxis
            hide={!showLeftYAxis}
            type="number"
            scale="linear"
            yAxisId="left"
            unit="rps"
            domain={[ranges.rps.min, ranges.rps.max]}
          />
          <YAxis
            hide={!showRightYAxis}
            type="number"
            scale="linear"
            yAxisId="right"
            orientation="right"
            unit="VUs"
            domain={[ranges.vus.min, ranges.vus.max]}
          />
          <Line
            yAxisId="left"
            dataKey="rps"
            type="monotone"
            stroke={chartConfig[gateway].color}
            strokeWidth={2}
            dot={false}
          />
          <Line
            yAxisId="right"
            dataKey="vus"
            type="monotone"
            stroke="var(--color-vus)"
            strokeWidth={2}
            strokeDasharray={10}
            dot={false}
          />
        </LineChart>
      </ChartContainer>
    </div>
  );
}
