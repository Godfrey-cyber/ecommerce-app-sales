import React from 'react'
import { products } from "../assets/products.js"
import { MdOutlineAddShoppingCart } from "react-icons/md";

const BestSellersProducts = () => {
	return (
		<div className="w-full h-fit my-8">
			<div className="grid grid-rows-2 grid-flow-col gap-y-2 w-full divide-x overflow-x-scroll">
				{products.map(item => (
					// <div key={item.id} className=" w-full">
						<div className="flex justify-between items-center space-y-2 p-4 rounded-md hover:shadow-2xl shadow-gray-800 items-center min-w-80 relative group">
							<span className="flex items-center justify-center absolute top-3 left-3 bg-gray-200 rounded-full h-9 w-9 group-hover:bg-yellow-400 transition-all delay-200">
								<p className="text-xs font-semibold text-white group-hover:text-black">{item.discount}%</p>
							</span>
							<img className="h-36 w-44 cursor-pointer" src={item.image} alt="" />
							<div className="flex flex-col space-y-4 ">
								<p className="text-xs text-gray-500">{item.category}</p>
								<p className="text-sm text-blue-600 font-medium">{item.name.length > 19 ? item.name.slice(0,18) : item.name}</p>
								<span className="flex items-center justify-between w-full">
									<p className="text-sm font-normal text-lg text-gray-800">Ksh. {item.price}</p>
									<span className="flex items-center space-x-3 justify-center cursor-pointer bg-yellow-400 h-8 w-8 rounded-full hidden hover:flex">
										<MdOutlineAddShoppingCart className="items-center" />
									</span>
								</span>
							</div>
						</div>
					// </div>
				))}
			</div>
		</div>
	)
}

export default BestSellersProducts
// https://electrox.arenacommerce.com/collections/mac-computers