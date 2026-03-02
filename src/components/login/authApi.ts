// src/services/authApi.ts
import { api } from "../../api";

type LoginResponse = {
  success: boolean;
  status: number;
  message: string;
  data: {
    profile: boolean;
    profileId: string;
    firstName: string;
    lastName: string;
    email: string;
  };
};

type MeResponse = {
  success: boolean;
  status: number;
  message: string;
  data: {
    id: string;
    email: string;
    status: string;
    roles: {
      id: string;
      code: string;
      name: string;
    }[];
    permissions: string[];
  };
};

type ForgotPasswordResponse = {
  success: boolean;
  status: number;
  message: string;
  data: {
    value: string | null;
  }
};

type VerifyOTPResponse = {
  success: boolean;
  status: number;
  message: string;
  data: {
    resetToken: string | null;
  }
}

type ResetPasswordResponse = {
  success: boolean;
  status: number;
  message: string;
}

export const authApi = api.injectEndpoints({
  endpoints: (builder) => ({
    login: builder.mutation<
      LoginResponse,
      {
        email: string;
        password: string;
      }
    >({
      query: (body) => ({
        url: "auth/login",
        method: "POST",
        body,
      }),
    }),

    getMe: builder.query<MeResponse, void>({
      query: () => ({
        url: "auth/me",
        method: "GET",
      }),
    }),

    forgotPassword: builder.mutation<
      ForgotPasswordResponse,
      {
        email: string;
      }
    >({
      query: (body) => ({
        url: "auth/forgot-password",
        method: "POST",
        body,
      }),
    }),

    verifyOTPToken: builder.mutation<
      VerifyOTPResponse,
      {
        email: string;
        otp: string;
      }
    >({
      query: (body) => ({
        url: "auth/verify-forgot-otp",
        method: "POST",
        body,
      }),
    }),

    resetPassword: builder.mutation<
      ResetPasswordResponse,
      {
        resetToken: string;
        newPassword: string;
      }
    >({
      query: (body) => ({
        url: "auth/reset-password",
        method: "POST",
        body,
      }),
    }),
  }),
});

export const {
  useLoginMutation,
  useGetMeQuery,
  useLazyGetMeQuery,
  useForgotPasswordMutation,
  useVerifyOTPTokenMutation,
  useResetPasswordMutation
} = authApi;
