import siteMap from "./siteMap";

import withDetailView, { DetailController } from "./detail/controller";
import { DetailState, DetailActions } from "./detail/model";

import withHomeView, { HomeController } from "./home/controller";
import { HomeState, HomeActions } from "./home/model";

export {
  siteMap,
  withDetailView,
  DetailController,
  DetailState,
  DetailActions,
  withHomeView,
  HomeController,
  HomeState,
  HomeActions
}