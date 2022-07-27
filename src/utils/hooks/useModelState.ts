import useCtrl from './useCtrl';

/**
 * @returns
 */
export default function useModelState<S>() {
  const ctrl = useCtrl();
  return ctrl.store.getState() as S;
}
