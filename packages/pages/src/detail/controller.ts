import createService from "./services";
import Model, { DetailActions, DetailState } from "./model";
import { PageController, withController } from "@liya/core";

export class DetailController extends PageController<DetailState, DetailActions> {
  handleDoSomething = () => {
    const { count } = this.store.getState();
    const { todoAdded } = this.store.actions;
    todoAdded(count + 1);
  };

  handleDoSamething = () => {
    const { setState } = this.store.actions;
    setState({
      count: 100
    });
  }
}

export default withController(DetailController, Model, createService);