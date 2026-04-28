"use client";
import { useState, useEffect, useRef } from "react";
import {
  ShoppingCart, Search, Heart, User, ChevronRight, ChevronLeft,
  Star, Zap, TrendingUp, ArrowRight, Phone, Shield, Truck, RotateCcw,
  Bell, Menu, X, MapPin
} from "lucide-react";
import { NAV_LINKS, CATEGORIES, HERO_SLIDES, TRENDING,FLASH_DEALS, BRAND_DEALS, PERKS } "../assets/products.js"

// ─── Mock Data ─────

// ─── Utility ────────────────────

const fmt = (n) =>
  new Intl.NumberFormat("en-KE", { style: "currency", currency: "KES", maximumFractionDigits: 0 }).format(n);

function StarRow({ rating, reviews }) {
  return (
    <div className="flex items-center gap-1">
        {[1,2,3,4,5].map(i => (
            <Star key={i} className={`w-2.5 h-2.5 ${i <= Math.round(rating) ? "fill-amber-400 text-amber-400" : "fill-gray-200 text-gray-200"}`} />
        ))}
        <span className="text-[10px] text-gray-400 ml-0.5">({reviews?.toLocaleString()})</span>
    </div>
  );
}

// ─── Product Card ─────────────

function ProductCard({ item, size = "md" }) {
  const [liked, setLiked] = useState(false);
  const isLg = size === "lg";
  return (
    <div className={`group relative bg-white border border-gray-100 rounded-2xl overflow-hidden hover:border-amber-300 hover:shadow-lg transition-all duration-200 cursor-pointer flex flex-col ${isLg ? "p-0" : ""}`}>
      {item.badge && (
        <span className={`absolute top-2.5 left-2.5 z-10 text-[10px] font-semibold px-2 py-0.5 rounded-full ${
          item.badge === "Best Seller" ? "bg-amber-400 text-amber-900" :
          item.badge === "Hot"         ? "bg-red-500 text-white"       :
          item.badge === "Top Rated"   ? "bg-emerald-500 text-white"   :
          item.badge === "New"         ? "bg-blue-500 text-white"      : ""
        }`}>{item.badge}</span>
      )}
      <button
        onClick={(e) => { e.stopPropagation(); setLiked(!liked); }}
        className="absolute top-2.5 right-2.5 z-10 w-7 h-7 rounded-full bg-white/80 backdrop-blur-sm flex items-center justify-center border border-gray-100 opacity-0 group-hover:opacity-100 transition-opacity"
      >
        <Heart className={`w-3.5 h-3.5 ${liked ? "fill-red-500 text-red-500" : "text-gray-400"}`} />
      </button>

      <div className={`bg-gradient-to-br ${item.bg} flex items-center justify-center overflow-hidden ${isLg ? "h-48" : "h-36"}`}>
        <span className="text-5xl group-hover:scale-110 transition-transform duration-500">{item.emoji}</span>
        {item.discount > 0 && (
          <span className="absolute bottom-2 right-2 bg-red-500/90 text-white text-[10px] font-bold px-1.5 py-0.5 rounded">
            -{item.discount}%
          </span>
        )}
      </div>

      <div className={`flex flex-col flex-1 ${isLg ? "p-4" : "p-3"}`}>
        <p className="text-[10px] font-semibold text-gray-400 uppercase tracking-widest mb-1">{item.brand}</p>
        <h3 className={`font-medium text-gray-900 leading-snug line-clamp-2 mb-2 ${isLg ? "text-sm min-h-10" : "text-[12px] min-h-8"}`}>
          {item.title}
        </h3>
        <StarRow rating={item.rating} reviews={item.reviews} />
        <div className="flex items-center justify-between mt-auto pt-3">
          <div>
            <p className={`font-bold text-gray-900 ${isLg ? "text-base" : "text-sm"}`}>{fmt(item.price)}</p>
            {item.original && <p className="text-[10px] text-gray-400 line-through">{fmt(item.original)}</p>}
          </div>
          <button
            onClick={(e) => e.stopPropagation()}
            className="w-8 h-8 rounded-full bg-amber-400 hover:bg-amber-500 flex items-center justify-center transition-colors flex-shrink-0"
          >
            <ShoppingCart className="w-3.5 h-3.5 text-amber-900" />
          </button>
        </div>
      </div>
    </div>
  );
}

