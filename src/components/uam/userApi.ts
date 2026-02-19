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

export interface RolesResponse {
    success: boolean;
    status: number;
    message: string;
    data: UserRole[];
}

export const userApi = api.injectEndpoints({
    endpoints: (builder) => ({
        getUsers: builder.query<UsersResponse, void>({
            query: () => "/users",
            providesTags: ["User" as any],
        }),
        getRoles: builder.query<RolesResponse, void>({
            query: () => "/role",
            providesTags: ["User" as any],
        }),
        createUser: builder.mutation<any, any>({
            query: (body) => ({
                url: "/users",
                method: "POST",
                body,
            }),
            invalidatesTags: ["User" as any],
        }),
    }),
});

export const { useGetUsersQuery, useGetRolesQuery, useCreateUserMutation } = userApi;
