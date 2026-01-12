import React from 'react'
import { products } from "../assets/products.js"
import { ShoppingCart } from 'lucide-react';
import { Link } from "react-router-dom"

const BestSellersProducts = () => {
	return (
		<div className="w-full my-12 px-4 md:px-8">
	      <div className="flex gap-6 overflow-x-auto pb-4 scrollbar-hide snap-x snap-mandatory">
	        {products.map(item => (
	        	<Link key={item.id} to={`/${item.id}`}>
	          <div 
	             
	            className="flex-shrink-0 w-72 bg-white rounded-md overflow-hidden shadow-sm hover:shadow-2xl transition-all duration-300 group cursor-pointer snap-start border border-gray-100"
	          >
	            {/* Image Container */}
	            <div className="relative bg-gradient-to-br from-red-50 to-red-100 h-64  overflow-hidden">
	              {/* Discount Badge */}
	              <div className="absolute top-4 left-4 bg-red-500 text-white px-3 py-1.5 rounded-full text-xs font-bold shadow-lg z-10">
	                -{item.discount}%
	              </div>
	              
	              {/* Product Image */}
	              <img 
	                className="w-full h-full object-contain transform group-hover:scale-110 transition-transform duration-500 object-cover" 
	                src={item.image} 
	                alt={item.name} 
	              />
	              
	              {/* Quick Add Button - Shows on Hover */}
	              <button className="absolute bottom-4 right-4 bg-yellow-400 text-gray-900 p-3 rounded-full shadow-lg opacity-0 group-hover:opacity-100 transform translate-y-2 group-hover:translate-y-0 transition-all duration-300 hover:bg-yellow-500 hover:scale-110">
	                <ShoppingCart className="w-5 h-5" />
	              </button>
	            </div>

	            {/* Content */}
	            <div className="p-5 space-y-3">
	              {/* Category */}
	              <p className="text-xs uppercase tracking-wider text-gray-500 font-semibold">
	                {item.category}
	              </p>
	              
	              {/* Product Name */}
	              <h3 className="text-sm text-gray-900 font-semibold text-base leading-tight min-h-12">
	                {item.name.length > 45 ? item.name.slice(0, 42) + '...' : item.name}
	              </h3>
	              
	              {/* Price and Action */}
	              <div className="flex items-center justify-between pt-2">
	                <div className="flex flex-col">
	                  <span className="text-lg font-bold text-gray-900">
	                    Ksh. {item.price.toLocaleString()}
	                  </span>
	                  <span className="text-xs text-gray-400 line-through">
	                    Ksh. {Math.round(item.price / (1 - item.discount / 100)).toLocaleString()}
	                  </span>
	                </div>
	                
	                <button className="bg-amber-400 text-white px-5 py-2.5 rounded-lg font-medium hover:bg-amber-500 transition-colors duration-200 text-sm">
	                  View
	                </button>
	              </div>
	            </div>
	          </div>
	          </Link>
        	))}
        	</div>
      </div>
	)
}

export default BestSellersProducts
// https://electrox.arenacommerce.com/collections/mac-computers