// ─── Flash Deal Card ──────────────────────────────────────────────────────────

function FlashCard({ item }) {
  const [time, setTime] = useState(item.timeLeft);
  useEffect(() => {
    const t = setInterval(() => {
      setTime(prev => {
        let { h, m, s } = prev;
        s--;
        if (s < 0) { s = 59; m--; }
        if (m < 0) { m = 59; h--; }
        if (h < 0) return { h:0, m:0, s:0 };
        return { h, m, s };
      });
    }, 1000);
    return () => clearInterval(t);
  }, []);
  const pad = n => String(n).padStart(2, "0");
  const pct = Math.round((1 - item.price / item.original) * 100);
  const sold = Math.round(40 + Math.random() * 45);

  return (
    <div className="bg-white rounded-2xl border border-gray-100 p-3.5 hover:border-amber-300 hover:shadow-md transition-all duration-200 cursor-pointer group flex flex-col gap-3">
      <div className="bg-gradient-to-br from-gray-50 to-amber-50/30 rounded-xl h-28 flex items-center justify-center">
        <span className="text-4xl group-hover:scale-110 transition-transform duration-300">{item.emoji}</span>
      </div>
      <div>
        <p className="text-[10px] font-semibold text-gray-400 uppercase tracking-widest">{item.brand}</p>
        <p className="text-[12px] font-medium text-gray-900 leading-snug line-clamp-2 mt-0.5">{item.title}</p>
      </div>
      <div className="flex items-baseline gap-2">
        <span className="text-sm font-bold text-gray-900">{fmt(item.price)}</span>
        <span className="text-[10px] text-gray-400 line-through">{fmt(item.original)}</span>
        <span className="text-[10px] font-bold text-red-600 ml-auto">-{pct}%</span>
      </div>
      {/* Progress bar */}
      <div>
        <div className="flex justify-between text-[10px] text-gray-400 mb-1">
          <span>🔥 {sold}% sold</span>
        </div>
        <div className="h-1.5 bg-gray-100 rounded-full overflow-hidden">
          <div className="h-full bg-gradient-to-r from-amber-400 to-orange-500 rounded-full" style={{ width: `${sold}%` }} />
        </div>
      </div>
      {/* Countdown */}
      <div className="flex items-center gap-1 justify-center bg-gray-900 rounded-xl py-1.5">
        {[pad(time.h), pad(time.m), pad(time.s)].map((v, i) => (
          <span key={i} className="flex items-center gap-1">
            <span className="bg-amber-400 text-amber-900 font-bold text-xs px-1.5 py-0.5 rounded">{v}</span>
            {i < 2 && <span className="text-amber-400 font-bold text-xs">:</span>}
          </span>
        ))}
      </div>
      <button className="w-full py-2 rounded-xl bg-amber-400 hover:bg-amber-500 text-amber-900 font-semibold text-xs transition-colors">
        Add to Cart
      </button>
    </div>
  );
}

// ─── Section Header ───────────────────────────────────────────────────────────

function SectionHeader({ icon: Icon, tag, title, sub, cta = "View All", accent = "amber" }) {
  const clr = accent === "red" ? "text-red-600 bg-red-50" : accent === "blue" ? "text-blue-600 bg-blue-50" : "text-amber-700 bg-amber-50";
  const btn = accent === "red" ? "text-red-600 hover:text-red-700" : accent === "blue" ? "text-blue-600 hover:text-blue-700" : "text-amber-700 hover:text-amber-800";
  return (
    <div className="flex items-end justify-between mb-6">
      <div className="flex items-center gap-3">
        {Icon && <div className={`w-9 h-9 rounded-xl ${clr} flex items-center justify-center`}><Icon className="w-4.5 h-4.5" /></div>}
        <div>
          {tag && <p className="text-[10px] font-semibold uppercase tracking-widest text-gray-400 mb-0.5">{tag}</p>}
          <h2 className="text-xl font-bold text-gray-900 leading-none">{title}</h2>
          {sub && <p className="text-xs text-gray-500 mt-0.5">{sub}</p>}
        </div>
      </div>
      <button className={`flex items-center gap-1 text-sm font-medium ${btn} transition-colors`}>
        {cta} <ArrowRight className="w-3.5 h-3.5" />
      </button>
    </div>
  );
}

// ─── Hero Carousel ────────────────────────────────────────────────────────────

function HeroCarousel() {
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
  );
}

