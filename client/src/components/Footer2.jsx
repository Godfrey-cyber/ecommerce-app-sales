import React from 'react'
import {
  ShoppingCart, Search, Heart, User, ChevronRight, ChevronLeft,
  Star, Zap, TrendingUp, ArrowRight, Phone, Shield, Truck, RotateCcw,
  Bell, Menu, X, MapPin
} from "lucide-react";

const Footer2 = () => {
	return (
		<footer className="bg-gray-900 mt-16 text-white">
	        <div className="max-w-7xl mx-auto px-4 lg:px-8 py-12 grid grid-cols-2 lg:grid-cols-5 gap-8">
	          <div className="col-span-2 lg:col-span-1">
	            <div className="flex items-center gap-2 mb-4">
	              <div className="w-8 h-8 rounded-xl bg-amber-400 flex items-center justify-center font-black text-amber-900 text-sm">Z</div>
	              <span className="text-xl font-black tracking-tight">Zuri<span className="text-amber-500">.</span></span>
	            </div>
	            <p className="text-white/40 text-xs leading-relaxed mb-4">Kenya's most trusted online electronics & lifestyle marketplace.</p>
	            <div className="flex items-center gap-1 text-xs text-white/40">
	              <MapPin className="w-3 h-3" /> Nairobi, Kenya
	            </div>
	          </div>
	          {[
	            { h: "Shop", links: ["Phones & Tablets", "Computing", "TVs & Audio", "Appliances", "Health & Beauty", "Home & Office"] },
	            { h: "Account", links: ["My Profile", "Orders", "Wishlist", "Reviews", "Addresses"] },
	            { h: "Help",    links: ["FAQ", "Shipping Policy", "Returns", "Track Order", "Contact Us"] },
	            { h: "Company", links: ["About Zuri", "Careers", "Press", "Sell on Zuri", "Advertise"] },
	          ].map(col => (
	            <div key={col.h}>
	              <h4 className="text-xs font-bold text-white uppercase tracking-widest mb-3">{col.h}</h4>
	              <ul className="space-y-2">
	                {col.links.map(l => <li key={l}><a href="#" className="text-xs text-white/40 hover:text-white/80 transition-colors">{l}</a></li>)}
	              </ul>
	            </div>
	          ))}
	        </div>
	        <div className="border-t border-white/10 py-4 text-center text-white/30 text-xs">
	          © 2025 Waza Technologies Ltd · Built with ❤️ by Godfrey
	        </div>
      	</footer>
	)
}

export default Footer2

