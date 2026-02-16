import axios from 'axios';
// an axios instance 
import { store } from "../redux/store.js"
import { logout } from "../redux/slices/authSlice.js"

export const axiosInstance = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  timeout: 30000,
  withCredentials: true,
});

axiosInstance.interceptors.request.use((config) => {
  const { auth } = store.getState();
  if (auth.accessToken) {
    config.headers.Authorization = `Bearer ${auth.accessToken}`;
  }
  return config;
});

let isRefreshing = false;
let failedQueue = [];

const processQueue = (error, token = null) => {
  failedQueue.forEach(prom => {
    if (error) {
      prom.reject(error);
    } else {
      prom.resolve(token);
    }
  });
  failedQueue = [];
};

axiosInstance.interceptors.response.use(
  res => res,
  async error => {
    const originalRequest = error.config;
    
    // Auth endpoints that should NEVER trigger refresh
    const isAuthEndpoint = 
      originalRequest.url?.includes('/users/login-user') || 
      originalRequest.url?.includes('/users/signup-user') ||
      originalRequest.url?.includes('/users/refresh_token');
    
    // CRITICAL: Don't retry rate-limited requests
    if (error.response?.status === 429) {
      console.log('⚠️ Rate limited, not retrying');
      return Promise.reject(error);
    }

    // Only handle 401 for non-auth endpoints
    if (error.response?.status === 401 && !originalRequest._retry && !isAuthEndpoint) {
      
      // If already refreshing, queue this request
      if (isRefreshing) {
        console.log('⏳ Already refreshing, queueing request');
        return new Promise((resolve, reject) => {
          failedQueue.push({ resolve, reject });
        })
          .then(token => {
            originalRequest.headers.Authorization = `Bearer ${token}`;
            return axiosInstance(originalRequest);
          })
          .catch(err => {
            return Promise.reject(err);
          });
      }

      console.log('🔄 Attempting token refresh');
      originalRequest._retry = true;
      isRefreshing = true;

      try {
        const refreshResponse = await axiosInstance.get("/users/refresh_tokens");
        const { accessToken } = refreshResponse.data;
        
        console.log('✅ Token refreshed successfully');
        store.dispatch(loginSuccess(refreshResponse.data));
        
        // Process queued requests
        processQueue(null, accessToken);
        isRefreshing = false;
        
        // Retry original request
        originalRequest.headers.Authorization = `Bearer ${accessToken}`;
        return axiosInstance(originalRequest);
        
      } catch (refreshError) {
        console.error('❌ Token refresh failed:', refreshError.message);
        processQueue(refreshError, null);
        isRefreshing = false;
        
        // Only logout on actual auth failures, not rate limits
        if (refreshError.response?.status !== 429) {
          store.dispatch(logout());
        }
        
        return Promise.reject(refreshError);
      }
    }
    
    return Promise.reject(error);
  }
);
