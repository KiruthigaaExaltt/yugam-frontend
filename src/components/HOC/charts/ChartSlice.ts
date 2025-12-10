import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
 
export interface ChartResponse {
  labels: string[];
  sales: number[];
}
 
export const chartApi = createApi({
  reducerPath: "chartApi",
  baseQuery: fetchBaseQuery({ baseUrl: "http://localhost:5000/" }),
  endpoints: (builder) => ({
    getSalesChart: builder.query<ChartResponse, void>({
      query: () => "sales-data",
    }),
  }),
});
 
export const { useGetSalesChartQuery } = chartApi;