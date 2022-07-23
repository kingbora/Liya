import React from "react";
import { CtrlActions, StoreContext } from "../../base";

/**
 * @deprecated not recommended! through `controller` to use handler to update state
 * @returns 
 */
export default function useActions<A>() {
  const store = React.useContext(StoreContext);
  return store.actions as CtrlActions<A>;
}