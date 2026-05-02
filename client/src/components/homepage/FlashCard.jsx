import { useState, useEffect, useRef } from "react";
import {
  ShoppingCart, Search, Heart, User, ChevronRight, ChevronLeft,
  Star, Zap, TrendingUp, ArrowRight, Phone, Shield, Truck, RotateCcw,
  Bell, Menu, X, MapPin
} from "lucide-react";
import { Link } from "react-router-dom"
// import { useGetCategoriesQuery, useGetCategoryByIdQuery } from "../redux/categoriesApi.jsx"

const fmt = (n) =>
  	new Intl.NumberFormat("en-KE", { style: "currency", currency: "KES", maximumFractionDigits: 0 }).format(n);

const FlashCard = ({ product }) => {
	const [time, setTime] = useState(product?.timeLeft);
	// useEffect(() => {
	//     const t = setInterval(() => {
	//       setTime(prev => {
	//         let { h, m, s } = prev;
	//         s--;
	//         if (s < 0) { s = 59; m--; }
	//         if (m < 0) { m = 59; h--; }
	//         if (h < 0) return { h:0, m:0, s:0 };
	//         return { h, m, s };
	//       });
	//     }, 1000);
	//     return () => clearInterval(t);
	// }, []);
	const pad = n => String(n).padStart(2, "0");
	const pct = Math.round((1 - product?.price / product?.price) * 100);
	const sold = Math.round(40 + Math.random() * 45);
	

	return (
		<Link to={`/${product?.slug}/${product?._id}`}>
			<div className="bg-white rounded-2xl border border-gray-100 p-3.5 hover:border-amber-300 hover:shadow-md transition-all duration-200 cursor-pointer group flex flex-col gap-3">
		      <div className="rounded-xl h-28 flex items-center justify-center">
		        <img src={product?.image} className="h-full w-full object-contain" alt=""/>
		      </div>
		      <div>
		        <p className="text-[10px] font-semibold text-gray-400 uppercase tracking-widest">{product.brand}</p>
		        <p className="text-[12px] font-medium text-gray-900 leading-snug line-clamp-2 mt-0.5">{product.title}</p>
		      </div>
		      <div className="flex items-baseline gap-2">
		      	<div className="flex flex-col">
		      		<span className="text-sm font-bold text-gray-900">{fmt(product.finalPrice)}</span>
		        	<span className="text-[10px] text-gray-400 line-through">{fmt(product.price)}</span>
		      	</div>
		        
		        <span className="text-[10px] font-bold text-red-600 ml-auto">-{product.discount}% OFF</span>
		      </div>
		      {/* Progress bar */}
		      <div>
		        <div className="flex justify-between text-[10px] text-gray-400 mb-1">
		          <span>🔥 {sold}% sold</span>
		        </div>
		        <div className="h-1.5 bg-gray-100 rounded-full overflow-hidden">
		          <div className="h-full bg-gradient-to-r from-amber-400 to-orange-500 rounded-full" style={{ width: `${sold}%` }} />
		        </div>
		      </div>
		      <button className="w-full py-2 rounded-xl bg-amber-400 hover:bg-amber-500 text-amber-900 font-semibold text-xs transition-colors">
		        Add to Cart
		    	</button>
	    	</div>
		</Link>
	)
}

export default FlashCard