import { PageController } from "../../base";
import useCtrl from "./useCtrl";

/**
 * @deprecated not recommended! through `controller` to use handler to update state
 * @returns 
 */
export default function useActions<A>() {
  const ctrl = useCtrl();
  return ctrl.store.actions as {
    [k in keyof A]: A[k] extends (...args: infer Args) => void
      ? Args extends [infer P]
        ? (payload: P) => void
        : () => void
      : never;
  };
}