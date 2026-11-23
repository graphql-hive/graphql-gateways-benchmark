/**
 * Renders the page to HTML at build time and writes it into dist/index.html,
 * so search engines and link previews get the full text and tables without
 * running JavaScript. The browser then hydrates it (src/main.tsx).
 *
 * Runs after `vite build`, with the same mode and base path.
 */
import { readFileSync, rmSync, writeFileSync } from "node:fs";
import { fileURLToPath, pathToFileURL } from "node:url";
import { build } from "vite";

const root = fileURLToPath(new URL("..", import.meta.url));
const ssrDir = `${root}.ssr`;
const indexPath = `${root}dist/index.html`;

await build({
  root,
  logLevel: "warn",
  build: {
    ssr: "src/entry-server.tsx",
    outDir: ssrDir,
    emptyOutDir: true,
  },
});

try {
  const { render } = await import(
    pathToFileURL(`${ssrDir}/entry-server.js`).href
  );
  // Charts have no size outside the browser, so Recharts warns once per chart
  // and renders them empty; they draw after hydration.
  const warn = console.warn;
  console.warn = (...args) => {
    if (!String(args[0]).startsWith("The width(")) warn(...args);
  };
  const appHtml = render();
  console.warn = warn;
  const html = readFileSync(indexPath, "utf8");
  const rootDiv = /(<div\s+id="root"[^>]*>)\s*(<\/div>)/;
  if (!rootDiv.test(html)) {
    throw new Error(`No empty <div id="root"> in ${indexPath}`);
  }
  writeFileSync(indexPath, html.replace(rootDiv, (_, open, close) => open + appHtml + close));
  console.log(`Prerendered ${indexPath} (${appHtml.length} characters of HTML)`);
} finally {
  rmSync(ssrDir, { recursive: true, force: true });
}
