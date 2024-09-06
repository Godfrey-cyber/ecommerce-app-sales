import React from 'react'
import { FaFacebook, FaYoutube } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";
import { AiFillInstagram } from "react-icons/ai";
import { TfiHeadphoneAlt } from "react-icons/tfi";

const Footer = () => {
	return (
		<section className="w-full h-fit my-2 md:my-4 bg-white py-4 px-5 md:px-10">
			<div className="grid grid-cols-12 lg:gap-x-4">
				<div className="col-span-12 md:col-span-3 lg:col-span-4 flex-col space-y-2 md:space-y-3">
					<div className="text-4xl font-bold flex text-gray-800 cursor-pointer overflow-y-hidden">electro<span className="text-yellow-400">.</span></div>
					<div className="flex space-x-4 items-center">
						<span className="text-yellow-300 my-6">
							<TfiHeadphoneAlt className="text-4xl" />
						</span>
						<span className="flex-col space-y-.5">
							<p className="text-xs font-normal text-gray-800">Got questions? Call us 24/7</p>
							<p className="text-lg font-normal text-gray-800">(800) 8001-8588, (0600) 874 548</p>
						</span>
					</div>
					<div className="flex flex-col space-y-1">
						<h1 className="text-sm font-semibold text-black">Contact Info</h1>
						<p className="text-sm font-normal text-gray-800">17 Princess Road, London, Greater London NW1 8JR, UK</p>
					</div>
					<div className="flex space-x-8 py-4 items-center">
						<span className="text-black">
							<FaFacebook title="Facebook" className="text-3xl hover:text-blue-500 transition-all delay-400 ease-in" />
						</span>
						<span className="text-black">
							<FaXTwitter title="Twitter" className="text-3xl hover:text-blue-700 transition-all delay-400 ease-in" />
						</span>
						<span className="text-black">
							<FaYoutube title="Youtube" className="text-3xl hover:text-red-600 transition-all delay-400 ease-in" />
						</span>
						<span className="text-black">
							<AiFillInstagram title="Instagram" className="text-3xl hover:text-yellow-400 transition-all delay-400 ease-in" />
						</span>
					</div>
				</div>
				<div className="flex-col col-span-12 md:col-span-2 space-y-3">
					<p className="text-lg font-semibold text-black py-4">Find In Fast</p>
					<p className="text-sm font-normal text-gray-800 cursor-pointer hover:text-red-600 transition-all delay-400">Accessories</p>
					<p className="text-sm font-normal text-gray-800 cursor-pointer hover:text-red-600 transition-all delay-400">Gaming</p>
					<p className="text-sm font-normal text-gray-800 cursor-pointer hover:text-red-600 transition-all delay-400">Laptops & Computers</p>
					<p className="text-sm font-normal text-gray-800 cursor-pointer hover:text-red-600 transition-all delay-400">Mac Computers</p>
					<p className="text-sm font-normal text-gray-800 cursor-pointer hover:text-red-600 transition-all delay-400">PC Computers</p>
					<p className="text-sm font-normal text-gray-800 cursor-pointer hover:text-red-600 transition-all delay-400">Ultra Books</p>
				</div>
				<div className="flex-col col-span-12 md:col-span-2 space-y-3">
					<p className="text-lg font-semibold text-black py-4">Information</p>
					<p className="text-sm font-normal text-gray-800 cursor-pointer hover:text-red-600 transition-all delay-400">About Us</p>
					<p className="text-sm font-normal text-gray-800 cursor-pointer hover:text-red-600 transition-all delay-400">Contact Us</p>
					<p className="text-sm font-normal text-gray-800 cursor-pointer hover:text-red-600 transition-all delay-400">All Collection</p>
					<p className="text-sm font-normal text-gray-800 cursor-pointer hover:text-red-600 transition-all delay-400">Privacy Policy</p>
					<p className="text-sm font-normal text-gray-800 cursor-pointer hover:text-red-600 transition-all delay-400">Terms & Conditions</p>
				</div>
				<div className="flex-col col-span-12 md:col-span-2 space-y-3">
					<p className="text-lg font-semibold text-black py-4">More</p>
					<p className="text-sm font-normal text-gray-800 cursor-pointer hover:text-red-600 transition-all delay-400">Contact US</p>
					<p className="text-sm font-normal text-gray-800 cursor-pointer hover:text-red-600 transition-all delay-400">Wishlist</p>
					<p className="text-sm font-normal text-gray-800 cursor-pointer hover:text-red-600 transition-all delay-400">Shopping Cart</p>
					<p className="text-sm font-normal text-gray-800 cursor-pointer hover:text-red-600 transition-all delay-400">Shipping & Return</p>
					<p className="text-sm font-normal text-gray-800 cursor-pointer hover:text-red-600 transition-all delay-400">FAQs</p>
					<p className="text-sm font-normal text-gray-800 cursor-pointer hover:text-red-600 transition-all delay-400">About Us</p>
				</div>
				<div className="flex-col col-span-12 md:col-span-2 space-y-3">
					<p className="text-lg font-semibold text-black py-4">In the Spotlight Fast</p>
					<p className="text-sm font-normal text-gray-800 cursor-pointer hover:text-red-600 transition-all delay-400">Electronics</p>
					<p className="text-sm font-normal text-gray-800 cursor-pointer hover:text-red-600 transition-all delay-400">Toys</p>
					<p className="text-sm font-normal text-gray-800 cursor-pointer hover:text-red-600 transition-all delay-400">Home Products</p>
					<p className="text-sm font-normal text-gray-800 cursor-pointer hover:text-red-600 transition-all delay-400">Clothings</p>
					<p className="text-sm font-normal text-gray-800 cursor-pointer hover:text-red-600 transition-all delay-400">Sports & Outdoor</p>
				</div>
			</div>
		</section>
	)
}

export default Footer