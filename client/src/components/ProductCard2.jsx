import { useState, useEffect, useRef } from "react";
import {
  ShoppingCart, Search, Heart, User, ChevronRight, ChevronLeft,
  Star, Zap, TrendingUp, ArrowRight, Phone, Shield, Truck, RotateCcw,
  Bell, Menu, X, MapPin
} from "lucide-react";
import StarRow from "./StarRow.jsx"
import { Link } from "react-router-dom"
import { useGetCategoriesQuery, useGetCategoryByIdQuery } from "../redux/categoriesApi.jsx"

const fmt = (n) =>
  	new Intl.NumberFormat("en-KE", { style: "currency", currency: "KES", maximumFractionDigits: 0 }).format(n);

const ProductCard2 = ({ product, size = "md" }) => {
	const [liked, setLiked] = useState(false);
  	const isLg = size === "lg";
	return (
		<Link to={`/${product?.slug}/${product?._id}`}>
			<div className={`group relative bg-white border border-gray-100 rounded-2xl overflow-hidden hover:border-amber-300 hover:shadow-lg transition-all duration-200 cursor-pointer flex flex-col ${isLg ? "p-0" : ""}`}>
	      		{product?.badge && (
			        <span className={`absolute top-2.5 left-2.5 z-10 text-[10px] font-semibold px-2 py-0.5 rounded-full ${
			          product?.badge === "Best Seller" ? "bg-amber-400 text-amber-900" :
			          product?.badge === "Hot"         ? "bg-red-500 text-white"       :
			          product?.badge === "Top Rated"   ? "bg-emerald-500 text-white"   :
			          product?.badge === "New"         ? "bg-blue-500 text-white"      : ""
			        }`}>{product?.badge}</span>
			    )}
		      <button
		        onClick={(e) => { e.stopPropagation(); setLiked(!liked); }}
		        className="absolute top-2.5 right-2.5 z-10 w-7 h-7 rounded-full bg-white/80 backdrop-blur-sm flex items-center justify-center border border-gray-100 opacity-0 group-hover:opacity-100 transition-opacity"
		      >
		        <Heart className={`w-3.5 h-3.5 ${liked ? "fill-red-500 text-red-500" : "text-gray-400"}`} />
		      </button>

		      <div className={`bg-gradient-to-br ${product?.bg} flex items-center justify-center overflow-hidden ${isLg ? "h-48" : "h-36"}`}>
		        {/*<span className="text-5xl group-hover:scale-110 transition-transform duration-500">{product?.emoji}</span>*/}
		        <div className="rounded-xl h-28 flex items-center justify-center">
			        <img src={product?.image} className="h-full w-full object-contain" alt=""/>
			    </div>
		        {product?.discount > 0 && (
		          <span className="absolute top-2 left-2 bg-red-500/90 text-white text-[10px] font-bold px-1.5 py-0.5 rounded">
		            -{product?.discount}%
		          </span>
		        )}
		      </div>

		      <div className={`flex flex-col flex-1 ${isLg ? "p-4" : "p-3"}`}>
		        <p className="text-[10px] font-semibold text-gray-400 uppercase tracking-widest mb-1">{product?.brand}</p>
		        <h3 className={`font-medium text-gray-900 leading-snug line-clamp-2 mb-2 ${isLg ? "text-sm min-h-10" : "text-[12px] min-h-8"}`}>
		          {product?.title}
		        </h3>
		        <StarRow rating={product?.rating} reviews={product?.reviews} />
		        <div className="flex items-center justify-between mt-auto pt-3">
		          <div>
		            <p className={`font-bold text-gray-900 ${isLg ? "text-base" : "text-sm"}`}>{fmt(product?.finalPrice)}</p>
		            {product?.price && <p className="text-[10px] text-gray-400 line-through">{fmt(product?.price)}</p>}
		          </div>
		          <button
		            onClick={(e) => e.stopPropagation()}
		            className="w-8 h-8 rounded-full bg-amber-400 hover:bg-amber-500 flex items-center justify-center transition-colors flex-shrink-0"
		          >
		            <ShoppingCart className="w-3.5 h-3.5 text-amber-900" />
		          </button>
		        </div>
		    </div>
	    </div>
	</Link>
	)
}

export default ProductCard2