use std::env;

use serde::{Deserialize, Serialize};
use sonic_rs::{JsonContainerTrait, JsonValueTrait};

#[derive(Serialize, Deserialize)]
struct Stats {
    mem_max: i64,
    cpu_max: f64,
    p99_9: f64,
    p95: f64,
    p90: f64,
    min: f64,
    max: f64,
    avg: f64,
    med: f64,
    count: i64,
    rps: f64,
    success_rate: f64,
}

fn main() {
    let args: Vec<String> = env::args().collect();

    if &args[1] == "report" {
        report(&args[2]);
    } else if &args[1] == "summary" {
        summary();
    } else if &args[1] == "data" {
        data();
    } else if &args[1] == "aggregate" {
        aggregate(&args[2]);
    } else {
        eprintln!("Usage: cargo run -p toolkit report <run-dir>");
        eprintln!("Usage: cargo run -p toolkit aggregate <gateway-dir>");
        eprintln!("Usage: cargo run -p toolkit summary");
        eprintln!("Usage: cargo run -p toolkit data");
    }
}

/// Per-run numbers that end up in runs.json.
#[derive(Serialize, Deserialize, Clone)]
struct RunSummary {
    run: u32,
    rps: f64,
    p95: f64,
    p99_9: f64,
    cpu_max: f64,
    mem_max: i64,
    success_rate: f64,
}

/// Aggregate over all measured runs of one gateway (runs.json).
#[derive(Serialize, Deserialize)]
struct RunsReport {
    measured_runs: usize,
    median_run: u32,
    median_rps: f64,
    best_rps: f64,
    worst_rps: f64,
    /// Sample standard deviation of the per-run RPS, as a percentage of the median RPS.
    cv_pct: f64,
    /// Content of version.txt (written by install.sh), if present.
    version: Option<String>,
    runs: Vec<RunSummary>,
}

/// Reads runs/<n>/stats.json, picks the median run by RPS, copies its files to the
/// gateway directory (so every consumer of data.csv/k6_summary.*/stats.json keeps
/// working) and writes runs.json with the spread across runs.
fn aggregate(gateway_dir: &str) {
    let runs_dir = format!("{}/runs", gateway_dir);
    let mut runs: Vec<RunSummary> = Vec::new();
    for entry in std::fs::read_dir(&runs_dir).unwrap_or_else(|_| panic!("Unable to read {}", runs_dir)) {
        let entry = entry.unwrap();
        let run: u32 = match entry.file_name().to_string_lossy().parse() {
            Ok(run) => run,
            Err(_) => continue,
        };
        let stats_path = format!("{}/stats.json", entry.path().display());
        if !std::path::Path::new(&stats_path).exists() {
            eprintln!("WARN: run {} has no stats.json, skipping it", run);
            continue;
        }
        let stats: Stats = sonic_rs::from_str(&read_file(&stats_path)).unwrap();
        runs.push(RunSummary {
            run,
            rps: stats.rps,
            p95: stats.p95,
            p99_9: stats.p99_9,
            cpu_max: stats.cpu_max,
            mem_max: stats.mem_max,
            success_rate: stats.success_rate,
        });
    }
    if runs.is_empty() {
        panic!("No measured runs found in {}", runs_dir);
    }
    runs.sort_by_key(|r| r.run);

    // Median by RPS; for an even number of runs take the upper one so a real run is reported.
    let mut by_rps = runs.clone();
    by_rps.sort_by(|a, b| a.rps.partial_cmp(&b.rps).unwrap());
    let median = by_rps[by_rps.len() / 2].clone();
    let best_rps = by_rps.last().unwrap().rps;
    let worst_rps = by_rps.first().unwrap().rps;
    let cv_pct = if runs.len() > 1 && median.rps > 0.0 {
        let n = runs.len() as f64;
        let mean = runs.iter().map(|r| r.rps).sum::<f64>() / n;
        let var = runs.iter().map(|r| (r.rps - mean).powi(2)).sum::<f64>() / (n - 1.0);
        (var.sqrt() / median.rps * 100.0 * 10.0).round() / 10.0
    } else {
        0.0
    };

    let version = std::fs::read_to_string(format!("{}/version.txt", gateway_dir))
        .ok()
        .map(|v| v.trim().to_string())
        .filter(|v| !v.is_empty());

    for file in [
        "data.csv",
        "k6_summary.json",
        "k6_summary.txt",
        "stats.json",
        "error_responses.jsonl",
    ] {
        let from = format!("{}/{}/{}", runs_dir, median.run, file);
        let to = format!("{}/{}", gateway_dir, file);
        if std::path::Path::new(&from).exists() {
            std::fs::copy(&from, &to).unwrap_or_else(|_| panic!("Unable to copy {} to {}", from, to));
        }
    }

    let report = RunsReport {
        measured_runs: runs.len(),
        median_run: median.run,
        median_rps: median.rps,
        best_rps,
        worst_rps,
        cv_pct,
        version: version.clone(),
        runs: runs.clone(),
    };
    std::fs::write(
        format!("{}/runs.json", gateway_dir),
        sonic_rs::to_string_pretty(&report).unwrap(),
    )
    .expect("Unable to write runs.json");

    println!("| Run | RPS     | P95 (ms) | P99.9 (ms) | CPU (max %) | MEM (max MB) | Success Rate (%) |");
    println!("| --- | ------- | -------- | ---------- | ----------- | ------------ | ---------------- |");
    for r in &runs {
        println!(
            "| {:<3} | {:<7.2} | {:<8.2} | {:<10.2} | {:<11.2} | {:<12} | {:<16.2} |",
            r.run, r.rps, r.p95, r.p99_9, r.cpu_max, r.mem_max, r.success_rate * 100.0
        );
    }
    println!(
        "Median run: {} ({:.2} req/s); best {:.2}, worst {:.2}, CV {:.1}%{}",
        median.run,
        median.rps,
        best_rps,
        worst_rps,
        cv_pct,
        version.map(|v| format!("; version {}", v)).unwrap_or_default()
    );
}

