import { defineConfig } from "@graphql-hive/gateway";
import { unifiedGraphHandler } from "@graphql-hive/router-runtime";

export const gatewayConfig = defineConfig({
  unifiedGraphHandler,
});
