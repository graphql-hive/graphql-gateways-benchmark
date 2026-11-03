import { existsSync, readFileSync, readdirSync, writeFileSync } from "fs";
import { join } from "path";
import * as vl from "vega-lite";
import * as v from "vega";

const IGNORED_DIRS = ["node_modules"];
const NEWLINE = "\n";

const {
  CF_IMAGES_LINK,
  CF_IMAGES_TOKEN,
  GITHUB_RUN_ID = "local",
} = process.env;

async function uploadImageToCloudflare(filename: string, filePath: string) {
  if (!CF_IMAGES_LINK) {
    console.warn("CF_IMAGES_LINK is not set, skipping image upload");
    return null;
  }
  if (!existsSync(filePath)) {
    console.warn(`Image file not found, skipping upload: ${filePath}`);
    return null;
  }
  console.log("Uploading image to cloudflare");
  const buffer = readFileSync(filePath);
  const blob = new Blob([buffer], { type: "image/png" });
  const form = new FormData();

  form.append("file", blob, filename);

  const res = await fetch(CF_IMAGES_LINK!, {
    method: "POST",
    body: form,
    headers: {
      Authorization: `Bearer ${CF_IMAGES_TOKEN}`,
    },
  });

  console.log(`Got a response from cloudflare (status=${res.status})`);

  if (!res.ok) {
    console.error(`Failed to upload image to Cloudflare: ${res.statusText}`);
    return null;
  }

  const data = await res.json();
  const url = data.result.variants[0];

  console.log(`Image ${filename} uploaded to Cloudflare: ${url}`);
  return data.result.variants[0];
}

function notEmpty<TValue>(value: TValue | null | undefined): value is TValue {
  return value !== null && value !== undefined;
}

// Written by `cargo run -p toolkit aggregate` (see test.sh).
type RunsReport = {
  measured_runs: number;
  median_run: number;
  median_rps: number;
  best_rps: number;
  worst_rps: number;
  cv_pct: number;
  version: string | null;
  runs: Array<{ run: number; rps: number; p95: number; p99_9: number }>;
};

// Written by `cargo run -p toolkit report`.
type GatewayStats = {
  mem_max: number; // MB
  cpu_max: number; // %
  rps: number;
};

function readOptionalJson<T>(filePath: string): T | null {
  if (!existsSync(filePath)) {
    return null;
  }
  try {
    return JSON.parse(readFileSync(filePath, "utf8")) as T;
  } catch (e) {
    console.warn(`Could not parse ${filePath}: ${e}`);
    return null;
  }
}

function formatMemoryPerRequest(memMaxMb: number, rps: number) {
  if (!rps) {
    return "-";
  }
  return `${((memMaxMb * 1024) / rps).toFixed(1)} KB`;
}

function formatSummary(title: string, content: string) {
  return `<details>
  <summary>${title}</summary>

  ${content}
  </details>`;
}

