import React from 'react'
import { BsBasket3Fill } from "react-icons/bs";
import { IoSearchOutline } from "react-icons/io5";
import { FaRegHeart } from "react-icons/fa";

const Header = () => {
	return (
		<div className="bg-amber-300 h-16 w-full px-20">
			<div className="flex justify-between items-center h-full">
				<span className="text-4xl font-bold text-gray-800">electro.</span>
				{/*  search */}
				<div className="flex items-center">
					<span className="border-0 bg-white w-[400px] h-10 rounded-tl-3xl rounded-bl-3xl">
						<input placeholder="Search" className="bg-transparent text-gray-700 w-full focus:outline-none px-6 text-sm font-light h-full" type="text" name="" id="" />
					</span>
					<span className="rounded-tr-3xl w-12 h-10 rounded-br-3xl bg-gray-800 flex items-center px-1">
						<span className="text-sm text-white text-2xl">
							<IoSearchOutline className="text-white text-xl" />
						</span>
					</span>
				</div>
				{/*  cart & wishlist */}
				<div className="flex justify-between space-x-4 items-center text-sm font-bold">
					<div className="flex items-center space-x-2 hover:cursor-pointer relative">
						<span className="text-gray-800"> 
							<FaRegHeart className="text-2xl"/>
						</span>
						<span className="bg-black absolute top-3 left-1 text-white rounded-full items-center h-5 w-5 flex justify-center">
							<p className="text-xs items-center">0</p>
						</span>
					</div>
					<div className="flex items-center space-x-2 hover:cursor-pointer relative">
						<span className="text-gray-800">
							<BsBasket3Fill className="text-xl" />
						</span>
						<span className="bg-black absolute top-3 left-1 text-white rounded-full items-center h-5 w-5 flex justify-center">
							<p className="text-xs items-center">0</p>
						</span>
						<span className="text-gray-800 ">$ 0.00 </span>
					</div>
				</div>
			</div>
		</div>
	)
}

export default Header