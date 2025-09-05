import { defineConfig } from '@graphql-hive/gateway'

// Disable limits as we have a huge query
export const gatewayConfig = defineConfig({
    maxDepth: false,
    maxTokens: false,
})