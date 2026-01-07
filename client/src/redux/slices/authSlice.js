import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
// import { axiosInstance } from "../api/axios";
import { axiosInstance } from '../../utilities/apiCalls.js';

// Initial state
const initialState = {
  user: null,
  accessToken: null,
  isAuthenticated: false,
  loading: false,
  error: null,
};

// Slice
const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    // login
    loginStart: state => {
      state.loading = true;
      state.error = null;
      state.isAuthenticated = false;
    },
    loginSuccess: (state, action) => {
      state.loading = false;
      const { user, accessToken } = action.payload;
      state.user = user;
      state.accessToken = accessToken;
      state.isAuthenticated = true;
      state.error = null;
    },
    loginFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
      state.isAuthenticated = false;
    },
    // loged In user
    getCurrentUserStart: state => {
      state.loading = true;
      state.error = null;
    },
    getCurrentUserSuccess: (state, action) => {
      state.loading = false;
      const { user, accessToken } = action.payload;
      state.user = user;
      state.accessToken = accessToken;
      state.isAuthenticated = true;
      state.error = null;
    },
    getCurrentUserFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    // Sign Up User
    signUpStart: state => {
      state.loading = true;
      state.error = null;
    },
    signUpSuccess: (state, action) => {
      state.loading = false;
      state.user = action.payload;
      state.error = null;
    },
    signUpFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    //  Logout User
    logout: state => {
      state.user = null;
      state.accessToken = null;
      state.error = null;
      state.isAuthenticated = false;
    },
  },
});

export const {
  loginStart,
  loginSuccess,
  loginFailure,
  getCurrentUserStart,
  getCurrentUserSuccess,
  getCurrentUserFailure,
  signUpStart,
  signUpSuccess,
  signUpFailure,
  logout,
} = authSlice.actions;
export const selectCurrentUser = state => state.auth.user;
export const selectAccessToken = state => state.auth.accessToken;

export default authSlice.reducer;
