import { createSlice } from "@reduxjs/toolkit";

// Initial state
const initialState = {
    user: null,
    // token: null,
    isAuthenticated: false,
};

// Slice
const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        setCredentials: (state, action) => {
            const { user } = action.payload;
            // state.token = action.payload.token;
            console.log("action", action)
            console.log("user", user)
            state.user = user;
            state.isAuthenticated = true;
        },

        setUser: (state, action) => {
            const { user } = action.payload;
            state.user = user;
        },

        logoutUser: (state) => {
            state.user = null;
            // state.token = null;
            state.isAuthenticated = false;
        }
    }
});

export const { setCredentials, setUser, logoutUser } = authSlice.actions;
export const selectCurrentUser = state => state.auth.user;
// export const selectAccessToken = state => state.auth.token;

export default authSlice.reducer;
