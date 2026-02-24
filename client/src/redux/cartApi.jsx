import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const cartApi = createApi({
  reducerPath: 'cartApi',
  
  baseQuery: fetchBaseQuery({
    baseUrl: import.meta.env.VITE_API_URL || 'http://localhost:8080/v1/api',
    prepareHeaders: (headers) => {
        const token = localStorage.getItem('token');
        if (token) {
            headers.set('authorization', `Bearer ${token}`);
        }
        return headers;
    },
  }),
  
  tagTypes: ['Cart', 'CartItems'],
  
  endpoints: (builder) => ({

    //@Get Cart items
    getCart: builder.query({
        query: () => '/carts/get-cart',
        providesTags: ['Cart'],
        transformResponse: (response) => ({
            ...response,
            itemCount: response.items?.reduce((sum, item) => sum + item.quantity, 0) || 0,
        }),
    }),

    // @Add items to Cart
    addToCart: builder.mutation({
      query: (data) => ({
        url: '/carts/add-to-cart',
        method: 'POST',
        body: data,
      }),

      
      // Invalidate cart to refetch
      invalidatesTags: ['Cart'],
      
      // OPTIMISTIC UPDATE - Update UI immediately
      async onQueryStarted({ productId, quantity, variantId }, { dispatch, queryFulfilled }) {
        // Optimistically update the cache
        const patchResult = dispatch(
          cartApi.util.updateQueryData('getCart', undefined, (draft) => {
            // Find if item already exists
            const existingItem = draft.items.find(
              item => item.productId === productId && item.variantId === variantId
            );
            
            if (existingItem) {
              // Increase quantity
              existingItem.quantity += quantity;
            } else {
              // Add new item (you might need to fetch product details)
              draft.items.push({
                productId,
                variantId,
                quantity,
                // Note: price, name, image would come from server
              });
            }
            
            // Recalculate item count
            draft.totalItems = draft.items.reduce((sum, item) => sum + item.quantity, 0);
          })
        );
        
        try {
          await queryFulfilled;
          console.log(data)
        } catch {
          // Rollback on error
          patchResult.undo();
        }
      },
    }),

    // ======================= UPDATE CART ITEM - Change quantity =============================
    updateCartItem: builder.mutation({
      query: ({ itemId, quantity }) => ({
        url: `/cart/items/${itemId}`,
        method: 'PUT',
        body: { quantity },
      }),
      
      invalidatesTags: ['Cart'],
      
      // Optimistic update
      async onQueryStarted({ itemId, quantity }, { dispatch, queryFulfilled }) {
        const patchResult = dispatch(
          cartApi.util.updateQueryData('getCart', undefined, (draft) => {
            const item = draft.items.find(item => item.id === itemId);
            if (item) {
              item.quantity = quantity;
              // Recalculate total
              draft.itemCount = draft.items.reduce((sum, item) => sum + item.quantity, 0);
            }
          })
        );
        
        try {
          await queryFulfilled;
        } catch {
          patchResult.undo();
        }
      },
    }),

    // ============================================
    // REMOVE FROM CART - Delete item
    // ============================================
    removeFromCart: builder.mutation({
      query: (itemId) => ({
        url: `/cart/items/${itemId}`,
        method: 'DELETE',
      }),
      
      invalidatesTags: ['Cart'],
      
      // Optimistic update
      async onQueryStarted(itemId, { dispatch, queryFulfilled }) {
        const patchResult = dispatch(
          cartApi.util.updateQueryData('getCart', undefined, (draft) => {
            draft.items = draft.items.filter(item => item.id !== itemId);
            draft.itemCount = draft.items.reduce((sum, item) => sum + item.quantity, 0);
          })
        );
        
        try {
          await queryFulfilled;
        } catch {
          patchResult.undo();
        }
      },
    }),

    // ============================================
    // CLEAR CART - Remove all items
    // ============================================
    clearCart: builder.mutation({
      query: () => ({
        url: '/cart',
        method: 'DELETE',
      }),
      
      invalidatesTags: ['Cart'],
      
      // Optimistic update
      async onQueryStarted(arg, { dispatch, queryFulfilled }) {
        const patchResult = dispatch(
          cartApi.util.updateQueryData('getCart', undefined, (draft) => {
            draft.items = [];
            draft.itemCount = 0;
            draft.total = 0;
          })
        );
        
        try {
          await queryFulfilled;
        } catch {
          patchResult.undo();
        }
      },
    }),

    // ============================================
    // APPLY COUPON - Add discount code
    // ============================================
    applyCoupon: builder.mutation({
      query: (couponCode) => ({
        url: '/cart/coupon',
        method: 'POST',
        body: { code: couponCode },
      }),
      
      invalidatesTags: ['Cart'],
    }),

    // ============================================
    // REMOVE COUPON
    // ============================================
    removeCoupon: builder.mutation({
      query: () => ({
        url: '/cart/coupon',
        method: 'DELETE',
      }),
      
      invalidatesTags: ['Cart'],
    }),

    // ============================================
    // SYNC CART - Merge local cart with server (for guest -> logged in)
    // ============================================
    syncCart: builder.mutation({
      query: (localCartItems) => ({
        url: '/cart/sync',
        method: 'POST',
        body: { items: localCartItems },
      }),
      
      invalidatesTags: ['Cart'],
    }),

    // =========================== GET CART TOTALS - For checkout summary ================================
    getCartTotals: builder.query({
      query: () => '/cart/totals',
      providesTags: ['Cart'],
      // Response: { subtotal, tax, shipping, discount, total }
    }),

  }),
});

// Export hooks
export const {
  useGetCartQuery,
  useAddToCartMutation,
  useUpdateCartItemMutation,
  useRemoveFromCartMutation,
  useClearCartMutation,
  useApplyCouponMutation,
  useRemoveCouponMutation,
  useSyncCartMutation,
  useGetCartTotalsQuery,
} = cartApi;