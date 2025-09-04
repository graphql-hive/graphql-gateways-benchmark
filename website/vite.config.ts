import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
import { cloudflare } from "@cloudflare/vite-plugin";
import path from "path";

export default defineConfig(({ mode }) => ({
  base:
    mode === "production"
      ? "/graphql/hive/federation-gateway-performance/"
      : "/",
  build: {
    assetsDir: "assets",
  },
  plugins: [react(), tailwindcss(), cloudflare()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
}));
