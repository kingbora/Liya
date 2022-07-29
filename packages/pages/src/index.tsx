import { runApplication } from "@liya/core";

export const siteMap = {
  index: {
    path: "/",
  },
  detail: {
    path: "/detail"
  }
};

runApplication(siteMap, {
  index: () => import("./home"),
  detail: () => import("./detail")
});