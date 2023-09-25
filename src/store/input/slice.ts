import { createSlice } from "@reduxjs/toolkit";
import { inputType } from "./type";

const inputSlice = createSlice({
  name: "input",
  initialState: {},
  reducers: {
    setValue: (state: any, action: inputType) => {
      const { inputName, inputValue } = action.payload;

      state[inputName] = inputValue;
    },
  },
});

export const { setValue } = inputSlice.actions;
export default inputSlice.reducer;
