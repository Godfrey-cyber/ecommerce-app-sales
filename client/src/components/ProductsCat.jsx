import React, { useEffect, useState } from 'react';
import { MdOutlineAddShoppingCart } from "react-icons/md";
import { FaRegHeart } from "react-icons/fa";
import { BsArrowsFullscreen } from "react-icons/bs";
// import { products } from "../assets/products.js"
import { Link } from "react-router-dom"
import { fetchProducts } from "../redux/thunk/productsThunk.js"
import { useDispatch, useSelector } from "react-redux"
import { Heart, ShoppingCart, Star, TrendingUp } from 'lucide-react';

const ProductsCat = () => {
	const { products, isLoading, isError, success } = useSelector(state => state.products);
	const dispatch = useDispatch();
	const [isWishlisted, setIsWishlisted] = useState(false);
  	const [isHovered, setIsHovered] = useState(false);
	useEffect(() => {
	    const controller = new AbortController();
	    dispatch(fetchProducts())
	    return () => controller.abort();
	  }, []);
	console.log(products)
	// const discountAmount = products?.originalPrice - product.price;
  	// const savings = Math.round((discountAmount / product?.originalPrice) * 100);
	return (
		<div className="w-full h-fit bg-gray-50 px-3 md:px-5 lg:px-10">
			<span className="flex items-center space-x-6 border-b border-gray-300 py-2">
				<p className="text-lg font-medium active:border-b active:border-yellow-400 cursor-pointer">Featured</p>
				<p className="text-lg font-light active:border-b active:border-yellow-400 cursor-pointer">Top Rated</p>
				<p className="text-lg font-light active:border-b active:border-yellow-400 cursor-pointer">On sale</p>
			</span>

			<div className="grid grid-cols-2 lg:grid-cols-4 gap-4 my-8 divide-x">
				{products?.map(product => (
					<div className="relative w-64 bg-white rounded-sm shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden group" onMouseEnter={() => setIsHovered(true)} onMouseLeave={() => setIsHovered(false)}>
					  <div className="absolute top-4 left-4 z-10 flex items-center gap-1 bg-gradient-to-r from-amber-500 to-orange-500 text-white px-3 py-1 rounded-full text-xs font-semibold shadow-lg">
					    <TrendingUp className="w-3 h-3" />
					    Best Seller
					  </div>

					  <div className="absolute top-4 right-4 z-10 bg-red-500 text-white px-3 py-1 rounded-full text-sm font-bold shadow-lg">
					    -25%
					  </div>

					  <button onClick={() => setIsWishlisted(!isWishlisted)} className="absolute top-16 right-4 z-10 w-10 h-10 bg-white rounded-full shadow-md hover:shadow-lg transition-all duration-200 flex items-center justify-center group/heart">
					    <Heart className={`w-5 h-5 transition-all duration-200 ${isWishlisted ? 'fill-red-500 text-red-500' : 'text-gray-400 group-hover/heart:text-red-500'}`} />
					  </button>

					  <div className="relative h-72 overflow-hidden bg-gray-100">
					    <img src={product.image} alt={product.title} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" />
					    <div className={`absolute inset-0 bg-black bg-opacity-40 backdrop-blur-sm transition-opacity duration-300 flex items-center justify-center ${isHovered ? 'opacity-100' : 'opacity-0'}`}>
					      <button className="bg-white text-gray-900 px-6 py-3 rounded-full font-semibold hover:bg-gray-100 transition-colors duration-200 flex items-center gap-2 transform translate-y-2 group-hover:translate-y-0">
					        <ShoppingCart className="w-5 h-5" />
					        Quick Add
					      </button>
					    </div>
					  </div>

					  <div className="p-5">
					    <div className="flex items-center gap-2 mb-1">
					      <div className="flex items-center gap-1">
					        {[...Array(5)].map((_, i) => (
					          <Star key={i} className={`w-4 h-4 ${i < Math.floor(product.rating) ? 'fill-amber-400 text-amber-400' : i < product.rating ? 'fill-amber-400 text-amber-400 opacity-50' : 'fill-gray-200 text-gray-200'}`} />
					        ))}
					      </div>
					      <span className="text-sm font-semibold text-gray-900">{product.rating}</span>
					      <span className="text-sm text-gray-500">(3,456)</span>
					    </div>

					    <h3 className="text-lg font-bold text-gray-900 mb-1 line-clamp-1">{product.title}</h3>

					    <p className="text-xs text-gray-600 mb-3 line-clamp-2 leading-relaxed">{product.description}</p>

					    <div className="flex items-end justify-between">
					      <div>
					        <div className="flex items-baseline gap-2">
					          <span className="text-2xl font-bold text-gray-900">${product.price}</span>
					          <span className="text-sm text-gray-400 line-through">$3000</span>
					        </div>
					        <span className="text-xs text-green-600 font-semibold">Save $200</span>
					      </div>

					      <div className="flex items-center gap-1">
					        <div className={`w-2 h-2 rounded-full ${product.stock ? 'bg-green-500' : 'bg-red-500'}`} />
					        <span className={`text-xs font-medium ${product.stock ? 'text-green-600' : 'text-red-600'}`}>
					          {product.stock ? 'In Stock' : 'Out of Stock'}
					        </span>
					      </div>
					    </div>
					  </div>
					</div>
				))}
			</div>
		</div>
	)
}

export default ProductsCat