fn data() {
    // collect gateways/*/data.csv
    let gateways = std::fs::read_dir("gateways").unwrap();

    let mut buffer = String::new();
    let mut wrote_header = false;

    for gateway in gateways {
        if let Ok(gateway) = gateway {
            if !gateway.metadata().unwrap().is_dir() {
                continue;
            }

            let gateway_name = gateway.file_name().into_string().unwrap();
            let csv = std::fs::read_to_string(&format!("{}/data.csv", gateway.path().display()));
            if csv.is_err() {
                continue;
            }
            let csv: String = csv.unwrap();
            let lines = csv.lines();
            for (index, line) in lines.enumerate() {
                if index == 0 {
                    if !wrote_header {
                        buffer.push_str("Gateway,");
                        buffer.push_str(line);
                        buffer.push_str("\n");
                        wrote_header = true;
                    }
                } else {
                    buffer.push_str(&gateway_name);
                    buffer.push_str(",");
                    buffer.push_str(line);
                    buffer.push_str("\n");
                }
            }
        }
    }

    std::fs::write("data.csv", buffer).unwrap();
}

fn summary() {
    // collect gateways/*/stats.json
    let gateways = std::fs::read_dir("gateways").unwrap();
    let mut reports: Vec<(String, Stats, Option<RunsReport>)> = Vec::new();
    for gateway in gateways {
        if let Ok(gateway) = gateway {
            if !gateway.metadata().unwrap().is_dir() {
                continue;
            }

            let stats_path = format!("{}/stats.json", gateway.path().display());
            if !std::path::Path::new(&stats_path).exists() {
                continue;
            }
            let stats: Stats = sonic_rs::from_str(&read_file(&stats_path)).unwrap();
            let runs: Option<RunsReport> =
                std::fs::read_to_string(format!("{}/runs.json", gateway.path().display()))
                    .ok()
                    .and_then(|raw| sonic_rs::from_str(&raw).ok());
            reports.push((gateway.file_name().to_string_lossy().into_owned(), stats, runs));
        }
    }

    reports.sort_by(|a, b| a.1.rps.partial_cmp(&b.1.rps).unwrap());
    reports.reverse();

    println!(
        "| {:<10} | {:<16} | {:<7} | {:<4} | {:<6} | {:<10} | {:<10} | {:<7} | {:<11} | {:<12} | {} |",
        "Gateway",
        "Version",
        "RPS",
        "Runs",
        "CV (%)",
        "P99.9 (ms)",
        "P95 (ms)",
        "Count",
        "CPU (max %)",
        "MEM (max MB)",
        "Success Rate (%)"
    );
    println!(
        "| {} | {} | {} | {} | {} | {} | {} | {} | {} | {} | {} |",
        "----------",
        "----------------",
        "-------",
        "----",
        "------",
        "----------",
        "----------",
        "-------",
        "-----------",
        "------------",
        "----------------"
    );
    for (name, stats, runs) in reports {
        let version = runs
            .as_ref()
            .and_then(|r| r.version.clone())
            .unwrap_or_else(|| "-".to_string());
        let (measured_runs, cv) = runs
            .as_ref()
            .map(|r| (r.measured_runs, format!("{:.1}", r.cv_pct)))
            .unwrap_or((1, "-".to_string()));
        println!(
            "| {:<10} | {:<16} | {:<7.2} | {:<4} | {:<6} | {:<10.2} | {:<10.2} | {:<7} | {:<11.2} | {:<12} | {:<16.2} |",
            name,
            version,
            stats.rps,
            measured_runs,
            cv,
            stats.p99_9,
            stats.p95,
            stats.count,
            stats.cpu_max,
            stats.mem_max,
            stats.success_rate * 100.0
        );
    }
}

