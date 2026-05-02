import { useState, useEffect, useRef } from "react";
import {
  ShoppingCart, Search, Heart, User, ChevronRight, ChevronLeft,
  Star, Zap, TrendingUp, ArrowRight, Phone, Shield, Truck, RotateCcw,
  Bell, Menu, X, MapPin
} from "lucide-react";
import { Link } from "react-router-dom"

const Navbar = ({ categories, category }) => {
	const [menuOpen, setMenuOpen] = useState(false);
  	const [searchFocused, setSearchFocused] = useState(false);
	return (
		<header className="sticky top-0 z-50 bg-white/95 backdrop-blur-md border-b border-gray-100">
      {/* Top bar */}
      <div className="bg-gray-900 text-white text-xs py-1.5 text-center font-medium tracking-wide">
        🎉 Free delivery on orders over <span className="text-amber-400 font-bold">Ksh 5,000</span> — Shop now
      </div>

      <div className="max-w-7xl mx-auto px-4 lg:px-8">
        {/* Main row */}
        <div className="flex items-center gap-4 h-16">
          {/* Logo */}
          <Link to='/home' className="flex items-center gap-1.5 flex-shrink-0">
            <div className="w-8 h-8 rounded-xl bg-amber-400 flex items-center justify-center font-black text-amber-900 text-sm">Z</div>
            <span className="text-xl font-black text-gray-900 tracking-tight">Zuri<span className="text-amber-500">.</span></span>
          </Link>

          {/* Search */}
          <div className={`hidden md:flex flex-1 max-w-xl mx-4 items-center bg-gray-50 border rounded-xl px-3 gap-2 transition-all ${searchFocused ? "border-amber-400 shadow-sm bg-white" : "border-gray-200"}`}>
            <Search className="w-4 h-4 text-gray-400 flex-shrink-0" />
            <input
              type="text"
              placeholder="Search products, brands, categories..."
              onFocus={() => setSearchFocused(true)}
              onBlur={() => setSearchFocused(false)}
              className="flex-1 bg-transparent py-2.5 text-sm text-gray-800 placeholder-gray-400 outline-none"
            />
            <button className="bg-amber-400 hover:bg-amber-500 text-amber-900 text-xs font-semibold px-3 py-1.5 rounded-lg transition-colors flex-shrink-0">
              Search
            </button>
          </div>

          {/* Icons */}
          <div className="flex items-center gap-1 ml-auto">
            <button className="p-2 rounded-xl hover:bg-gray-100 transition-colors relative">
              <Bell className="w-5 h-5 text-gray-600" />
              <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-red-500 rounded-full" />
            </button>
            <button className="p-2 rounded-xl hover:bg-gray-100 transition-colors">
              <Heart className="w-5 h-5 text-gray-600" />
            </button>
            <button className="flex items-center gap-2 p-2 rounded-xl hover:bg-gray-100 transition-colors relative">
              <ShoppingCart className="w-5 h-5 text-gray-600" />
              <span className="absolute top-1 right-1 w-4 h-4 bg-amber-400 text-amber-900 text-[9px] font-bold rounded-full flex items-center justify-center">3</span>
            </button>
            <button className="flex items-center gap-2 pl-2 pr-3 py-2 rounded-xl hover:bg-gray-100 transition-colors ml-1">
              <div className="w-7 h-7 rounded-full bg-gray-900 flex items-center justify-center">
                <User className="w-3.5 h-3.5 text-white" />
              </div>
              <span className="hidden lg:block text-sm font-medium text-gray-700">Account</span>
            </button>
          </div>

          <button className="lg:hidden p-2" onClick={() => setMenuOpen(!menuOpen)}>
            {menuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>

        {/* Category nav */}
        <nav className="hidden lg:flex items-center lg:justify-between gap-1 pb-2 overflow-x-auto scrollbar-hide">
          <button className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold text-white bg-gray-900 flex-shrink-0 mr-1">
            <Menu className="w-3.5 h-3.5" /> All Categories
          </button>
          {/*{categories?.data?.map(c => (
            <Link key={c._id} to={`/${c?.slug}`} className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium text-gray-600 hover:text-gray-900 hover:bg-gray-100 transition-all whitespace-nowrap flex-shrink-0">
              <span className="text-sm">{c?.title}</span>
            </Link>
          ))}*/}
           	<div>
	          {categories?.data?.map(cat => (
	            <Link key={cat?._id} to={`/${cat?.slug}`} className={`px-3 py-1.5 rounded-lg text-xs font-medium whitespace-nowrap flex-shrink-0 transition-all ${cat?.slug === category ? "text-red-600 font-bold hover:bg-red-50" : "text-gray-600 hover:text-gray-900 hover:bg-gray-100"}`}>{cat?.title}</Link>
	          ))}
      		</div>
      		<span/>
        </nav>
      </div>
    </header>
	)
}

export default Navbar