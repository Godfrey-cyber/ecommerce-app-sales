import React, { useState } from 'react';
import { Heart, ShoppingCart, Star, TrendingUp } from 'lucide-react';

const ProductCard = () => {
  const [isWishlisted, setIsWishlisted] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  // Sample product data
  const product = {
    id: 1,
    title: "Premium Wireless Headphones",
    description: "Immersive sound quality with active noise cancellation and 30-hour battery life",
    image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=800&q=80",
    price: 299.99,
    originalPrice: 399.99,
    discount: 25,
    rating: 4.8,
    reviewCount: 2847,
    inStock: true,
    badge: "Bestseller",
    colors: ["#000000", "#FFFFFF", "#1E40AF"],
    features: ["ANC", "30h Battery", "USB-C"]
  };

  const discountAmount = product.originalPrice - product.price;
  const savings = Math.round((discountAmount / product.originalPrice) * 100);

  return (
    <div 
      className="relative w-64 bg-white rounded-sm shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden group"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Badge */}
      {product.badge && (
        <div className="absolute top-4 left-4 z-10 flex items-center gap-1 bg-gradient-to-r from-amber-500 to-orange-500 text-white px-3 py-1 rounded-full text-xs font-semibold shadow-lg">
          <TrendingUp className="w-3 h-3" />
          {product.badge}
        </div>
      )}

      {/* Discount Badge */}
      {product.discount > 0 && (
        <div className="absolute top-4 right-4 z-10 bg-red-500 text-white px-3 py-1 rounded-full text-sm font-bold shadow-lg">
          -{savings}%
        </div>
      )}

      {/* Wishlist Button */}
      <button
        onClick={() => setIsWishlisted(!isWishlisted)}
        className="absolute top-16 right-4 z-10 w-10 h-10 bg-white rounded-full shadow-md hover:shadow-lg transition-all duration-200 flex items-center justify-center group/heart"
      >
        <Heart 
          className={`w-5 h-5 transition-all duration-200 ${
            isWishlisted 
              ? 'fill-red-500 text-red-500' 
              : 'text-gray-400 group-hover/heart:text-red-500'
          }`}
        />
      </button>

      {/* Product Image */}
      <div className="relative h-72 overflow-hidden bg-gray-100">
        <img
          src={product.image}
          alt={product.title}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
        />
        
        {/* Quick Add Overlay */}
        <div className={`absolute inset-0 bg-black bg-opacity-40 backdrop-blur-sm transition-opacity duration-300 flex items-center justify-center ${
          isHovered ? 'opacity-100' : 'opacity-0'
        }`}>
          <button className="bg-white text-gray-900 px-6 py-3 rounded-full font-semibold hover:bg-gray-100 transition-colors duration-200 flex items-center gap-2 transform translate-y-2 group-hover:translate-y-0">
            <ShoppingCart className="w-5 h-5" />
            Quick Add
          </button>
        </div>
      </div>

      {/* Product Info */}
      <div className="p-5">
        {/* Rating & Reviews */}
        <div className="flex items-center gap-2 mb-1">
          <div className="flex items-center gap-1">
            {[...Array(5)].map((_, i) => (
              <Star
                key={i}
                className={`w-4 h-4 ${
                  i < Math.floor(product.rating)
                    ? 'fill-amber-400 text-amber-400'
                    : i < product.rating
                    ? 'fill-amber-400 text-amber-400 opacity-50'
                    : 'fill-gray-200 text-gray-200'
                }`}
              />
            ))}
          </div>
          <span className="text-sm font-semibold text-gray-900">{product.rating}</span>
          <span className="text-sm text-gray-500">({product.reviewCount.toLocaleString()})</span>
        </div>

        {/* Title */}
        <h3 className="text-lg font-bold text-gray-900 mb-1 line-clamp-1">
          {product.title}
        </h3>

        {/* Description */}
        <p className="text-xs text-gray-600 mb-3 line-clamp-2 leading-relaxed">
          {product.description}
        </p>

        {/* Features */}
        {/*<div className="flex items-center gap-2 mb-2">
          {product.features.map((feature, index) => (
            <span
              key={index}
              className="text-xs bg-gray-100 text-gray-700 px-2 py-1 rounded-md font-medium"
            >
              {feature}
            </span>
          ))}
        </div>*/}

        {/* Color Options */}
        {/*<div className="flex items-center gap-2 mb-4">
          <span className="text-xs text-gray-500 font-medium">Colors:</span>
          <div className="flex gap-2">
            {product.colors.map((color, index) => (
              <button
                key={index}
                className="w-6 h-6 rounded-full border-2 border-gray-300 hover:border-gray-900 transition-colors duration-200"
                style={{ backgroundColor: color }}
              />
            ))}
          </div>
        </div>*/}

        {/* Price Section */}
        <div className="flex items-end justify-between">
          <div>
            <div className="flex items-baseline gap-2">
              <span className="text-2xl font-bold text-gray-900">
                ${product.price}
              </span>
              {product.originalPrice > product.price && (
                <span className="text-sm text-gray-400 line-through">
                  ${product.originalPrice}
                </span>
              )}
            </div>
            {product.discount > 0 && (
              <span className="text-xs text-green-600 font-semibold">
                Save ${discountAmount.toFixed(2)}
              </span>
            )}
          </div>

          {/* Stock Status */}
          <div className="flex items-center gap-1">
            <div className={`w-2 h-2 rounded-full ${product.inStock ? 'bg-green-500' : 'bg-red-500'}`} />
            <span className={`text-xs font-medium ${product.inStock ? 'text-green-600' : 'text-red-600'}`}>
              {product.inStock ? 'In Stock' : 'Out of Stock'}
            </span>
          </div>
        </div>

        {/* Add to Cart Button */}
        {/*<button className="w-full mt-4 bg-gray-900 text-white py-3 rounded-xl font-semibold hover:bg-gray-800 transition-colors duration-200 flex items-center justify-center gap-2 group/cart">
          <ShoppingCart className="w-5 h-5 group-hover/cart:scale-110 transition-transform duration-200" />
          Add to Cart
        </button>*/}
      </div>
    </div>
  );
};

export default ProductCard;