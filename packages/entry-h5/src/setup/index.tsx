import React from "react";
import ReactDOM from "react-dom/client";
import createRoute from "../route";
import { SiteMapType } from "@liya/types";

function runApplication<
P extends SiteMapType,
C extends {
  [key in keyof P]:
    | React.ReactNode
    | (() => Promise<{ default: React.ComponentType<any> }>);
}
>(siteMap: P, componentMap: C) {
  const App = createRoute(siteMap, componentMap);
  const root = document.getElementById("root") as Element;
  ReactDOM.createRoot(root).render(<App />);
}

export default runApplication;