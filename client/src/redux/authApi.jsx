import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { baseQueryWithReauth } from './baseQueryWithReauth.js'
import { setCredentials, logoutUser, setUser } from "./slices/authSlice.js"

export const authApi = createApi({
    reducerPath: 'authApi',
    baseQuery: baseQueryWithReauth,
    tagTypes: ["User"],

    endpoints: (builder) => ({
        // @Register User
        register: builder.mutation({
            query: (credentials) => ({
                url: '/users/register-user',
                method: 'POST',
                body: credentials,
            }),

            async onQueryStarted(arg, { dispatch, queryFulfilled }) {
                try {
                    const { data } = await queryFulfilled;
                    console.log("data", data)
                    dispatch(
                        setCredentials({
                            user: data.user,
                            // token: data.token
                        })
                    );
                } catch (error) {}
            }
        }),

        // @Login User
        login: builder.mutation({
            query: (credentials) => ({
                url: "/users/login-user",
                method: "POST",
                body: credentials
            }),

            async onQueryStarted(arg, { dispatch, queryFulfilled }) {
                try {
                    const { data } = await queryFulfilled;

                    console.log('🔍 Backend response:', data);
                    dispatch(logoutUser());

                    dispatch(
                        setCredentials({
                            user: data?.user,
                        }));
                    console.log("Login successful")
                } catch (error) {
                    console.error('Login error:', error);
                }
            }
        }),

        // @Logout User
        logout: builder.mutation({
            query: () => ({
                url: "/users/logout-user",
                method: "POST"
            }),

            async onQueryStarted(arg, { dispatch, queryFulfilled }) {
                try {
                    await queryFulfilled;
                    
                }   catch (error) {
                    console.log(error)
                } finally {
                    dispatch(logoutUser());
                    dispatch(authApi.util.resetApiState())
                }
            }
        }),
        // @Get Me
        getMe: builder.query({
            query: () => "/users/get-me",
            providesTags: ["User"],

            async onQueryStarted(arg, { dispatch, queryFulfilled }) {
                try {
                    const { data } = await queryFulfilled;
                    if (data?.user) {
                        dispatch(setUser(data.user));
                    }
                } catch (error) {
                    dispatch(logoutUser());
                }
            }
        }),
        // @Admin - Get all Users
        getUsers: builder.query({
          query: () => 
            '/users/get-users',
          providesTags: ['Users'],
        }),
    }),
});

export const {
    useRegisterMutation,
    useLoginMutation,
    useLogoutMutation,
    useGetMeQuery,
    useGetUsersQuery,
} = authApi;

