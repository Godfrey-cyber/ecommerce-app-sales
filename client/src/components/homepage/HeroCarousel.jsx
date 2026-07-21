import React, { useState, useEffect } from 'react'
import { NAV_LINKS, CATEGORIES, HERO_SLIDES, TRENDING,FLASH_DEALS, BRAND_DEALS, PERKS } from "../../assets/products.js"
import {
  ShoppingCart, Search, Heart, User, ChevronRight, ChevronLeft,
  Star, Zap, TrendingUp, ArrowRight, Phone, Shield, Truck, RotateCcw,
  Bell, Menu, X, MapPin
} from "lucide-react";

const HeroCarousel = () => {
	const [active, setActive] = useState(0);
	useEffect(() => {
	    const t = setInterval(() => setActive(a => (a + 1) % HERO_SLIDES.length), 5000);
	    return () => clearInterval(t);
	}, []);
  	const s = HERO_SLIDES[active];
	return (
		<div className={`relative rounded-3xl overflow-hidden bg-gradient-to-br ${s.bg} transition-all duration-700`} style={{ minHeight: 420 }}>
	      {/* Subtle grid overlay */}
	      <div className="absolute inset-0 opacity-5" style={{ backgroundImage: "linear-gradient(rgba(255,255,255,.1) 1px,transparent 1px),linear-gradient(90deg,rgba(255,255,255,.1) 1px,transparent 1px)", backgroundSize: "40px 40px" }} />

	      <div className="relative z-10 flex flex-col lg:flex-row items-center justify-between p-8 lg:p-12 h-full gap-8" style={{ minHeight: 420 }}>
	        {/* Text */}
	        <div className="flex-1 text-white">
	          <div
	            className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-semibold mb-5"
	            style={{ background: `${s.accent}22`, color: s.accent, border: `1px solid ${s.accent}44` }}
	          >
	            <Zap className="w-3 h-3" /> {s.tag}
	          </div>
	          <h1 className="text-4xl lg:text-5xl font-black text-white leading-tight mb-2">{s.title}</h1>
	          <p className="text-white/60 text-lg font-light mb-1">{s.subtitle}</p>
	          <p className="text-white/40 text-sm mb-6">{s.desc}</p>

	          <div className="flex items-baseline gap-3 mb-8">
	            <span className="text-3xl font-black text-white">{s.price}</span>
	            <span className="text-white/40 line-through text-lg">{s.originalPrice}</span>
	            <span className="text-xs font-bold px-2 py-1 rounded-lg" style={{ background: `${s.accent}33`, color: s.accent }}>
	              {s.discount}
	            </span>
	          </div>

	          <div className="flex gap-3">
	            <button
	              className="px-7 py-3 rounded-xl font-bold text-sm transition-all hover:scale-105 active:scale-95"
	              style={{ background: s.accent, color: "#1a1a1a" }}
	            >
	              {s.cta}
	            </button>
	            <button className="px-7 py-3 rounded-xl font-semibold text-sm text-white/70 border border-white/20 hover:border-white/40 transition-all">
	              Learn More
	            </button>
	          </div>
	        </div>

	        {/* Product visual */}
	        <div className="flex-shrink-0 flex items-center justify-center">
	          <div className={`w-56 h-56 lg:w-72 lg:h-72 rounded-3xl bg-gradient-to-br ${s.imgBg} flex items-center justify-center shadow-2xl`} style={{ boxShadow: `0 40px 80px ${s.accent}33` }}>
	            <span className="text-8xl lg:text-9xl select-none">{s.emoji}</span>
	          </div>
	        </div>
	      </div>

	      {/* Dots */}
	      <div className="absolute bottom-5 left-1/2 -translate-x-1/2 flex gap-2 z-20">
	        {HERO_SLIDES.map((_, i) => (
	          <button
	            key={i}
	            onClick={() => setActive(i)}
	            className="h-1.5 rounded-full transition-all duration-300"
	            style={{ width: i === active ? 24 : 8, background: i === active ? s.accent : "rgba(255,255,255,0.3)" }}
	          />
	        ))}
	      </div>

	      {/* Nav arrows */}
	      {[{ dir: -1, Icon: ChevronLeft, pos: "left-4" }, { dir: 1, Icon: ChevronRight, pos: "right-4" }].map(({ dir, Icon, pos }) => (
	        <button
	          key={pos}
	          onClick={() => setActive(a => (a + dir + HERO_SLIDES.length) % HERO_SLIDES.length)}
	          className={`absolute ${pos} top-1/2 -translate-y-1/2 z-20 w-9 h-9 rounded-full bg-white/10 hover:bg-white/20 backdrop-blur-sm border border-white/20 flex items-center justify-center transition-all`}
	        >
	          <Icon className="w-4 h-4 text-white" />
	        </button>
	    ))}
    </div>
	)
}

export default HeroCarousel