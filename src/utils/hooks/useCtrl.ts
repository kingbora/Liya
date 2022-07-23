import React from "react";
import { CtrlContext } from "../../base";

/**
 * @desc return controller instance.
 * @returns 
 */
export default function useCtrl<T>() {
  const ctrl = React.useContext<T>(CtrlContext as any);
  return ctrl;
}