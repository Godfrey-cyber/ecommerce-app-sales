import React from 'react'
import { MdOutlineAddShoppingCart } from "react-icons/md";
import { FaRegHeart } from "react-icons/fa";
import { BsArrowsFullscreen } from "react-icons/bs";

const MoreProducts = () => {
	return (
		<section className="w-full h-fit flex flex-col space-y-3 mb-5 px-10">
			<div className="flex space-x-5 justify-center px-30 my-2 border-b border-gray-300 py-2 w-full mx-auto">
				<span className="flex text-sm font-normal border-2 rounded-xl py-.5 px-2 border-yellow-400">Best Deals</span>
				<span className="flex text-sm font-normal hover:border-2 hover:rounded-xl hover:py-.5 hover:px-2 cursor-pointer transition-all delay-300 hover:border-yellow-400">TV & Video</span>
				<span className="flex text-sm font-normal hover:border-2 hover:rounded-xl hover:py-.5 hover:px-2 cursor-pointer transition-all delay-300 hover:border-yellow-400">Cameras</span>
				<span className="flex text-sm font-normal hover:border-2 hover:rounded-xl hover:py-.5 hover:px-2 cursor-pointer transition-all delay-300 hover:border-yellow-400">Audio</span>
				<span className="flex text-sm font-normal hover:border-2 hover:rounded-xl hover:py-.5 hover:px-2 cursor-pointer transition-all delay-300 hover:border-yellow-400">Cellphones</span>
				<span className="flex text-sm font-normal hover:border-2 hover:rounded-xl hover:py-.5 hover:px-2 cursor-pointer transition-all delay-300 hover:border-yellow-400">GPS & Navigation</span>
				<hr className="border-b-2 border-gray-500" />
			</div>
			{/*products*/}
			<div className="grid grid-cols-12 gap-x-1">
				{/*two prods*/}
				<div className="col-span-4 flex flex-col space-x-2 items-center">
					<div className="flex items-center justify-between">
						<div className="flex flex-col space-y-2 w-48 h-72 p-4 rounded-sm hover:shadow-2xl shadow-gray-800 items-center">
							<p className="text-xs text-gray-500">Donna Karan</p>
							<p className="text-sm text-blue-600 font-medium">Vivo Y03 2024</p>
							<img className="h-32 w-44 cursor-pointer" src="https://electrox.arenacommerce.com/cdn/shop/products/lgphone.png?v=1649399950&width=180" alt="" />
							<span className="flex items-center justify-between w-full">
								<p className="text-sm font-normal text-lg text-gray-800">Ksh. 12,500</p>
								<span className="flex items-center space-x-3 justify-center cursor-pointer bg-yellow-400 h-8 w-8 rounded-full">
									<MdOutlineAddShoppingCart className="items-center" />
								</span>
							</span>
						</div>
						<div className="flex flex-col space-y-2 w-48 h-72 p-4 rounded-sm hover:shadow-2xl shadow-gray-800 items-center">
							<p className="text-xs text-gray-500">Donna Karan</p>
							<p className="text-sm text-blue-600 font-medium">Vivo Y03 2024</p>
							<img className="h-32 w-44 cursor-pointer" src="https://electrox.arenacommerce.com/cdn/shop/products/lgphone.png?v=1649399950&width=180" alt="" />
							<span className="flex items-center justify-between w-full">
								<p className="text-sm font-normal text-lg text-gray-800">Ksh. 12,500</p>
								<span className="flex items-center space-x-3 justify-center cursor-pointer bg-yellow-400 h-8 w-8 rounded-full">
									<MdOutlineAddShoppingCart className="items-center" />
								</span>
							</span>
						</div>
					</div>
					<div className="flex items-center justify-between">
						<div className="flex flex-col space-y-2 w-48 h-72 p-4 rounded-sm hover:shadow-2xl shadow-gray-800 items-center">
							<p className="text-xs text-gray-500">Donna Karan</p>
							<p className="text-sm text-blue-600 font-medium">Vivo Y03 2024</p>
							<img className="h-32 w-44 cursor-pointer" src="https://electrox.arenacommerce.com/cdn/shop/products/lgphone.png?v=1649399950&width=180" alt="" />
							<span className="flex items-center justify-between w-full">
								<p className="text-sm font-normal text-lg text-gray-800">Ksh. 12,500</p>
								<span className="flex items-center space-x-3 justify-center cursor-pointer bg-yellow-400 h-8 w-8 rounded-full">
									<MdOutlineAddShoppingCart className="items-center" />
								</span>
							</span>
						</div>
						<div className="flex flex-col space-y-2 w-48 h-72 p-4 rounded-sm hover:shadow-2xl shadow-gray-800 items-center">
							<p className="text-xs text-gray-500">Donna Karan</p>
							<p className="text-sm text-blue-600 font-medium">Vivo Y03 2024</p>
							<img className="h-32 w-44 cursor-pointer" src="https://electrox.arenacommerce.com/cdn/shop/products/lgphone.png?v=1649399950&width=180" alt="" />
							<span className="flex items-center justify-between w-full">
								<p className="text-sm font-normal text-lg text-gray-800">Ksh. 12,500</p>
								<span className="flex items-center space-x-3 justify-center cursor-pointer bg-yellow-400 h-8 w-8 rounded-full">
									<MdOutlineAddShoppingCart className="items-center" />
								</span>
							</span>
						</div>
					</div>
				</div>
				{/*one product*/}
				<div className="col-span-4 flex-col">
					<div className="flex flex-col space-y-2 rounded-sm hover:shadow-2xl h-full justify-center items-center shadow-gray-800 items-center">
						<p className="text-lg text-gray-500">Donna Karan</p>
						
						<p className="text-sm text-blue-600 font-medium">Vivo Y03 2024</p>
						<img className="h-80 w-80 cursor-pointer" src="https://electrox.arenacommerce.com/cdn/shop/products/1.png?v=1649393409&width=540" alt="" />
						<div className="flex space-x-3 items-center">
							<span className="h-12 w-12 border border-gray-300 hover:border-b-2 hover:border-b-yellow-400 items-center flex">
								<img className="h-10 w-10 cursor-pointer items-center" src="https://electrox.arenacommerce.com/cdn/shop/products/lgphone.png?v=1649399950&width=180" alt="" />
							</span>
							<span className="h-12 w-12 border border-gray-300 items-center flex">
								<img className="h-10 w-10 cursor-pointer items-center" src="https://electrox.arenacommerce.com/cdn/shop/products/lgphone.png?v=1649399950&width=180" alt="" />
							</span>
							<span className="h-12 w-12 border border-gray-300 items-center flex">
								<img className="h-10 w-10 cursor-pointer items-center" src="https://electrox.arenacommerce.com/cdn/shop/products/lgphone.png?v=1649399950&width=180" alt="" />
							</span>
						</div>
						<span className="flex items-center justify-between w-4/5 border-b py-2 border-gray-300 px-4">
							<p className="text-2xl font-normal text-lg text-gray-800">Ksh. 12,500</p>
							<span className="flex items-center space-x-3 justify-center cursor-pointer bg-yellow-400 h-8 w-8 rounded-full">
								<MdOutlineAddShoppingCart className="items-center" />
							</span>
						</span>
					</div>

				</div>
				{/*two prods*/}
				<div className="col-span-4 flex flex-col space-x-2 items-center">
					<div className="flex items-center justify-between">
						<div className="flex flex-col space-y-2 w-48 h-72 p-4 rounded-sm hover:shadow-2xl shadow-gray-800 items-center">
							<p className="text-xs text-gray-500">Donna Karan</p>
							<p className="text-sm text-blue-600 font-medium">Vivo Y03 2024</p>
							<img className="h-32 w-44 cursor-pointer" src="https://electrox.arenacommerce.com/cdn/shop/products/lgphone.png?v=1649399950&width=180" alt="" />
							<span className="flex items-center justify-between w-full">
								<p className="text-sm font-normal text-lg text-gray-800">Ksh. 12,500</p>
								<span className="flex items-center space-x-3 justify-center cursor-pointer bg-yellow-400 h-8 w-8 rounded-full">
									<MdOutlineAddShoppingCart className="items-center" />
								</span>
							</span>
						</div>
						<div className="flex flex-col space-y-2 w-48 h-72 p-4 rounded-sm hover:shadow-2xl shadow-gray-800 items-center">
							<p className="text-xs text-gray-500">Donna Karan</p>
							<p className="text-sm text-blue-600 font-medium">Vivo Y03 2024</p>
							<img className="h-32 w-44 cursor-pointer" src="https://electrox.arenacommerce.com/cdn/shop/products/lgphone.png?v=1649399950&width=180" alt="" />
							<span className="flex items-center justify-between w-full">
								<p className="text-sm font-normal text-lg text-gray-800">Ksh. 12,500</p>
								<span className="flex items-center space-x-3 justify-center cursor-pointer bg-yellow-400 h-8 w-8 rounded-full">
									<MdOutlineAddShoppingCart className="items-center" />
								</span>
							</span>
						</div>
					</div>
					<div className="flex items-center justify-between">
						<div className="flex flex-col space-y-2 w-48 h-72 p-4 rounded-sm hover:shadow-2xl shadow-gray-800 items-center">
							<p className="text-xs text-gray-500">Donna Karan</p>
							<p className="text-sm text-blue-600 font-medium">Vivo Y03 2024</p>
							<img className="h-32 w-44 cursor-pointer" src="https://electrox.arenacommerce.com/cdn/shop/products/lgphone.png?v=1649399950&width=180" alt="" />
							<span className="flex items-center justify-between w-full">
								<p className="text-sm font-normal text-lg text-gray-800">Ksh. 12,500</p>
								<span className="flex items-center space-x-3 justify-center cursor-pointer bg-yellow-400 h-8 w-8 rounded-full">
									<MdOutlineAddShoppingCart className="items-center" />
								</span>
							</span>
						</div>
						<div className="flex flex-col space-y-2 w-48 h-72 p-4 rounded-sm hover:shadow-2xl shadow-gray-800 items-center">
							<p className="text-xs text-gray-500">Donna Karan</p>
							<p className="text-sm text-blue-600 font-medium">Vivo Y03 2024</p>
							<img className="h-32 w-44 cursor-pointer" src="https://electrox.arenacommerce.com/cdn/shop/products/lgphone.png?v=1649399950&width=180" alt="" />
							<span className="flex items-center justify-between w-full">
								<p className="text-sm font-normal text-lg text-gray-800">Ksh. 12,500</p>
								<span className="flex items-center space-x-3 justify-center cursor-pointer bg-yellow-400 h-8 w-8 rounded-full">
									<MdOutlineAddShoppingCart className="items-center" />
								</span>
							</span>
						</div>
					</div>
				</div>
			</div>
		</section>
	)
}

export default MoreProducts