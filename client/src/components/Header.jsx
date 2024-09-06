import React from 'react'
import { BsBasket3Fill } from "react-icons/bs";
import { IoSearchOutline } from "react-icons/io5";
import { FaRegHeart } from "react-icons/fa";
import { CiMenuFries } from "react-icons/ci";

const Header = () => {
	return (
		<header className="bg-yellow-400 h-16 w-full lg:px-20 px-5 overflow-x-hidden">
			<div className="flex justify-between items-center h-full">
				<div className="flex items-center space-x-3">
					<span className="text-gray-800">
						<CiMenuFries className="text-2xl" />
					</span>
					<div className="flex ">
						<p className="text-4xl font-bold flex text-gray-800">electro</p>
						<span className="text-white text-4xl font-bold rounded-full">.</span>
					</div>
				</div>
				{/*  search */}
				<div className="hidden lg:flex items-center">
					<span className="border-0 bg-white w-[400px] h-10 rounded-tl-3xl rounded-bl-3xl">
						<input placeholder="Search" className="bg-transparent text-gray-700 w-full focus:outline-none px-6 text-sm font-light h-full" type="text" name="" id="" />
					</span>
					<span className="flex justify-center rounded-tr-3xl w-12 h-10 hover:bg-gray-700 rounded-br-3xl bg-gray-800 flex items-center px-1 cursor-pointer">
						<span className="text-sm items-center text-white text-2xl">
							<IoSearchOutline className="text-white text-xl" />
						</span>
					</span>
				</div>
				{/*  cart & wishlist */}
				<div className="flex justify-between space-x-4 items-center text-sm font-bold">
					<div className="flex items-center space-x-2 hover:cursor-pointer relative">
						<span className="text-gray-800">
							<IoSearchOutline className="text-2xl" />
						</span>
						<span className="text-gray-800"> 
							<FaRegHeart className="text-xl"/>
						</span>
						<span className="bg-black absolute top-2 left-7 hover:animate-bounce text-white rounded-full items-center h-5 w-5 flex justify-center">
							<p className="text-xs items-center">0</p>
						</span>
					</div>
					<div className="flex items-center space-x-2 hover:cursor-pointer relative">
						<span className="text-gray-800">
							<BsBasket3Fill className="text-xl" />
						</span>
						<span className="bg-black absolute top-2 hover:animate-bounce left-1 text-white rounded-full items-center h-5 w-5 flex justify-center">
							<p className="text-xs items-center">0</p>
						</span>
						<span className="text-gray-800 pl-2 hidden lg:flex">Ksh. 10,250.00 </span>
					</div>
				</div>
			</div>
		</header>
	)
}

export default Header