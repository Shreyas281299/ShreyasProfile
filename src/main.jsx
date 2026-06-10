import React from "react";
import ReactDOM from "react-dom/client";
import "bootstrap/dist/css/bootstrap.min.css";
import "./index.css";
import App from "./App";
import { BrowserRouter } from "react-router-dom";
import { appContent } from "./constants";

console.log(appContent.mountLog);
const root = ReactDOM.createRoot(document.getElementById("root"));
const routerBasename =
  import.meta.env.BASE_URL === "/"
    ? "/"
    : import.meta.env.BASE_URL.replace(/\/$/, "");

root.render(
  <React.StrictMode>
    <BrowserRouter basename={routerBasename}>
      <App />
    </BrowserRouter>
  </React.StrictMode>
);
