import React from 'react'
import { MdOutlineAddShoppingCart } from "react-icons/md";

const EmailSignUp = () => {
	return (
		<div className="grid grid-cols-3 gap-y-10 py-2 px-10 bg-amber-400 w-full h-16 items-center justify-center">
			<div className="flex items-center space-x-3">
				<MdOutlineAddShoppingCart className="h-8 w-8 items-center" />
				<p className="text-2xl font-light text-gray-800">Sign up to Newsletter</p>
			</div>
			<p className="text-sm font-bold text-gray-800">...and receive $20 coupon for first shopping</p>
			<div className="flex items-center rounded-3xl">
				<input type="text" name="" id="" placeholder="Enter your Email" className="focus:outline-none placeholder:text-sm bg-white rounded-bl-3xl rounded-tl-3xl px-4 py-2" />
				<button type="submit" className="text-sm font-semibold text-white bg-zinc-600 rounded-br-3xl rounded-tr-3xl px-4 py-2.5 h-full cursor:pointer hover:bg-white transition-all delay-400 ease-in hover:text-zinc-600">Subscribe</button>
			</div>
		</div>
	)
}

export default EmailSignUp