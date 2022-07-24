import React from 'react';
import { configureStore, EnhancedStore, Slice } from '@reduxjs/toolkit';
import axios, { Axios, CancelTokenSource } from 'axios';

export const CtrlContext = React.createContext({});
export const StoreContext = React.createContext<CtrlStore>({} as any);

export type CtrlActions<A extends Record<string, any>> = {
  // TODO deal no paramters
  [k in keyof A]: A[k] extends (payload: infer P) => any
    ? (payload?: P) => void
    : () => void;
};

export type CtrlStore<S = {}, A = {}> = EnhancedStore<S> & {
  actions: CtrlActions<A>;
};

export const withController = function <T extends Slice>(
  Controller: PageControllerProps,
  Model: T,
  createService?: CreatePageServiceProps
) {
  return function (View: React.ComponentType): React.ComponentClass {
    const MemoView = React.memo(View);
    // Redux store connect with React View
    class WrapView extends Controller {
      public axios: Axios;
      public cancelInstance: CancelTokenSource;
      public store: CtrlStore;
      constructor(props: any) {
        super(props);

        const configStore = configureStore({
          reducer: Model.reducer,
        });

        configStore.subscribe(() => {
          this.$update();
        });

        const actions: {
          [k in keyof typeof Model.actions]: (
            payload?: Parameters<typeof Model.actions[k]>[0]
          ) => void;
        } = {};

        Object.keys(Model.actions).map((action) => {
          if (typeof Model.actions[action] === 'function') {
            actions[action] = (
              payload?: Parameters<typeof Model.actions[typeof action]>[0]
            ) => {
              configStore.dispatch(Model.actions[action](payload));
            };
          }
        });

        this.store = {
          ...configStore,
          ...{
            actions,
          },
        } as CtrlStore;

        this.cancelInstance = axios.CancelToken.source();
        this.axios = new Axios({
          cancelToken: this.cancelInstance.token,
        });

        createService?.(this.axios);

        this.state = Model.getInitialState();
      }

      $update() {
        const newState = this.store.getState();
        this.setState(newState);
      }

      componentWillUnmount() {
        this.cancelInstance.cancel();
      }

      render() {
        return (
          <StoreContext.Provider value={this.store}>
            <CtrlContext.Provider value={this}>
              <MemoView {...this.state} />
            </CtrlContext.Provider>
          </StoreContext.Provider>
        );
      }
    }

    return WrapView;
  };
};

interface PageControllerProps<T = {}> {
  new (props: T): React.Component & PageController;
}

type CreatePageServiceProps = (axios: Axios) => {
  [key: string]: (...rest: any) => void | Promise<any>;
};

export class PageController<S = {}, A = {}> extends React.Component {
  store!: CtrlStore<S, A>;
  axios!: Axios;
}
