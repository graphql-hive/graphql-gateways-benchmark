## How to update the results?

Because of the limitations, GitHub Actions cannot push directly to `main`.
So first let's create a new branch from `main`, `update-results`. So that the Action can push the updated results to that branch.

```bash
git checkout main
git pull origin main
git checkout -b update-results
```

Then push it to the remote:

```bash
git push -u origin update-results
```

Then go to [federation-v1 Action](https://github.com/graphql-hive/graphql-gateways-benchmark/actions/workflows/federation-v1.workflow.yaml) and click `Run workflow`, select the `update-results` branch and run it.

After the workflow is done, create a Pull Request from `update-results` to `main` and merge it.

> Be careful about running this workflow manually, as it uses the hosted runners in this case which have limited resources. If you run into issues, consider running the benchmarks locally by following the instructions in the [README.md](README.md).

## How to deploy the updated website?

After merging the updated results to `main`, you can deploy the updated website by running [website Action](https://github.com/graphql-hive/graphql-gateways-benchmark/actions/workflows/website.yaml) on `main` branch. Go to that action, click `Run workflow`, select the `main` branch and run it. This will update the website at [the-guild.dev/graphql/hive/federation-gateway-performance](http://the-guild.dev/graphql/hive/federation-gateway-performance).