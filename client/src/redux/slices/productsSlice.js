import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

// Initial state
const initialState = {
	products: [],
	product: null,
	isLoading: false,
	success: false,
	isError: null,
};

// Slice
const productsSlice = createSlice({
	name: 'products',
	initialState,
	reducers: {
		productsStart: state => {
			state.isError = null;
			state.isLoading = true;
			state.success = false;
			state.products = [];
		},
		productsSuccess: (state, action) => {
			state.isError = false;
			state.isLoading = false;
			state.success = true;
			state.products = action.payload;
		},
		productsFailure: (state, action) => {
			state.isError = action.payload;
			state.isLoading = false;
			state.success = false;
			// state.products = action.payload;
		},
		// product
		productStart: state => {
			state.isError = null;
			state.isLoading = true;
			state.success = false;
			state.product = null;
		},
		productSuccess: (state, action) => {
			state.isError = false;
			state.isLoading = false;
			state.success = true;
			state.product = action.payload;
		},
		productFailure: (state, action) => {
			state.isError = action.payload;
			state.isLoading = false;
			state.success = false;
			state.products = null;
		},
		// create blog
		createProductStart: (state) => {
	      state.isLoading = true;
	      state.isError = null;
	      state.success = false;
	    },
	    createProductSuccess: (state, action) => {
	      state.isLoading = false;
	      state.products.push(action.payload); // add new blog to list
	      state.success = true;
	      state.isError = null;
	    },
	    createProductFailure: (state, action) => {
	      state.isLoading = false;
	      state.isError = action.payload;
	      state.success = false;
	    },
	},
});
export const { productStart, productSuccess, productFailure, productsStart, productsSuccess, productsFailure, createProductStart, createProductSuccess, createProductFailure } =
	productsSlice.actions;
export const selectProduct = state => state.products.products;

export default productsSlice.reducer;