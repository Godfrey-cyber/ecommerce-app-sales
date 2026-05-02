import { useRef } from "react";
import Navbar from "../components/homepage/Navbar.jsx"
import { useParams } from "react-router-dom"
import { Zap, ChevronLeft, ChevronRight, TrendingUp } from "lucide-react";

import { useGetCategoriesQuery, useGetCatProductsQuery } from "../redux/categoriesApi.jsx"
import { useGetProductsQuery } from "../redux/productsApi.jsx"
import SectionHeader from "../components/homepage/SectionHeader.jsx";
import ProductCard2 from "../components/ProductCard2.jsx";
import FlashCard from "../components/homepage/FlashCard.jsx";

const Category = () => {
	const { category } = useParams()
	const { data:categories, isLoading:loadingCat } = useGetCategoriesQuery();
	const { data:products, error, isLoading } = useGetProductsQuery();
	const scrollRef = useRef(null);

	const scroll = (dir) => {
	    if (scrollRef.current) scrollRef.current.scrollLeft += dir * 280;
	};
	return (
		<div className="w-full min-h-screen">
			<Navbar categories={categories} category={category} />
			<section className="flex flex-col px-5 md:px-15 lg:px-20 my-4">
				{/* ── Flash Deals ── */}
		        {/*<div className="flex flex-col">
		          	<SectionHeader icon={Zap} tag="Today Only" title={`${category}`} sub="Grab them before they're gone" accent="red" />
		          	<div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
		            	{products?.products?.slice(0, 4).map(product => <FlashCard key={product._id} product={product} />)}
		          	</div>
		        </div>*/}

				<div className="my-2 md:my-4 lg:my-6">
		          	<div className="flex items-end justify-between mb-6">
		            	<SectionHeader icon={TrendingUp} tag="This Week" title={`${category}`} sub="Most loved by shoppers" />
		            	<div className="hidden lg:flex gap-2 mb-6">
		              		<button onClick={() => scroll(-1)} className="w-8 h-8 rounded-full border border-gray-200 hover:border-gray-300 flex items-center justify-center transition-colors"><ChevronLeft className="w-4 h-4 text-gray-600" /></button>
		              		<button onClick={() => scroll(1)}  className="w-8 h-8 rounded-full border border-gray-200 hover:border-gray-300 flex items-center justify-center transition-colors"><ChevronRight className="w-4 h-4 text-gray-600" /></button>
		            	</div>
		          	</div>
		          	<div ref={scrollRef} className="flex gap-4 overflow-x-auto scrollbar-hide pb-2 snap-x">
		            	{products?.products.slice(0, 9).map(product => (
		              		<div key={product._id} className="flex-shrink-0 w-44 lg:w-52 snap-start">
		                		<ProductCard2 product={product} key={product._id} />
		              		</div>
		            	))}
		          	</div>
	        	</div>
        	</section>
		</div>
	)
}

export default Category