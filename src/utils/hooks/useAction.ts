import React from "react";
import { CtrlActions, StoreContext } from "../../base";

/**
 * @deprecated 不推荐直接使用，应在controller中使用this.store.actions来做操作
 * @returns 
 */
export default function useActions<A>() {
  const store = React.useContext(StoreContext);
  return store.actions as CtrlActions<A>;
}