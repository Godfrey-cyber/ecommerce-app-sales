import React from 'react'
import { MdOutlineAddShoppingCart } from "react-icons/md";
import { FaRegHeart } from "react-icons/fa";
import { BsArrowsFullscreen } from "react-icons/bs";
import { products, categories } from "../assets/products.js"

const MoreProducts = () => {
	// const name = products.slice(0,2).map(item => item)
		console.log(products.map(item => item.name))
		console.log(products)
	return (
		<section className="w-full h-fit flex flex-col space-y-3 mb-5 px-10">
			<div className="flex space-x-5 justify-center px-30 my-2 border-b border-gray-300 py-2 w-full mx-auto h-10">
				{categories.map(cat => (
					<span className="flex text-sm font-normal active:border-2 hover:rounded-xl py-.5 px-2 hover:border-yellow-400 w-fit cursor-pointer traansition-all delay-200">{cat}</span>
				))}
				<hr className="border-b-2 border-gray-500" />
			</div>
			{/*products*/}
			<div className="grid grid-cols-12 gap-x-1">
				{/*two prods*/}
				<div className="col-span-4 flex flex-col space-x-2 items-center">
					<div className="grid grid-cols-2 gap-2 divide-x">
						{products.slice(2, 6).map(item => (
							<div className="flex flex-col space-y-2 w-52  h-72 p-4 rounded-sm hover:shadow-2xl shadow-gray-800 items-center">
								<p className="text-xs text-gray-500">{item.category}</p>
								<p className="text-sm text-blue-600 font-medium">{item.name.length > 19 ? item.name.slice(0,18) : item.name}</p>
								<img className="h-32 min-w-40 cursor-pointer object-cover" src={item.image} alt="" />
								<span className="flex items-center justify-between w-full">
									<p className="text-sm font-normal text-lg text-gray-800">{item.price}</p>
									<span className="flex items-center space-x-3 justify-center cursor-pointer bg-yellow-400 h-8 w-8 rounded-full">
										<MdOutlineAddShoppingCart className="items-center" />
									</span>
								</span>
							</div>
						))}
					</div>
				</div>
				{/*one product*/}
				<div className="col-span-4 flex-col">
					<div className="flex flex-col space-y-2 rounded-sm hover:shadow-3xl h-full justify-center items-center shadow-gray-800 items-center relative hover:border hover:border-gray-300">
						<span className="flex flex-col items-center justify-center space-x-1 absolute top-20 right-4 bg-yellow-400 rounded-full h-16 w-16">
								<p className="text-sm font-light text-black">Save</p>
								<p className="text-xl font-bold text-black">10%</p>
						</span>
						<p className="text-lg text-gray-500">Donna Karan</p>
						<p className="text-sm text-blue-600 font-medium">Vivo Y03 2024</p>
						<img className="h-80 w-80 cursor-pointer" src="https://electrox.arenacommerce.com/cdn/shop/products/1.png?v=1649393409&width=540" alt="" />
						<div className="flex space-x-3 items-center">
							<span className="h-12 w-12 border border-gray-300 hover:border-b-2 hover:border-b-yellow-400 items-center flex">
								<img className="h-10 w-10 cursor-pointer items-center" src="https://electrox.arenacommerce.com/cdn/shop/products/lgphone.png?v=1649399950&width=180" alt="" />
							</span>
							<span className="h-12 w-12 border border-gray-300 items-center flex">
								<img className="h-10 w-10 cursor-pointer items-center object-cover" src="https://electrox.arenacommerce.com/cdn/shop/products/lgphone.png?v=1649399950&width=180" alt="" />
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
					<div className="grid grid-cols-2 gap-2 divide-x">
						{products.slice(0, 4).map(item => (
							<div className="flex flex-col space-y-2 w-52 h-72 p-4 rounded-sm hover:shadow-2xl shadow-gray-800 items-center">
								<p className="text-xs text-gray-500">{item.category}</p>
								<p className="text-sm text-blue-600 font-medium">{item.name.length > 19 ? item.name.slice(0,18) : item.name}</p>
								<img className="h-32 min-w-40 cursor-pointer object-cover" src={item.image} alt="" />
								<span className="flex items-center justify-between w-full">
									<p className="text-sm font-normal text-lg text-gray-800">{item.price}</p>
									<span className="flex items-center space-x-3 justify-center cursor-pointer bg-yellow-400 h-8 w-8 rounded-full">
										<MdOutlineAddShoppingCart className="items-center" />
									</span>
								</span>
							</div>
						))}
					</div>
					{/*<div className="flex items-center justify-between divide-x">
						{products.slice(3, 5).map(item => (
							<div className="flex flex-col space-y-2 w-48 h-72 p-4 rounded-sm hover:shadow-2xl shadow-gray-800 items-center">
								<p className="text-xs text-gray-500">{item.category}</p>
								<p className="text-sm text-blue-600 font-medium">{item.name.length > 19 ? item.name.slice(0,18) : item.name}</p>
								<img className="h-32 w-44 cursor-pointer" src={item.image} alt="" />
								<span className="flex items-center justify-between w-full">
									<p className="text-sm font-normal text-lg text-gray-800">{item.price}</p>
									<span className="flex items-center space-x-3 justify-center cursor-pointer bg-yellow-400 h-8 w-8 rounded-full">
										<MdOutlineAddShoppingCart className="items-center" />
									</span>
								</span>
							</div>
						))}
					</div>*/}
				</div>
			</div>
		</section>
	)
}

export default MoreProducts