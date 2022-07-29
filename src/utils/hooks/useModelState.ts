import React from "react";
import useCtrl from './useCtrl';

function shallowEqual<
  T extends Record<string, any>,
  U extends Record<string, any>
>(objA?: T, objB?: U): boolean {
  if (objA === objB) {
    return true;
  }

  if (typeof objA !== 'object' || !objA || typeof objB !== 'object' || !objB) {
    return false;
  }

  const keysA = Object.keys(objA);
  const keysB = Object.keys(objB);

  if (keysA.length !== keysB.length) {
    return false;
  }

  const bHasOwnProperty = Object.prototype.hasOwnProperty.bind(objB);

  // Test for A's keys different from B.
  for (let idx = 0; idx < keysA.length; idx++) {
    const key = keysA[idx];

    if (!bHasOwnProperty(key)) {
      return false;
    }

    const valueA = objA[key];
    const valueB = objB[key];

    if (valueA !== valueB) {
      return false;
    }
  }

  return true;
}

/**
 * @returns
 */
 function useModelState<S, R = any>(func: (state: S) => R) {
  const ctrl = useCtrl<any>();
  const [value, setValue] = React.useState<R>(func(ctrl.store.getState()));

  React.useEffect(() => {
    ctrl.addUpdateEvent(updateState);
    return () => {
      ctrl.removeUpdateEvent(updateState);
    };
  }, []);

  function updateState(newState: S) {
    const newValue = func(newState);
    if (!shallowEqual(newValue, value)) {
      setValue(newValue);
    }
  }

  return value;
}

export default useModelState;
