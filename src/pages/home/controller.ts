import { PageController, withController } from "../../base";
import siteMap from "../../siteMap";
import Model from "./model";

export class HomeController extends PageController {
  handleJumpPage = () => {
    this.push(siteMap.detail);
  }
}

export default withController(HomeController, Model);