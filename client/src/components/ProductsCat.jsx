import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from "react-router-dom"
import { useGetProductsQuery } from "../redux/productsApi.jsx"
import { useDispatch, useSelector } from "react-redux"
import { Heart, ShoppingCart, Star, TrendingUp } from 'lucide-react';

const ProductsCat = () => {
	// const { products, isLoading, success, isError } = useSelector(state => state.products); 
	const { data, error, isLoading } = useGetProductsQuery();
	const dispatch = useDispatch();
	const navigate = useNavigate();
	const [isWishlisted, setIsWishlisted] = useState(false);
  	const [isHovered, setIsHovered] = useState(false);

  	const StarRating = ({ value }) => {
	    return (
	      <div className="flex items-center gap-1">
	        {[1, 2, 3, 4, 5].map((star) => {
	          const filled = value >= star;
	          const half = !filled && value >= star - 0.5;
	          return (
	            <span key={star} className="relative inline-block w-4 h-4">
	              <svg viewBox="0 0 20 20" className="w-4 h-4 text-gray-200" fill="currentColor">
	                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
	              </svg>

	              {(filled || half) && (
	                <span
	                  className="absolute inset-0 overflow-hidden"
	                  style={{ width: filled ? "100%" : "50%" }}
	                >
	                  <svg viewBox="0 0 20 20" className="w-4 h-4 text-amber-400" fill="currentColor">
	                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
	                  </svg>
	                </span>
	              )}
	            </span>
	          );
	        })}
	        {/*<span className="text-xs font-semibold text-gray-700 ml-0.5">{value}</span>*/}
	        <span className="text-xs text-gray-400">({value?.toLocaleString()})</span>
	      </div>
	    );
	};
	return (
		<div className="w-full h-fit bg-gray-50 px-3 md:px-5 lg:px-10">
			<span className="flex items-center space-x-6 border-b border-gray-300 py-2 my-4">
				<p className="text-lg font-medium active:border-b active:border-yellow-400 cursor-pointer">Featured</p>
				<p className="text-lg font-light active:border-b active:border-yellow-400 cursor-pointer">Top Rated</p>
				<p className="text-lg font-light active:border-b active:border-yellow-400 cursor-pointer">On sale</p>
			</span>

			<div className="grid lg:grid-cols-5 grid-cols-2 gap-5 lg:gap-x-3 w-full scroll-smooth snap-x">
				{data?.products?.map(product => (
					<Link to={`/${product?.slug}/${product?._id}`} key={product?._id}>
						<div className="group relative w-62 rounded-lg bg-white border border-gray-100 shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden">
						      {/* Image Container */}
						      <div className="mx-auto relative my-3 overflow-hidden bg-gradient-to-br from-slate-50 to-stone-100 w-44 h-48">
						        <img
						          src={product?.image}
						          alt={product?.title}
						          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
						        />

						        {/* Top-left: Best Seller + Discount stacked */}
						        <div className="absolute top-3 left-1 flex flex-col gap-1.5">

						          {product?.discount > 0 && (
						            <span className="inline-block bg-red-500 text-white text-[9px] font-bold px-2.5 py-1 rounded-full uppercase tracking-wide shadow-sm">
						              -{product?.discount}% OFF
						            </span>
						          )}
						        </div>

						        {/* Wishlist button — below the tags */}
						        <button
						          onClick={() => setWishlisted(!isWishlisted)}
						          className={`absolute top-3 right-3 w-9 h-9 rounded-full flex items-center justify-center shadow-md transition-all duration-200 active:scale-90
						            ${isWishlisted
						              ? "bg-red-500 text-white"
						              : "bg-white/90 text-gray-400 hover:text-red-400 hover:bg-white"
						            }`}
						          aria-label="Toggle wishlist"
						        >
						          <svg
						            className="w-4 h-4"
						            fill={isWishlisted ? "currentColor" : "none"}
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
						      <div className="p-4 space-y-3">
						        {/* Rating */}
						        <StarRating value={product?.rating} />

						        {/* Title */}
						        <h3 className="text-sm font-bold text-gray-900 leading-snug line-clamp-1">
						          {product?.title}
						        </h3>

						        {/* Description */}
						        <p className="text-xs text-gray-500 leading-relaxed line-clamp-2">
						          {product?.description}
						        </p>

						        {/* Price block — column on small, row on md+ */}
						        <div className="flex flex-col sm:flex-row sm:items-center sm:gap-2">
						          <span className="text-lg font-extrabold text-gray-900 tracking-tight">
						            KSh {product?.finalPrice?.toLocaleString()}
						          </span>
						          <span className="text-sm text-gray-400 line-through">
						            KSh {product?.price?.toLocaleString()}
						          </span>
						        </div>

						        {/* Savings badge */}
						        {product?.discountAmount > 0 && (
						          <div className="flex items-center gap-1.5">
						            <svg className="w-3.5 h-3.5 text-emerald-500" fill="none" stroke="currentColor" strokeWidth={2.5} viewBox="0 0 24 24">
						              <path strokeLinecap="round" strokeLinejoin="round" d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z" />
						            </svg>
						            <span className="text-xs font-semibold text-emerald-600">
						              Save KSh {product?.discountAmount.toLocaleString()}
						            </span>
						          </div>
						        )}

						        {/* Stock indicator */}
						        <div className="flex items-center gap-1.5">
						          <span
						            className={`inline-block w-2 h-2 rounded-full ${
						              product?.stock > 0 ? "bg-emerald-400" : "bg-red-400"
						            }`}
						          />
						          <span
						            className={`text-xs font-medium ${
						              product?.stock ? "text-emerald-600" : "text-red-500"
						            }`}
						          >
						            {product?.stock > 0
						              ? product?.stock <= 5
						                ? `Only ${product?.stock} left in stock`
						                : "In stock"
						              : "Out of stock"}
						          </span>
						        </div>

						    </div>
						</div>
					</Link>
				))}
			</div>
		</div>
	)
}

export default ProductsCat