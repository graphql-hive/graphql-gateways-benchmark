import { StrictMode } from "react";
import { hydrateRoot } from "react-dom/client";
import "./index.css";
import App from "./app.jsx";

// index.html already holds the page rendered at build time (scripts/prerender.mjs).
hydrateRoot(
  document.getElementById("root")!,
  <StrictMode>
    <App />
  </StrictMode>,
);
