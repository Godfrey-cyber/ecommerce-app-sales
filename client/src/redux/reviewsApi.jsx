import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { baseQuery } from './baseQuery';

export const reviewsApi = createApi({
    reducerPath: 'reviewsApi',
    baseQuery,
    tagTypes: ['Reviews', 'CanReview'],
  
    endpoints: (builder) => ({
    
        // Fetch paginated reviews for a product
        getProductReviews: builder.query({
            query: ({ id, page = 1, limit = 10, sort = 'recent' }) =>
                `/reviews/get-reviews/${id}?page=${page}&limit=${limit}&sort=${sort}`,
            providesTags: (result, error, { id }) => [
                { type: 'Reviews', id: id },
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
            query: ({ id, rating, comment }) => ({
                url: "/reviews/create-review/",
                method: 'POST',
                body: { rating, comment, id },
            }),
            invalidatesTags: (result, error, { id }) => [
                { type: 'Reviews',   id: id },
                { type: 'CanReview', id: id },
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