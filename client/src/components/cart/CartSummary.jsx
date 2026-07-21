import React from 'react'
import { Link } from "react-router-dom"
import PromoCode from "./PromoCode.jsx"

const TRUST_BADGES = ["🔒 Secure", "✓ Encrypted", "↩ Easy Returns"];

const CartSummary = ({ cartSummary }) => {

	const lines = [
	    { label: "Subtotal",       value: `${new Intl.NumberFormat('en-KE', { style: 'currency', currency: 'KES' }).format(cartSummary?.totalAmount || 0)}` },
	    { label: "Shipping",       value: `${cartSummary?.shipping}` === 0 ? "Free 🎉" : `${new Intl.NumberFormat('en-KE', { style: 'currency', currency: 'KES' }).format(cartSummary?.shipping || 0)}` },
	    { label: "Estimated Tax (8%)",  value: `${new Intl.NumberFormat('en-KE', { style: 'currency', currency: 'KES' }).format(cartSummary?.tax || 0)}` },
	    { label: "Discount %",  value: `${new Intl.NumberFormat('en-KE', { style: 'currency', currency: 'KES' }).format(cartSummary?.discount || 0)}` },
	];

	return (
		<div className="wave-card p-8 sticky top-[88px] animate-scale-in"
         style={{ animationDelay: ".2s" }}>
	      	<h3 className="font-display text-[26px] font-normal mb-7">Order Summary</h3>

	      	{/* Line items */}
	      	{lines.map(({ label, value }) => (
		        <div key={label} className="flex justify-between mb-4 text-sm">
		          	<span className="text-[#ESE7EB] font-medium">{label}</span>
		          	<span className={`font-semibold ${value.includes("Free") ? "text-[#2E7D32]" : "text-[#1F2937]"}`}>
		            	{value}
		          	</span>
		        </div>
	      	))}

	      	<div className="divider bg-[#FFFDD0]" />

	      	{/* Total */}
	      	<div className="flex justify-between mb-7">
	        	<span className="font-bold text-base">Total</span>
	        	<span className="font-black text-[22px] text-[#1F2937]">{new Intl.NumberFormat('en-KE', { style: 'currency', currency: 'KES' }).format(cartSummary?.finalAmount || 0)}</span>
	      	</div>

	      	{/* CTA */}
	      	<Link to="/pay/checkout">
		      	<button
		        	className="w-full btn-primary bg-[#1F2937] text-[#FFFDD0] hover:bg-[#D4AF37] py-4 rounded-xl tracking-[0.08em]
		                   shadow-[0_4px_20px_rgba(0,0,0,0.15)] hover:shadow-[0_8px_28px_rgba(0,0,0,0.2)]"
			      	>
			        Proceed to Checkout
		      	</button>
		    </Link>

	      	<Link to="/" className="block text-center mt-3 text-[13px] text-mist
	                                hover:text-[#1F2937] transition-colors no-underline">
	        	← Continue Shopping
	      	</Link>

	      	{/* Trust badges */}
	    	<div className="mt-6 pt-6 border-t border-[#FFFDD0] flex justify-center gap-5">
	        	{TRUST_BADGES.map((b) => (
	          		<span key={b} className="text-[10px] text-[#COCOCO] font-semibold tracking-wide">
	            	{b}
	          	</span>
	        ))}
	    </div>
    </div>
	)
}

export default CartSummary