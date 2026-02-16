import { configureStore } from "@reduxjs/toolkit";
import authReducer from './slices/authSlice.js';
import productsReducer from './slices/productsSlice.js';
import { productsApi } from './productsApi.jsx';

export const store = configureStore({
	reducer: {
		auth: authReducer,
		products: productsReducer,
		[productsApi.reducerPath]: productsApi.reducer,
	},
	middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(productsApi.middleware),
});