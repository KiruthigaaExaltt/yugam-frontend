import { api } from "../api";


export const searchApi = api.injectEndpoints({
  endpoints: (builder) => ({

    // Generic list endpoint
    getList: builder.query<any[], { resource: string }>({
      query: ({ resource }) => `${resource}`,
    }),

    // Generic search endpoint
    searchList: builder.query<any[], { resource: string; keyword: string }>({
      query: ({ resource, keyword }) =>
        `${resource}?search=${keyword}`,
    }),

  }),
});

export const {
  useGetListQuery,
  useLazySearchListQuery
} = searchApi;
