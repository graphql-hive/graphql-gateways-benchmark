# Website data

[the-guild.dev/graphql/hive/federation-gateway-performance](https://the-guild.dev/graphql/hive/federation-gateway-performance)
is rendered by [the-guild-org/website](https://github.com/the-guild-org/website), which
fetches the files in this folder from `main` at build time:

- `stress-data.csv`: the samples of the `ramping-vus` (stress) scenario
- `constant-data.csv`: the samples of the `constant-vus-over-time` scenario

`scripts/generate-report.ts` writes them, and the report workflow commits them. Every row is
one monitor sample of one gateway:

```
Gateway,Seconds,VUs,RPS,P95_ms,Req_success_rate,Total_CPU,Total_RSS_KB
```

Keep the header and the gateway names (`apollo-router`, `cosmo`, `grafbase`, `hive-router`)
stable: the website build fails if a column changes or one of those gateways has no samples.
Pushing changes to these files on `main` triggers a website rebuild
(`.github/workflows/notify-website.yaml`).

The page text (analysis, methodology) lives in the website repository, in
`website/src/pages/graphql/hive/federation-gateway-performance.astro`. The figures quoted in it
are computed from these files; the comparisons between gateways are written by hand.
