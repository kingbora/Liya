import React from "react";
import useActions from "../../utils/hooks/useAction";
import useCtrl from "../../utils/hooks/useCtrl";
import useModelState from "../../utils/hooks/useModelState";
import withView, { HomeController } from "./controller";
import { HomeActions, HomeState } from "./model";

function HomeView() {
  const ctrl = useCtrl<HomeController>();
  const { value } = useModelState<HomeState>();
  const { add, sub  } = useActions<HomeActions>();
  return (
    <div>
      <button onClick={ctrl.handleJumpPage}>jump</button>
      <button onClick={() => add()}>+</button>
      <div>{value}</div>
      <button onClick={() => sub()}>-</button>
    </div>
  );
}

export default withView(HomeView);