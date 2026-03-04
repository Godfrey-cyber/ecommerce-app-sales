import React, { useState } from 'react'
import { MdOutlineAddShoppingCart } from "react-icons/md";
import { FaRegHeart } from "react-icons/fa";
import { BsArrowsFullscreen } from "react-icons/bs";
import { ShoppingCart, Star, Heart } from 'lucide-react';
import { useGetProductsQuery } from "../redux/productsApi.jsx"
import { products, categories, featuredProduct } from "../assets/products.js"
import { Link } from "react-router-dom"

const MoreProducts = () => {
    const [activeCategory, setActiveCategory] = useState('Best Deals');
    const { data, error, isLoading } = useGetProductsQuery();
    return (
        <section className="w-full min-h-screen bg-gradient-to-b from-gray-50 to-white py-12 px-4 lg:px-10">
            {/* Categories */}
            <div className="mb-12">
                <div className="flex gap-3 overflow-x-auto pb-4 scrollbar-hide">
                    {categories.map(cat => (
                        <button
                            key={cat}
                            onClick={() => setActiveCategory(cat)}
                            className={`px-6 py-2.5 rounded-full text-sm font-medium whitespace-nowrap transition-all duration-300 ${
                                activeCategory === cat
                                    ? 'bg-gradient-to-r from-yellow-400 to-yellow-500 text-gray-900 shadow-lg scale-105'
                                    : 'bg-white text-gray-600 hover:bg-gray-100 border border-gray-200'
                            }`}
                        >
                            {cat}
                        </button>
                    ))}
                </div>
            </div>

            {/* Products Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 max-w-7xl mx-auto">

                {/* Left Column - 4 Products Grid */}
                <div className="lg:col-span-4">
                    <div className="grid grid-cols-2 gap-4">
                        {data?.products?.slice(0, 4).map(item => (
                            <Link to={`/${item.slug}/${item._id}`} key={item._id}>
                                <div className="bg-white rounded-md shadow-sm hover:shadow-2xl transition-all duration-300 group cursor-pointer border border-gray-100 hover:border-yellow-400">
                                    <div className="relative mb-3">
                                        <div className="absolute top-2 right-2 bg-red-500 text-white px-2 py-1 rounded-lg text-xs font-bold z-10">
                                            -{item.discount}%
                                        </div>
                                        <div className="bg-gradient-to-br from-gray-50 to-gray-100 rounded-tr-md rounded-tl-md h-32 flex items-center justify-center overflow-hidden">
                                            <img
                                                src={item.image}
                                                alt={item.name}
                                                className="w-full h-full object-contain transform group-hover:scale-110 transition-transform duration-500 object-cover"
                                            />
                                        </div>
                                    </div>

                                    <p className="text-xs text-gray-500 uppercase tracking-wide mb-1 px-3">{item.brand}</p>
                                    <h3 className="text-sm font-semibold text-gray-900 mb-2 line-clamp-2 min-h-10 px-3">
                                        {item.title}
                                    </h3>

                                    <div className="flex items-center gap-1 mb-3 px-3">
                                        <Star className="w-3 h-3 fill-yellow-400 text-yellow-400" />
                                        <span className="text-xs text-gray-600">{item?.rating}</span>
                                    </div>

                                    <div className="flex items-center justify-between px-3 pb-3">
                                        <div className="flex flex-col">
                                            <span className="text-sm font-semibold text-gray-900">Ksh. {item.finalPrice.toLocaleString()}</span>
                                        </div>
                                        <button className="bg-yellow-400 hover:bg-yellow-500 p-2 rounded-full transition-all duration-200 hover:scale-110">
                                            <ShoppingCart className="w-4 h-4 text-gray-900" />
                                        </button>
                                    </div>
                                </div>
                            </Link>
                        ))}
                    </div>
                </div>

                {/* Center Column - Featured Product */}
                <div className="lg:col-span-4">
                    <div className="bg-white rounded-md p-4 shadow-lg hover:shadow-2xl transition-all duration-300 h-full border border-gray-100 relative overflow-hidden">
                        {/* Decorative Background */}
                        <div className="absolute top-0 right-0 w-64 h-64 bg-gradient-to-br from-yellow-200/30 to-transparent rounded-full blur-3xl"></div>

                        <div className="relative z-10">
                            {/* Discount Badge */}
                            <div className="absolute top-0 right-0 flex flex-col items-center justify-center bg-gradient-to-br from-yellow-400 to-yellow-500 rounded-full h-20 w-20 shadow-xl">
                                <p className="text-xs font-semibold text-gray-900">Save</p>
                                <p className="text-2xl font-bold text-gray-900">{featuredProduct.discount}%</p>
                            </div>

                            <div className="flex flex-col items-start mb-6 mt-4">
                                <p className="text-sm text-gray-500 uppercase tracking-wider mb-1">{featuredProduct.brand}</p>
                                <h2 className="text-xl font-bold text-gray-900 text-center">{featuredProduct.name}</h2>

                                <div className="flex items-center gap-1 mt-2">
                                    {[...Array(5)].map((_, i) => (
                                        <Star key={i} className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                                    ))}
                                    <span className="text-sm text-gray-600 ml-1">({featuredProduct.rating})</span>
                                </div>
                            </div>

                            {/* Main Image */}
                            <div className="bg-gradient-to-br from-gray-50 to-gray-100 rounded-2xl mb-6">
                                <img
                                    src={featuredProduct.image}
                                    alt={featuredProduct.name}
                                    className="w-full h-64 object-contain hover:scale-105 transition-transform duration-500 object-cover"
                                />
                            </div>

                            {/* Thumbnails */}
                            <div className="flex gap-3 justify-center mb-6">
                                {featuredProduct.thumbnails.map((thumb, index) => (
                                    <div
                                        key={index}
                                        className="h-16 w-16 border-2 border-gray-200 hover:border-yellow-400 rounded-lg cursor-pointer transition-all duration-200 overflow-hidden"
                                    >
                                        <img src={thumb} alt="" className="w-full h-full object-cover" />
                                    </div>
                                ))}
                            </div>

                            {/* Price and CTA */}
                            <div className="flex items-center justify-between pt-4 border-t border-gray-200">
                                <div className="flex flex-col">
                                    <span className="text-3xl font-bold text-gray-900">
                                        Ksh. {featuredProduct.price.toLocaleString()}
                                    </span>
                                    <span className="text-sm text-gray-400 line-through">
                                        Ksh. {Math.round(featuredProduct.price / (1 - featuredProduct.discount / 100)).toLocaleString()}
                                    </span>
                                </div>
                                <button className="bg-gradient-to-r from-yellow-400 to-yellow-500 hover:from-yellow-500 hover:to-yellow-600 p-3 rounded-full transition-all duration-200 hover:scale-110 shadow-lg">
                                    <ShoppingCart className="w-6 h-6 text-gray-900" />
                                </button>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Right Column - 4 Products Grid */}
                <div className="lg:col-span-4">
                    <div className="grid grid-cols-2 gap-4">
                        {data?.products?.slice(2, 6).map(item => (
                            <Link to={`/${item.slug}/${item._id}`} key={item._id}>
                                <div className="bg-white rounded-md shadow-sm hover:shadow-2xl transition-all duration-300 group cursor-pointer border border-gray-100 hover:border-yellow-400">
                                    <div className="relative mb-3">
                                        <div className="absolute top-2 right-2 bg-red-500 text-white px-2 py-1 rounded-lg text-xs font-bold z-10">
                                            -{item.discount}%
                                        </div>
                                        <div className="bg-gradient-to-br from-gray-50 to-gray-100 rounded-tr-md rounded-tl-md h-32 flex items-center justify-center overflow-hidden">
                                            <img
                                                src={item.image}
                                                alt={item.name}
                                                className="w-full h-full object-contain transform group-hover:scale-110 transition-transform duration-500 object-cover"
                                            />
                                        </div>
                                    </div>

                                    <p className="text-xs text-gray-500 uppercase tracking-wide mb-1 px-3">{item?.brand}</p>
                                    <h3 className="text-sm font-semibold text-gray-900 mb-2 line-clamp-2 min-h-10 px-3">
                                        {item.title}
                                    </h3>

                                    <div className="flex items-center gap-1 mb-3 px-3">
                                        <Star className="w-3 h-3 fill-yellow-400 text-yellow-400" />
                                        <span className="text-xs text-gray-600">{item?.rating}</span>
                                    </div>

                                    <div className="flex items-center justify-between px-3 pb-3">
                                        <div className="flex flex-col">
                                            <span className="text-sm font-semibold text-gray-900">Ksh. {item?.finalPrice.toLocaleString()}</span>
                                        </div>
                                        <button className="bg-yellow-400 hover:bg-yellow-500 p-2 rounded-full transition-all duration-200 hover:scale-110">
                                            <ShoppingCart className="w-4 h-4 text-gray-900" />
                                        </button>
                                    </div>
                                </div>
                            </Link>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    )
}

export default MoreProducts