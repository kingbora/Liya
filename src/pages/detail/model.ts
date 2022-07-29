import {
  createSlice,
  PayloadAction,
} from '@reduxjs/toolkit';

export interface DetailState {
  count: number;
  name: string;
}

const initialState: DetailState = {
  count: 0,
  name: "kingbora",
};

const detailSlice = createSlice({
  name: 'detail',
  initialState: initialState,
  reducers: {
    increment: (state) => {
      state.count += 1;
    },
    decrement: (state) => {
      if (state.count > 0) {
        state.count -= 1;
      }
    },
    todoAdded(state, action: PayloadAction<number>) {
      state.count = action.payload;
    },
    setState(state, action: PayloadAction<Partial<DetailState>>) {
      Object.assign(state, action.payload);
    },
    changeName(state, action: PayloadAction<string>) {
      state.name = action.payload;
    }
  },
});

export type DetailActions = typeof detailSlice.actions;

export default detailSlice;
