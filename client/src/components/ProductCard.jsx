import React from 'react';
import { Link } from 'react-router-dom';
import { TrendingUp, Flame, Star as StarIcon } from 'lucide-react';
import StarRating from "./StarRating.jsx"

const ProductCard = ({ product, index }) => (
	<Link 
		to={`/${product?.slug}/${product?._id}`}
		className="group block"
	>
		<article className="flex gap-4 p-3 rounded-xl transition-all duration-300 hover:bg-gray-50/80 hover:shadow-sm border border-transparent hover:border-gray-100">
			{/* Product Image */}
			<div className="relative flex-shrink-0 w-24 h-24 rounded-lg overflow-hidden bg-gray-100">
				<img 
					className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" 
					src={product?.image} 
					alt={product?.title}
					loading="lazy"
				/>
				{/* Subtle badge on first item */}
				{index === 0 && (
					<div className="absolute top-1.5 right-1.5 bg-orange-500 text-white text-[10px] font-semibold px-1.5 py-0.5 rounded">
						#1
					</div>
				)}
			</div>

			{/* Product Details */}
			<div className="flex-1 flex flex-col justify-center min-w-0 space-y-1.5">
				{/* Title */}
				<h3 className="text-sm font-semibold text-gray-900 line-clamp-2 leading-snug group-hover:text-orange-600 transition-colors">
					{product?.title}
				</h3>

				{/* Pricing */}
				<div className="flex items-center gap-2.5">
					<span className="text-base font-bold text-gray-900 tracking-tight">
						Ksh. {product?.finalPrice?.toLocaleString()}
					</span>
					{product?.price !== product?.finalPrice && (
						<>
							<span className="text-xs text-gray-400 line-through">
								Ksh. {product?.price?.toLocaleString()}
							</span>
							<span className="text-[10px] font-semibold text-green-600 bg-green-50 px-1.5 py-0.5 rounded">
								-{product?.discount}%
							</span>
						</>
					)}
				</div>

				{/* Rating */}
				<StarRating value={product?.rating} />
			</div>
		</article>
	</Link>
);

export default ProductCard