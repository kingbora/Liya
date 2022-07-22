import React, { StrictMode } from "react";
import ReactDOM from "react-dom/client";
import "./axios";
import App from "./App";
import "./style.less";

const root = document.getElementById("root") as Element;
ReactDOM.createRoot(root).render(
  <StrictMode>
    <App />
  </StrictMode>
);