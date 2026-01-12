import React, { useState } from 'react';
import { ShoppingCart, Star, Heart, Share2, Truck, Shield, RotateCcw, Check } from 'lucide-react';
import { products, product, categories, featuredProduct } from "../assets/products.js"	
import { useParams, useNavigate, Link } from 'react-router-dom'
import CartTabHeaders from "../components/cart/CartTabHeaders.jsx"

const ProductsPage = () => {
	const [selectedImage, setSelectedImage] = useState(0);
  	const [quantity, setQuantity] = useState(1);
  	const [activeTab, setActiveTab] = useState('details');
  	const { id, slug } = useParams();
  	
	return (
		<div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      <div className="max-w-7xl mx-auto px-4 py-8 lg:py-12">
        
        {/* Main Product Section */}  
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 mb-12">
          
          {/* Left - Images */}
          <div className="space-y-4">
            {/* Main Image */}
            <div className="bg-white rounded-sm overflow-hidden ">
              <div className="aspect-square bg-gradient-to-br from-gray-50 to-gray-100 rounded-sm flex items-center justify-center">
                <img
                  src={product?.images[selectedImage]}
                  alt={product.name}
                  className="w-full h-full object-contain hover:scale-105 transition-transform duration-500"
                />
              </div>
            </div>
            
            {/* Thumbnail Images */}
            <div className="grid grid-cols-4 gap-3">
              {product.images && product?.images.map((img, index) => (
                <button
                  key={index}
                  onClick={() => setSelectedImage(index)}
                  className={`aspect-square rounded-xl overflow-hidden border-2 transition-all duration-200 ${
                    selectedImage === index
                      ? 'border-yellow-400 shadow-lg scale-105'
                      : 'border-gray-200 hover:border-gray-300'
                  }`}
                >
                  <img src={img} alt="" className="w-full h-full object-cover" />
                </button>
              ))}
            </div>
          </div>

          {/* Right - Product Info */}
          <div className="space-y-6">
            {/* Brand & Category */}
            <div className="flex items-center gap-3">
              <span className="px-4 py-1.5 bg-blue-50 text-blue-600 rounded-full text-sm font-semibold">
                {product.brand}
              </span>
              <span className="text-sm text-gray-500">{product.category}</span>
            </div>

            {/* Title */}
            <h1 className="text-2xl font-bold text-gray-900 leading-tight">
              {product.name}
            </h1>

            {/* Rating */}
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-1">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    className={`w-5 h-5 ${
                      i < Math.floor(product.rating)
                        ? 'fill-yellow-400 text-yellow-400'
                        : 'text-gray-300'
                    }`}
                  />
                ))}
              </div>
              <span className="text-sm font-semibold text-gray-900">{product.rating}</span>
              <span className="text-sm text-gray-500">({product.totalReviews} reviews)</span>
            </div>

            {/* Price */}
            <div className="flex items-baseline gap-4">
              <span className="text-3xl font-bold text-gray-900">
                Ksh. {product.price.toLocaleString()}
              </span>
              <span className="text-xl text-gray-400 line-through">
                Ksh. {product.originalPrice.toLocaleString()}
              </span>
              <span className="px-3 py-1 bg-red-500 text-white rounded-lg text-sm font-bold">
                Save {product.discount}%
              </span>
            </div>

            {/* Description */}
            <p className="text-gray-600 leading-relaxed">
              {product.description}
            </p>

            {/* Quantity & Add to Cart */}
            <div className="flex flex-col sm:flex-row gap-4 pt-4">
              <div className="flex items-center gap-3 bg-gray-100 rounded-xl p-2 w-fit">
                <button
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="w-10 h-10 bg-white rounded-lg flex items-center justify-center hover:bg-gray-200 transition font-semibold"
                >
                  -
                </button>
                <span className="w-12 text-center font-semibold text-lg">{quantity}</span>
                <button
                  onClick={() => setQuantity(quantity + 1)}
                  className="w-10 h-10 bg-white rounded-lg flex items-center justify-center hover:bg-gray-200 transition font-semibold"
                >
                  +
                </button>
              </div>

              <button className="flex-1 bg-gradient-to-r from-amber-400 to-amber-500 hover:from-amber-500 hover:to-amber-600 text-gray-900 font-bold py-4 px-8 rounded-md flex items-center justify-center gap-3 shadow-lg hover:shadow-xl transition-all duration-200 hover:scale-105">
                <ShoppingCart className="w-6 h-6" />
                Add to Cart
              </button>
            </div>

            {/* Action Buttons */}
            <div className="flex gap-3">
              <button className="flex-1 border-2 border-gray-200 hover:border-gray-300 text-gray-700 font-semibold py-3 px-6 rounded-xl flex items-center justify-center gap-2 transition-all">
                <Heart className="w-5 h-5" />
                Wishlist
              </button>
              <button className="flex-1 border-2 border-gray-200 hover:border-gray-300 text-gray-700 font-semibold py-3 px-6 rounded-xl flex items-center justify-center gap-2 transition-all">
                <Share2 className="w-5 h-5" />
                Share
              </button>
            </div>

            {/* Features */}
            <div className="grid grid-cols-3 gap-4 pt-4">
              <div className="flex flex-col items-center text-center p-4 bg-blue-50 rounded-xl">
                <Truck className="w-8 h-8 text-blue-600 mb-2" />
                <span className="text-xs font-semibold text-gray-700">Free Delivery</span>
              </div>
              <div className="flex flex-col items-center text-center p-4 bg-green-50 rounded-xl">
                <Shield className="w-8 h-8 text-green-600 mb-2" />
                <span className="text-xs font-semibold text-gray-700">2 Year Warranty</span>
              </div>
              <div className="flex flex-col items-center text-center p-4 bg-purple-50 rounded-xl">
                <RotateCcw className="w-8 h-8 text-purple-600 mb-2" />
                <span className="text-xs font-semibold text-gray-700">30 Day Returns</span>
              </div>
            </div>
          </div>
        </div>

        {/* Tabs Section */}
        <div className="bg-white rounded-3xl shadow-lg border border-gray-100 overflow-hidden">
          	{/* Tab Headers */}
        	<CartTabHeaders />
          {/* Tab Content */}
          
        </div>

      </div>
    </div>
	)
}

export default ProductsPage