import React from 'react'
import { MdOutlineAddShoppingCart } from "react-icons/md";
import { FaRegHeart } from "react-icons/fa";
import { BsArrowsFullscreen } from "react-icons/bs";

const ProductsCat = () => {
	return (
		<div className="w-full h-fit bg-gray-50 px-20">
			<span className="flex items-center space-x-6  border-b border-gray-300 py-2">
				<p className="text-lg font-medium active:border-b active:border-yellow-400 cursor-pointer">Featured</p>
				<p className="text-lg font-light active:border-b active:border-yellow-400 cursor-pointer">Top Rated</p>
				<p className="text-lg font-light active:border-b active:border-yellow-400 cursor-pointer">On sale</p>
			</span>
			<div className="flex justify-between items-center my-6 mb-12">
				{/*products*/}
				<div className="flex flex-col space-y-2 w-48 h-72 p-4 rounded-sm hover:shadow-md shadow-gray-500 items-center">
					<p className="text-xs text-gray-500">Donna Karan</p>
					<p className="text-sm text-blue-600 font-medium">Vivo Y03 2024</p>
					<img className="h-32 w-32 cursor-pointer" src="https://electrox.arenacommerce.com/cdn/shop/products/apptablet_a5640c96-4b53-4c9c-b483-aa0f8a2c2e3c.png?v=1649399921&width=180" alt="" />
					<span className="flex items-center justify-between w-full">
						<p className="text-sm font-normal text-lg text-gray-800">Ksh. 12,500</p>
						<span className="flex items-center space-x-3 justify-center cursor-pointer bg-yellow-400 h-8 w-8 rounded-full">
							<MdOutlineAddShoppingCart className="items-center" />
						</span>
					</span>
				</div>
				<div className="flex flex-col space-y-2 w-48 h-72 p-4 rounded-sm hover:shadow-md shadow-gray-500 items-center">
					<p className="text-xs text-gray-500">Donna Karan</p>
					<p className="text-sm text-blue-600 font-medium">Vivo Y03 2024</p>
					<img className="h-32 w-32 cursor-pointer" src="https://electrox.arenacommerce.com/cdn/shop/products/lgphone.png?v=1649399950&width=180" alt="" />
					<span className="flex items-center justify-between w-full">
						<p className="text-sm font-normal text-lg text-gray-800">Ksh. 12,500</p>
						<span className="flex items-center space-x-3 justify-center cursor-pointer bg-yellow-400 h-8 w-8 rounded-full">
							<MdOutlineAddShoppingCart className="items-center" />
						</span>
					</span>
				</div>
				<div className="flex flex-col space-y-2 w-48 h-72 p-4 rounded-sm hover:shadow-md shadow-gray-500 items-center">
					<p className="text-xs text-gray-500">Donna Karan</p>
					<p className="text-sm text-blue-600 font-medium">Vivo Y03 2024</p>
					<img className="h-32 w-32 cursor-pointer" src="https://electrox.arenacommerce.com/cdn/shop/products/bluePhone_a39e84fa-4375-49b0-922c-cc70c9076080.png?v=1649399976&width=180" alt="" />
					<span className="flex items-center justify-between w-full">
						<p className="text-sm font-normal text-lg text-gray-800">Ksh. 12,500</p>
						<span className="flex items-center space-x-3 justify-center cursor-pointer bg-yellow-400 h-8 w-8 rounded-full">
							<MdOutlineAddShoppingCart className="items-center" />
						</span>
					</span>
				</div>
				<div className="flex flex-col space-y-2 w-48 h-72 p-4 rounded-sm hover:shadow-md shadow-gray-500 items-center">
					<p className="text-xs text-gray-500">Donna Karan</p>
					<p className="text-sm text-blue-600 font-medium">Vivo Y03 2024</p>
					<img className="h-32 w-32 cursor-pointer" src="https://electrox.arenacommerce.com/cdn/shop/products/watchsmart_990c1e8f-39b4-4b67-8b2d-68bcdc260006.png?v=1649400113&width=180" alt="" />
					<span className="flex items-center justify-between w-full">
						<p className="text-sm font-normal text-lg text-gray-800">Ksh. 12,500</p>
						<span className="flex items-center space-x-3 justify-center cursor-pointer bg-yellow-400 h-8 w-8 rounded-full">
							<MdOutlineAddShoppingCart className="items-center" />
						</span>
					</span>
				</div>
				<div className="flex flex-col space-y-2 w-48 h-72 p-4 rounded-sm hover:shadow-md shadow-gray-500 items-center">
					<p className="text-xs text-gray-500">Donna Karan</p>
					<p className="text-sm text-blue-600 font-medium">Vivo Y03 2024</p>
					<img className="h-32 w-32 cursor-pointer" src="https://electrox.arenacommerce.com/cdn/shop/products/sam1_5f4ad13a-1f0a-4019-b848-9d245ffd7141.png?v=1649400167&width=180" alt="" />
					<span className="flex items-center justify-between w-full">
						<p className="text-sm font-normal text-lg text-gray-800">Ksh. 12,500</p>
						<span className="flex items-center space-x-3 justify-center cursor-pointer bg-yellow-400 h-8 w-8 rounded-full">
							<MdOutlineAddShoppingCart className="items-center" />
						</span>
					</span>
				</div>
				<div className="flex flex-col space-y-2 w-48 h-72 p-4 rounded-sm hover:shadow-md shadow-gray-500 items-center">
					<p className="text-xs text-gray-500">Donna Karan</p>
					<p className="text-sm text-blue-600 font-medium">Vivo Y03 2024</p>
					<img className="h-32 w-32 cursor-pointer" src="https://electrox.arenacommerce.com/cdn/shop/products/printer.png?v=1649393985&width=180" alt="" />
					<span className="flex items-center justify-between w-full">
						<p className="text-sm font-normal text-lg text-gray-800">Ksh. 12,500</p>
						<span className="flex items-center space-x-3 justify-center cursor-pointer bg-yellow-400 h-8 w-8 rounded-full">
							<MdOutlineAddShoppingCart className="items-center" />
						</span>
					</span>
				</div>
				<div className="flex flex-col w-48 h-80 p-4 rounded-sm hover:shadow-md shadow-gray-500 items-center group">
			        <span className="flex flex-col space-y-4">
						<p className="text-xs text-gray-500">Donna Karan</p>
						<p className="text-sm text-blue-600 font-medium">Huawei Y3 2024</p>
						<img className="h-32 w-32 cursor-pointer" src="https://electrox.arenacommerce.com/cdn/shop/products/ipadgreen.png?v=1649393790&width=180" alt="" />
					</span>
					<span className="flex items-center justify-between w-full group-hover:border-b border-gray-300 my-2">
						<p className="text-sm font-normal text-lg text-gray-800">Ksh. 12,500</p>
						<span className="flex items-center space-x-3 justify-center cursor-pointer bg-yellow-400 h-8 w-8 rounded-full">
							<MdOutlineAddShoppingCart className="items-center" />
						</span>
						<hr className="bg-gray-300 border-b border-gray-300 my-1" />
					</span>
					<div className="flex justify-between items-center w-full hidden group-hover:inline-flex transition delay-300 mt-2">
						<span className="flex items-center space-x-3 justify-center cursor-pointer bg-yellow-400 h-8 w-8 rounded-full">
							<FaRegHeart className="items-center" />
						</span>
						<span className="flex items-center space-x-3 justify-center cursor-pointer bg-yellow-400 h-8 w-8 rounded-full">
							<BsArrowsFullscreen className="items-center" />
						</span>
					</div>
				</div>

			</div>	
		</div>
	)
}

export default ProductsCat