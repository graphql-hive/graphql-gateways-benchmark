import { defineConfig, GatewayContext, GatewayPlugin } from "@graphql-hive/gateway";
import { unifiedGraphHandler } from "@graphql-hive/router-runtime";

import { ExecutionResult } from 'graphql';
import type { MaybeAsyncIterable } from '@graphql-tools/utils';
import { handleMaybePromise, MaybePromise } from '@whatwg-node/promise-helpers';
import { getOperationAST } from 'graphql';

type HeaderPolicy = 'all' | 'none' | { include: string[] };

export function useInflightRequestDeduplication<
  TContext extends Record<string, any>,
>(headerPolicy: HeaderPolicy = 'all'): GatewayPlugin<TContext> {
  const inflightRequests = new Map<string, MaybePromise<MaybeAsyncIterable<ExecutionResult>>>();
  return {
    onExecute({ args, context, executeFn, setExecuteFn }) {
      const operationAST = getOperationAST(args.document, args.operationName);
      if (!operationAST) {
        return;
      }
      if (operationAST.operation !== 'query') {
        return;
      }
      const dedupeKey = getDedupeKey(context, headerPolicy);
      if (dedupeKey == null) {
        return;
      }
      setExecuteFn(args => {
        let inflightRequest$ = inflightRequests.get(dedupeKey);
        if (inflightRequest$ == null) {
          inflightRequest$ = executeFn(args);
          if (inflightRequest$ != null) {
            inflightRequests.set(dedupeKey, inflightRequest$);
            handleMaybePromise(
              () => inflightRequest$,
              () => {
                inflightRequests.delete(dedupeKey);
              },
              () => {
                inflightRequests.delete(dedupeKey);
              },
            );
          }
        }
        return inflightRequest$;
      });
    },
  };
}

function getDedupeKey(context: GatewayContext, headerPolicy: HeaderPolicy) {
  if (context.request.method !== 'GET' && context.request.method !== 'POST') {
    return;
  }
  let key = `${context.request.method}|${context.request.url}`;
  if (headerPolicy !== 'none') {
    let headerEntries: [string, string][] = [];
    if (headerPolicy === 'all') {
      headerEntries = [...context.request.headers.entries()];
    } else {
      const normalizedIncludeList = new Set(
        headerPolicy.include.map(headerName => headerName.toLowerCase()),
      );
      for (const [headerName, headerValue] of context.request.headers.entries()) {
        if (normalizedIncludeList.has(headerName.toLowerCase())) {
          headerEntries.push([headerName, headerValue]);
        }
      }
    }
    headerEntries.sort(([left], [right]) => {
      const normalizedLeft = left.toLowerCase();
      const normalizedRight = right.toLowerCase();
      if (normalizedLeft < normalizedRight) {
        return -1;
      }
      if (normalizedLeft > normalizedRight) {
        return 1;
      }
      return 0;
    });
    key += `|${JSON.stringify(headerEntries)}`;
  }
  key += `|${context.params.operationName || ''}`;
  key += `|${context.params.query}`;
  key += `|${JSON.stringify(context.params.variables ?? null)}`;
  key += `|${JSON.stringify(context.params.extensions ?? null)}`;
  return key;
}


export const gatewayConfig = defineConfig({
  unifiedGraphHandler,
  plugins: () => [useInflightRequestDeduplication()],
});
