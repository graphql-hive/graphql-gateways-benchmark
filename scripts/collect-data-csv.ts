import { globSync, readFileSync, writeFileSync } from "node:fs";
import { join } from "node:path";

const dataCsvs = globSync("gateways/**/data.csv");

let allLines: string[] = [];
let headerLine: string | null = null;
for (const dataCsvPath of dataCsvs) {
    const [, gatewayName] = dataCsvPath.split("/");
    const csvStr = readFileSync(dataCsvPath, "utf-8");
    const csvLines = csvStr.split("\n").filter((line) => line.trim() !== "");
    headerLine = csvLines[0];
    const dataLines = csvLines.slice(1).filter((line) => line.trim() !== "").map(line => `${gatewayName},${line}`);
    allLines.push(...dataLines);
}
if (!headerLine) {
    headerLine = "Seconds,VUs,RPS,P95_ms,Req_success_rate,Total_CPU,Total_RSS_KB";
}

headerLine = `Gateway,${headerLine}`;

const finalCsv = [headerLine, ...allLines].join("\n");
const loadMode = process.env.LOAD_MODE ? process.env.LOAD_MODE : "constant";
const outFile = `${loadMode}-data.csv`;
writeFileSync(join(__dirname, "..", "website", outFile), finalCsv);