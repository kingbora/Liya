import { createSlice } from "@reduxjs/toolkit";

const homeSlice = createSlice({
  name: "home",
  initialState: {
    value: 0,
  },
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

export default homeSlice;