async function generateReport(artifactsRootPath: string) {
  console.info(`Generating report based on artifacts in ${artifactsRootPath}`);
  const foundDirectories = readdirSync(artifactsRootPath, {
    withFileTypes: true,
  })
    .filter((r) => r.isDirectory() && !IGNORED_DIRS.includes(r.name))
    .filter(
      (r) =>
        r.name.startsWith(process.env.SCENARIO_ARTIFACTS_PREFIX!)
    )
    .map((r) => r.name);

  console.info(
    `Found the following directories to look reports in: ${foundDirectories.join(
      ", "
    )}`
  );

  if (foundDirectories.length === 0) {
    throw new Error("No directories found to generate report from!");
  }

  const reportsData = await Promise.all(
    foundDirectories.map(async (dirName) => {
      const fullPath = join(artifactsRootPath, dirName);
      console.log(`Processing directory: ${fullPath}`);
      const jsonSummaryFilePath = join(fullPath, "./k6_summary.json");

      if (!existsSync(jsonSummaryFilePath)) {
        console.warn(
          `Could not find k6_summary.json in ${fullPath}! Skipping...`
        );

        return null;
      }

      const txtSummaryFilePath = join(fullPath, "./k6_summary.txt");

      let overviewImageUrl: string | null = "";
      let httpImageUrl: string | null = "";
      /* let containersImageUrl: string | null = ""; */

      if (!CF_IMAGES_LINK || !CF_IMAGES_TOKEN) {
        console.warn(
          `Could not find CF_IMAGES_LINK or CF_IMAGES_TOKEN in env! Skipping...`
        );
      } else {
        const overviewImageFilePath = join(fullPath, "./overview.png");
        const httpImageFilePath = join(fullPath, "./http.png");
        /* const containersFilePath = join(fullPath, "./containers.png"); */

        [overviewImageUrl, httpImageUrl, /* containersImageUrl */] =
          await Promise.all([
            uploadImageToCloudflare(
              `${GITHUB_RUN_ID}-overview.png`,
              overviewImageFilePath
            ),
            uploadImageToCloudflare(
              `${GITHUB_RUN_ID}-http.png`,
              httpImageFilePath
            ),
            /* uploadImageToCloudflare(
              `${GITHUB_RUN_ID}-http.png`,
              containersFilePath
            ), */
          ]);
      }

      const jsonSummary = JSON.parse(readFileSync(jsonSummaryFilePath, "utf8"));

      // runs.json (median/best/worst/CV across measured runs, gateway version) and
      // stats.json (peak RSS of the median run) are written by `toolkit aggregate`
      // and `toolkit report`; both are optional so older artifacts still work.
      const runs = readOptionalJson<RunsReport>(join(fullPath, "./runs.json"));
      const stats = readOptionalJson<GatewayStats>(join(fullPath, "./stats.json"));

      return {
        name: dirName.replace(process.env.SCENARIO_ARTIFACTS_PREFIX!, ""),
        path: fullPath,
        jsonSummary,
        txtSummary: readFileSync(txtSummaryFilePath, "utf8"),
        rps: Math.floor(jsonSummary.metrics.http_reqs.values.rate),
        overviewImageUrl,
        httpImageUrl,
        /* containersImageUrl, */
        vus: jsonSummary.vus,
        duration: jsonSummary.duration,
        runs,
        stats,
      };
    })
  );
  const validReportsData = reportsData
    .filter(notEmpty)
    .sort((a, b) => b.rps - a.rps);

  console.log(`Found ${validReportsData.length} valid reports`);

  const vega: vl.TopLevelSpec = {
    width: 600,
    height: 400,
    background: null as any,
    $schema: "https://vega.github.io/schema/vega-lite/v5.json",
    description: "",
    data: {
      values: validReportsData.map((v) => {
        return {
          "gateway-setup": v.name,
          rps: v.rps,
        };
      }),
    },
    mark: "bar",
    encoding: {
      x: {
        field: "gateway-setup",
        type: "nominal",
        sort: "-y",
      },
      y: {
        field: "rps",
        type: "quantitative",
      },
    },
  };

  const vegaSpec = vl.compile(vega).spec;
  const view = new v.View(v.parse(vegaSpec), { renderer: "none" });
  const svg = await view.toSVG();
  writeFileSync("report.svg", svg);

  const reportChartUrl = await uploadImageToCloudflare(
    `${GITHUB_RUN_ID}-report.svg`,
    "report.svg"
  );

  const descriptions = {
    "constant": "This scenario runs 4 subgraphs and a GraphQL gateway with Federation spec, and runs a heavy query. It's being executed with a constant amount of VUs over a fixed amount of time. It measure things like memory usage, CPU usage, average RPS. It also includes a summary of the entire execution, and metrics information about HTTP execution times.",
    "ramping": "This scenario runs 4 subgraphs and a GraphQL gateway with Federation spec, and runs a heavy query. We are running a heavy load of concurrent VUs to measure response time and other stats, during stress. It measure things like memory usage, CPU usage, response times. It also includes a summary of the entire execution, and metrics information about HTTP execution times.",
  }

  const { tablemark } = await import('tablemark');

  const markdownLines: string[] = [
    `## Overview for: \`${process.env.SCENARIO_TITLE}\``,
    NEWLINE,
    process.env.SCENARIO_TITLE?.includes("constant") ? descriptions.constant : descriptions.ramping,
    NEWLINE,
    `This scenario was running ${validReportsData[0].vus} VUs over ${validReportsData[0].duration}`,
    NEWLINE,
    (() => {
      const measuredRuns = Math.max(
        ...validReportsData.map((v) => v.runs?.measured_runs ?? 1)
      );
      return measuredRuns > 1
        ? `**Methodology:** each gateway ran one warmup (discarded) and ${measuredRuns} measured runs. Gateways are ranked by the **median run's RPS**; best, worst and CV% (standard deviation of the per-run RPS, relative to the median) show how stable the runs were. Peak memory is the gateway's maximum RSS during the median run; memory per request divides it by the median RPS.`
        : `Each gateway ran one warmup (discarded) and a single measured run. Peak memory is the gateway's maximum RSS during the run; memory per request divides it by the RPS.`;
    })(),
    NEWLINE,
    "### Comparison",
    NEWLINE,
    reportChartUrl
      ? `<img src="${reportChartUrl}" alt="Comparison" />`
      : "**no-chart-available**",
    NEWLINE,
    tablemark(
      validReportsData.map((v) => {
        const notes: string[] = [];

        if (v.jsonSummary.metrics.http_req_failed.values.passes > 0) {
          notes.push(
            `${v.jsonSummary.metrics.http_req_failed.values.passes} failed requests`
          );
        }

        const checks: Array<{
          fails: number;
          name: string;
        }> = v.jsonSummary.root_group.checks;
        const http200Check = checks.find(
          (c) => c.name === "response code was 200"
        );
        const graphqlErrors = checks.find(
          (c) => c.name === "no graphql errors"
        );
        const responseStructure = checks.find(
          (c) => c.name === "valid response structure"
        );


        if (http200Check!.fails > 0) {
          notes.push(`${http200Check!.fails} non-200 responses`);
        }

        if (graphqlErrors!.fails > 0) {
          notes.push(`${graphqlErrors!.fails} unexpected GraphQL errors`);
        }

        if (responseStructure!.fails > 0) {
          notes.push(
            `non-compatible response structure (${responseStructure!.fails})`
          );
        }

        const multiRun = (v.runs?.measured_runs ?? 1) > 1;

        return {
          gw: v.name,
          version: v.runs?.version ?? "-",
          rps: Math.round(v.rps),
          best: multiRun ? Math.round(v.runs!.best_rps) : "-",
          worst: multiRun ? Math.round(v.runs!.worst_rps) : "-",
          cv: multiRun ? `${v.runs!.cv_pct.toFixed(1)}%` : "-",
          requests: `${v.jsonSummary.metrics.http_reqs.values.count} total, ${v.jsonSummary.metrics.http_req_failed.values.passes} failed`,
          duration: `avg: ${Math.round(
            v.jsonSummary.metrics.http_req_duration.values.avg
          )}ms, p95: ${Math.round(
            v.jsonSummary.metrics.http_req_duration.values["p(95)"]
          )}ms`,
          mem: v.stats ? `${v.stats.mem_max} MB` : "-",
          memPerReq: v.stats ? formatMemoryPerRequest(v.stats.mem_max, v.rps) : "-",
          notes: notes.length === 0 ? "✅" : "❌ " + notes.join(", "),
        };
      }),
      {
        columns: [
          { name: "Gateway" },
          { name: "Version" },
          { name: "RPS ⬇️", align: "center" },
          { name: "Best RPS", align: "center" },
          { name: "Worst RPS", align: "center" },
          { name: "CV%", align: "center" },
          { name: "Requests", align: "center" },
          { name: "Duration", align: "center" },
          { name: "Peak Memory", align: "center" },
          { name: "Memory / Request", align: "center" },
          { name: "Notes", align: "left" },
        ],
      }
    ),
    NEWLINE,
    validReportsData
      .map((info) =>
        formatSummary(
          `Summary for: ${info.name}`,
          [
            ...(info.runs && info.runs.measured_runs > 1
              ? [
                  `**Measured runs** (median run: ${info.runs.median_run})`,
                  NEWLINE,
                  tablemark(
                    info.runs.runs.map((r) => ({
                      run: r.run,
                      rps: Math.round(r.rps),
                      p95: `${Math.round(r.p95)}ms`,
                      p999: `${Math.round(r.p99_9)}ms`,
                    })),
                    {
                      columns: [
                        { name: "Run" },
                        { name: "RPS", align: "center" },
                        { name: "p95", align: "center" },
                        { name: "p99.9", align: "center" },
                      ],
                    }
                  ),
                  NEWLINE,
                ]
              : []),
            "**K6 Output** (median run)",
            NEWLINE,
            NEWLINE,
            "```",
            info.txtSummary,
            "```",
            NEWLINE,
            "**Performance Overview**",
            NEWLINE,
            info.overviewImageUrl
              ? `<img src="${info.overviewImageUrl}" alt="Performance Overview" />`
              : "**no-image-available**",
            NEWLINE,
/*             "**Subgraphs Overview**",
            NEWLINE,
            info.containersImageUrl
              ? `<img src="${info.containersImageUrl}" alt="Subgraphs Overview" />`
              : "**no-image-available**", */
            NEWLINE,
            "**HTTP Overview**",
            NEWLINE,
            info.httpImageUrl
              ? `<img src="${info.httpImageUrl}" alt="HTTP Overview" />`
              : "**no-image-available**",
            NEWLINE,
          ].join("\n")
        )
      )
      .join("\n\n"),
  ];

  const markdown = markdownLines.join("\n");
  writeFileSync("result.md", markdown);
  writeFileSync("report.vega.json", JSON.stringify(vega, null, 2));
}

