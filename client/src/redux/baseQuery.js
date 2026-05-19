import { fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const baseQuery = fetchBaseQuery({
    baseUrl: import.meta.env.VITE_API_URL || "http://localhost:8080/v1/api",
    credentials: 'include',
    prepareHeaders: (headers, { getState }) => {
        // If you ever switch to token-based auth, add it here once:
        // const token = getState().auth.token;
        // if (token) headers.set('authorization', `Bearer ${token}`);
        return headers;
    },
});