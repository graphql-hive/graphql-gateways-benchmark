import { StrictMode } from "react";
import { renderToString } from "react-dom/server";
import App from "./app.jsx";

/** The page's HTML, written into index.html at build time (scripts/prerender.mjs). */
export function render(): string {
  return renderToString(
    <StrictMode>
      <App />
    </StrictMode>,
  );
}
