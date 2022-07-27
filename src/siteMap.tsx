import React from "react";

const Home = React.lazy(() => import("./pages/home"));
const Detail = React.lazy(() => import("./pages/detail"));

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

export default siteMap;