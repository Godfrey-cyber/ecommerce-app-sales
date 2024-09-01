import React from 'react'
import { MdOutlineAddShoppingCart } from "react-icons/md";
import { FaRegHeart } from "react-icons/fa";
import { BsArrowsFullscreen } from "react-icons/bs";
import { products } from "../assets/products.js"

const ProductsCat = () => {
	return (
		<div className="w-full h-fit bg-gray-50 px-10">
			<span className="flex items-center space-x-6  border-b border-gray-300 py-2">
				<p className="text-lg font-medium active:border-b active:border-yellow-400 cursor-pointer">Featured</p>
				<p className="text-lg font-light active:border-b active:border-yellow-400 cursor-pointer">Top Rated</p>
				<p className="text-lg font-light active:border-b active:border-yellow-400 cursor-pointer">On sale</p>
			</span>
			<div className="grid grid-cols-6 items-center my-8 divide-x">
				{/*products*/}
				{products.map(item => (
					<div className="flex flex-col w-50 h-80 p-4 rounded-sm hover:shadow-lg shadow-gray-500 items-center group">
				        <span className="flex flex-col space-y-4">
							<p className="text-xs text-gray-500">{item.category}</p>
							<p className="text-sm text-blue-600 font-medium">{item.name.length > 19 ? item.name.slice(0,18) : item.name}</p>
							<img className="h-32 w-32 cursor-pointer" src={item.image} alt="" />
						</span>
						<span className="flex items-center justify-between w-full my-2">
							<p className="text-sm font-normal text-lg text-gray-800">Ksh. {item.price}</p>
							<span className="flex items-center justify-center cursor-pointer group-hover:bg-yellow-400 bg-gray-100 h-8 w-8 rounded-full">
								<MdOutlineAddShoppingCart className="text-gray-200 group-hover:text-gray-800 items-center" />
							</span>
							<hr className="bg-gray-300 border-b border-gray-300 my-1" />
						</span>
						<span className="h-[1px] bg-gray-300 w-full hidden group-hover:inline-flex"></span>
						<div className="flex justify-between items-center w-full hidden group-hover:inline-flex transition duration-300 ease-in-out mt-2">
							<span className="flex items-center space-x-3 justify-center cursor-pointer bg-yellow-400 h-8 w-8 rounded-full ">
								<FaRegHeart className="items-center" />
							</span>
							<span className="flex items-center space-x-3 justify-center cursor-pointer bg-yellow-400 h-8 w-8 rounded-full">
								<BsArrowsFullscreen className="items-center" />
							</span>
						</div>
					</div>
				))}
			</div>	
		</div>
	)
}

export default ProductsCat