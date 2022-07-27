import { createSlice } from "@reduxjs/toolkit";

export interface HomeState {
  value: number;
}

const initialState: HomeState = {
  value: 0,
};

const homeSlice = createSlice({
  name: "home",
  initialState,
  reducers: {
    add: state => {
      state.value += 1;
    },
    sub: state => {
      if (state.value > 0) {
        state.value -= 1;
      }
    }
  }
});

export type HomeActions = typeof homeSlice.actions;

export default homeSlice;