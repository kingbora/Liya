import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface DetailState {
  count: number;
}

const initialState: DetailState = {
  count: 0,
};

const detailSlice = createSlice({
  name: "detail",
  initialState: initialState,
  reducers: {
    increment: state => {
      state.count += 1;
    },
    decrement: state => {
      if (state.count > 0) {
        state.count -= 1;
      }
    },
    todoAdded(state, action: PayloadAction<number>) {
      state.count = action.payload;
    },
    setState(state, action: PayloadAction<DetailState>) {
      Object.assign(state, action.payload);
    }
  }
});

// function combineStateAction<S, A extends SliceCaseReducers<S>, N extends string>(Model: Slice<S, A, N>) {
//   const actions: {
//     [k in keyof A]: A[k] extends (state: S, ...args: infer Args) => void ? (Args extends [{payload: infer P}] ? (payload: P) => void : () => void) : never;
//   } = {} as any;
//   Object.keys(Model.actions).map((key: keyof A) => {
//     const action: any = Model.actions[key];
//     if (typeof action === "function") {
//       if (action.length > 0) {
//         (actions as any)[key] = (payload: any) => {
//           store.dispatch(action(payload));
//         }
//       } else {
//         (actions as any)[key] = () => {
//           store.dispatch(action());
//         }
//       }
//     }
//   });

//   return actions;
// }

// const result = combineStateAction(detailSlice);

export type DetailActions = typeof detailSlice.actions;

export default detailSlice;