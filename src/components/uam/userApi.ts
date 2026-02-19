import { api } from "../../api";

export interface UserRole {
    _id: string;
    roleCode: string;
    roleName: string;
    roleDescription: string;
    isAllowedDeletion: boolean;
    permissions: string[];
    isDeleted: boolean;
    createdAt: string;
    updatedAt: string;
}

export interface ApiUser {
    _id: string;
    username: string;
    email: string;
    roles: UserRole[];
    createdAt?: string;
    updatedAt?: string;
    status?: string;
}

export interface UsersResponse {
    success: boolean;
    status: number;
    message: string;
    data: {
        items: ApiUser[];
    };
}

export const userApi = api.injectEndpoints({
    endpoints: (builder) => ({
        getUsers: builder.query<UsersResponse, void>({
            query: () => "/users",
            providesTags: ["User" as any], // Adding User tag type if needed, though Lead was defined in api.ts
        }),
    }),
});

export const { useGetUsersQuery } = userApi;
