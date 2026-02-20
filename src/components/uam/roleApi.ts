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
    status?: string;
}

export interface RolesResponse {
    success: boolean;
    status: number;
    message: string;
    data: UserRole[];
}

export interface PermissionResponse {
    success: boolean;
    status: number;
    message: string;
    data: {
        [key: string]: {
            permissionsRaw: string[];
        };
    };
}

// End of generic types

export const roleApi = api.injectEndpoints({
    endpoints: (builder) => ({
        getRoles: builder.query<RolesResponse, CommonQueryParams | void>({
            query: (params) => ({
                url: "role",
                params: formatQueryParams(params),
            }),
            providesTags: ["Role"],
        }),
        getRoleById: builder.query<any, string>({
            query: (id) => `/role/${id}`,
            providesTags: (_result, _error, id) => [{ type: "Role", id }],
        }),
        getPermissions: builder.query<PermissionResponse, void>({
            query: () => "/permission",
        }),
        createRole: builder.mutation<any, any>({
            query: (body) => ({
                url: "/role",
                method: "POST",
                body,
            }),
            invalidatesTags: ["Role"],
        }),
        updateRole: builder.mutation<any, { id: string; body: any }>({
            query: ({ id, body }) => ({
                url: `/role/${id}`,
                method: "PATCH",
                body,
            }),
            invalidatesTags: ["Role"],
        }),
        deleteRole: builder.mutation<any, string>({
            query: (id) => ({
                url: `/role/${id}`,
                method: "DELETE",
            }),
            invalidatesTags: ["Role"],
        }),
    }),
});

export const { useGetRolesQuery, useGetRoleByIdQuery, useGetPermissionsQuery, useCreateRoleMutation, useUpdateRoleMutation, useDeleteRoleMutation } = roleApi;
