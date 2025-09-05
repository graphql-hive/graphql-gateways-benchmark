import { useState, useEffect, useRef, useCallback } from "react";
import { CPUChart } from "./components/cpu-chart";
import { LatencyChart } from "./components/latency-chart";
import { MemChart } from "./components/mem-chart";
import {
  ArrowUpRightIcon,
  BrainIcon,
  CpuIcon,
  GaugeIcon,
  HeartPulseIcon,
  TimerIcon,
} from "lucide-react";
import { RPSChart } from "./components/rps-chart";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { SuccessChart } from "./components/success-chart";
import { type GatewayName, type TestName } from "@/lib/data";
import {
  GithubRepoLogo,
  HiveLogoBgParts,
  TheGuildLogo,
} from "./components/logos";
import { ConstantTestIntro, StressTestIntro } from "./components/intro";
import { GatewayNameLabel } from "./components/common";
import { cn } from "./lib/utils";

async function fetchAuditScores() {
  const response = await fetch(
    "https://the-guild.dev/graphql/hive/federation-gateway-audit/data.json",
  );
  const data: Array<{
    name: string;
    cases: { total: number; passed: number };
  }> = await response.json();

  const results: Record<GatewayName, string> = {
    "apollo-router": "0.00",
    cosmo: "0.00",
    grafbase: "0.00",
    "hive-router": "100.00",
  };

  for (const item of data) {
    const score = (item.cases.passed / item.cases.total) * 100;

    if (item.name === "Apollo Router") {
      results["apollo-router"] = score.toFixed(2);
    } else if (item.name === "Cosmo Router") {
      results.cosmo = score.toFixed(2);
    } else if (item.name === "Grafbase Gateway") {
      results.grafbase = score.toFixed(2);
    } else if (item.name === "Hive Router") {
      results["hive-router"] = score.toFixed(2);
    }
  }

  return results;
}

function MetricChart(props: {
  title: string;
  anchor: string;
  description: React.ReactNode;
  icon: React.ReactNode;
  children: React.ReactNode;
  analysis: React.ReactNode;
}) {
  return (
    <Card className="py-4 sm:py-0 w-full gap-0">
      <CardHeader className="flex flex-col items-stretch border-b !p-0 sm:flex-row">
        <div className="flex flex-1 flex-col justify-center gap-1 px-6 sm:pb-0">
          <CardTitle className="pt-6 flex items-center gap-2">
            {props.icon}{" "}
            <a className="scroll-mt-6" id={props.anchor}>
              {props.title}
            </a>
          </CardTitle>
          <CardDescription className="pb-6 pt-2">
            {props.description}
          </CardDescription>
        </div>
      </CardHeader>
      <CardContent className="px-0 sm:py-6">
        <div className="grid grid-cols-4 gap-4">{props.children}</div>
      </CardContent>
      <CardFooter className="text-sm py-6 block space-y-2 text-muted-foreground">
        {props.analysis}
      </CardFooter>
    </Card>
  );
}

function TestChoice(props: {
  title: string;
  value: string;
  isActive: boolean;
  description: React.ReactNode;
  onClick: () => void;
}) {
  return (
    <a
      href={"#/" + props.value}
      onClick={(e) => {
        e.preventDefault();
        props.onClick();
      }}
      data-state={props.isActive ? "active" : "inactive"}
      className={cn(
        "text-sm leading-none font-medium flex items-start gap-3 rounded-lg border p-6 cursor-pointer",
        props.isActive ? "border-ring bg-input/20" : "",
      )}
    >
      <div className="grid gap-1 font-normal">
        <div className="font-medium">{props.title}</div>
        <div className="text-muted-foreground text-xs leading-snug text-balance">
          {props.description}
        </div>
      </div>
    </a>
  );
}

