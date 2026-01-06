// // src/features/cart/cartSlice.js

// import { createSlice } from '@reduxjs/toolkit';

// const initialState = {
//   cartItems: [],
// };

// const cartSlice = createSlice({
// 	name: 'cart',
// 	initialState,
// 	reducers: {
// 	    addToCart: (state, action) => {
// 		    const itemInCart = state.cartItems.find((item) => item.id === action.payload.id);
// 		      	if (itemInCart) {
// 		        	itemInCart.quantity += 1;
// 		      	} else {
// 		        	state.cartItems.push({ ...action.payload, quantity: 1 });
// 		    }
// 	    },
// 	    removeFromCart: (state, action) => {
// 	      	state.cartItems = state.cartItems.filter((item) => item.id !== action.payload.id);
// 	    },
// 	    decreaseQuantity: (state, action) => {
// 	      	const itemInCart = state.cartItems.find((item) => item.id === action.payload.id);
// 	      	if (itemInCart) {
// 	        	if (itemInCart.quantity > 1) {
// 	          		itemInCart.quantity -= 1;
// 		        } else {
// 		          state.cartItems = state.cartItems.filter((item) => item.id !== action.payload.id);
// 		        }
// 	      	}
// 	    },
// 	    clearCart: (state) => {
// 	      	state.cartItems = [];
// 	    },
// 	},
// });

// export const { addToCart, removeFromCart, decreaseQuantity, clearCart } = cartSlice.actions;

// export default cartSlice.reducer;