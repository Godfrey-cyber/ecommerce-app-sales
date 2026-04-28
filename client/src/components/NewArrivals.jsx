import { useState } from "react";
import { products } from "../assets/products.js"
import { MdOutlineAddShoppingCart } from "react-icons/md";
import { BsArrowsFullscreen } from "react-icons/bs";
import { FaRegHeart } from "react-icons/fa";
import { Link } from "react-router-dom"
import { useGetProductsQuery } from "../redux/productsApi.jsx"
import StarRating from "./StarRating.jsx"
import { TrendingUp, Flame, Star as StarIcon } from 'lucide-react';

const NewArrivals = () => {
	const [wishlisted, setWishlisted] = useState(false);
  	const badge = true;
  	const { data, error, isLoading } = useGetProductsQuery();

	return (
		<section className="w-full h-fit bg-gray-50 px-3 md:px-5 lg:px-10">
			<div className="flex flex-col border-b border-gray-300">
				<div className="mb-6">
					<div className="flex items-center gap-2.5 mb-3">
						<div className={`w-8 h-8 rounded-lg bg-gradient-to-br from-amber-500 to-yellow-500 flex items-center justify-center flex-shrink-0`}>
							<TrendingUp className="w-4 h-4 text-white" strokeWidth={2.5} />
						</div>
						<h2 className="text-lg font-bold text-gray-900 tracking-tight">New Arrivals</h2>
					</div>
					<div className="h-0.5 bg-gradient-to-r from-orange-500 via-orange-300 to-transparent rounded-full" />
				</div>


				<div className="grid lg:grid-cols-5 grid-cols-2 gap-1 md:gap-5 lg:gap-x-3 w-full scroll-smooth snap-x">						
				{data?.products?.map(item => (
					<Link to={`/${item?.slug}/${item?._id}`} key={item?._id}>
						<div className="group relative w-62 rounded-lg bg-white border border-gray-100 shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden">
						      {/* Image Container */}
						      <div className="mx-auto relative my-3 overflow-hidden bg-gradient-to-br from-slate-50 to-stone-100 w-44 h-48">
						        <img
						          src={item.image}
						          alt={item.title}
						          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
						        />

						        {/* Top-left: Best Seller + Discount stacked */}
						        <div className="absolute top-3 left-1 flex flex-col gap-1.5">
					
						          {item?.discount > 0 && (
						            <span className="inline-block bg-red-500 text-white text-[9px] font-bold px-2.5 py-1 rounded-full uppercase tracking-wide shadow-sm">
						              -{item?.discount}% OFF
						            </span>
						          )}
						        </div>

						        {/* Wishlist button — below the tags */}
						        <button
						          onClick={() => setWishlisted(!wishlisted)}
						          className={`absolute top-3 right-3 w-9 h-9 rounded-full flex items-center justify-center shadow-md transition-all duration-200 active:scale-90
						            ${wishlisted
						              ? "bg-red-500 text-white"
						              : "bg-white/90 text-gray-400 hover:text-red-400 hover:bg-white"
						            }`}
						          aria-label="Toggle wishlist"
						        >
						          <svg
						            className="w-4 h-4"
						            fill={wishlisted ? "currentColor" : "none"}
						            stroke="currentColor"
						            strokeWidth={2}
						            viewBox="0 0 24 24"
						          >
						            <path
						              strokeLinecap="round"
						              strokeLinejoin="round"
						              d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
						            />
						          </svg>
						        </button>
						      </div>

						      {/* Body */}
						      <div className="p-2 md:p-3 lg:p-4 space-y-1.5 md:space-y-2.5 space-y-3">
						        {/* Rating */}
						        <StarRating value={item?.rating} />

						        {/* Title */}
						        <h3 className="text-sm font-bold text-gray-900 leading-snug line-clamp-1">
						          {item?.title}
						        </h3>

						        {/* Description */}
						        <p className="text-xs text-gray-500 leading-relaxed line-clamp-2">
						          {item?.description}
						        </p>

						        {/* Price block — column on small, row on md+ */}
						        <div className="flex flex-col sm:flex-row sm:items-center sm:gap-2">
						          <span className="text-lg font-extrabold text-gray-900 tracking-tight">
						            KSh {item?.finalPrice?.toLocaleString()}
						          </span>
						          <span className="text-sm text-gray-400 line-through">
						            KSh {item?.price?.toLocaleString()}
						          </span>
						        </div>

						        {/* Savings badge */}
						        {item.discountAmount > 0 && (
						          <div className="flex items-center gap-1.5">
						            <svg className="w-3.5 h-3.5 text-emerald-500" fill="none" stroke="currentColor" strokeWidth={2.5} viewBox="0 0 24 24">
						              <path strokeLinecap="round" strokeLinejoin="round" d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z" />
						            </svg>
						            <span className="text-xs font-semibold text-emerald-600">
						              Save KSh {item.discountAmount.toLocaleString()}
						            </span>
						          </div>
						        )}

						        {/* Stock indicator */}
						        <div className="flex items-center gap-1.5">
						          <span
						            className={`inline-block w-2 h-2 rounded-full ${
						              item.stock > 0 ? "bg-emerald-400" : "bg-red-400"
						            }`}
						          />
						          <span
						            className={`text-xs font-medium ${
						              item.stock ? "text-emerald-600" : "text-red-500"
						            }`}
						          >
						            {item?.stock > 0
						              ? item?.stock <= 5
						                ? `Only ${item?.stock} left in stock`
						                : "In stock"
						              : "Out of stock"}
						          </span>
						        </div>

						        {/* CTA */}
						        <button
						          disabled={!item?.stock <= 0}
						          className={`w-full py-2.5 rounded-xl text-sm font-bold transition-all duration-200 active:scale-95
						            ${item?.stock > 0
						              ? "bg-amber-400 text-white hover:bg-gray-700 shadow-sm hover:shadow-md"
						              : "bg-gray-100 text-gray-400 cursor-not-allowed"
						            }`}
						        >
						          {item.stock >= 0 ? "Add to Cart" : "Unavailable"}
						        </button>
						      </div>
						    </div>
						</Link>
					))}
				</div>
			</div>
		</section>
	)
}

export default NewArrivals