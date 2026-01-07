import { configureStore } from "@reduxjs/toolkit";
import authReducer from './slices/authSlice.js';
// import productsReducer from "./slices/productSlice.js";
// import blogsReducer from './blogsSlice.js';
// import blogsByCatSlice from './blogsByCatSlice.js';
// import commentReducer from './commentSlice.js';
// import categoryReducer from './categorySlice.js';

export const store = configureStore({
	reducer: {
		auth: authReducer,
		// blog: blogReducer,
		// products: productsReducer,
		// blogsByCat: blogsByCatSlice,
		// comment: commentReducer,
		// category: categoryReducer,
	},
});