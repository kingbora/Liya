import React from "react";
import { useCtrl, useSelector, useActions } from "@liya/core";
import withView, { HomeController } from "./controller";
import { HomeActions, HomeState } from "./model";

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

export default withView(HomeView);