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
	return (
		<div className="w-full h-fit bg-gray-50 px-3 md:px-5 lg:px-10">
			<span className="flex items-center space-x-6 border-b border-gray-300 py-2">
				<p className="text-lg font-medium active:border-b active:border-yellow-400 cursor-pointer">Featured</p>
				<p className="text-lg font-light active:border-b active:border-yellow-400 cursor-pointer">Top Rated</p>
				<p className="text-lg font-light active:border-b active:border-yellow-400 cursor-pointer">On sale</p>
			</span>

			<div className="grid grid-cols-2 lg:grid-cols-4 gap-4 my-8">
				{data?.products?.map(product => (
					<Link to={`/${product.slug}/${product._id}`} key={product._id}>
					<div className="flex flex-col justify-between relative w-72 h-[500px] bg-white rounded-sm shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden group" onMouseEnter={() => setIsHovered(true)} onMouseLeave={() => setIsHovered(false)}>
					  <div className="absolute top-4 left-4 z-10 flex items-center gap-1 bg-gradient-to-r from-amber-500 to-orange-500 text-white px-3 py-1 rounded-full text-xs font-semibold shadow-lg">
					    <TrendingUp className="w-3 h-3" />
					    Best Seller
					  </div>

					  {product.discount > 0 && <div className="absolute top-4 right-4 z-10 bg-red-500 text-white px-3 py-1 rounded-full text-sm font-bold shadow-lg">
					    -{product.discount}%
					  </div>}

					  <button onClick={() => setIsWishlisted(!isWishlisted)} className="absolute top-16 right-4 z-10 w-10 h-10 bg-white rounded-full shadow-md hover:shadow-lg transition-all duration-200 flex items-center justify-center group/heart">
					    <Heart className={`w-5 h-5 transition-all duration-200 ${isWishlisted ? 'fill-red-500 text-red-500' : 'text-gray-400 group-hover/heart:text-red-500'}`} />
					  </button>

					  <div className="relative h-72 overflow-hidden bg-gray-100">
					    {/*<img src={product.image} alt={product.title} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" />*/}
					    <img src={product?.image} alt={product.title} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" />
					    <div className={`absolute inset-0 bg-black bg-opacity-40 backdrop-blur-sm transition-opacity duration-300 flex items-center justify-center ${isHovered ? 'opacity-100' : 'opacity-0'}`}>
					    	<div onClick={() => navigate(`/${product.slug}/${product._id}`)}>
						      <button className="bg-white text-gray-900 px-6 py-3 rounded-full font-semibold hover:bg-gray-100 transition-colors duration-200 flex items-center gap-2 transform translate-y-2 group-hover:translate-y-0">
						        <ShoppingCart className="w-5 h-5" />
						        Quick Add
						      </button>
						    </div>
					    </div>
					  </div>

					  <div className="p-5">
					    <div className="flex items-center gap-2 mb-.5">
					      <div className="flex items-center gap-1">
					        {[...Array(5)].map((_, i) => (
					          <Star key={i} className={`w-4 h-4 ${i < Math.floor(product.rating) ? 'fill-amber-400 text-amber-400' : i < product.rating ? 'fill-amber-400 text-amber-400 opacity-50' : 'fill-gray-200 text-gray-200'}`} />
					        ))}
					      </div>
					      {/*<span className="text-sm font-semibold text-gray-900">{product.rating}</span>*/}
					      <span className="text-sm text-gray-500">({product.rating})</span>
					    </div>

					    <h3 className="text-lg font-bold text-gray-900 mb-.5 line-clamp-1">{product.title}</h3>

					    <p className="text-xs text-gray-600 mb-1 line-clamp-2 leading-relaxed">{product.description}</p>
					    	
					    <div className="flex items-end justify-between">
					      <div>
					        <div className="flex flex-col items-baseline">
					          <span className="text-xl font-bold text-gray-900">{new Intl.NumberFormat('en-KE', { style: 'currency', currency: 'KES' }).format(product?.finalPrice)}</span>
					          {product.discount > 0 && <span className="text-sm text-gray-400 line-through">{new Intl.NumberFormat('en-KE', { style: 'currency', currency: 'KES' }).format(product.price)}</span>}
					        </div>
					        <span className="text-xs text-green-600 font-semibold">Save {new Intl.NumberFormat('en-KE', { style: 'currency', currency: 'KES' }).format(product.discountAmount)}</span>
					      </div>

					      <div className="flex items-center space-x-1 justify-between">
					        <div className={`w-2 h-2 rounded-full ${product.stock ? 'bg-green-500' : 'bg-red-500'}`} />
					        <span className={`text-xs font-medium ${product.stock ? 'text-green-600' : 'text-red-600'}`}>
					          {product.stock ? 'In Stock' : 'Out of Stock'}
					        </span>
					      </div>
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