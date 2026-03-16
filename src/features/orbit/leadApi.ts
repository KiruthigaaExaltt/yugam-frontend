import { api } from "../../api";
import type { Lead, LeadsResponse } from "./Lead";

const RESOURCE = "users";

export type ApiResponse<T> = {
    message: string;
    data: T;
};

/* ================================
   API
================================ */
export const leadApi = api.injectEndpoints({
    endpoints: (builder) => ({
        /* GET LEADS (PAGINATED)*/
        getLeads: builder.query<
            { leads: Lead[]; total: number },
            { page: number; limit: number; search: string }
        >({
            query: ({ page, limit, search }) => ({
                url: search ? `/${RESOURCE}/search` : `/${RESOURCE}`,
                params: {
                    limit,
                    page,
                    q: search || undefined,
                },
            }),
            transformResponse: (response: any) => ({
                leads: response.users.map((user: any) => ({
                    id: user.id,
                    name: `${user.firstName} ${user.lastName}`,
                    company: user.company?.name || "N/A",
                    email: user.email,
                    phone: user.phone,
                    stage: "New",
                    status: "Active",
                    source: user.source || "Website",
                    value: `₹${(Math.random() * 50000 + 10000).toFixed(0)}`,
                    date: new Date().toLocaleDateString(),
                    initials: `${user.firstName[0]}${user.lastName[0]}`,
                    avatarBg: "#F3F4F6",
                })),
                total: response.total
            }),
            providesTags: ["Lead"],
        }),

        /* SEARCH LEADS */
        searchLeads: builder.query<LeadsResponse, string>({
            query: (keyword) => `/${RESOURCE}/search?q=${keyword}`,
            providesTags: ["Lead"],
        }),

        /* ADD LEAD */
        addLead: builder.mutation<
            ApiResponse<Lead>,
            Partial<Lead>
        >({
            query: (body) => ({
                url: `/${RESOURCE}/add`,
                method: "POST",
                body,
            }),
            invalidatesTags: ["Lead"],
        }),

        /*  UPDATE LEAD */
        updateLead: builder.mutation<
            ApiResponse<Lead>,
            Partial<Lead> & { id: number }
        >({
            query: ({ id, ...body }) => ({
                url: `/${RESOURCE}/${id}`,
                method: "PUT",
                body,
            }),
            invalidatesTags: ["Lead"],
        }),

        /*DELETE LEADS (BULK) */
        deleteLeads: builder.mutation<
            ApiResponse<null>,
            number[]
        >({
            query: (ids) => ({
                url: `/${RESOURCE}/bulk-delete`,
                method: "POST",
                body: { ids },
            }),
            invalidatesTags: ["Lead"],
        }),
    }),
});

/* EXPORT HOOKS*/
export const {
    useGetLeadsQuery,
    useLazySearchLeadsQuery,
    useAddLeadMutation,
    useUpdateLeadMutation,
    useDeleteLeadsMutation,
} = leadApi;
