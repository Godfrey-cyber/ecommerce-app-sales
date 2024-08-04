import React from 'react'
import { MdOutlineAddShoppingCart } from "react-icons/md";

const ProductsCat = () => {
	return (
		<div className="w-full h-96 bg-gray-100 px-20">
			<span className="flex items-center space-x-6  border-b border-gray-300 py-2">
				<p className="text-lg font-medium active:border-b active:border-yellow-400 cursor-pointer">Featured</p>
				<p className="text-lg font-light active:border-b active:border-yellow-400 cursor-pointer">Top Rated</p>
				<p className="text-lg font-light active:border-b active:border-yellow-400 cursor-pointer">On sale</p>
			</span>
			<div className="flex justify-between items-center my-6">
				<div className="flex flex-col space-y-2 w-48 h-72 p-4 rounded-sm hover:shadow-md shadow-gray-500 items-center">
					<p className="text-xs text-gray-500">Donna Karan</p>
					<p className="text-sm text-blue-600 font-medium">Vivo Y03 2024</p>
					<img className="h-32 w-32 cursor-pointer" src="https://electrox.arenacommerce.com/cdn/shop/products/apptablet_a5640c96-4b53-4c9c-b483-aa0f8a2c2e3c.png?v=1649399921&width=180" alt="" />
					<span className="flex items-center justify-between w-full">
						<p className="text-sm font-medium text-gray-500">Ksh. 12,500</p>
						<span className="flex items-center space-x-3 justify-center cursor-pointer bg-yellow-400 h-8 w-8 rounded-full">
							<MdOutlineAddShoppingCart className="items-center" />
						</span>
					</span>
				</div>
			</div>	
		</div>
	)
}

export default ProductsCat