import {
  chartConfig,
  fullGatewayName,
  type GatewayName,
  type TestName,
} from "@/lib/data";

export interface GatewayChartProps {
  gateway: GatewayName;
  showLeftYAxis?: boolean;
  showRightYAxis?: boolean;
  test: TestName;
}

export function GatewayNameLabel(props: { name: GatewayName }) {
  return (
    <span
      className="font-bold capitalize"
      style={{
        color: chartConfig[props.name].color,
      }}
    >
      {fullGatewayName(props.name)}
    </span>
  );
}

export function ChartTitle(props: { title: string }) {
  return <div className="text-center text-sm pb-2">{props.title}</div>;
}

export function ChartTooltipLabelValuePair(props: {
  name: string | number;
  value: string | number | Array<number | string>;
}) {
  return (
    <div className="text-muted-foreground flex min-w-[130px] items-center text-xs">
      {chartConfig[props.name as keyof typeof chartConfig]?.label || props.name}
      <div className="text-foreground ml-auto flex items-baseline gap-0.5 font-mono font-medium tabular-nums">
        {props.value}
      </div>
    </div>
  );
}
