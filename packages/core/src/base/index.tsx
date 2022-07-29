import React from 'react';
import {
  configureStore,
  Slice,
  SliceCaseReducers,
  Store,
  Unsubscribe,
} from '@reduxjs/toolkit';
import axios, { Axios, CancelTokenSource } from 'axios';
import {
  Location,
  NavigateOptions,
  Params,
  To,
  useLocation,
  useNavigate,
  useParams,
} from 'react-router';

const localStoreMap = new Map();

export const CtrlContext = React.createContext({});

interface PageLifecycle {
  pageDidMount?(): void;
  pageDidShow?(): void;
  pageDidHide?(): void;
  pageWillUnmount?(): void;
}

interface BasePageProps extends RouteNavigatorProps, PageViewProps {
  children?: React.ReactElement;
}

export interface PageController<S = {}, A = {}, P = {}>
  extends RouteNavigatorProps {
  new (props: P): React.Component<P>;
  store: ActionStore<S, A>;
  axios: Axios;
}
export class PageController<S, A, P = {}> extends React.Component<P> {}

interface ActionStore<S = {}, A = {}> {
  getState: () => S;
  actions: {
    [k in keyof A]: A[k] extends (...args: infer Args) => void
      ? Args extends [infer P]
        ? (payload: P) => void
        : () => void
      : never;
  };
}

interface PageViewProps {
  SSR?: boolean;
}

interface RouteNavigatorProps {
  urlQuery: Readonly<Params<string>>;
  location: Location;
  push: (to: To, options?: NavigateOptions) => void;
  pop: () => void;
}

type FuncType<S> = (state: S) => void;

type CreateServiceType = (axios: Axios) => {
  [key: string]: (...args: any[]) => any;
};

export const withController = function <
  C extends typeof PageController<S, any>,
  S,
  A extends SliceCaseReducers<S>,
  N extends string
>(Controller: C, Model: Slice<S, A, N>, createService?: CreateServiceType) {
  return function (
    View: React.ComponentType
  ): React.FunctionComponent<PageViewProps> {
    const MemoView = React.memo(View);
    const SuperClass: React.ComponentClass<BasePageProps> = Controller as any;

    class BasePage extends SuperClass {
      store: ActionStore<S, any>;
      urlQuery: Readonly<Params<string>>;
      location: Location;
      cancelToken: CancelTokenSource;
      push: (to: To, options?: NavigateOptions) => void;
      pop: () => void;
      axios: Axios;
      private updateQueue: FuncType<S>[] = [];
      private subscriber: Unsubscribe | null;
      constructor(props: BasePageProps) {
        super(props);

        // initial service
        this.cancelToken = axios.CancelToken.source();
        this.axios = new Axios({
          cancelToken: this.cancelToken.token,
        });
        createService?.(this.axios);

        // initial navigator
        this.push = props.push;
        this.pop = props.pop;
        this.urlQuery = props.urlQuery;
        this.location = props.location;

        // initial store
        // TODO: only save state of the first three pages ?
        let $store: Store<S>;
        if (localStoreMap.has(Model.name)) {
          $store = localStoreMap.get(Model.name);
        } else {
          $store = configureStore({
            reducer: Model.reducer,
            devTools: __DEV__,
            middleware: (getDefaultMiddleware) => {
              return getDefaultMiddleware({
                serializableCheck: false,
              });
            },
          });
          localStoreMap.set(Model.name, $store);
        }

        const actions: any = {};
        Object.keys(Model.actions).map((key: keyof A) => {
          const action: any = Model.actions[key];
          if (typeof action === 'function') {
            // TODO: how to get inner function arguments to avoid no payload parameter function
            actions[key] = (...args: any[]) => {
              $store.dispatch(action(...args));
            };
          }
        });

        this.store = {
          getState: () => {
            const state = $store.getState();
            return state;
          },
          actions,
        };

        this.subscriber = $store.subscribe(() => {
          const state = $store.getState();
          this.noticeUpdate(state);
        });
      }

      noticeUpdate(state: S) {
        if (this.updateQueue.length > 0) {
          this.updateQueue.forEach(
            (cb) => typeof cb === 'function' && cb(state)
          );
        }
      }

      addUpdateEvent(func: FuncType<S>) {
        if (this.updateQueue.indexOf(func) === -1) {
          this.updateQueue.push(func);
        }
      }

      removeUpdateEvent(func: FuncType<S>) {
        const index = this.updateQueue.indexOf(func);
        if (index !== -1) {
          this.updateQueue.splice(index, 1);
        }
      }

      componentDidMount() {
        (this as PageLifecycle).pageDidMount?.();
      }

      componentWillUnmount() {
        (this as PageLifecycle).pageWillUnmount?.();
        this.cancelToken.cancel("abort request due to page destroy");
        this.subscriber?.();
        this.subscriber = null;
        this.updateQueue = [];
      }

      render() {
        return (
          <CtrlContext.Provider value={this}>
            {this.props.children}
          </CtrlContext.Provider>
        );
      }
    }

    return function (props: PageViewProps) {
      const params = useParams();
      const location = useLocation();
      const navigator = useNavigate();

      function pop() {
        navigator(-1);
      }

      function push(to: To, options?: NavigateOptions) {
        navigator(to, options);
      }

      return (
        <BasePage urlQuery={params} location={location} pop={pop} push={push}>
          <MemoView />
        </BasePage>
      );
    };
  };
};
