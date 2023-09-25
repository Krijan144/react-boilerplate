// conversationSlice.ts

import { updateArrayWithObject } from "@/utils";
import { createSlice, current, PayloadAction } from "@reduxjs/toolkit";

// Define the initial state
interface ConversationState {
  data: any; // Change 'any' to the actual type of your conversation data
  isLoading: boolean;
  isError: boolean;
  count: string;
  limit: string;
  page: string;
  active: string;
  prev: string;
}

const initialState: ConversationState = {
  data: [],
  isLoading: true,
  isError: false,
  count: "",
  limit: "",
  page: "",
  active: "",
  prev: "",
};

// Create a slice
const conversationSlice = createSlice({
  name: "conversation",
  initialState,
  reducers: {
    setConversationData: (state, action: PayloadAction<any>) => {
      state.data = action.payload.conversations;
      state.count = action.payload.count;
      state.page = action.payload.page;
    },
    updateConversationData: (state, action: PayloadAction<any>) => {
      state.data = action.payload;
    },
    setActive: (state, action: PayloadAction<any>) => {
      state.prev = state.active;
      state.active = action.payload;
    },
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.isLoading = action.payload;
    },

    setError: (state, action: PayloadAction<boolean>) => {
      (state.isError = action.payload), (state.isLoading = false);
    },
  },
});

// Export actions
export const {
  setConversationData,
  setLoading,
  setError,
  updateConversationData,
} = conversationSlice.actions;

// Export the reducer
export default conversationSlice.reducer;
