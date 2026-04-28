import React, { useState } from 'react'
import { ShoppingCart, Star, Heart } from 'lucide-react';
import { Link } from "react-router-dom"

const ProductCardTwo = ({ item }) => {
    console.log("item", item)
  return (
    <Link to={`/${item.slug}/${item._id}`}>
      <div className="group bg-white border border-gray-100 rounded-xl overflow-hidden hover:border-amber-300 hover:shadow-md transition-all duration-200 cursor-pointer">
        {/* Image */}
        <div className="relative bg-gray-50 h-[110px] w-[110px] flex items-center justify-center overflow-hidden">
          <img
            src={item?.image}
            alt={item?.title}
            className="full h-full object-cover group-hover:scale-105 transition-transform duration-500 "
          />
          <span className="absolute top-2 right-2 bg-red-50 text-red-700 border border-red-200 text-[10px] font-semibold px-1.5 py-0.5 rounded">
            -{item.discount}%
          </span>
        </div>

        {/* Body */}
        <div className="px-3 pt-2.5 pb-3">
          <p className="text-[10px] font-medium text-gray-400 uppercase tracking-widest mb-1">{item?.brand}</p>
          <h3 className="text-[12px] font-medium text-gray-900 leading-snug min-h-[34px] line-clamp-2 mb-2">
            {item?.title}
          </h3>
          <div className="flex items-center gap-0.5 mb-2.5">
            {[...Array(5)].map((_, i) => (
              <Star
                key={i}
                className={`w-2.5 h-2.5 ${i < Math.round(item?.rating ?? 4) ? "fill-amber-400 text-amber-400" : "fill-gray-200 text-gray-200"}`}
              />
            ))}
          </div>
          <div className="flex items-center justify-between">
            <span className="text-[12px] font-semibold text-gray-900">KSh {item?.finalPrice?.toLocaleString()}</span>
            <button
              onClick={(e) => { e.preventDefault(); /* add to cart */ }}
              className="w-7 h-7 rounded-full bg-amber-50 border border-amber-200 flex items-center justify-center hover:bg-amber-100 transition-colors"
            >
              <ShoppingCart className="w-3.5 h-3.5 text-amber-800" />
            </button>
          </div>
        </div>
      </div>
    </Link>
  );
}

export default ProductCardTwo