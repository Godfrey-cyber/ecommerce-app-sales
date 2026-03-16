import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const categoriesApi = createApi({
    reducerPath: 'categoriesApi',
    baseQuery: fetchBaseQuery({ baseUrl: import.meta.env.VITE_API_URL }),
    prepareHeaders: (headers, { getState }) => {
      return headers;
    },
    tagTypes: ['Category', 'Categories'],
  
    endpoints: (builder) => ({
    
        // Get all categories
        getCategories: builder.query({
          query: () => 
            '/categories/get-parentCategories',
          providesTags: ['Categories'],
        }),
        
        // Get one product
        getCategoryById: builder.query({
          query: (id) => `/categories/get-category-with-breadcrumb/${id}`,
          providesTags: (result, error, id) => [{ type: 'Category', id }],
        }),
        
        // Create product
        // createProduct: builder.mutation({
        //   query: (newProduct) => ({
        //     url: '/categories/create-product',
        //     method: 'POST',
        //     body: newProduct,
        //   }),
        //   invalidatesTags: ['Category'],
        // }),
        
        // Update product
        // updateProduct: builder.mutation({
        //   query: ({ id, ...data }) => ({
        //     url: `/products/update-product/${id}`,
        //     method: 'PUT',
        //     body: data,
        //   }),
        //   invalidatesTags: (result, error, { id }) => [
        //     { type: 'Product', id },
        //     'Products',
        //   ],
        // }),
        
        // Delete product
        // deleteProduct: builder.mutation({
        //   query: (id) => ({
        //     url: `/products/delete-product/${id}`,
        //     method: 'DELETE',
        //   }),
        //   invalidatesTags: ['Products'],
        // }),
    
  }),
});

export const {
  useGetCategoriesQuery,
  useGetCategoryByIdQuery,
  // useCreateProductMutation,
  // useUpdateProductMutation,
  // useDeleteProductMutation,
} = categoriesApi;