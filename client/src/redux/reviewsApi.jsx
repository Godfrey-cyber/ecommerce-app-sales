import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const reviewsApi = createApi({
    reducerPath: 'reviewsApi',
    baseQuery: fetchBaseQuery({ baseUrl: import.meta.env.VITE_API_URL }),
    prepareHeaders: (headers, { getState }) => {
      return headers;
    },
    tagTypes: ['Reviews', 'CanReview'],
  
    endpoints: (builder) => ({
    
        // Fetch paginated reviews for a product
        getProductReviews: builder.query({
          query: ({ productId, page = 1, limit = 10, sort = 'recent' }) =>
            `/${productId}?page=${page}&limit=${limit}&sort=${sort}`,
          providesTags: (result, error, { productId }) => [
            { type: 'Reviews', id: productId },
          ],
        }),
        
        // Check if the logged-in user can review this product
        canUserReview: builder.query({
          query: (productId) => `/${productId}/can-review`,
          providesTags: (result, error, productId) => [
            { type: 'CanReview', id: productId },
          ],
        }),
        
        // Submit a new review
        createReview: builder.mutation({
          query: ({ productId, rating, comment }) => ({
            url: `/${productId}`,
            method: 'POST',
            body: { rating, comment },
          }),
          invalidatesTags: (result, error, { productId }) => [
            { type: 'Reviews',   id: productId },
            { type: 'CanReview', id: productId },
          ],
        }),
        
        // Delete a review
        deleteReview: builder.mutation({
          query: ({ reviewId, productId }) => ({
            url: `/${reviewId}/delete`,
            method: 'DELETE',
          }),
          invalidatesTags: (result, error, { productId }) => [
            { type: 'Reviews', id: productId },
          ],
        }),
    }),
});

export const {
    useGetProductReviewsQuery,
    useCanUserReviewQuery,
    useCreateReviewMutation,
    useDeleteReviewMutation,
} = reviewsApi;