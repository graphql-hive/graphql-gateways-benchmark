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
    } else {
        eprintln!("Usage: cargo run -p toolkit report <gateway-dir>");
        eprintln!("Usage: cargo run -p toolkit summary");
        eprintln!("Usage: cargo run -p toolkit data");
    }
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
            let csv = read_file(&format!("{}/data.csv", gateway.path().display()));
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
    let mut reports: Vec<(String, Stats)> = Vec::new();
    for gateway in gateways {
        if let Ok(gateway) = gateway {
            if !gateway.metadata().unwrap().is_dir() {
                continue;
            }

            let stats = read_file(&format!("{}/stats.json", gateway.path().display()));
            let stats: Stats = sonic_rs::from_str(&stats).unwrap();
            reports.push((gateway.file_name().to_string_lossy().into_owned(), stats));
        }
    }

    reports.sort_by(|a, b| a.1.rps.partial_cmp(&b.1.rps).unwrap());
    reports.reverse();

    println!(
        "| {:<10} | {:<7} | {:<10} | {:<10} | {:<7} | {:<11} | {:<12} | {} |",
        "Gateway",
        "RPS",
        "P99.9 (ms)",
        "P95 (ms)",
        "Count",
        "CPU (max %)",
        "MEM (max MB)",
        "Success Rate (%)"
    );
    println!(
        "| {} | {} | {} | {} | {} | {} | {} | {} |",
        "----------",
        "-------",
        "----------",
        "----------",
        "-------",
        "-----------",
        "------------",
        "----------------"
    );
    for (name, stats) in reports {
        println!(
            "| {:<10} | {:<7.2} | {:<10.2} | {:<10.2} | {:<7} | {:<11.2} | {:<12} | {:<16.2} |",
            name,
            stats.rps,
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
