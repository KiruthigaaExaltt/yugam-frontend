import { api } from "../../api";

export interface ChangePasswordResponse {
    success: boolean;
    status: number;
    message: string;
}

export const changePasswordApi = api.injectEndpoints({
    endpoints: (builder) => ({
        changePassword: builder.mutation<
            ChangePasswordResponse,
            { currentPassword: any; newPassword: any }
        >({
            query: (body) => ({
                url: "auth/change-password",
                method: "PATCH",
                body,
            }),
        }),
    }),
});

export const { useChangePasswordMutation } = changePasswordApi;
