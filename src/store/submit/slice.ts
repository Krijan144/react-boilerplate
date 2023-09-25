import { createSlice } from "@reduxjs/toolkit";
import { submitType } from "./type";

const submitSlice = createSlice({
  name: "submit",
  initialState: {},
  reducers: {
    setSubmitValue: (state: any, action: submitType) => {
      const { submitName, submitValue } = action.payload;
      state[submitName] = submitValue;
    },
  },
});

export const { setSubmitValue } = submitSlice.actions;
export default submitSlice.reducer;
