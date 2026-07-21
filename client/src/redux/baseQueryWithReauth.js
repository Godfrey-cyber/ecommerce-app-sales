// store/baseQueryWithReauth.js
import { fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { logoutUser } from './slices/authSlice.js'

export const baseQueryWithReauth = async (args, api, extraOptions) => {
    const baseQuery = fetchBaseQuery({
        baseUrl: import.meta.env.VITE_API_URL || "http://localhost:8080/v1/api",
        credentials: 'include',
    })

    let result = await baseQuery(args, api, extraOptions)

    if (result?.error?.status === 401) {
        // Try to get a new access token using the refresh token cookie
        const refreshResult = await baseQuery(
            { url: '/users/refresh-token', method: 'POST' },
            api,
            extraOptions
        )

        if (refreshResult?.data) {
          // Token refreshed — retry the original request
            result = await baseQuery(args, api, extraOptions)
        } else {
            // Refresh failed — log the user out
            api.dispatch(logoutUser())
        }
    }

    return result
}