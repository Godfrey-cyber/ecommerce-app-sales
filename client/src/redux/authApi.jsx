// redux/authApi.js
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const authApi = createApi({
    reducerPath: 'authApi',
    baseQuery: fetchBaseQuery({
        baseUrl: import.meta.env.VITE_API_URL,
        prepareHeaders: (headers, { getState }) => {
            const token = getState().auth.token;
            if (token) {
                headers.set('Authorization', `Bearer ${token}`);
            }
            return headers;
        },
    }),

    endpoints: (builder) => ({
        // @Register User
        register: builder.mutation({
            query: (credentials) => ({
                url: '/users/register-user',
                method: 'POST',
                body: credentials,
            }),
        }),
        // @Login User
        login: builder.mutation({
            query: (credentials) => ({
                url: '/users/login-user',
                method: 'POST',
                body: credentials,
            }),
        }),
        // @Logout User
        logout: builder.mutation({
            query: () => ({
                url: '/users/logout-user',
                method: 'POST',
            }),
        }),
        // @Get Me
        getMe: builder.query({
            query: () => '/users/get-me',
            providesTags: ['User'],
        }),
    }),
});

export const {
    useRegisterMutation,
    useLoginMutation,
    useLogoutMutation,
    useGetMeQuery,
} = authApi;