export default function App() {
  const [auditScores, setAuditScores] = useState<Record<
    GatewayName,
    string
  > | null>(null);
  const [isSticky, setSticky] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);

  const [test, setTest] = useState<TestName>(() => {
    const hash = window.location.hash;
    if (hash === "#/stress") {
      return "stress";
    }

    if (hash === "#/constant") {
      return "constant";
    }

    return "stress";
  });

  const handleTestChange = useCallback(
    (value: TestName) => {
      setTest(value);
      window.location.hash = `#/${value}`;
    },
    [setTest],
  );

  useEffect(() => {
    const onHashChange = () => {
      const hash = window.location.hash;
      setTest(hash === "#/constant" ? "constant" : "stress");
    };

    window.addEventListener("hashchange", onHashChange);
    return () => window.removeEventListener("hashchange", onHashChange);
  }, []);

  useEffect(() => {
    fetchAuditScores().then(setAuditScores);
  }, []);

  useEffect(() => {
    if (!sectionRef.current) {
      return;
    }
    const offsetTop = sectionRef.current.offsetTop;

    const handleScroll = () => {
      if (window.scrollY > offsetTop) {
        setSticky(true);
      } else {
        setSticky(false);
      }
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <div className="flex flex-1 flex-col">
      <section className="bg-card text-muted-foreground relative">
        <HiveLogoBgParts />
        <div className="container-wrapper">
          <div className="container pt-6 flex justify-between items-center text-white">
            <TheGuildLogo />
            <GithubRepoLogo />
          </div>
        </div>
        <div className="container-wrapper">
          <div className="container text-center flex flex-col gap-2 py-8 md:py-16 lg:py-20 xl:gap-4">
            <h1 className="text-foreground mx-auto leading-tighter max-w-2xl text-4xl font-semibold tracking-tight text-balance lg:leading-[1.1] lg:font-semibold xl:text-5xl xl:tracking-tighter">
              GraphQL Federation Gateways
              <br />
              Performance Benchmarks
            </h1>
            <p className="max-w-3xl mx-auto text-base text-balance sm:text-lg">
              We pushed the leading GraphQL Federation Gateways to their
              breaking points in a fair, transparent, and reproducible
              benchmark.
            </p>
            <p className="max-w-3xl mx-auto text-base text-balance sm:text-lg">
              Our analysis goes beyond simple throughput to measure true
              reliability and resource efficiency under intense, real-world
              load.
            </p>
            <p className="max-w-3xl mx-auto text-base text-balance sm:text-lg">
              Use our open-source data to make a confident architectural choice.
            </p>
            <div className="flex mx-auto pt-2">
              <a
                href="https://the-guild.dev/graphql/hive/federation-gateway-audit"
                data-slot="button"
                target="_blank"
                aria-label="Open the Apollo Federation compatibility audit"
                className="inline-flex items-center justify-center whitespace-nowrap text-sm font-medium transition-all outline-none bg-primary/75 text-primary-foreground shadow-xs hover:bg-primary/50 h-8 rounded-md gap-1.5 px-3"
              >
                <ArrowUpRightIcon className="size-4" /> View Apollo Federation
                Compatibility Audit
              </a>
            </div>
          </div>
        </div>
      </section>
      <section className="flex-1 pb-12">
        <div className="pb-6">
          <div className="w-full h-0.5 bg-primary/10" />
        </div>
      </section>
      <div className="theme-mono theme-container">
        <section
          ref={sectionRef}
          className={cn(
            "container-wrapper section-soft flex-1 pb-12 transition-all",
            isSticky
              ? "md:sticky top-0 z-10 bg-background pt-4 pb-4 border-b-2 border-b-primary/50"
              : "",
          )}
        >
          <div className="container pb-6">
            <div className="pb-4">Choose a test scenario</div>
            <div className="grid gap-3 md:grid-cols-2">
              <TestChoice
                value="stress"
                title="Stress Test"
                isActive={test === "stress"}
                onClick={() => handleTestChange("stress")}
                description={
                  <>
                    Simulates high traffic and measures performance under load.
                    <br />
                    Useful for identifying bottlenecks and scalability issues.
                  </>
                }
              />
              <TestChoice
                value="constant"
                title="Low and Constant Traffic"
                isActive={test === "constant"}
                onClick={() => handleTestChange("constant")}
                description={
                  <>
                    Simulates constant traffic with low load. <br />
                    Helpful to measure baseline efficiency - not the breaking
                    point.
                  </>
                }
              />
            </div>
          </div>
        </section>
        <section className="container-wrapper section-soft flex-1 pb-12">
          <div className="container pb-6">
            {test === "stress" ? (
              <StressTestIntro auditScores={auditScores} />
            ) : (
              <ConstantTestIntro auditScores={auditScores} />
            )}
          </div>
        </section>
        <section className="container-wrapper section-soft flex-1">
          <div className="container pb-6 space-y-8">
            <MetricChart
              anchor="rps"
              icon={<GaugeIcon className="size-6" />}
              title="Throughput (RPS) Over Time"
              description={
                <>
                  Requests Per Second (RPS) is the raw measure of a gateway's
                  processing power.
                  <br />
                  It answers the fundamental question: "How much traffic can
                  this gateway handle?"
                  <br />A higher RPS on the same hardware translates directly to
                  a lower cost per request.
                </>
              }
              analysis={
                test === "stress" ? (
                  <>
                    <p>
                      This chart shows the throughput each gateway achieved as
                      virtual users increased, with the line flattening at the
                      gateway's maximum capacity.
                    </p>
                    <p>
                      <GatewayNameLabel name="hive-router" /> reaches a
                      maximum throughput of <strong>~1970–1980 RPS</strong>,
                      demonstrating the highest capacity under stress.
                    </p>
                    <p>
                      <GatewayNameLabel name="grafbase" /> follows around
                      <strong> ~1550 RPS</strong>, and
                      {" "}<GatewayNameLabel name="cosmo" /> peaks around
                      <strong> ~680–690 RPS</strong>.
                    </p>
                    <p>
                      It's important to correlate this flattening of the curve
                      with the other metrics, as for some gateways, this
                      saturation point is also where they begin to sacrifice
                      reliability.
                    </p>

                    <p>
                      <GatewayNameLabel name="apollo-router" /> saturates at a
                      much lower rate (~360–370 RPS) under the same
                      conditions.
                    </p>
                  </>
                ) : (
                  <>
                    <p>
                      This chart shows the throughput each gateway sustained
                      under a constant, low load of 50 virtual users.
                    </p>
                    <p>
                      <GatewayNameLabel name="hive-router" /> sustains a steady
                      throughput of <strong>~1840–1850 RPS</strong>, indicating very
                      low per-request overhead at everyday traffic levels.
                    </p>
                    <p>
                      <GatewayNameLabel name="grafbase" /> sits around
                      {" "}<strong>~1500–1600 RPS</strong>, while
                      {" "}<GatewayNameLabel name="cosmo" /> holds around
                      {" "}<strong>~680–690 RPS</strong>.
                    </p>
                    <p>
                      At this traffic level, the goal is stability rather than
                      capacity. Correlate the flatness of the lines with p95
                      latency, CPU, memory, and reliability to confirm there's
                      no hidden jitter or overhead.
                    </p>
                    <p>
                      <GatewayNameLabel name="apollo-router" /> settles near
                      <strong> ~360–365 RPS</strong>, implying a higher baseline
                      cost per request on the same hardware.
                    </p>
                  </>
                )
              }
            >
              <RPSChart test={test} gateway="apollo-router" showLeftYAxis />
              <RPSChart test={test} gateway="cosmo" />
              <RPSChart test={test} gateway="grafbase" />
              <RPSChart test={test} gateway="hive-router" showRightYAxis />
            </MetricChart>

            <MetricChart
              anchor="latency"
              icon={<TimerIcon className="size-6" />}
              title="Latency (p95) Over Time"
              description={
                <>
                  95th percentile latency shows the "worst-case" response time
                  for 95% of your users.
                  <br />
                  It is a critical indicator of user experience and system
                  consistency.
                  <br />A low, flat line is ideal, as it signifies a responsive
                  system even as load increases.
                </>
              }
              analysis={
                test === "stress" ? (
                  <>
                    <p>
                      The latency chart clearly shows how each gateway's
                      responsiveness changes as the number of virtual users (the
                      gray dashed line) ramps up.
                    </p>
                    <p>
                      <GatewayNameLabel name="hive-router" /> consistently maintains
                      the lowest p95 latency across the entire test, and its
                      curve remains relatively flat even as it handles a
                      significantly higher request volume (RPS). This
                      demonstrates a highly efficient architecture that resists
                      performance degradation under load.
                    </p>

                    <p>
                      <GatewayNameLabel name="grafbase" /> and{" "}
                      <GatewayNameLabel name="cosmo" /> exhibits a very stable
                      and low latency profile, though at a lower throughput.
                    </p>
                    <p>
                      In contrast, <GatewayNameLabel name="apollo-router" /> show
                      latency climbing steeply and linearly with the load,
                      suggesting their architectures struggle to maintain
                      responsiveness under the same high-concurrency stress.
                    </p>
                    <p>
                      For architects, a gateway that keeps latency low under
                      pressure is crucial for preventing cascading delays and
                      ensuring a reliable quality of service.
                    </p>
                  </>
                ) : (
                  <>
                    <p>
                      <GatewayNameLabel name="hive-router" /> maintains the lowest
                      steady-state p95 with a flat profile and minimal jitter,
                      indicating very low per-request overhead at everyday
                      traffic levels.
                    </p>
                    <p>
                      <GatewayNameLabel name="cosmo" /> and{" "}
                      <GatewayNameLabel name="grafbase" /> both stabilize
                      quickly with low, flat curves, but at a higher baseline
                      than Hive, suggesting additional runtime overhead even
                      when the system isn't under pressure.
                    </p>
                    <p>
                      <GatewayNameLabel name="apollo-router" /> settles at a noticeably
                      higher p95 baseline. While stable, the higher floor
                      implies a greater cost per request during calm traffic.
                    </p>
                    <p>
                      At this traffic level,{" "}
                      <strong>the key signal is consistency</strong>: a flat
                      line with a low baseline. Use these steady-state latencies
                      alongside RPS to compare real-world efficiency and the
                      headroom each gateway preserves for future spikes.
                    </p>
                  </>
                )
              }
            >
              <LatencyChart test={test} gateway="apollo-router" showLeftYAxis />
              <LatencyChart test={test} gateway="cosmo" />
              <LatencyChart test={test} gateway="grafbase" />
              <LatencyChart test={test} gateway="hive-router" showRightYAxis />
            </MetricChart>

            <MetricChart
              anchor="cpu"
              icon={<CpuIcon className="size-6" />}
              title="CPU Utilization"
              description={
                <>
                  CPU usage reveals the computational cost of a gateway's
                  performance. While higher throughput often requires more CPU,
                  the key metric for architects is efficiency - how much
                  performance is delivered per CPU core consumed.
                </>
              }
              analysis={
                test === "stress" ? (
                  <>
                    <p>
                      Analyzing CPU usage alongside MEM tells a story about
                      architectural efficiency.
                    </p>
                    <p>
                      <GatewayNameLabel name="hive-router" /> and
                      {" "}<GatewayNameLabel name="grafbase" /> are the standouts,
                      peaking around <strong>150–170%</strong> CPU while delivering
                      industry-leading throughput.
                      <br />
                      This showcases an extremely efficient processing model
                      that minimizes computational overhead.
                    </p>

                    <p>
                      <GatewayNameLabel name="cosmo" /> climbs to ~240% CPU as it
                      reaches ~680–690 RPS, and
                      {" "}<GatewayNameLabel name="apollo-router" /> reaches ~230–240%
                      as it approaches ~360–370 RPS.
                    </p>

                    <p>
                      For organizations focused on optimizing cloud spend, a
                      lower CPU footprint per request is a critical factor.
                    </p>
                  </>
                ) : (
                  <>
                    <p>
                      Analyzing CPU usage alongside MEM tells a story about
                      architectural efficiency.
                    </p>
                    <p>
                      <GatewayNameLabel name="hive-router" /> holds a flat profile
                      around ~120–130% CPU while delivering the {" "}
                      <strong>
                        highest RPS, indicating strong performance per core and
                        minimal background overhead
                      </strong>
                      .
                    </p>
                    <p>
                      <GatewayNameLabel name="grafbase" /> runs efficiently at
                      ~160–165% CPU while sustaining ~1.6k RPS.
                    </p>
                    <p>
                      <GatewayNameLabel name="cosmo" /> sits around ~185–190% CPU
                      at ~680–690 RPS, while
                      <GatewayNameLabel name="apollo-router" /> sits around
                      ~185–190% CPU at ~360–365 RPS.
                    </p>
                    <p>
                      At this traffic level, the signal to watch is{" "}
                      <strong>steady-state efficiency</strong>: combine these
                      CPU levels with the constant-load RPS to compare how much
                      work each gateway delivers for every percent of CPU
                      consumed.
                    </p>
                  </>
                )
              }
            >
              <CPUChart test={test} gateway="apollo-router" showLeftYAxis />
              <CPUChart test={test} gateway="cosmo" />
              <CPUChart test={test} gateway="grafbase" />
              <CPUChart test={test} gateway="hive-router" showRightYAxis />
            </MetricChart>

            <MetricChart
              anchor="mem"
              icon={<BrainIcon className="size-6" />}
              title="Memory Utilization"
              description={
                <>
                  Low and stable memory usage is critical for reducing
                  infrastructure costs, especially in containerized environments
                  like Kubernetes where memory is a primary scheduling resource.
                </>
              }
              analysis={
                test === "stress" ? (
                  <>
                    <p>
                      This metric often reveals fundamental differences in a
                      gateway's underlying language and runtime.
                    </p>
                    <p>
                      At just <strong>~100 MB</strong> of peak memory usage, {" "}
                      <GatewayNameLabel name="hive-router" /> is decisively the most
                      memory-efficient gateway. <br />
                      Its remarkably low footprint, likely due to its Rust-based
                      architecture, makes it extremely cost-effective to run.
                    </p>

                    <p>
                      <GatewayNameLabel name="grafbase" /> is also lean at
                      {" "}<strong>~150–160 MB</strong> max.
                      {" "}<GatewayNameLabel name="cosmo" /> peaks around
                      {" "}<strong>~370 MB</strong>, while
                      {" "}<GatewayNameLabel name="apollo-router" /> grows to
                      <strong>~750 MB</strong>.
                    </p>
                  </>
                ) : (
                  <>
                    <p>
                      <GatewayNameLabel name="hive-router" /> maintains the smallest
                      steady-state footprint (<strong>~49 MB</strong>) with an
                      almost ruler-flat line, indicating tight allocation
                      control and no drift/leak behavior.
                    </p>
                    <p>
                      <GatewayNameLabel name="grafbase" /> stabilizes around ~70–75
                      MB, with a steady curve—efficient, and close to Hive's
                      footprint at this load.
                    </p>
                    <p>
                      <GatewayNameLabel name="cosmo" /> sits higher at ~110–120 MB,
                      showing a modest baseline that implies additional
                      buffering/allocation work even when traffic is calm.
                    </p>
                    <p>
                      <GatewayNameLabel name="apollo-router" /> holds the largest
                      baseline (~170–180 MB) under the same conditions, reflecting a
                      heavier runtime cost.
                    </p>
                  </>
                )
              }
            >
              <MemChart test={test} gateway="apollo-router" showLeftYAxis />
              <MemChart test={test} gateway="cosmo" />
              <MemChart test={test} gateway="grafbase" />
              <MemChart test={test} gateway="hive-router" showRightYAxis />
            </MetricChart>

            <MetricChart
              anchor="reliability"
              icon={<HeartPulseIcon className="size-6" />}
              title="Success & Failure Rate"
              description={
                <>
                  This metric tracks the number of successful versus failed
                  requests (including those with GraphQL errors) over time and
                  is the ultimate indicator of reliability. When a system is
                  pushed past its breaking point, this chart shows how
                  gracefully it fails.
                </>
              }
              analysis={
                test === "stress" ? (
                  <>
                    <p>
                      This is perhaps the most critical differentiator revealed
                      by the stress test. While all gateways are stable under
                      moderate load, their behavior diverges significantly at
                      their performance ceiling.
                    </p>
                    <p>
                      <GatewayNameLabel name="hive-router" /> and
                      {" "}<GatewayNameLabel name="grafbase" /> maintained a
                      {" "}<strong>100% success rate</strong> throughout the entire
                      {" "}test, even when fully saturated. They handled overload by
                      {" "}increasing latency, but never dropped a request.
                    </p>

                    <p>
                      <GatewayNameLabel name="cosmo" /> stayed at 100% as load
                      ramped, not shedding requests in this run.
                    </p>
                    <p>
                      <GatewayNameLabel name="apollo-router" /> dipped slightly
                      below 100% (≈99.93%) at peak load; its limiting factor also
                      showed up in latency and RPS ceilings.
                    </p>
                    <p>
                      For an architect, this is a crucial finding. A gateway
                      that maintains a 100% success rate under duress provides a
                      predictable foundation, while a gateway that begins to
                      drop requests can introduce unpredictability and require
                      additional downstream error handling and retry logic.
                    </p>
                  </>
                ) : (
                  <>
                    <p>
                      All lines sit flat at 100%, indicating stable operation
                      with no dropped requests. At this traffic level,{" "}
                      <GatewayNameLabel name="hive-router" />,{" "}
                      <GatewayNameLabel name="cosmo" />,{" "}
                      <GatewayNameLabel name="grafbase" />, and{" "}
                      <GatewayNameLabel name="apollo-router" /> each maintain a perfect
                      success rate end-to-end. Reliability isn't the
                      differentiator here - everyone passes.
                    </p>
                  </>
                )
              }
            >
              <SuccessChart test={test} gateway="apollo-router" showLeftYAxis />
              <SuccessChart test={test} gateway="cosmo" />
              <SuccessChart test={test} gateway="grafbase" />
              <SuccessChart test={test} gateway="hive-router" showRightYAxis />
            </MetricChart>
          </div>
        </section>
      </div>
    </div>
  );
}
