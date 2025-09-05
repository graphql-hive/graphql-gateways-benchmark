import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
import path from "path";


export default defineConfig(({ mode }) => {
  let base: string;
  if (process.env['NEXT_BASE_PATH']) {
    base = process.env['NEXT_BASE_PATH'];
  } else if (mode === "production") {
    base = "/graphql/hive/federation-gateway-performance/";
  } else {
    base = "/";
  }
  console.log(`Vite config: base='${base}' (mode='${mode}')`);
  return {
    base,
    build: {
      assetsDir: "assets",
    },
    plugins: [react(), tailwindcss()],
    resolve: {
      alias: {
        "@": path.resolve(__dirname, "./src"),
      },
    },
  };
});