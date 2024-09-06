import React from 'react'
import { products } from "../assets/products.js"

const ProfiledProducts = () => {
	return (
		<section className="w-full h-fit px-5 lg:px-10 my-8 py-2 mx-auto">
			<div className="grid grid-cols-12 gap-x-0 lg:gap-x-8 h-full w-full mx-auto">
				<div className="col-span-12 lg:col-span-3 flex-col space-y-4 h-fit w-full">
					<span className="flex-col space-x-3 w-full text-lg cursor-pointer font-normal py-1.5 text-black border-b border-yellow-400">
						Featured Products
						<div className="border-b border-gray-300 w-full h-1"></div>
					</span>
					{products.slice(0,3).map(item => (
						<div key={item.id} className="flex space-x-5 py-1 cursor-pointer group">
							<img className="h-28 w-28 object-cover" src={item.image} alt={item.image} />
							<div className="flex flex-col lg:space-y-1 lg:space-y-2">
								<p className="text-sm font-bold group-hover:text-yellow-400 transition-all delay-300 text-blue-600">{item.name}</p>
								<span className="flex items-center space-x-4">
									<p className="text-sm font-normal text-red-400">Ksh. {item.price}</p>
									<p className="text-sm font-light text-gray-500 text-decoration-strike">Ksh. {item.price}</p>
								</span>
							</div>
						</div>
					))}
				</div>
				<div className="col-span-12 lg:col-span-3 flex-col space-y-4 h-fit w-full">
					<span className="flex-col space-x-3 w-full text-lg cursor-pointer font-normal py-1.5 text-black border-b border-yellow-400">
						Onsale Products
						<div className="border-b border-gray-300 w-full h-1"></div>
					</span>
					{products.slice(0,3).map(item => (
						<div key={item.id} className="flex space-x-5 py-1 cursor-pointer group">
							<img className="h-28 w-28 object-cover" src={item.image} alt={item.image} />
							<div className="flex flex-col lg:space-y-1 lg:space-y-2">
								<p className="text-sm font-bold group-hover:text-yellow-400 transition-all delay-300 text-blue-600">{item.name}</p>
								<span className="flex items-center space-x-4">
									<p className="text-sm font-normal text-red-400">Ksh. {item.price}</p>
									<p className="text-sm font-light text-gray-500 text-decoration-strike">Ksh. {item.price}</p>
								</span>
							</div>
						</div>
					))}
				</div>
				<div className="col-span-12 lg:col-span-3 flex-col space-y-4 h-fit w-full">
					<span className="flex-col space-x-3 w-full text-lg cursor-pointer font-normal py-1.5 text-black border-b border-yellow-400">
						Top Rated Products
						<div className="border-b border-gray-300 w-full h-1"></div>
					</span>
					{products.slice(0,3).map(item => (
						<div key={item.id} className="flex space-x-5 py-1 cursor-pointer group">
							<img className="h-28 w-28 object-cover" src={item.image} alt={item.image} />
							<div className="flex flex-col lg:space-y-1 lg:space-y-2">
								<p className="text-sm font-bold group-hover:text-yellow-400 transition-all delay-300 text-blue-600">{item.name}</p>
								<span className="flex items-center space-x-4">
									<p className="text-sm font-normal text-red-400">Ksh. {item.price}</p>
									<p className="text-sm font-light text-gray-500 text-decoration-strike">Ksh. {item.price}</p>
								</span>
							</div>
						</div>
					))}
				</div>
				<div className="col-span-12 lg:col-span-3 h-fit w-full cursor-pointer">
					<img className="w-full lg:w-auto lg:h-auto h-80 object-cover" src="https://electrox.arenacommerce.com/cdn/shop/files/v2-right-1.jpg?v=1649837269&width=329" alt="" />
				</div>
			</div>
		</section>
	)
}

export default ProfiledProducts