import React from "react";
import { createRoot } from "react-dom/client";
import App from "./App";
import "./styles.css";

createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
);

window.requestAnimationFrame(() => {
  const loader = document.getElementById("initial-loader");

  if (!loader) {
    return;
  }

  window.setTimeout(() => {
    loader.classList.add("is-hidden");
    window.setTimeout(() => loader.remove(), 320);
  }, 250);
});
