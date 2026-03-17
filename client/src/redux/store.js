import { configureStore } from "@reduxjs/toolkit";
import authReducer from './slices/authSlice.js';
import productsReducer from './slices/productsSlice.js';
import { productsApi } from './productsApi.jsx';
import { cartApi } from './cartApi.jsx';
import { authApi } from './authApi.jsx';
import { categoriesApi } from './categoriesApi.jsx';
import { orderApi } from './orderApi';

export const store = configureStore({
	reducer: {
		auth: authReducer,
		products: productsReducer,
		[productsApi.reducerPath]: productsApi.reducer,
		[cartApi.reducerPath]: cartApi.reducer,
		[authApi.reducerPath]: authApi.reducer,
		[categoriesApi.reducerPath]: categoriesApi.reducer,
		[orderApi.reducerPath]: orderApi.reducer,
	},
	middleware: (getDefaultMiddleware) => 
		getDefaultMiddleware()
		.concat(productsApi.middleware)
		.concat(cartApi.middleware)
		.concat(authApi.middleware)
		.concat(categoriesApi.middleware)
		.concat(orderApi.middleware)
});