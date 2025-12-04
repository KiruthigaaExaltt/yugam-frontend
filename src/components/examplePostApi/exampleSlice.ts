// src/features/api/apiSlice.ts
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

// Type for a Post
export interface Post {
  userId: number;
  id: number;
  title: string;
  body: string;
}

export const apiSlice = createApi({
  reducerPath: 'api', // unique key for this API slice
  baseQuery: fetchBaseQuery({ baseUrl: 'https://jsonplaceholder.typicode.com/' }),
  endpoints: (builder) => ({
    getPosts: builder.query<Post[], void>({
      query: () => 'posts',
    }),
  }),
});

// Export the auto-generated hook
export const { useGetPostsQuery } = apiSlice;
