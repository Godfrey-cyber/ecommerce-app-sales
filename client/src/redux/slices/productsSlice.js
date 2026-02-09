import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

// Initial state
const initialState = {
	products: [],
	isLoading: false,
	success: false,
	isError: null,
};

// Slice
const productSlice = createSlice({
	name: 'product',
	initialState,
	reducers: {
		productStart: state => {
			state.isError = null;
			state.isLoading = true;
			state.success = false;
			state.products = null;
		},
		productSuccess: (state, action) => {
			state.isError = false;
			state.isLoading = false;
			state.success = true;
			state.products = action.payload;
		},
		productFailure: (state, action) => {
			state.isError = true;
			state.isLoading = false;
			state.success = false;
			// state.products = action.payload;
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

export const { productStart, productSuccess, productFailure } =
	productSlice.actions;
export const selectProduct = state => state.product.product;

export default productSlice.reducer;