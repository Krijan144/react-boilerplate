// Need to use the React-specific entry point to import createApi
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import type { ConversationType, MessageType } from "./types";
import { api } from "@/constant/api";
import { path } from "../socket";

// Define a service using a base URL and expected endpoints
export const Api = createApi({
  reducerPath: "conversationApi",
  baseQuery: fetchBaseQuery({
    baseUrl: process.env.NEXT_PUBLIC_URL,
    method: "GET",
    // crendentials: "include" will face CORS if credential is not provided
    credentials: "same-origin",
    prepareHeaders: (headers) => {
      const accessToken = localStorage.getItem("token");
      headers.set("Content-Type", "application/json");

      if (accessToken) {
        headers.set("authorization", `Bearer ${accessToken}`);
      }

      return headers;
    },
  }),
  endpoints: (builder) => ({
    getConversation: builder.query<ConversationType, string>({
      query: (id) => `${api.conversation}/${id}?limit=10000`,
    }),
    getMessage: builder.query<MessageType, string>({
      query: (id) => `${api.message}/${id}?limit=30`,
    }),
  }),
});

// Export hooks for usage in functional components, which are
// auto-generated based on the defined endpoints
export const { useGetConversationQuery, useGetMessageQuery } = Api;
