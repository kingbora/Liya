import React from "react";
import { useCtrl, useSelector, useActions } from "@liya/core";
import { withHomeView, HomeController, HomeActions, HomeState } from "@liya/controller";

function HomeView() {
  const ctrl = useCtrl<HomeController>();
  const { value } = useSelector<HomeState, {
    value: number;
  }>((state) => ({
    value: state.value
  }));
  const { add, sub  } = useActions<HomeActions>();
  return (
    <div>
      <button onClick={ctrl.handleJumpPage}>jump</button>
      <button onClick={add}>+</button>
      <div>{value}</div>
      <button onClick={sub}>-</button>
    </div>
  );
}

export default withHomeView(HomeView);