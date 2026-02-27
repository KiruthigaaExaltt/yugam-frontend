import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const api = createApi({
  reducerPath: "api",
  baseQuery: fetchBaseQuery({
    baseUrl: "http://localhost:4000/api/",

    credentials: "include",
  }),

  tagTypes: ["Product", "Lead", "User", "Role"],
  endpoints: () => ({}), // We'll inject endpoints later
});
