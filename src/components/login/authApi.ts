// src/services/authApi.ts
import { api } from "../../api";

export const authApi = api.injectEndpoints({
  endpoints: (builder) => ({
    login: builder.mutation<
      {
        token: string;
        id: number;
        email: string;
        username: string;
      },
      {
        username: string;
        password: string;
      }
    >({
      query: (body) => ({
        url: "auth/login",
        method: "POST",
        body,
        headers: {
          "Content-Type": "application/json",
        },
      }),
    }),
  }),
});

export const { useLoginMutation } = authApi;
