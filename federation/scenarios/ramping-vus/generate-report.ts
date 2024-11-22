import { existsSync, readFileSync, readdirSync, writeFileSync } from "fs";
import { join } from "path";
import pkgJson from "./package.json";
import tablemark from "tablemark";
import * as vl from "vega-lite";
import * as v from "vega";

const IGNORED_DIRS = ["node_modules", "services"];
const NEWLINE = "\n";

const {
  CF_IMAGES_LINK,
  CF_IMAGES_TOKEN,
  GITHUB_RUN_ID = "local",
} = process.env;

async function uploadImageToCloudflare(filename: string, filePath: string) {
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
    throw new Error(`Failed to upload image to Cloudflare: ${res.statusText}`);
  }

  const data = await res.json();
  return data.result.variants[0];
}

function notEmpty<TValue>(value: TValue | null | undefined): value is TValue {
  return value !== null && value !== undefined;
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
    .filter((r) => r.name.startsWith(process.env.SCENARIO_ARTIFACTS_PREFIX!))
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
      const jsonSummaryFilePath = join(fullPath, "./k6_summary.json");

      if (!existsSync(jsonSummaryFilePath)) {
        console.warn(
          `Could not find k6_summary.json in ${fullPath}! Skipping...`
        );

        return null;
      }

      const txtSummaryFilePath = join(fullPath, "./k6_summary.txt");

      let overviewImageUrl = "";
      let httpImageUrl = "";
      let containersImageUrl = "";

      if (!CF_IMAGES_LINK || !CF_IMAGES_TOKEN) {
        console.warn(
          `Could not find CF_IMAGES_LINK or CF_IMAGES_TOKEN in env! Skipping...`
        );
      } else {
        const overviewImageFilePath = join(fullPath, "./overview.png");
        const httpImageFilePath = join(fullPath, "./http.png");
        const containersFilePath = join(fullPath, "./containers.png");
        [overviewImageUrl, httpImageUrl, containersImageUrl] =
          await Promise.all([
            uploadImageToCloudflare(
              `${GITHUB_RUN_ID}-overview.png`,
              overviewImageFilePath
            ),
            uploadImageToCloudflare(
              `${GITHUB_RUN_ID}-http.png`,
              httpImageFilePath
            ),
            uploadImageToCloudflare(
              `${GITHUB_RUN_ID}-http.png`,
              containersFilePath
            ),
          ]);
      }

      const jsonSummary = JSON.parse(readFileSync(jsonSummaryFilePath, "utf8"));

      return {
        name: dirName.replace(process.env.SCENARIO_ARTIFACTS_PREFIX!, ""),
        path: fullPath,
        jsonSummary,
        txtSummary: readFileSync(txtSummaryFilePath, "utf8"),
        rps: Math.floor(jsonSummary.metrics.http_reqs.values.rate),
        p95_duration: Math.floor(
          jsonSummary.metrics.http_req_duration.values["p(95)"]
        ),
        overviewImageUrl,
        httpImageUrl,
        containersImageUrl,
        vus: jsonSummary.vus,
        time: jsonSummary.time,
      };
    })
  );

  const validReportsData = reportsData
    .filter(notEmpty)
    .sort((a, b) => a.p95_duration - b.p95_duration);

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
          "duration (p95)": v.p95_duration,
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
        field: "duration (p95)",
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

  const markdownLines: string[] = [
    "## Overview for: `federation/ramping-vus`",
    NEWLINE,
    pkgJson.description,
    NEWLINE,
    `This scenario was trying to reach ${validReportsData[0].vus} concurrent VUs over ${validReportsData[0].time}`,
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

        const checks = v.jsonSummary.root_group.checks;
        const http200Check = checks.find(
          (c) => c.name === "response code was 200"
        );
        const graphqlErrors = checks.find(
          (c) => c.name === "no graphql errors"
        );
        const responseStructure = checks.find(
          (c) => c.name === "valid response structure"
        );

        if (http200Check.fails > 0) {
          notes.push(`${http200Check.fails} non-200 responses`);
        }

        if (graphqlErrors.fails > 0) {
          notes.push(`${graphqlErrors.fails} unexpected GraphQL errors`);
        }

        if (responseStructure.fails > 0) {
          notes.push(
            `non-compatible response structure (${responseStructure.fails})`
          );
        }

        return {
          gw: v.name,
          p95_duration: `${v.p95_duration}ms`,
          rps: Math.round(v.rps),
          requests: `${v.jsonSummary.metrics.http_reqs.values.count} total, ${v.jsonSummary.metrics.http_req_failed.values.passes} failed`,
          duration: `avg: ${Math.round(
            v.jsonSummary.metrics.http_req_duration.values.avg
          )}ms, p95: ${Math.round(
            v.jsonSummary.metrics.http_req_duration.values["p(95)"]
          )}ms, max: ${Math.round(
            v.jsonSummary.metrics.http_req_duration.values.max
          )}ms, med: ${Math.round(
            v.jsonSummary.metrics.http_req_duration.values.med
          )}ms`,
          notes: notes.length === 0 ? "✅" : "❌ " + notes.join(", "),
        };
      }),
      {
        columns: [
          { name: "Gateway" },
          { name: "duration(p95)⬇️", align: "center" },
          { name: "RPS", align: "center" },
          { name: "Requests", align: "center" },
          { name: "Durations", align: "center" },
          { name: "Notes", align: "left" },
        ],
      }
    ),
    NEWLINE,
    validReportsData
      .map((info) =>
        formatSummary(
          `Summary for: \`${info.name}\``,
          [
            "**K6 Output**",
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
            "**Subgraphs Overview**",
            NEWLINE,
            info.containersImageUrl
              ? `<img src="${info.containersImageUrl}" alt="Subgraphs Overview" />`
              : "**no-image-available**",
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

generateReport(artifactsRootPath).catch(console.error);