// ─── Navbar ───────────────────────────────────────────────────────────────────

function Navbar() {
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
          <a href="#" className="flex items-center gap-1.5 flex-shrink-0">
            <div className="w-8 h-8 rounded-xl bg-amber-400 flex items-center justify-center font-black text-amber-900 text-sm">Z</div>
            <span className="text-xl font-black text-gray-900 tracking-tight">Zuri<span className="text-amber-500">.</span></span>
          </a>

          {/* Search */}
          <div className={`flex-1 max-w-xl mx-4 flex items-center bg-gray-50 border rounded-xl px-3 gap-2 transition-all ${searchFocused ? "border-amber-400 shadow-sm bg-white" : "border-gray-200"}`}>
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
        <nav className="hidden lg:flex items-center gap-1 pb-2 overflow-x-auto scrollbar-hide">
          <button className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold text-white bg-gray-900 flex-shrink-0 mr-1">
            <Menu className="w-3.5 h-3.5" /> All Categories
          </button>
          {CATEGORIES.map(c => (
            <a key={c.id} href="#" className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium text-gray-600 hover:text-gray-900 hover:bg-gray-100 transition-all whitespace-nowrap flex-shrink-0">
              <span className="text-sm">{c.icon}</span> {c.name}
            </a>
          ))}
          {NAV_LINKS.map(l => (
            <a key={l} href="#" className={`px-3 py-1.5 rounded-lg text-xs font-medium whitespace-nowrap flex-shrink-0 transition-all ${l === "Deals" ? "text-red-600 font-bold hover:bg-red-50" : "text-gray-600 hover:text-gray-900 hover:bg-gray-100"}`}>{l}</a>
          ))}
        </nav>
      </div>
    </header>
  );
}

// ─── HomePage ─────────────────────────────────────────────────────────────────

