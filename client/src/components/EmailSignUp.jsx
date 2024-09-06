import React from 'react'
import { TbSend } from "react-icons/tb";

const EmailSignUp = () => {
	return (
		<div className="grid grid-cols-12 gap-x-0 lg:gap-x-4 gap-y-6 lg:gap-y-0 py-4 md:py-2 px-5 lg:px-10 bg-amber-400 w-full h-fit lg:py-4 items-center justify-center">
			<div className="col-span-12 lg:col-span-4 flex items-center space-x-3">
				<TbSend className="h-8 w-8 items-center" />
				<p className="text-2xl font-light text-gray-800">Sign up to Newsletter</p>
			</div>
			<span className="col-span-12 lg:col-span-4">
				<p className="text-sm font-bold text-gray-800">...and receive $20 coupon for first shopping</p>
			</span>
			<div className="col-span-12 lg:col-span-4 flex items-center rounded-3xl">
				<input type="text" name="" id="" placeholder="Enter your Email" className="focus:outline-none placeholder:text-sm bg-white rounded-bl-3xl rounded-tl-3xl px-4 py-2" />
				<button type="submit" className="text-sm font-semibold text-white bg-zinc-600 rounded-br-3xl rounded-tr-3xl px-4 py-2.5 h-full cursor:pointer hover:bg-white transition-all delay-400 ease-in hover:text-zinc-600">Subscribe</button>
			</div>
		</div>
	)
}

export default EmailSignUp