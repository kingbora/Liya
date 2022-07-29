import React from "react";
import { SiteMapType } from "../route/types";

type RunApplicationFuncType = <
P extends SiteMapType,
C extends {
  [key in keyof P]:
    | React.ReactNode
    | (() => Promise<{ default: React.ComponentType<any> }>);
}
>(siteMap: P, componentMap: C) => void;

let runApplication: RunApplicationFuncType;

if (__PLATFORM__ === "native") {
  runApplication = require("./native").default;
} else {
  runApplication = require("./h5").default;
}

export default runApplication;