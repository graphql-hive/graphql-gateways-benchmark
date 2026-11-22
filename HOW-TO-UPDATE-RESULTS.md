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

> And within the PR you create, it will also trigger a regular workflow without hosted runners which might have different results in the PR comment. Just ignore them, and take the results in the updated `.md` files account.

## How does the website get updated?

Merging the updated results to `main` updates
[the-guild.dev/graphql/hive/federation-gateway-performance](https://the-guild.dev/graphql/hive/federation-gateway-performance)
on its own: the `notify-website` workflow asks
[the-guild-org/website](https://github.com/the-guild-org/website) to rebuild, and the website
renders `website/stress-data.csv` and `website/constant-data.csv` from `main` (see
[website/README.md](website/README.md)).

> The figures in the page text follow the new results, but the comparisons between gateways are
> written by hand. Check that they still hold, and update them in
> `website/src/pages/graphql/hive/federation-gateway-performance.astro` in the website repository
> if not.
