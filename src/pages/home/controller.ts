import { PageController, withController } from "../../base";
import siteMap from "../../siteMap";
import Model, { HomeActions, HomeState } from "./model";

export class HomeController extends PageController<HomeState, HomeActions> {
  handleJumpPage = () => {
    this.push(siteMap.detail.path);
  }
}

export default withController(HomeController, Model);