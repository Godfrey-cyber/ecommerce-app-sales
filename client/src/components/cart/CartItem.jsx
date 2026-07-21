import React, { useState } from 'react'
import ProductReviews from "../../components/ProductReviews.jsx"
import { useAddToCartMutation, useGetCartQuery, useUpdateCartItemMutation, useRemoveFromCartMutation } from "../../redux/cartApi.jsx"
import { Link } from "react-router-dom"
// import { Star,  RotateCcw, Check } from 'lucide-react';

const CartItem = ({ item, index }) => {
	const appliedPromo = true
	const subtotal = true
	const { data, error } = useGetCartQuery();
	const [updateCartItem, { isLoading: isProcessing }] = useUpdateCartItemMutation();
	const [removeFromCart, {isLoading}] = useRemoveFromCartMutation();

	const cartItems = data?.cart[0]?.items || [];
	const totalItems = data?.cart[0]?.totalItems
	const cartSummary = data?.cart[0];

	console.log("cartItems", cartItems)
	console.log("totalItems", totalItems)

	// update cartitem qty
    const handleQtyUpdate = async (item, delta) => {
		const newQuantity = item.quantity + delta;
		try {
			await updateCartItem({
				itemId: item._id,        // Cart item ID
				quantity: newQuantity,   // New calculated quantity
			}).unwrap();
			toast.success(data.message);
		} catch (error) {
			// toast.error(error.data.message);
			console.log(error.data.message);
			console.error('Failed to update quantity:', error);
		}
	};

	// @Remove item from cart
	const handleItemRemove = async (itemId) => {
		try {
	    	await removeFromCart(itemId).unwrap();
	    	toast.succes("Items successfully removed");
	  	} catch (error) {
	  		toast.error(error.message);
	    	console.error('Error:', error);
	  	}
	}

	return (
		<div
	      className="wave-card p-5 flex items-center gap-5 animate-fade-up"
	      style={{ animationDelay: `${index * 0.08}s` }}
	      key={item?._id}
	    >
      {/* Thumbnail */}
      <div className="w-[70px] h-[88px] rounded-xl overflow-hidden flex-shrink-0 bg-[#FFFDD0]">
        <img src={item?.image} alt={item?.name} className="w-full h-full object-cover" />
      </div>

      {/* Details */}
      <div className="flex-1">
        <p className="text-[10px] text-[#ESE7EB] font-bold tracking-[0.1em] uppercase mb-1">
          {item?.category}
        </p>
        <p className="text-[16px] font-semibold mb-1.5">{item?.name}</p>
        <p className="text-[13px] text-[#ESE7EB]">Size: M &nbsp;·&nbsp; Color: Default</p>
      </div>

      {/* Qty stepper */}
      <div className="flex items-center gap-2">
        <button
          onClick={() => handleQtyUpdate(item, -1)} disabled={isLoading}
          className={`w-[30px] h-[30px] border-0 text-sm font-bold flex items-center justify-center transition-colors ${isProcessing ? "bg-gray-200 text-gray-100 rounded-xl cursor-not-allowed" : "bg-[#1F2937] text-white rounded-lg cursor-pointer hover:bg-[#D4AF37]"}`}
        >
          −
        </button>
        <span className="w-9 h-[30px] bg-[#FFFDD0] rounded-lg flex items-center justify-center
                         text-sm font-bold text-[#1F2937]">
          {item.quantity}
        </span>
        <button
          onClick={() => handleQtyUpdate(item, +1)} disabled={isLoading}
          className={`w-[30px] h-[30px] border-0 text-sm font-bold flex items-center justify-center transition-colors ${isProcessing ? "bg-gray-200 text-gray-100 rounded-xl cursor-not-allowed" : "bg-[#1F2937] text-white rounded-lg cursor-pointer hover:bg-[#D4AF37]"}`}
      	>
          +
        </button>
      </div>

      {/* Price */}
      <div className="text-right min-w-[80px]">
        <p className="text-[17px] font-black text-[#1F2937]">
          {new Intl.NumberFormat('en-KE', { style: 'currency', currency: 'KES' }).format(item.finalPrice)}
        </p>
        <p className="text-[12px] text-[#COCOCO]">{new Intl.NumberFormat('en-KE', { style: 'currency', currency: 'KES' }).format(item.price)} each</p>
      </div>

      {/* Remove */}
      <button
        onClick={() => handleItemRemove(item._id)} disabled={isLoading} title="Remove item"
        className="p-2 text-[#COCOCO] hover:text-ember transition-colors border-0 bg-transparent cursor-pointer"
      >
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none"
             stroke="currentColor" strokeWidth="2">
          <line x1="18" y1="6" x2="6" y2="18" />
          <line x1="6" y1="6" x2="18" y2="18" />
        </svg>
      </button>
    </div>
	)
}

export default CartItem