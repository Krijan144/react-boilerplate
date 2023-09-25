import { configureStore } from "@reduxjs/toolkit";
import counterReducer from "./counter/slice";
import { Api } from "./services";
import { setupListeners } from "@reduxjs/toolkit/query";
import inputReducer from "./input/slice";
import submitReducer from "./submit/slice";
import conversationReducer from "./conversation/slice";
import activeReducer from "./active/slice";

export const store = configureStore({
  reducer: {
    counterReducer,
    [Api.reducerPath]: Api.reducer,
    inputValue: inputReducer,
    submitValue: submitReducer,
    conversations: conversationReducer,
    active: activeReducer,
  },
  // Adding the Api middleware enables caching, invalidation, polling,
  // and other useful features of `rtk-query`.
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(Api.middleware),
});

// optional, but required for refetchOnFocus/refetchOnReconnect behaviors
// see `setupListeners` docs - takes an optional callback as the 2nd arg for customization
setupListeners(store.dispatch);

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
