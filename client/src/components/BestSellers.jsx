import React from 'react'
import BestSellersProducts from "./BestSellersProducts.jsx"

const BestSellers = () => {
	return (
		<section className="w-full h-fit px-5 lg:px-10 my-2 lg:my-5 overflow-x-scroll">
			<div className="xs:flex-col lg:flex justify-between lg:items-center border-b border-gray-300 w-full">
				<span className="flex items-center text-center border-b-2 border-yellow-500 cursor-pointer py-1">
					<p className="text-lg font-semibold text-gray-800">Best Sellers</p>
				</span>
				<div className="flex justify-center items-center overflow-x-scroll w-full ">
					<span className="text-sm text-black font-semibold border-2 border-yellow-500 rounded-2xl px-4 cursor-pointer py-1">Top 20</span>
					<span className="text-sm text-black font-semibold px-4 cursor-pointer py-1">Phones & Tablets</span>
					<span className="text-sm text-black font-semibold px-4 cursor-pointer py-1">Laptops & Computers</span>
					<span className="text-sm text-black font-semibold px-4 cursor-pointer py-1">Video Cameras</span>
				</div>
			</div>
			<BestSellersProducts />
		</section>
	)
}

export default BestSellers