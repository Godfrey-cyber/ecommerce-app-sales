import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const productsApi = createApi({
    reducerPath: 'productsApi',
    baseQuery: fetchBaseQuery({ baseUrl: import.meta.env.VITE_API_URL }),
    prepareHeaders: (headers, { getState }) => {
      return headers;
    },
    tagTypes: ['Product', 'Products'],
  
    endpoints: (builder) => ({
    
        // Get all products
        getProducts: builder.query({
          query: () => 
            '/products/get-products',
          providesTags: ['Products'],
        }),

        // Get all products brands
        getBrands: builder.query({
          query: () => 
            '/products/get-brands',
          providesTags: ['Brands'],
        }),
        
        // Get one product
        getProductById: builder.query({
          query: (id) => `/products/get-product/${id}`,
          providesTags: (result, error, id) => [{ type: 'Product', id }],
        }),
        
        // Create product
        createProduct: builder.mutation({
          query: (newProduct) => ({
            url: '/products/create-product',
            method: 'POST',
            body: newProduct,
          }),
          invalidatesTags: ['Products'],
        }),
        
        // Update product
        updateProduct: builder.mutation({
          query: ({ id, ...data }) => ({
            url: `/products/update-product/${id}`,
            method: 'PUT',
            body: data,
          }),
          invalidatesTags: (result, error, { id }) => [
            { type: 'Product', id },
            'Products',
          ],
        }),
        
        // Delete product
        deleteProduct: builder.mutation({
          query: (id) => ({
            url: `/products/delete-product/${id}`,
            method: 'DELETE',
          }),
          invalidatesTags: ['Products'],
        }),
    
  }),
});

export const {
  useGetProductsQuery,
  useGetProductByIdQuery,
  useCreateProductMutation,
  useUpdateProductMutation,
  useDeleteProductMutation,
  useGetBrandsQuery,
} = productsApi;