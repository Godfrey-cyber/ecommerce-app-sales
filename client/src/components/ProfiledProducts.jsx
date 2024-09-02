import React from 'react'
import { products } from "../assets/products.js"

const ProfiledProducts = () => {
	return (
		<section className="w-full h-[340px] bg-red-50 px-10 my-8 py-2">
			<div className="grid grid-cols-4 gap-x-8 h-full w-full">
				<div className="flex flex-col space-y-4 h-36 w-full">
					<span className="w-full text-lg cursor-pointer font-normal py-3 text-black border-b border-yellow-400">
						Featured Products
					</span>
					{products.slice(0,3).map(item => (
						<div className="flex space-x-5 py-1 cursor-pointer group">
							<img className="h-16 w-16 object-cover" src={item.image} alt={item.image} />
							<div className="flex flex-col space-y-2">
								<p className="text-sm font-semibold group-hover:text-yellow-400 transition-all delay-300 text-blue-500">{item.name}</p>
								<span className="flex items-center space-x-4">
									<p className="text-sm font-normal text-red-400">Ksh. {item.price}</p>
									<p className="text-sm font-light text-gray-500 text-decoration-strike">Ksh. {item.price}</p>
								</span>
							</div>
						</div>
					))}
				</div>
				<div className="flex flex-col space-y-4 h-36 w-full">
					<span className="w-full text-lg cursor-pointer font-normal py-3 text-black border-b border-yellow-400">
						Onsale Products
					</span>
					{products.slice(0,3).map(item => (
						<div className="flex space-x-5 py-1 cursor-pointer group">
							<img className="h-16 w-16 object-cover" src={item.image} alt={item.image} />
							<div className="flex flex-col space-y-2">
								<p className="text-sm font-semibold group-hover:text-yellow-400 transition-all delay-300 text-blue-500">{item.name}</p>
								<span className="flex items-center space-x-4">
									<p className="text-sm font-normal text-red-400">Ksh. {item.price}</p>
									<p className="text-sm font-light text-gray-500 text-decoration-strike">Ksh. {item.price}</p>
								</span>
							</div>
						</div>
					))}
				</div>
				<div className="flex flex-col space-y-4 h-36 w-full">
					<span className="w-full text-lg cursor-pointer font-normal py-3 text-black border-b border-yellow-400">
						Top Rated Products
					</span>
					{products.slice(0,3).map(item => (
						<div className="flex space-x-5 py-1 cursor-pointer group">
							<img className="h-16 w-16 object-cover" src={item.image} alt={item.image} />
							<div className="flex flex-col space-y-2">
								<p className="text-sm font-semibold group-hover:text-yellow-400 transition-all delay-300 text-blue-500">{item.name}</p>
								<span className="flex items-center space-x-4">
									<p className="text-sm font-normal text-red-400">Ksh. {item.price}</p>
									<p className="text-sm font-light text-gray-500 text-decoration-strike">Ksh. {item.price}</p>
								</span>
							</div>
						</div>
					))}
				</div>
				<div className="h-36 w-full cursor-pointer">
					<img className="w-fit h-fit object-cover" src="https://electrox.arenacommerce.com/cdn/shop/files/v2-right-1.jpg?v=1649837269&width=329" alt="" />
				</div>
			</div>
		</section>
	)
}

export default ProfiledProducts