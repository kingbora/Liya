import React from 'react';
import { configureStore, EnhancedStore, Slice } from '@reduxjs/toolkit';
import axios, { Axios, CancelTokenSource } from 'axios';
import { Location, Params, useLocation, useNavigate, useParams } from 'react-router';
import { PageSiteMap, PageSiteOption } from "../types";

interface NavigationRouterProps {
  params: Readonly<Params<string>>;
  location: Location;
  push: (page: PageSiteMap, option?: PageSiteOption) => void;
  pop: () => void;
}

export const CtrlContext = React.createContext({});

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
  Controller: PageControllerProps<NavigationRouterProps>,
  Model: T,
  createService?: CreatePageServiceProps
) {
  return function (View: React.ComponentType): React.FunctionComponent {
    const MemoView = React.memo(View);
    // Redux store connect with React View
    class WrapView extends Controller {
      public axios: Axios;
      public cancelInstance: CancelTokenSource;
      public store: CtrlStore;
      public urlQuery;
      public location;
      public push;
      public pop;
      constructor(props: NavigationRouterProps) {
        super(props);

        this.urlQuery = props.params;
        this.location = props.location;
        this.push = props.push;
        this.pop = props.pop;

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
          <CtrlContext.Provider value={this}>
            <MemoView {...this.state} />
          </CtrlContext.Provider>
        );
      }
    }

    return function () {
      const params = useParams();
      const location = useLocation();
      const navigator = useNavigate();

      function push(page: PageSiteMap | string, option?: PageSiteOption) {
        if (typeof page === "string") {
          navigator(page, option);
        } else {
          navigator(page.path, option);
        }
      }

      function pop() {
        navigator(-1);
      }

      return <WrapView params={params} location={location} push={push} pop={pop} />
    };
  };
};

interface PageControllerProps<T = {}> {
  new (props: T): React.Component<NavigationRouterProps> & PageController;
}

type CreatePageServiceProps = (axios: Axios) => {
  [key: string]: (...rest: any) => void | Promise<any>;
};

export interface BasePageContoller<S = {}, A = {}> {
  store: CtrlStore<S, A>;
  axios: Axios;
}

export class PageController<S = {}, A = {}> extends React.Component<NavigationRouterProps> {
  store!: CtrlStore<S, A>;
  axios!: Axios;
  params!: Readonly<Params<string>>;
  location!: Location;
  push!: (page: PageSiteMap, option?: PageSiteOption) => void;
  pop!: () => void;
  pageDidMount?(): void;
  pageDidShow?(): void;
  pageDidHide?(): void;
  pageWillUnmount?(): void;
}
