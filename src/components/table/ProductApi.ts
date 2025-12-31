import { api } from "../../api";
import type { Product, ProductsResponse } from "./Product";

const RESOURCE = "products";

/* ================================
   COMMON API RESPONSE
================================ */
export type ApiResponse<T> = {
  message: string;
  data: T;
};

/* ================================
   API
================================ */
export const productApi = api.injectEndpoints({
  endpoints: (builder) => ({
    /* =========================
       GET PRODUCTS (PAGINATED)
    ========================== */
    getProducts: builder.query<
      { products: Product[]; total: number },
      { page: number; limit: number; search: string }
    >({
      query: ({ page, limit, search }) => ({
        url: `/${RESOURCE}`,
        params: {
          page,
          limit,
          search: search || undefined,
        },
      }),
      providesTags: ["Product"],
    }),

    /* =========================
       SEARCH PRODUCTS
    ========================== */
    searchProducts: builder.query<ProductsResponse, string>({
      query: (keyword) => `/${RESOURCE}?search=${keyword}`,
      providesTags: ["Product"],
    }),

    /* =========================
       ADD PRODUCT
    ========================== */
    addProduct: builder.mutation<
      ApiResponse<Product>,
      Partial<Product>
    >({
      query: (body) => ({
        url: `/${RESOURCE}`,
        method: "POST",
        body,
      }),
      invalidatesTags: ["Product"],
    }),

    /* =========================
       UPDATE PRODUCT
    ========================== */
    updateProduct: builder.mutation<
      ApiResponse<Product>,
      Partial<Product> & { id: number }
    >({
      query: ({ id, ...body }) => ({
        url: `/${RESOURCE}/${id}`,
        method: "PUT",
        body,
      }),
      invalidatesTags: ["Product"],
    }),

    /* =========================
       DELETE PRODUCTS (BULK)
    ========================== */
    deleteProducts: builder.mutation<
      ApiResponse<null>,
      number[]
    >({
      query: (ids) => ({
        url: `/${RESOURCE}/bulk-delete`,
        method: "POST",
        body: { ids },
      }),
      invalidatesTags: ["Product"],
    }),
  }),
});

/* ================================
   EXPORT HOOKS
================================ */
export const {
  useGetProductsQuery,
  useLazySearchProductsQuery,
  useAddProductMutation,
  useUpdateProductMutation,
  useDeleteProductsMutation,
} = productApi;
       