export default function HomePage() {
  const scrollRef = useRef(null);

  const scroll = (dir) => {
    if (scrollRef.current) scrollRef.current.scrollLeft += dir * 280;
  };

  return (
    <div className="min-h-screen bg-gray-50 font-sans">
      <Navbar />

      <main className="max-w-7xl mx-auto px-4 lg:px-8 py-6 space-y-12">

        {/* ── Hero + Sidebar ── */}
        <section className="grid grid-cols-1 lg:grid-cols-4 gap-4">
          {/* Category sidebar */}
          <div className="hidden lg:flex flex-col gap-0.5 bg-white border border-gray-100 rounded-3xl p-2">
            {CATEGORIES.map(c => (
              <a key={c.id} href="#" className="flex items-center gap-3 px-3 py-2.5 rounded-2xl hover:bg-amber-50 group transition-all">
                <span className="text-xl w-8 text-center">{c.icon}</span>
                <div className="min-w-0">
                  <p className="text-xs font-semibold text-gray-800 group-hover:text-amber-800 leading-tight">{c.name}</p>
                  <p className="text-[10px] text-gray-400">{c.count}</p>
                </div>
                <ChevronRight className="w-3.5 h-3.5 text-gray-300 group-hover:text-amber-500 ml-auto flex-shrink-0" />
              </a>
            ))}
            <div className="mt-2 mx-1 rounded-2xl bg-gradient-to-br from-amber-400 to-orange-500 p-3 text-center">
              <p className="text-amber-900 font-bold text-xs mb-1">🛍️ Sell on Zuri</p>
              <p className="text-amber-800 text-[10px] mb-2">Reach 2M+ customers</p>
              <button className="w-full bg-white text-amber-700 text-xs font-semibold py-1.5 rounded-xl hover:bg-amber-50 transition-colors">
                Start Selling
              </button>
            </div>
          </div>

          {/* Hero carousel */}
          <div className="lg:col-span-3">
            <HeroCarousel />
            {/* Mini banners */}
            <div className="grid grid-cols-2 lg:grid-cols-3 gap-3 mt-3">
              {[
                { label:"Flash Sale", sub:"Up to 50% off", bg:"bg-red-500",    emoji:"⚡", text:"text-white" },
                { label:"New Arrivals", sub:"Just landed",  bg:"bg-gray-900",   emoji:"✨", text:"text-white" },
                { label:"Top Brands",  sub:"Exclusive deals",bg:"bg-amber-400", emoji:"🏆", text:"text-amber-900" },
              ].map(b => (
                <button key={b.label} className={`${b.bg} ${b.text} rounded-2xl px-4 py-3 flex items-center gap-3 hover:opacity-90 transition-opacity text-left`}>
                  <span className="text-2xl">{b.emoji}</span>
                  <div>
                    <p className="font-bold text-sm leading-tight">{b.label}</p>
                    <p className="text-[10px] opacity-70">{b.sub}</p>
                  </div>
                  <ArrowRight className="w-4 h-4 ml-auto opacity-60" />
                </button>
              ))}
            </div>
          </div>
        </section>

        {/* ── Perks Bar ── */}
        <section className="grid grid-cols-2 lg:grid-cols-4 gap-3">
          {PERKS.map(({ icon: Icon, label, sub }) => (
            <div key={label} className="flex items-center gap-3 bg-white border border-gray-100 rounded-2xl px-4 py-3.5">
              <div className="w-9 h-9 rounded-xl bg-amber-50 flex items-center justify-center flex-shrink-0">
                <Icon className="w-4.5 h-4.5 text-amber-600" />
              </div>
              <div>
                <p className="text-xs font-semibold text-gray-800 leading-tight">{label}</p>
                <p className="text-[10px] text-gray-400">{sub}</p>
              </div>
            </div>
          ))}
        </section>

        {/* ── Shop by Category ── */}
        <section>
          <SectionHeader icon={null} tag="Browse" title="Shop by Category" />
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
            {CATEGORIES.map(c => (
              <a key={c.id} href="#" className={`group flex flex-col items-center gap-3 ${c.bg} rounded-2xl py-6 px-4 hover:shadow-md transition-all duration-200 border border-transparent hover:border-amber-200 text-center`}>
                <span className="text-3xl group-hover:scale-110 transition-transform duration-300">{c.icon}</span>
                <div>
                  <p className={`text-xs font-bold ${c.accent} leading-tight`}>{c.name}</p>
                  <p className="text-[10px] text-gray-400 mt-0.5">{c.count}</p>
                </div>
              </a>
            ))}
          </div>
        </section>

        {/* ── Flash Deals ── */}
        <section>
          <SectionHeader icon={Zap} tag="Today Only" title="Flash Deals" sub="Grab them before they're gone" accent="red" />
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            {FLASH_DEALS.map(item => <FlashCard key={item.id} item={item} />)}
          </div>
        </section>

        {/* ── Trending Products ── */}
        <section>
          <div className="flex items-end justify-between mb-6">
            <SectionHeader icon={TrendingUp} tag="This Week" title="Trending Now" sub="Most loved by shoppers" />
            <div className="hidden lg:flex gap-2 mb-6">
              <button onClick={() => scroll(-1)} className="w-8 h-8 rounded-full border border-gray-200 hover:border-gray-300 flex items-center justify-center transition-colors"><ChevronLeft className="w-4 h-4 text-gray-600" /></button>
              <button onClick={() => scroll(1)}  className="w-8 h-8 rounded-full border border-gray-200 hover:border-gray-300 flex items-center justify-center transition-colors"><ChevronRight className="w-4 h-4 text-gray-600" /></button>
            </div>
          </div>
          <div ref={scrollRef} className="flex gap-4 overflow-x-auto scrollbar-hide pb-2 snap-x">
            {TRENDING.map(item => (
              <div key={item.id} className="flex-shrink-0 w-44 lg:w-52 snap-start">
                <ProductCard item={item} />
              </div>
            ))}
          </div>
        </section>

        {/* ── Featured + Grid ── */}
        <section>
          <SectionHeader icon={null} tag="Handpicked" title="Editor's Picks" />
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
            {/* Large featured */}
            <div className="lg:col-span-1 bg-gradient-to-br from-slate-900 to-slate-800 rounded-3xl p-6 flex flex-col justify-between min-h-[320px] relative overflow-hidden cursor-pointer group hover:shadow-xl transition-shadow">
              <div className="absolute -bottom-8 -right-8 text-[160px] opacity-10 select-none group-hover:opacity-20 transition-opacity">💻</div>
              <div className="relative z-10">
                <span className="text-xs font-semibold text-amber-400 uppercase tracking-wider">Featured Drop</span>
                <h3 className="text-2xl font-black text-white mt-2 leading-tight">Dell XPS 15<br /><span className="text-white/60 font-light text-lg">Core i9 · RTX 4060</span></h3>
                <p className="text-white/40 text-sm mt-2">The ultimate creator laptop. Engineered to perfection.</p>
              </div>
              <div className="relative z-10 mt-6">
                <p className="text-white/50 text-sm line-through">Ksh 210,000</p>
                <p className="text-2xl font-black text-white">Ksh 185,000</p>
                <button className="mt-3 bg-amber-400 hover:bg-amber-500 text-amber-900 font-bold text-sm px-5 py-2.5 rounded-xl transition-colors">
                  Shop Now →
                </button>
              </div>
            </div>

            {/* 2×2 grid */}
            <div className="lg:col-span-2 grid grid-cols-2 gap-4">
              {TRENDING.slice(0, 4).map(item => <ProductCard key={item.id} item={item} />)}
            </div>
          </div>
        </section>

        {/* ── Brand Deals ── */}
        <section>
          <SectionHeader icon={null} tag="Official Stores" title="Top Brands" />
          <div className="grid grid-cols-3 lg:grid-cols-6 gap-3">
            {BRAND_DEALS.map(b => (
              <button key={b.brand} className={`${b.color} ${b.text} rounded-2xl py-5 flex flex-col items-center gap-2 hover:opacity-90 hover:scale-105 transition-all duration-200 group`}>
                <span className="text-2xl">{b.emoji}</span>
                <p className="font-bold text-sm">{b.brand}</p>
                <p className="text-[10px] opacity-60">{b.deal}</p>
              </button>
            ))}
          </div>
        </section>

        {/* ── Category Sections ── */}
        {[
          { title: "Phones & Tablets",  emoji: "📱", accent: "violet", items: TRENDING.filter((_, i) => [0,4,1,3].includes(i)) },
          { title: "Home & Appliances", emoji: "🏠", accent: "orange", items: TRENDING.filter((_, i) => [3,6,5,2].includes(i)) },
        ].map(section => (
          <section key={section.title}>
            <div className="flex items-center gap-3 mb-6">
              <span className="text-2xl">{section.emoji}</span>
              <h2 className="text-xl font-bold text-gray-900">{section.title}</h2>
              <div className="flex-1 h-px bg-gray-100 ml-2" />
              <button className="text-sm font-medium text-gray-500 hover:text-gray-800 flex items-center gap-1">View All <ArrowRight className="w-3.5 h-3.5" /></button>
            </div>
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
              {section.items.map(item => <ProductCard key={item.id} item={item} size="lg" />)}
            </div>
          </section>
        ))}

        {/* ── Newsletter ── */}
        <section className="bg-gradient-to-br from-gray-900 to-slate-800 rounded-3xl p-8 lg:p-12 flex flex-col lg:flex-row items-center justify-between gap-8 relative overflow-hidden">
          <div className="absolute -top-12 -right-12 w-64 h-64 rounded-full bg-amber-400/10" />
          <div className="absolute -bottom-8 left-20 w-40 h-40 rounded-full bg-amber-400/5" />
          <div className="relative z-10 text-center lg:text-left">
            <p className="text-amber-400 text-xs font-semibold uppercase tracking-widest mb-2">Stay in the loop</p>
            <h2 className="text-2xl lg:text-3xl font-black text-white mb-2">Get Exclusive Deals</h2>
            <p className="text-white/50 text-sm">Join 240,000+ shoppers getting the best deals first.</p>
          </div>
          <div className="relative z-10 flex gap-2 w-full lg:w-auto">
            <input
              type="email"
              placeholder="Enter your email"
              className="flex-1 lg:w-72 bg-white/10 border border-white/20 text-white placeholder-white/30 rounded-xl px-4 py-3 text-sm outline-none focus:border-amber-400 transition-colors"
            />
            <button className="bg-amber-400 hover:bg-amber-500 text-amber-900 font-bold px-6 py-3 rounded-xl text-sm transition-colors whitespace-nowrap">
              Subscribe
            </button>
          </div>
        </section>

        {/* ── Recently Viewed stub ── */}
        <section>
          <SectionHeader icon={null} tag="Based on your history" title="Recently Viewed" />
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            {TRENDING.slice(4).map(item => <ProductCard key={item.id} item={item} />)}
          </div>
        </section>

      </main>

      {/* ── Footer ── */}
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
          © 2025 Zuri Technologies Ltd · Built with ❤️ in Nairobi
        </div>
      </footer>
    </div>
  );
}