import React from 'react'

const MoreProducts = () => {
	return (
		<section className="w-screen h-fit flex flex-col space-y-3 px-10">
			<div className="flex space-x-5 justify-center px-30 my-2 border-b-2 border-gray-300 py-2 w-full mx-auto">
				<span className="flex text-sm font-normal border-2 rounded-xl py-.5 px-2 border-yellow-400">Best Deals</span>
				<span className="flex text-sm font-normal hover:border-2 hover:rounded-xl hover:py-.5 hover:px-2 cursor-pointer transition-all delay-300 hover:border-yellow-400">TV & Video</span>
				<span className="flex text-sm font-normal hover:border-2 hover:rounded-xl hover:py-.5 hover:px-2 cursor-pointer transition-all delay-300 hover:border-yellow-400">Cameras</span>
				<span className="flex text-sm font-normal hover:border-2 hover:rounded-xl hover:py-.5 hover:px-2 cursor-pointer transition-all delay-300 hover:border-yellow-400">Audio</span>
				<span className="flex text-sm font-normal hover:border-2 hover:rounded-xl hover:py-.5 hover:px-2 cursor-pointer transition-all delay-300 hover:border-yellow-400">Cellphones</span>
				<span className="flex text-sm font-normal hover:border-2 hover:rounded-xl hover:py-.5 hover:px-2 cursor-pointer transition-all delay-300 hover:border-yellow-400">GPS & Navigation</span>
				<hr className="border-b-2 border-gray-500" />
			</div>
			{/*products*/}
			<div className="grid grid-cols-12 gap-x-1 bg-red-400 h-20">
				
			</div>
			{/*two prods*/}

			{/*one prods*/}
			{/*two prods*/}
		</section>
	)
}

export default MoreProducts