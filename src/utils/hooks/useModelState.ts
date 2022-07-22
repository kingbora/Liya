import React from "react";
import { StoreContext } from "../../base";

export default function useModelState<S>() {
  const store = React.useContext(StoreContext);
  return store.getState() as S;
}