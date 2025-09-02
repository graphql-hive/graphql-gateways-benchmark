import type { GatewayName } from "@/lib/data";
import { GatewayNameLabel } from "./common";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
} from "./ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "./ui/table";

function ValueWithUnit(props: { value: string | number; unit: string }) {
  return (
    <span>
      {props.value}
      <span className="text-muted-foreground"> {props.unit}</span>
    </span>
  );
}

function TableHeaderCell(props: {
  className: string;
  children: React.ReactNode;
  title: string;
  href: string;
}) {
  return (
    <TableHead className={props.className}>
      <a
        href={props.href}
        className="underline underline-offset-2 decoration-gray-500 hover:opacity-75"
        title={props.title}
      >
        {props.children}
      </a>
    </TableHead>
  );
}

export function StressTestIntro(props: {
  auditScores: Record<GatewayName, string> | null;
}) {
  const { auditScores } = props;

  return (
    <Intro
      auditScores={auditScores}
      description={
        <>
          This benchmark measured speed, efficiency, and - most critically -
          reliability under a high-concurrency stress test.
          <br />
          The summary data below highlights two distinct classes of behavior:
          gateways that remain 100% reliable under pressure and those that begin
          to shed load.
        </>
      }
      loadGeneration={
        <>
          k6 ramps traffic according to predefined stress patterns to a{" "}
          <strong>target of 500 VUs</strong> over <strong>60 seconds</strong> to
          simulate heavy usage.
        </>
      }
      data={{
        hive: {
          version: "v0.0.5",
          website: "https://github.com/graphql-hive/router",
          rps: 1726.32,
          p95: 331.56,
          p99_9: 443.62,
          cpu: 171,
          mem: 109,
          reliability: 100,
        },
        cosmo: {
          version: "v0.247.0",
          website: "https://github.com/wundergraph/cosmo",
          rps: 562.58,
          p95: 914.43,
          p99_9: 1256.28,
          cpu: 266,
          mem: 378,
          reliability: 100,
        },
        grafbase: {
          version: "v0.48.1",
          website: "https://github.com/grafbase/grafbase",
          rps: 436.15,
          p95: 698.56,
          p99_9: 896.47,
          cpu: 136.0,
          mem: 201,
          reliability: 98.68,
        },
        apollo: {
          version: "v2.6.0",
          website: "https://github.com/apollographql/router",
          rps: 312.52,
          p95: 1657.47,
          p99_9: 2405.74,
          cpu: 272.0,
          mem: 800,
          reliability: 99.91,
        },
      }}
    />
  );
}

export function ConstantTestIntro(props: {
  auditScores: Record<GatewayName, string> | null;
}) {
  const { auditScores } = props;

  return (
    <Intro
      auditScores={auditScores}
      description={
        <>
          This benchmark holds traffic steady at{" "}
          <strong>50 virtual users</strong> to measure{" "}
          <strong>baseline efficiency</strong> - not the breaking point.
          <br />
          We track throughput, p95 latency, CPU, memory, and reliability with
          warm caches and no saturation to reveal per-request overhead in
          everyday traffic.
        </>
      }
      loadGeneration={
        <>
          k6 sends traffic of <strong>50 VUs</strong> over{" "}
          <strong>60 seconds</strong> to simulate constant and low load.
        </>
      }
      data={{
        hive: {
          version: "v0.0.5",
          website: "https://github.com/graphql-hive/router",
          rps: 1831.09,
          p95: 48.58,
          p99_9: 78.84,
          cpu: 167,
          mem: 48,
          reliability: 100.0,
        },
        cosmo: {
          version: "v0.247.0",
          website: "https://github.com/wundergraph/cosmo",
          rps: 585.79,
          p95: 125.23,
          p99_9: 359.66,
          cpu: 265,
          mem: 119,
          reliability: 100,
        },
        grafbase: {
          version: "v0.48.1",
          website: "https://github.com/grafbase/grafbase",
          rps: 461.19,
          p95: 137.81,
          p99_9: 395.73,
          cpu: 133.0,
          mem: 93,
          reliability: 100,
        },
        apollo: {
          version: "v2.6.0",
          website: "https://github.com/apollographql/router",
          rps: 329.84,
          p95: 196.46,
          p99_9: 472.21,
          cpu: 270,
          mem: 192,
          reliability: 100,
        },
      }}
    />
  );
}

