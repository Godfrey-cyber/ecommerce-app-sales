import React from 'react'
import { GoChevronLeft } from "react-icons/go";
import { MdOutlineDeleteOutline } from "react-icons/md";
import { CiCirclePlus, CiCircleMinus } from "react-icons/ci";
import { BsThreeDotsVertical } from "react-icons/bs";
import { FaCcAmex } from "react-icons/fa";
import { FaTag, FaLock, FaCcVisa, FaCcMastercard } from "react-icons/fa6";
import Header from "../components/Header.jsx"
import { Link } from "react-router-dom"

const CartPage = () => {
	const appliedPromo = true
	const subtotal = true
	return (
		<div className="flex flex-col bg-gray-50 w-full min-h-screen text-sm font-bold">
			<Header />
			<div className="flex items-center space-x-3 h-12 px-5 group-hover">
				<Link to="/">
					<div className="flex items-center space-x-4 hover:bg-amber-100 hover:rounded-md cursor-pointer px-3">
					<span className="text-sm items-center text-white text-2xl ">
						<GoChevronLeft className="text-gray-600 text-4xl" />
					</span>
					<p className="text-lg font-semibold text-gray-600">Back.</p>
				</div>
				</Link>
			</div>
			<div className="grid grid-cols-12 gap-6 px-5 mf:px-10 lg:px-20 my-5">
				<div className="flex col-span-8 h-fit  flex-col bg-white shadow-lg rounded-md">
					<div className="flex items-center justify-between">
						<p className="text-lg font-semibold text-gray-800 px-6 py-2">Cart Items (4).</p>
						<button className="w-10 h-10 bg-white rounded-lg flex items-center justify-center hover:bg-slate-200 transition shadow-sm">
					      	<BsThreeDotsVertical className="text-gray-800 text-2xl" />
					    </button>
					</div>
					{/*  */}
					<div className="grid grid-cols-12 gap-4 px-6 my-4">
						<div className="flex col-span-2 h-62 flex-col">
							<div className="flex-shrink-0 w-24 h-32 bg-white rounded-md overflow-hidden shadow-md">
		                        <img src="" alt="" className="w-full h-full object-cover"/>
		                    </div>
						</div>
						<div className="flex col-span-10 h-62 flex-col justify-between">
							<span className="flex flex-col space-y-2">
								<p className="text-lg font-semibold text-gray-800">The Mid Night Train.</p>
								<p className="text-sm font-semibold text-gray-600">Matt Haig.</p>
							</span>
							<div className="flex items-center justify-between">
								<div className="flex items-center gap-3">
								    <button className="w-10 h-10 bg-white rounded-lg flex items-center justify-center hover:bg-slate-200 transition shadow-sm">
								      	<CiCirclePlus className="text-gray-800 text-2xl" />
								    </button>
								    <span className="font-semibold text-slate-900 w-8 text-center">4</span>
								    <button className="w-10 h-10 bg-white rounded-lg flex items-center justify-center hover:bg-slate-200 transition shadow-sm">
								      	<CiCircleMinus className="text-gray-800 text-2xl" />
								    </button>
								</div>
								<div className="flex items-center gap-4">
								    <span className="text-xl font-bold text-blue-600">Ksh. 30</span>
								    <button className="text-red-500 hover:text-red-700 transition p-2 hover:bg-red-50 rounded-lg">
								      <MdOutlineDeleteOutline className="text-red-600 text-3xl" />
								    </button>
								  </div>
							</div>
						</div>
					</div>
					{/*  */}
				</div>
				<div className="col-span-12 lg:col-span-4">
              		<div className="bg-white rounded-md shadow-lg p-6 sticky top-4">
                		<h2 className="text-2xl font-bold text-slate-900 mb-4">Order Summary</h2>
                
                		{/* Promo Code */}
		                <div className="mb-6">
		                  <label className="block text-sm font-semibold text-slate-700 mb-2">
		                    Promo Code
		                  </label>
		                  <div className="flex gap-2">
		                    <div className="relative flex-grow">
		                      <FaTag className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
		                      <input
		                        type="text"
		                        // value={promoCode}
		                        // onChange={(e) => setPromoCode(e.target.value)}
		                        placeholder="Enter code"
		                        className="w-full pl-10 pr-4 py-2 border border-slate-300 rounded-sm focus:border-blue-500 focus:outline-none"
		                      />
		                    </div>
		                    <button
		                      // onClick={applyPromo}
		                      className="px-4 py-2 bg-slate-900 text-white rounded-sm font-semibold hover:bg-slate-800 transition"
		                    >
		                      Apply
		                    </button>
		                  </div>
		                  {appliedPromo && (
		                    <div className="mt-2 flex items-center gap-2 text-green-600 text-sm">
		                      <span className="font-semibold">✓ BOOK20 Applied!</span>
		                    </div>
		                  )}
		                  <p className="mt-2 text-xs text-slate-500">Try code: BOOK20</p>
		                </div>

		                {/* Price Breakdown */}
		                <div className="space-y-3 mb-6 pb-6 border-b-2 border-slate-100">
		                  <div className="flex justify-between text-slate-800 font-semibold">
		                    <span>Subtotal</span>
		                    <span className="font-semibold">23,500</span>
		                  </div>
		                  {appliedPromo && (
		                    <div className="flex justify-between text-green-600">
		                      <span>Discount (BOOK20)</span>
		                      <span className="font-semibold">-$20</span>
		                    </div>
		                  )}
		                  <div className="flex justify-between text-slate-700">
		                    <span>Shipping</span>
		                    <span className="font-semibold">
		                      FREE
		                    </span>
		                  </div>
		                  <div className="flex justify-between text-slate-700">
		                    <span>Tax (8%)</span>
		                    <span className="font-semibold">$34</span>
		                  </div>
		                </div>
		                <div className="flex justify-between items-center mb-4">
		                  <span className="text-xl font-bold text-slate-900">Total</span>
		                  <span className="text-3xl font-bold text-gray-600">$30</span>
		                </div>

		                {subtotal < 50 && (
		                  <div className="mb-3 p-3 bg-yellow-100 rounded-xl text-sm text-green-700">
		                    <p className="font-semibold">Add $50 more for free shipping!</p>
		                  </div>
		                )}
		                <Link to="/cart/checkout">
			                <button className="w-full bg-amber-400 text-gray-800 py-4 rounded-xl font-bold text-lg hover:bg-amber-400 transition shadow-lg hover:shadow-xl mb-3">
			                  Proceed to Checkout
			                </button>
		                </Link>
		                <div className="flex items-center justify-center gap-2 text-slate-500 text-sm">
		                  <FaLock className="text-slate-400" />
		                  <span>Secure checkout</span>
		                </div>
		                {/* ============================== Credit Cards ============================== */}
		                <div className="flex flex-col justify-center mt-4 pt-4 border-t-2 border-slate-100">
		                  	<h3 className="font-semibold items-center flex justify-center text-slate-900 mb-3">We Accept</h3>
		                  	<div className="flex items-center justify-evenly space-x-5 gap-2">
		                      	{/*VISA*/}
		                      	<span className="text-sm items-center text-white text-2xl ">
									<FaCcVisa className="text-blue-700 text-4xl" />
								</span>
		                      	{/*MASTER*/}
		                    	<span className="text-sm items-center text-white text-2xl ">
									<FaCcMastercard className="text-red-600 text-4xl" />
								</span>
		                      	{/*AMEX*/}
		                    	<span className="text-sm items-center text-white text-2xl ">
									<FaCcAmex className="text-sky-600 text-4xl" />
								</span>
		                  	</div>
		                </div>
	                </div>
                </div>
			</div>
		</div>
	)
}

export default CartPage;