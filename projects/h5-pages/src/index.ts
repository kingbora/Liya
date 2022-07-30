import { runApplication } from "@liya/entry-h5";
import { siteMap } from "@liya/controller";

runApplication(siteMap, {
  index: () => import("./home"),
  detail: () => import("./detail")
});