import React from "react";
import Detail from "./pages/detail";
import Home from "./pages/home";

const siteMap = {
  home: {
    path: "/",
    component: <Home />
  },
  detail: {
    path: "/detail",
    component: <Detail />
  }
};

export type SiteMap = {
  path: string;
  component: React.ReactElement;
};

export default siteMap;