const artifactsRootPath = process.argv[2] || __dirname;

generateReport(artifactsRootPath).catch(e => {
  console.error(e);
  process.exit(1);
});

import { globSync } from "node:fs";

if (!process.env.SCENARIO_ARTIFACTS_PREFIX?.includes("delay")) {
  const dataCsvs = globSync(join(artifactsRootPath, "*/data.csv"));

  let allLines: string[] = [];
  let headerLine: string | null = null;
  for (const dataCsvPath of dataCsvs) {
    if (dataCsvPath.includes("/" + process.env.SCENARIO_ARTIFACTS_PREFIX!)) {
      const dirName = dataCsvPath.split("/").slice(-2, -1)[0];
      console.log(`Found CSV at path: ${dataCsvPath} on dir ${dirName}`);
      const gatewayName = dirName.replaceAll(process.env.SCENARIO_ARTIFACTS_PREFIX!, "");
      console.log(`Processing CSV for gateway ${gatewayName} at path ${dataCsvPath}`);
      const csvStr = readFileSync(dataCsvPath, "utf-8");
      const csvLines = csvStr.split("\n").filter((line) => line.trim() !== "");
      headerLine = csvLines[0];
      const dataLines = csvLines.slice(1).filter((line) => line.trim() !== "").map(line => `${gatewayName},${line}`);
      allLines.push(...dataLines);
    }
  }
  if (!headerLine) {
    headerLine = "Seconds,VUs,RPS,P95_ms,Req_success_rate,Total_CPU,Total_RSS_KB";
  }

  headerLine = `Gateway,${headerLine}`;

  const finalCsv = [headerLine, ...allLines].join("\n");
  const loadMode = process.env.SCENARIO_ARTIFACTS_PREFIX?.includes("constant") ? "constant" : "stress";
  const outFile = `${loadMode}-data.csv`;
  writeFileSync(join(__dirname, "..", "website", outFile), finalCsv);
}
