import { useState } from "react";
import BestSellersProducts from "./BestSellersProducts.jsx"

const BestSellers = () => {
const categories = ["Top 20", "Phones & Tablets", "Laptops & Computers", "Video Cameras"];
const [active, setActive] = useState("Top 20");
	return (
		// <section className="w-full h-fit px-5 lg:px-10 my-2 lg:my-5 overflow-x-scroll">
		// 	<div className="xs:flex-col lg:flex justify-between lg:items-center border-b border-gray-300 w-full">
		// 		<span className="flex items-center text-center border-b-2 border-yellow-500 cursor-pointer py-1 w-full">
		// 			<p className="text-lg font-semibold text-gray-800">Best Sellers</p>
		// 		</span>
		// 		<div className="flex justify-center items-center overflow-x-scroll w-full ">
		// 			<span className="text-sm text-black font-semibold border-2 border-yellow-500 rounded-2xl px-4 cursor-pointer py-1">Top 20</span>
		// 			<span className="text-sm text-black font-semibold px-4 cursor-pointer py-1">Phones & Tablets</span>
		// 			<span className="text-sm text-black font-semibold px-4 cursor-pointer py-1">Laptops & Computers</span>
		// 			<span className="text-sm text-black font-semibold px-4 cursor-pointer py-1">Video Cameras</span>
		// 		</div>
		// 	</div>
		// 	<BestSellersProducts />
		// </section>
		<section className="w-full px-1 md:px-5 lg:px-10 my-2 lg:my-5">
	      <div className="flex items-stretch border-b-[1.5px] border-gray-200 gap-0">

	        {/* Section Title with amber underline */}
	        <div className="relative flex items-center pr-5 flex-shrink-0 after:absolute after:bottom-[-1.5px] after:left-0 after:right-0 after:h-[2px] after:bg-amber-600">
	          <span className="text-[15px] font-semibold text-gray-900 tracking-tight whitespace-nowrap">
	            Best Sellers
	          </span>
	        </div>

	        {/* Divider */}
	        <div className="w-px bg-gray-200 self-stretch mx-4 my-2" />

	        {/* Tabs */}
	        <div className="flex items-center gap-0.5 overflow-x-auto scrollbar-hide flex-1 pb-0">
	          {categories.map((cat) => (
	            <button
	              key={cat}
	              onClick={() => setActive(cat)}
	              className={`
	                relative bottom-[-1.5px] flex items-center gap-1.5 px-3.5 py-2 rounded-md
	                text-[13px] font-medium whitespace-nowrap border transition-all duration-150
	                ${active === cat
	                  ? "text-amber-800 bg-amber-50 border-amber-200"
	                  : "text-gray-500 border-transparent hover:text-gray-800 hover:bg-gray-100"
	                }
	              `}
	            >
	              <span className={`w-1.5 h-1.5 rounded-full bg-amber-600 flex-shrink-0 transition-opacity duration-150 ${active === cat ? "opacity-100" : "opacity-0"}`} />
	              {cat}
	            </button>
	          ))}
	        </div>

	      </div>
	      <BestSellersProducts />
    	</section>
	)
}

export default BestSellers