import createService from "./services";
import Model, { DetailActions, DetailState } from "./model";
import { PageController, withController } from "../../base";

export class DetailController extends PageController<DetailState, DetailActions> {
  handleDoSomething = () => {
    const { count } = this.store.getState();
    const { todoAdded } = this.store.actions;
    todoAdded(count + 1);
  };
}

export default withController(DetailController, Model, createService);