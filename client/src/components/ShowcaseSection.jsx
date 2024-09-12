import React from 'react'
import { MdChevronRight } from "react-icons/md";

const ShowcaseSection = () => {
	return (
		<div className="grid grid-cols-12 h-[450px] w-full px-2 md:px-10 lg:px-20 my-8 gap-y-6 lg:gap-x-6">
			<div className="col-span-12 lg:col-span-9 flex justify-between items-center bg-gray-100  px-7 py-4 md:px-10  w-full h-full">
				{/*desc*/}
				<div className="flex flex-col space-y-4 lg:space-y-3 w-1/2">
					<p className="text-3xl lg:text-6xl text-gray-800">THE NEW <span>STANDARD</span></p>
					<p className="text-sm text-gray-800">UNDER FAVOURABLE SMART WATCHES FROM</p>
					<p className="text-2xl lg:text-5xl font-bold text-gray-800">Ksh. 740.99</p>
					<button className="bg-yellow-400 font-bold text-sm px-8 py-3 my-4 rounded-md w-fit cursor-pointer">Buy Now</button>
				</div>
				<div className="flex h-fit w-fit">
					<img src="https://electrox.arenacommerce.com/cdn/shop/files/slider-img-h4-1.png?v=1650005832&width=338" alt="" />
				</div>
			</div>
			<div className="flex col-span-12 grid grid-cols-3 lg:grid-cols-1 lg:col-span-3 flex justify-between items-center gap-x-2 lg:gap-x-0 lg:gap-y-2">
				<div className="xs:flex-col lg:flex justify-between space-x-.5 lg:space-x-3 items-center bg-gray-100 rounded-sm p-3 lg:p-3">
					<img className="cursor-pointer h-20 w-20 " src="https://electrox.arenacommerce.com/cdn/shop/files/slider-img-h4-1.png?v=1650005832&width=338" alt="" />
					<div className="cursor-pointer">
						<p className="text-xs lg:text-xl lg:font-normal font-semibold lg:text-2xl text-gray-800">CATCH BIG DEALS ON THE CAMERAS</p>
						<div className="flex items-center space-x-2 mt-2">
							<p className="text-sm font-semibold">Buy now</p>
							<span className="flex items-center space-x-3 justify-center bg-yellow-400 h-5 w-5 rounded-full">
								<MdChevronRight className="items-center" />
							</span>
						</div>
					</div>
				</div>
				<div className="xs:flex-col lg:flex justify-between space-x-.5 lg:space-x-3 items-center bg-gray-100 rounded-sm p-3 lg:p-3">
					<img className="cursor-pointer h-20 w-20 " src="https://electrox.arenacommerce.com/cdn/shop/files/image-right-h4-2.png?v=1651141955&width=100" alt="" />
					<div className="cursor-pointer">
						<p className="text-xs lg:text-xl lg:font-normal font-semibold lg:text-2xl text-gray-800">CATCH BIG DEALS ON THE CAMERAS</p>
						<div className="flex items-center space-x-2 mt-2">
							<p className="text-sm font-semibold">Buy now</p>
							<span className="flex items-center space-x-3 justify-center bg-yellow-400 h-5 w-5 rounded-full">
								<MdChevronRight className="items-center" />
							</span>
						</div>
					</div>
				</div>
				<div className="xs:flex-col lg:flex justify-between space-x-.5 lg:space-x-3 items-center bg-gray-100 rounded-sm p-3 lg:p-3">
					<img className="cursor-pointer h-20 w-20 " src="https://electrox.arenacommerce.com/cdn/shop/files/image-right-h4-3.png?v=1651141968&width=100" alt="" />
					<div className="cursor-pointer">
						<p className="text-xs lg:text-xl lg:font-normal font-semibold lg:text-2xl text-gray-800">CATCH BIG DEALS ON THE CAMERAS</p>
						<div className="flex items-center space-x-2 mt-2">
							<p className="text-sm font-semibold">Buy now</p>
							<span className="flex items-center space-x-3 justify-center bg-yellow-400 h-5 w-5 rounded-full">
								<MdChevronRight className="items-center" />
							</span>
						</div>
					</div>
				</div>
			</div>
		</div>
	)
}

export default ShowcaseSection