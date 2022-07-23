import React from "react";
import ReactDOM from "react-dom/client";
import "./axios";
import App from "./App";
import "./style.less";

const element = (
  <App />
);

const root = document.getElementById("root") as Element;
ReactDOM.createRoot(root).render(element);