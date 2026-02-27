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
                totalItems:
                    response.items?.reduce(
                        (sum, item) => sum + item.quantity,
                        0
                    ) || 0,
            }),
        }),

        // @Add items to Cart
        addToCart: builder.mutation({
            query: (data) => ({
                url: '/carts/add-to-cart',
                method: 'POST',
                body: data,
            }),

            invalidatesTags: ['Cart'],

            async onQueryStarted(
                { productId, quantity, variantId },
                { dispatch, queryFulfilled }
            ) {
                const patchResult = dispatch(
                    cartApi.util.updateQueryData(
                        'getCart',
                        undefined,
                        (draft) => {
                            const existingItem =
                                draft?.items?.find(
                                    (item) =>
                                        item.productId === productId &&
                                        item.variantId === variantId
                                );

                            if (existingItem) {
                                existingItem.quantity += quantity;
                            } else {
                                draft?.items?.push({
                                    productId,
                                    variantId,
                                    quantity,
                                });
                            }

                            draft.totalItems = draft?.items?.reduce((sum, item) => sum + item.quantity, 0);
                        }
                    )
                );

                try {
                    await queryFulfilled;
                    console.log(data);
                } catch {
                    patchResult.undo();
                }
            },
        }),

        updateCartItem: builder.mutation({
            query: ({ itemId, quantity }) => ({
                url: `/carts/update-cart-item/${itemId}`,
                method: 'PUT',
                body: { quantity },
            }),

            invalidatesTags: ['Cart'],

            async onQueryStarted(
                { itemId, quantity },
                { dispatch, queryFulfilled }
            ) {
                const patchResult = dispatch(
                    cartApi.util.updateQueryData(
                        'getCart',
                        undefined,
                        (draft) => {
                            const item =
                                draft?.items?.find(
                                    (item) => item._id === itemId
                                );
                            if (item) {
                                item.quantity = quantity;
                                draft.totalItems =
                                    draft.items.reduce(
                                        (sum, item) =>
                                            sum + item.quantity,
                                        0
                                    );
                            }
                        }
                    )
                );

                try {
                    await queryFulfilled;
                } catch {
                    patchResult.undo();
                }
            },
        }),

        removeFromCart: builder.mutation({
            query: (itemId) => ({
                url: `/carts/remove-from-cart/${itemId}`,
                method: 'DELETE',
            }),

            invalidatesTags: ['Cart'],

            async onQueryStarted(
                itemId,
                { dispatch, queryFulfilled }
            ) {
                const patchResult = dispatch(
                    cartApi.util.updateQueryData(
                        'getCart',
                        undefined,
                        (draft) => {
                            draft.items =
                                draft.items.filter(
                                    (item) =>
                                        item.id !== itemId
                                );
                            draft.totalItems =
                                draft.items.reduce(
                                    (sum, item) =>
                                        sum + item.quantity,
                                    0
                                );
                        }
                    )
                );

                try {
                    await queryFulfilled;
                } catch {
                    patchResult.undo();
                }
            },
        }),

        clearCart: builder.mutation({
            query: () => ({
                url: '/cart',
                method: 'DELETE',
            }),

            invalidatesTags: ['Cart'],

            async onQueryStarted(
                arg,
                { dispatch, queryFulfilled }
            ) {
                const patchResult = dispatch(
                    cartApi.util.updateQueryData(
                        'getCart',
                        undefined,
                        (draft) => {
                            draft.items = [];
                            draft.itemCount = 0;
                            draft.total = 0;
                        }
                    )
                );

                try {
                    await queryFulfilled;
                } catch {
                    patchResult.undo();
                }
            },
        }),

        applyCoupon: builder.mutation({
            query: (couponCode) => ({
                url: '/carts/apply-coupon',
                method: 'POST',
                body: { code: couponCode },
            }),

            invalidatesTags: ['Cart'],
        }),

        removeCoupon: builder.mutation({
            query: () => ({
                url: '/cart/coupon',
                method: 'DELETE',
            }),

            invalidatesTags: ['Cart'],
        }),

        syncCart: builder.mutation({
            query: (localCartItems) => ({
                url: '/cart/sync',
                method: 'POST',
                body: { items: localCartItems },
            }),

            invalidatesTags: ['Cart'],
        }),

        getCartTotals: builder.query({
            query: () => '/cart/totals',
            providesTags: ['Cart'],
        }),
    }),
});

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