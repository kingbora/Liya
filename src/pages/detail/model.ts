import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export const detailName = "detail";

export interface DetailState {
  count: number;
}

const initialState: DetailState = {
  count: 0,
};

const detailSlice = createSlice({
  name: detailName,
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

export type DetailActions = typeof detailSlice.actions;

export default detailSlice;