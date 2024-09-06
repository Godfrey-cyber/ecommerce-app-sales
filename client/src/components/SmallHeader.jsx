import React from 'react'
import { IoChevronDownSharp } from "react-icons/io5";

const SmallHeader = () => {
	return (
		<div className="flex justify-between items-center bg-white h-9 px-20 border-b border-gray-300 w-full px-5 overflow-x-hidden">
			<span className="hidden lg:flex items-center space-x-1 hover:cursor-pointer">
				<p className="text-sm font-semibold text-black">All Departments</p>
				<IoChevronDownSharp className="text-black "/>
			</span>
			{/* middle div*/}
			<div className="flex justify-center lg:justify-between items-center space-x-3 w-full">
				<span className="flex items-center space-x-1">
					<p className="text-sm font-light text-gray-700">Home</p>
					<IoChevronDownSharp className="text-black "/>
				</span>
				<span className="flex items-center space-x-1">
					<p className="text-sm font-light text-gray-700">Catalog</p>
					<IoChevronDownSharp className="text-black "/>
				</span>
				<span className="flex items-center space-x-1">
					<p className="text-sm font-light text-gray-700">Gift Cards</p>
					<IoChevronDownSharp className="text-black "/>
				</span>
				<span className="flex items-center space-x-1">
					<p className="text-sm font-light text-gray-700">Features</p>
					<IoChevronDownSharp className="text-black "/>
				</span>
			</div>
			{/*shipping info*/}
			<span className="hidden lg:flex text-sm font-normal text-gray-700">Free Shipping on Orders Ksh. 50,000+</span>
		</div>
	)
}

export default SmallHeader