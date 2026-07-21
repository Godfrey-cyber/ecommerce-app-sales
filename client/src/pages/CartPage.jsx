import React from 'react'
import { GoChevronLeft } from "react-icons/go";
import { Plus, Minus, Trash2 } from 'lucide-react';
import { BsThreeDotsVertical } from "react-icons/bs";
import { FaCcAmex } from "react-icons/fa";
import { ToastContainer, toast } from 'react-toastify';
import { FaTag, FaLock, FaCcVisa, FaCcMastercard } from "react-icons/fa6";
import Header from "../components/Header.jsx"
import Header1 from "../components/Header1.jsx"
import Navbar from "../components/homepage/Navbar.jsx"
import CartItem from "../components/cart/CartItem.jsx"
import CartSummary from "../components/cart/CartSummary.jsx"
import PromoCode from "../components/cart/PromoCode.jsx"
// import  { cartItems } from "../utilities/assets.js"
import { useAddToCartMutation, useGetCartQuery, useUpdateCartItemMutation, useRemoveFromCartMutation } from "../redux/cartApi.jsx"
import { useGetCategoriesQuery } from "../redux/categoriesApi.jsx"
import { Link } from "react-router-dom"
// useUpdateCartItemMutation
const CartPage = () => {
  const appliedPromo = true
  const subtotal = true
  const { data, error } = useGetCartQuery();
  const [updateCartItem, { isLoading: isProcessing }] = useUpdateCartItemMutation();
  const [removeFromCart, {isLoading}] = useRemoveFromCartMutation();
  const { data:categories, isLoading:loadingCat } = useGetCategoriesQuery();

  const cartItems = data?.cart[0]?.items || [];
  const totalItems = data?.cart[0]?.totalItems
  const cartSummary = data?.cart[0];

  console.log("cartItems", cartItems?.map(x => x.price))
  console.log("totalItems", totalItems)
  console.log("cartSummary", cartSummary)

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
    <main className="min-h-screen w-full bg-[#F8F5F0]">
      {/*<Header />*/}
      	<Navbar totalItems={totalItems} categories={categories} />
      	<div className="flex flex-col px-20 py-14">
      		
	      	<div className="flex items-baseline gap-3 mb-10">
	            <h1 className="font-display text-[20px] font-normal">Your Cart</h1>
	            <span className="text-sm text-mist font-medium">({cartItems.length} items)</span>
	        </div>

	        {cartItems.length === 0 ? (
	          	<div className="flex flex-col items-center py-20 animate-fade-in">
	                <span className="text-7xl mb-5">🛒</span>
	                <h2 className="font-display text-3xl font-normal mb-3">Your cart is empty</h2>
	                <p className="text-mist mb-8">Add some beautiful pieces to get started.</p>
	                <Link to="/" className="btn-primary no-underline">
	                  	Browse Collection
	                </Link>
	            </div>
	        ) : (
	          	<div className="grid grid-cols-[1fr_380px] gap-10 items-start">
	                {/* Left: items + promo */}
	                <div className="flex flex-col gap-4">
		                {cartItems?.map((item, i) => (
		                    <CartItem key={item.id} item={item} index={i} />
		                ))}
		                <PromoCode />
	                </div>

	                {/* Right: summary */}
	                <CartSummary cartSummary={cartSummary} />
	            </div>
	        )}
	    </div>
    </main>
  )
}

export default CartPage;