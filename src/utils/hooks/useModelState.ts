import useCtrl from './useCtrl';

/**
 * @deprecated not recommended! replace to `useSelector`
 * @returns
 */
export default function useModelState<S>() {
  const ctrl = useCtrl();
  return ctrl.store.getState() as S;
}