fn report(pwd: &str) {
    let mem_cpu_raw = read_file(&format!("{}/data.csv", pwd));
    let lines = mem_cpu_raw.split('\n').collect::<Vec<&str>>();

    let mut max_mem: i64 = 0;
    let mut max_cpu: f64 = 0.0;

    for line in lines {
        let line = line.trim();

        if line.len() == 0 {
            continue;
        }

        if line.contains("Seconds") {
            continue;
        }

        let cols: Vec<&str> = line.split(',').collect();
        if cols.len() >= 3 {
            let cpu = cols[cols.len() - 2].parse::<f64>().unwrap_or(0.0);
            let mem = cols[cols.len() - 1].parse::<i64>().unwrap_or(0);
            max_cpu = max_cpu.max(cpu);
            max_mem = max_mem.max(mem);
        }
    }

    max_mem = max_mem / 1000;

    let k6_stats_raw = read_file(&format!("{}/k6_summary.json", pwd));
    let k6_stats: sonic_rs::Value =
        sonic_rs::from_str(&k6_stats_raw).expect("Unable to parse k6_summary.json");

    let k6_stats = k6_stats.as_object().unwrap();
    let metrics = k6_stats.get(&"metrics").unwrap().as_object().unwrap();
    let http_req_duration = metrics
        .get(&"http_req_duration")
        .unwrap()
        .as_object()
        .unwrap()
        .get(&"values")
        .unwrap()
        .as_object()
        .unwrap();

    let http_reqs = metrics
        .get(&"http_reqs")
        .unwrap()
        .as_object()
        .unwrap()
        .get(&"values")
        .unwrap()
        .as_object()
        .unwrap();

    let success_rate = metrics
        .get(&"success_rate")
        .unwrap()
        .as_object()
        .unwrap()
        .get(&"values")
        .unwrap()
        .as_object()
        .unwrap();

    let stats = Stats {
        mem_max: max_mem,
        cpu_max: max_cpu,
        med: http_req_duration.get(&"med").unwrap().as_f64().unwrap(),
        max: http_req_duration.get(&"max").unwrap().as_f64().unwrap(),
        p90: http_req_duration.get(&"p(90)").unwrap().as_f64().unwrap(),
        p95: http_req_duration.get(&"p(95)").unwrap().as_f64().unwrap(),
        p99_9: http_req_duration.get(&"p(99.9)").unwrap().as_f64().unwrap(),
        avg: http_req_duration.get(&"avg").unwrap().as_f64().unwrap(),
        min: http_req_duration.get(&"min").unwrap().as_f64().unwrap(),
        count: http_reqs.get(&"count").unwrap().as_i64().unwrap(),
        rps: http_reqs.get(&"rate").unwrap().as_f64().unwrap(),
        success_rate: success_rate.get(&"rate").unwrap().as_f64().unwrap(),
    };

    std::fs::write(
        format!("{}/stats.json", pwd),
        sonic_rs::to_string_pretty(&stats).unwrap(),
    )
    .expect("Unable to write stats.json")
}

fn read_file(filepath: &str) -> String {
    std::fs::read_to_string(filepath).unwrap_or_else(|_| panic!("Unable to read {}", filepath))
}
