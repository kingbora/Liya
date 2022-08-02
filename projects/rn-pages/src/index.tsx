import { registerRootComponent } from 'expo';
import { siteMap } from "@liya/controller";
import { createRoute } from "@liya/entry-rn";

const App = createRoute(siteMap, {
  index: () => import("./home"),
  detail: () => import("./detail")
});

// registerRootComponent calls AppRegistry.registerComponent('main', () => App);
// It also ensures that whether you load the app in Expo Go or in a native build,
// the environment is set up appropriately
registerRootComponent(App);