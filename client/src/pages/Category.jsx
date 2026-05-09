import { useRef, useState } from "react";
import Navbar from "../components/homepage/Navbar.jsx"
import { useParams, Link } from "react-router-dom"
import { Zap, ChevronLeft, ChevronRight, TrendingUp } from "lucide-react";

import { useGetCategoriesQuery, useGetCatProductsQuery } from "../redux/categoriesApi.jsx"
import { useGetProductsQuery, useGetProductByCategoryQuery } from "../redux/productsApi.jsx"
import SectionHeader from "../components/homepage/SectionHeader.jsx";
import ProductCard2 from "../components/ProductCard2.jsx";
import Footer2 from "../components/Footer2.jsx";
import FlashCard from "../components/homepage/FlashCard.jsx";

const Category = () => {
	const { category } = useParams() // "computing"
	const [page, setPage] = useState(1);
	const { data:categories, isLoading:loadingCat } = useGetCategoriesQuery();
	const { data:products, error, isLoading } = useGetProductsQuery();
	const { data, isLoading: isProductLoading } = useGetProductByCategoryQuery({ category, page });
	const scrollRef = useRef(null);

	console.log("data", data?.category)
	console.log("products", data?.products)
	console.log("subcategories", data?.subcategories)
	console.log("categorry", category)

	const scroll = (dir) => {
	    if (scrollRef.current) scrollRef.current.scrollLeft += dir * 280;
	};

	return (
		<div className="w-full min-h-screen">
			<Navbar categories={categories} category={category} />
			<section className="flex flex-col px-5 md:px-15 lg:px-20 my-4">
				{/* ── Shop by Category ── */}
		        <div>
		          <SectionHeader icon={null} tag="Browse" title="Shop by Sub Category" />
		          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
		            {data?.subcategories?.map(c => (
		              <Link key={c._id} to={`/categories/${c.slug}`} className="group flex flex-col items-center gap-3 rounded-2xl py-6 px-4 hover:shadow-md transition-all duration-200 border border-transparent hover:border-amber-200 text-center">
		                <span className="text-3xl group-hover:scale-110 transition-transform duration-300">{c?.icon}</span>
		                <div>
		                  <p className={`text-xs font-bold ${c?.accent} leading-tight`}>{c?.title}</p>
		                  <p className="text-[10px] text-gray-400 mt-0.5">{c?.count}</p>
		                </div>
		              </Link>
		            ))}
		          </div>
		        </div>
				<div className="my-2 md:my-4 lg:my-6">
		          	<div className="flex items-end justify-between mb-6">
		            	<SectionHeader icon={TrendingUp} tag="This Week" title={`${data?.category?.title}`} sub="Most loved by shoppers" />
		            	<div className="hidden lg:flex gap-2 mb-6">
		              		<button onClick={() => scroll(-1)} className="w-8 h-8 rounded-full border border-gray-200 hover:border-gray-300 flex items-center justify-center transition-colors"><ChevronLeft className="w-4 h-4 text-gray-600" /></button>
		              		<button onClick={() => scroll(1)}  className="w-8 h-8 rounded-full border border-gray-200 hover:border-gray-300 flex items-center justify-center transition-colors"><ChevronRight className="w-4 h-4 text-gray-600" /></button>
		            	</div>
		          	</div>
		          	<div ref={scrollRef} className="flex gap-4 overflow-x-auto scrollbar-hide pb-2 snap-x">
		            	{data?.products.slice(0, 9).map(product => (
		              		<div key={product._id} className="flex-shrink-0 w-44 lg:w-52 snap-start">
		                		<ProductCard2 product={product} key={product._id} />
		              		</div>
		            	))}
		          	</div>
	        	</div>
        	</section>
        	<Footer2 />
		</div>
	)
}

export default Category