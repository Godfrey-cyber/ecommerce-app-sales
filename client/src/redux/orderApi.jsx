import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { baseQuery } from './baseQuery';

export const orderApi = createApi({
    reducerPath: 'orderApi',
    baseQuery,    
    tagTypes: ['Order', 'Orders'],
  
    endpoints: (builder) => ({
    
        // @Admin - Get all orders
        getOrders: builder.query({
            query: () => 
                '/orders/get-orders',
            providesTags: ['Orders'],
        }),
        
        // @Admin - Get one product
        getOrderById: builder.query({
            query: (id) => `/orders/get-order/${id}`,
            providesTags: (result, error, id) => [{ type: 'Order', id }],
        }),
        
        // @Admin - Create order
        createOrder: builder.mutation({
            query: (newOrder) => ({
                url: '/orders/create-order',
                method: 'POST',
                body: newOrder,
            }),
          invalidatesTags: ['Order'],
        }),    
    }),
});

export const {
    useGetOrdersQuery,
    useGetOrderByIdQuery,
    useCreateOrderMutation
} = orderApi;