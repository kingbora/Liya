import React from "react";
import { AppRegistry  } from "react-native";
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
  AppRegistry.registerComponent("liya", () => App);
}

export default runApplication;