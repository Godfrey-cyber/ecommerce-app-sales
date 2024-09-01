import React from 'react'
import { products } from "../assets/products.js"
import { MdOutlineAddShoppingCart } from "react-icons/md";
import { BsArrowsFullscreen } from "react-icons/bs";
import { FaRegHeart } from "react-icons/fa";

const NewArrivals = () => {
	return (
		<section className="w-full h-fit px-10 my-5">
				<div className="flex flex-col border-b border-gray-300">
					<span className="flex items-center text-center border-b-2 my-4 border-yellow-500 cursor-pointer py-1">
						<p className="text-lg font-semibold text-gray-800">New Arrivals</p>
					</span>
					<div className="flex justify-between items-center divide-x">
						
					
					{products.map(item => (
						<div className="flex flex-col w-48 h-80 p-4 rounded-sm hover:shadow-lg shadow-gray-500 items-center group">
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
							<span className="h-[1px] bg-gray-300 w-full hidden group-hover:inline-flex transition-transform"></span>
							<div className="flex justify-between items-center w-full hidden  group-hover:inline-flex transition delay-400 mt-2">
								<span className="flex items-center space-x-3 justify-center cursor-pointer bg-yellow-400 h-8 w-8 rounded-full">
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
		</section>
	)
}

export default NewArrivals