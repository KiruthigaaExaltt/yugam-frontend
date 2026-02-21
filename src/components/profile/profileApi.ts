import { api } from "../../api";

export interface ProfileData {
    firstName: string;
    lastName: string;
    profilePicture: string | null;
    dob: string | null;
    gender: string | null;
    phoneNumber: string;
    social: string | null;
}

export interface ProfileResponse {
    success: boolean;
    status: number;
    message: string;
    data: ProfileData;
}

export const profileApi = api.injectEndpoints({
    endpoints: (builder) => ({
        getProfile: builder.query<ProfileResponse, string>({
            query: (userId) => `profile/${userId}`,
            providesTags: ["User"],
        }),
        updateProfile: builder.mutation<ProfileResponse, { userId: string; body: Partial<ProfileData> }>({
            query: ({ userId, body }) => ({
                url: `profile/${userId}`,
                method: "PATCH",
                body,
            }),
            invalidatesTags: ["User"],
        }),
    }),
});

export const { useGetProfileQuery, useUpdateProfileMutation } = profileApi;
