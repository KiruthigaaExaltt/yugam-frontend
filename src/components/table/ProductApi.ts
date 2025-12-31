import { api } from "../../api";
import type { Product, ProductsResponse } from "./Product"; // optional split

const RESOURCE = "products";

/* ================================
   API
================================ */
export const productApi = api.injectEndpoints({
  endpoints: (builder) => ({
    // Typed wrapper around generic list
    // getProducts: builder.query<ProductsResponse, void>({
    //   query: () => `/${RESOURCE}`,
    //   providesTags: ["Product"],
    // }),
    getProducts: builder.query<
      { products: Product[]; total: number },
      { page: number; limit: number; search: string }
    >({
      query: ({ page, limit, search }) => ({
        url: "/products",
        params: {
          page,
          limit,
          search: search || undefined,
        },
      }),
    }),

    searchProducts: builder.query<ProductsResponse, string>({
      query: (keyword) => `/${RESOURCE}?search=${keyword}`,
      providesTags: ["Product"],
    }),

    addProduct: builder.mutation<Product, Partial<Product>>({
      query: (body) => ({
        url: `/${RESOURCE}`,
        method: "POST",
        body,
      }),
      invalidatesTags: ["Product"],
    }),

    updateProduct: builder.mutation<Product, Partial<Product> & { id: number }>(
      {
        query: ({ id, ...body }) => ({
          url: `/${RESOURCE}/${id}`,
          method: "PUT",
          body,
        }),
        invalidatesTags: ["Product"],
      }
    ),

    deleteProducts: builder.mutation<void, number[]>({
      query: (ids) => ({
        url: `/${RESOURCE}/bulk-delete`,
        method: "POST",
        body: { ids },
      }),
      invalidatesTags: ["Product"],
    }),
  }),
});

export const {
  useGetProductsQuery,
  useLazySearchProductsQuery,
  useAddProductMutation,
  useUpdateProductMutation,
  useDeleteProductsMutation,
} = productApi;
