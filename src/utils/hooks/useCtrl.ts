import React from 'react';
import { PageController, CtrlContext } from '../../base';

/**
 * @desc return controller instance.
 * @returns
 */
export default function useCtrl<T extends PageController>() {
  const ctrl = React.useContext<T>(CtrlContext as any);
  return ctrl;
}
