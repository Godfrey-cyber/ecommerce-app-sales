import React from 'react'
import { products } from "../assets/products.js"
import { MdOutlineAddShoppingCart } from "react-icons/md";

const BestSellersProducts = () => {
	return (
		<div className="w-full h-fit my-8">
			<div className="grid grid-cols-12 gap-x-2 gap-y-2 w-full">
				{products.map(item => (
					<div key={item.id} className="col-span-4 w-full">
						<div className="flex justify-between items-center space-y-2 p-4 border-l border-gray-300 rounded-md hover:shadow-2xl shadow-gray-800 items-center w-full">
							<img className="h-36 w-44 cursor-pointer" src={item.image} alt="" />
							<div className="flex flex-col space-y-4 ">
								<p className="text-xs text-gray-500">{item.category}</p>
								<p className="text-sm text-blue-600 font-medium">{item.name}</p>
								<span className="flex items-center justify-between w-full">
									<p className="text-sm font-normal text-lg text-gray-800">Ksh. {item.price}</p>
									<span className="flex items-center space-x-3 justify-center cursor-pointer bg-yellow-400 h-8 w-8 rounded-full">
										<MdOutlineAddShoppingCart className="items-center" />
									</span>
								</span>
							</div>
						</div>
					</div>
				))}
			</div>
		</div>
	)
}

export default BestSellersProducts