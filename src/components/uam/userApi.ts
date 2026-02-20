import { api } from "../../api";
import { formatQueryParams, type CommonQueryParams } from "../../utils/apiHelpers";

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
    accountstatus?: string;
}

export interface UsersResponse {
    success: boolean;
    status: number;
    message: string;
    data: {
        items: ApiUser[];
        totalItems?: number;
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
        getUsers: builder.query<UsersResponse, CommonQueryParams | void>({
            query: (params) => ({
                url: "users",
                params: formatQueryParams(params),
            }),
            providesTags: ["User"],
        }),
        // getRoles: builder.query<RolesResponse, void>({
        //     query: () => "/role",
        //     providesTags: ["User"],
        // }),
        createUser: builder.mutation<any, any>({
            query: (body) => ({
                url: "/users",
                method: "POST",
                body,
            }),
            invalidatesTags: ["User"],
        }),
        getUserById: builder.query<any, string>({
            query: (id) => `/users/${id}`,
            providesTags: (_result, _error, id) => [{ type: "User", id }],
        }),
        updateUser: builder.mutation<any, { id: string; body: any }>({
            query: ({ id, body }) => ({
                url: `/users/${id}`,
                method: "PATCH",
                body,
            }),
            invalidatesTags: ["User"],
        }),
        deleteUser: builder.mutation<any, string>({
            query: (id) => ({
                url: `/users/${id}`,
                method: "DELETE",
            }),
            invalidatesTags: ["User"],
        }),
    }),
});

export const { useGetUsersQuery, useCreateUserMutation, useGetUserByIdQuery, useUpdateUserMutation, useDeleteUserMutation } = userApi;
