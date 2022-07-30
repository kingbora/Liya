import { siteMap } from "@liya/controller";
import { createRoute } from "@liya/entry-rn";

const App = createRoute(siteMap, {
  index: () => import("./home"),
  detail: () => import("./detail")
});

export default App;