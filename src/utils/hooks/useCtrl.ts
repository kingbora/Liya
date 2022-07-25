import React from 'react';
import { BasePageContoller, CtrlContext } from '../../base';

/**
 * @desc return controller instance.
 * @returns
 */
export default function useCtrl<T = BasePageContoller>() {
  const ctrl = React.useContext<T>(CtrlContext as any);
  return ctrl;
}