function Intro(props: {
  auditScores: Record<GatewayName, string> | null;
  loadGeneration: React.ReactNode;
  description: React.ReactNode;
  data: Record<
    GatewayName,
    {
      version: string;
      website: string;
      rps: number;
      p95: number;
      p99_9: number;
      cpu: number;
      mem: number;
      reliability: number;
    }
  >;
}) {
  const rows: Array<{
    name: GatewayName;
    version: string;
    website: string;
    rps: number;
    p95: number;
    p99_9: number;
    cpu: number;
    mem: number;
    reliability: number;
    audit: string;
  }> = [];

  for (const [key, data] of Object.entries(props.data)) {
    const name = key as GatewayName;
    rows.push({
      name,
      version: data.version,
      website: data.website,
      rps: data.rps,
      p95: data.p95,
      p99_9: data.p99_9,
      cpu: data.cpu,
      mem: data.mem,
      reliability: data.reliability,
      audit: props.auditScores?.[name] || "-",
    });
  }

  rows.sort((a, b) => b.rps - a.rps);

  return (
    <Card>
      <CardHeader>
        <CardDescription>{props.description}</CardDescription>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[150px]">Gateway</TableHead>
              <TableHeaderCell
                className="text-center"
                href="#rps"
                title="Go to RPS measurments"
              >
                RPS
              </TableHeaderCell>
              <TableHeaderCell
                className="text-center"
                href="#latency"
                title="Go to latency measurments"
              >
                p95
              </TableHeaderCell>
              <TableHeaderCell
                className="text-center"
                href="#latency"
                title="Go to latency measurments"
              >
                p99.9
              </TableHeaderCell>
              <TableHeaderCell
                className="text-center"
                href="#cpu"
                title="Go to CPU measurments"
              >
                CPU (max)
              </TableHeaderCell>
              <TableHeaderCell
                className="text-center"
                href="#mem"
                title="Go to Memory measurments"
              >
                MEM (max)
              </TableHeaderCell>
              <TableHeaderCell
                className="text-center"
                href="#cpu"
                title="Go to Memory measurments"
              >
                RPS per core
              </TableHeaderCell>
              <TableHeaderCell
                className="text-center"
                href="#reliability"
                title="Go to Reliability measurments"
              >
                Reliability
              </TableHeaderCell>
              <TableHead className="text-right">
                <a
                  href="https://the-guild.dev/graphql/hive/federation-gateway-audit"
                  target="_blank"
                  className="underline underline-offset-2 decoration-gray-500 hover:opacity-75"
                  title="Compatibility with Apollo Federation"
                >
                  Compatibility
                </a>
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {rows.map((row) => {
              return (
                <TableRow key={row.name}>
                  <TableCell className="font-medium">
                    <a
                      href={row.website}
                      target="_blank"
                      className="hover:underline"
                    >
                      <GatewayNameLabel name={row.name} />
                    </a>{" "}
                    <br />
                    <span className="text-muted-foreground text-xs">
                      {row.version}
                    </span>
                  </TableCell>
                  <TableCell className="text-center">
                    <ValueWithUnit value={row.rps} unit="reqs/s" />
                  </TableCell>
                  <TableCell className="text-center">
                    <ValueWithUnit value={row.p95} unit="ms" />
                  </TableCell>
                  <TableCell className="text-center">
                    <ValueWithUnit value={row.p99_9} unit="ms" />
                  </TableCell>
                  <TableCell className="text-center">
                    <ValueWithUnit value={row.cpu} unit="%" />
                  </TableCell>
                  <TableCell className="text-center">
                    <ValueWithUnit value={row.mem} unit="MB" />
                  </TableCell>
                  <TableCell className="text-center">
                    <ValueWithUnit
                      value={(row.rps / (row.cpu / 100)).toFixed(2)}
                      unit="reqs/s"
                    />
                  </TableCell>
                  <TableCell className="text-center">
                    <ValueWithUnit value={row.reliability} unit="%" />
                  </TableCell>
                  <TableCell className="text-right">
                    <ValueWithUnit value={row.audit} unit="%" />
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </CardContent>
      <CardFooter className="text-sm py-6 block space-y-2 text-muted-foreground">
        <div className="text-lg font-semibold text-white">Environment</div>
        <p>
          Azure's <strong>Standard D4s v4</strong> VM - <strong>4 vCPUs</strong>
          , <strong>16 GiB memory</strong>,{" "}
          <strong>Linux (Ubuntu 24.04)</strong> - ensuring consistency and
          reproducibility of results.
        </p>
        <p className="font-semibold mt-4">Phase 1 - Warm‑up</p>
        <ul className="list-disc list-inside pl-2">
          <li>
            Generate a preliminary load with <strong>k6</strong> for{" "}
            <strong>15 seconds</strong>.
          </li>
          <li>
            Allows the gateway to begin handling GraphQL requests, perform
            initial setup (e.g., <i>cache warming</i>), and stabilize under a
            moderate load.
          </li>
        </ul>
        <p className="font-semibold mt-4">Phase 2 - Measurement</p>
        <ul className="list-disc list-inside pl-2">
          <li>
            <strong>Load generation:</strong> {props.loadGeneration}
          </li>
          <li>
            <strong>Performance monitoring:</strong> a dedicated monitoring
            script samples key performance metrics every{" "}
            <strong>0.2 seconds</strong>.
          </li>
          <li>
            <strong>CPU limiting / isolation:</strong> the gateway is restricted
            to a designated set of CPU cores (<strong>3 cores</strong>),
            effectively isolating its processing. The load generator (
            <strong>k6</strong>) is restricted to <strong>1 CPU core</strong> to
            minimize interference between components.
          </li>
        </ul>
      </CardFooter>
    </Card>
  );
}
