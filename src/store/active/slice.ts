// activeSlice.ts

import { createSlice, PayloadAction } from "@reduxjs/toolkit";

// Define the initial state
interface ActiveState {
  active: string;
  prev: string;
}

const initialState: ActiveState = {
  active: "",
  prev: "",
};

// Create a slice
const activeSlice = createSlice({
  name: "active",
  initialState,
  reducers: {
    setActive: (state, action: PayloadAction<any>) => {
      state.prev = state.active;
      state.active = action.payload;
    },
  },
});

// Export actions
export const { setActive } = activeSlice.actions;

// Export the reducer
export default activeSlice.reducer;
