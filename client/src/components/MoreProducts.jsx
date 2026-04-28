import React, { useState } from 'react'
import { FaRegHeart } from "react-icons/fa";
import { BsArrowsFullscreen } from "react-icons/bs";
import { ShoppingCart, Star, Heart } from 'lucide-react';
import { useGetProductsQuery } from "../redux/productsApi.jsx"
import { products, categories } from "../assets/products.js"
import { Link } from "react-router-dom"
import FeaturedCard from "./FeaturedCard.jsx"
import ProductCardTwo from "./ProductCardTwo.jsx"

const MoreProducts = () => {
  const [activeCategory, setActiveCategory] = useState("Best Deals");
  const { data } = useGetProductsQuery();
  const featuredProduct = data?.products[0]

  return (
    <section className="w-full py-10 px-4 lg:px-10">
      {/* Category pills */}
      <div className="flex gap-2 overflow-x-auto scrollbar-hide pb-4 mb-8">
        {categories?.map((cat) => (
          <button
            key={cat}
            onClick={() => setActiveCategory(cat)}
            className={`px-5 py-2 rounded-full text-[12.5px] font-medium whitespace-nowrap border transition-all duration-150 ${
              activeCategory === cat
                ? "bg-amber-50 border-amber-300 text-amber-800"
                : "bg-white border-gray-200 text-gray-500 hover:border-gray-300 hover:text-gray-800"
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* 3-column grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-5 max-w-7xl mx-auto">
        {/* Left — 2×2 grid */}
        <div className="grid grid-cols-2 gap-3">
          {data?.products?.slice(0, 4).map((item) => (
            <ProductCardTwo key={item._id} item={item} />
          ))}
        </div>

        {/* Center — Featured */}
        <FeaturedCard featuredProduct={featuredProduct} />

        {/* Right — 2×2 grid */}
        <div className="grid grid-cols-2 gap-3">
          {data?.products?.slice(2, 6).map((item) => (
            <ProductCardTwo key={item._id} item={item} />
          ))}
        </div>
      </div>
    </section>
  );
}

export default MoreProducts
