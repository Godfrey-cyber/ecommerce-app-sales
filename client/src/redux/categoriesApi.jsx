import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { baseQuery } from './baseQuery';

export const categoriesApi = createApi({
    reducerPath: 'categoriesApi',
    baseQuery,
    tagTypes: ['Category', 'Categories'],

      endpoints: (builder) => ({
        // Get all categories
        getCategories: builder.query({
            query: () => 
                '/categories/get-parentCategories',
            providesTags: ['Categories'],
        }),

        // Get all categories
        getCatProducts: builder.query({
            query: () => 
                '/categories/get-productcats',
            providesTags: ['Categories'],
        }),
        
        // Get one product
        getCategoryById: builder.query({
            query: (id) => `/categories/get-category-with-breadcrumb/${id}`,
            providesTags: (result, error, id) => [{ type: 'Category', id }],
        }),    
    }),
});

export const {
  useGetCategoriesQuery,
  useGetCategoryByIdQuery,
  useGetCatProductsQuery,
} = categoriesApi;