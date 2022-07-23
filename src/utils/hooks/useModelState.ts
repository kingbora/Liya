import React from "react";
import { StoreContext } from "../../base";

/**
 * @deprecated not recommended! replace to `useSelector`
 * @returns 
 */
export default function useModelState<S>() {
  const store = React.useContext(StoreContext);
  return store.getState() as S;
}