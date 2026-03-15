// import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

// // Think of this as your "API Definition File"
// export const productsApi = createApi({
  
//   // 1. Give it a name (used in Redux store)
//   reducerPath: 'productsApi',
  
//   // 2. Configure the base URL for all requests
//   baseQuery: fetchBaseQuery({
//     baseUrl: import.meta.env.VITE_API_URL,
//     tagTypes: ['Product', 'Products'],
  
// 	// 4. Define your endpoints (API calls)
// 	endpoints: (builder) => ({
	    
// 	    // QUERY = GET request (fetching data)
// 	    getProducts: builder.query({
// 	      	query: () => '/products/get-products',  // URL: http://localhost:3000/api/products
// 	      	providesTags: ['Products'], // Tag this data for cache invalidation
// 	    }),
	    
// 	    // MUTATION = CREATE request (changing data)
// 	    createProduct: builder.mutation({
// 		    query: (newProduct) => ({
// 		        url: '/create-product',
// 		        method: 'POST',
// 		        body: newProduct,
// 		    }),
// 		    invalidatesTags: ['Products'], // Clear Products cache after creating
// 	    }),

// 	    // MUTATION = PUT/ request (changing data)
// 	    updateProduct: builder.mutation({
// 		    query: ({ id, data }) => ({
// 		      	url: `/update-product/${id}`,
// 		      	method: 'PUT',
// 		      	body: data,
// 		    }),
// 		    // invalidatesTags: ['Products'], // ← Refreshes product list
// 		    invalidatesTags: (result, error, { id }) => [
// 		      	{ type: 'Product', id },
// 		      	{ type: 'Products', id: 'LIST' },
// 		    ],
// 	  	}),

// 	    // MUTATION - DELETE
// 	  	deleteProduct: builder.mutation({
// 		    query: (id) => ({
// 		      	url: `/delete-product/${id}`,
// 		      	method: 'DELETE',
// 		    }),
// 		    invalidatesTags: ['Products'], // ← Refreshes product list
// 	  	}),

// 	  	// QUERY - DELETE
// 	  	getProductById: builder.query({	
// 		    query: (id) => `/get-product/${id}`,
// 		    // Tag this specific product
// 		    providesTags: (result, error, id) => [{ type: 'Product', id }],
// 		}),
// 	}),
// });

// export const {
// 	useGetProductsQuery,
// 	useGetProductByIdQuery,
// 	useCreateProductMutation,
// 	useUpdateProductMutation,
// 	useDeleteProductMutation,
// } = productsApi;

// productsApi.js
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const productsApi = createApi({
    reducerPath: 'productsApi',
    baseQuery: fetchBaseQuery({ baseUrl: import.meta.env.VITE_API_URL }),
    prepareHeaders: (headers, { getState }) => {
        const token = getState().auth.token;
            if (token) {
                headers.set('Authorization', `Bearer ${token}`);
            }
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
} = productsApi;