import React, { useState } from 'react'
import { ShoppingCart, Star, Heart } from 'lucide-react';
import { Link } from "react-router-dom"

const FeaturedCard = ({ featuredProduct }) => {
  const [activeThumb, setActiveThumb] = useState(0);
  const origPrice = Math.round(featuredProduct?.price / (1 - featuredProduct?.discount / 100));

  return (
    <div className="bg-white border border-gray-100 rounded-xl p-4 h-full">
      {/* Header */}
      <div className="flex justify-between items-start mb-4">
        <div>
          <p className="text-[10px] font-medium text-gray-400 uppercase tracking-widest mb-1">
            {featuredProduct?.brand}
          </p>
          <h2 className="text-[15px] font-semibold text-gray-900 leading-snug max-w-[160px]">
            {featuredProduct?.title}
          </h2>
          <div className="flex items-center gap-0.5 mt-2">
            {[...Array(5)].map((_, i) => (
              <Star key={i} className="w-3 h-3 fill-amber-400 text-amber-400" />
            ))}
            <span className="text-[11px] text-gray-400 ml-1">({featuredProduct?.rating})</span>
          </div>
        </div>
        {/* Discount badge */}
        <div className="bg-amber-50 border border-amber-200 rounded-lg px-3 py-2 text-center flex-shrink-0">
          <p className="text-[9px] font-semibold text-amber-700 uppercase tracking-wider">Save</p>
          <p className="text-[22px] font-bold text-amber-800 leading-none">{featuredProduct?.discount}%</p>
        </div>
      </div>

      {/* Image */}
      <div className="bg-gray-50 rounded-lg h-44 flex items-center justify-center overflow-hidden mb-3">
        <img
          src={featuredProduct?.image}
          alt={featuredProduct?.title}
          className="w-full h-full object-contain hover:scale-105 transition-transform duration-500"
        />
      </div>

      {/* Thumbnails */}
      {/*<div className="flex gap-2 mb-4">
        {featuredProduct?.image?.map((thumb, i) => (
          <button
            key={i}
            onClick={() => setActiveThumb(i)}
            className={`w-10 h-10 rounded-md overflow-hidden border transition-colors ${
              activeThumb === i ? "border-amber-400" : "border-gray-200 hover:border-gray-300"
            }`}
          >
            <img src={thumb} alt="" className="w-full h-full object-cover" />
          </button>
        ))}
      </div>*/}

      {/* Price & CTA */}
      <div className="flex items-center justify-between border-t border-gray-100 pt-3">
        <div>
          <p className="text-lg font-extrabold text-gray-900 tracking-tight">
            KSh {featuredProduct?.finalPrice?.toLocaleString()}
          </p>
          <p className="text-sm text-gray-400 line-through">
            KSh {featuredProduct?.price?.toLocaleString()}
          </p>
        </div>
        <button className="w-9 h-9 rounded-full bg-amber-400 hover:bg-amber-500 flex items-center justify-center transition-colors">
          <ShoppingCart className="w-4 h-4 text-amber-900" />
        </button>
      </div>
    </div>
  );
}

export default FeaturedCard