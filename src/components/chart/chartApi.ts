import { api } from "../../api";

// Example chart data type
export interface SalesChartResponse {
  labels: string[];
  sales: number[];
}

export const chartApi = api.injectEndpoints({
  endpoints: (builder) => ({
    
    // Example: Fetch sales chart data
    getSalesChart: builder.query<SalesChartResponse, void>({
      query: () => "sales-chart", // GET /sales-chart
    }),

  }),
});

export const { useGetSalesChartQuery } = chartApi;
