"use client";
import { useState, useEffect, useRef } from "react";
import {
  ShoppingCart, Search, Heart, User, ChevronRight, ChevronLeft,
  Star, Zap, TrendingUp, ArrowRight, Phone, Shield, Truck, RotateCcw,
  Bell, Menu, X, MapPin
} from "lucide-react";
import { useGetProductsQuery } from "../redux/productsApi.jsx"
import { Link, useNavigate } from "react-router-dom"
import { useGetCategoriesQuery, useGetCatProductsQuery } from "../redux/categoriesApi.jsx"
import { useGetBrandsQuery } from "../redux/productsApi.jsx"

import { NAV_LINKS, CATEGORIES, HERO_SLIDES, TRENDING,FLASH_DEALS, BRAND_DEALS, PERKS } from "../assets/products.js"
import ProductCard2 from "../components/ProductCard2.jsx"
import FlashCard from "../components/homepage/FlashCard.jsx"
import SectionHeader from "../components/homepage/SectionHeader.jsx"
import HeroCarousel from "../components/homepage/HeroCarousel.jsx"
import Navbar from "../components/homepage/Navbar.jsx"
import Footer from "../components/Footer2.jsx"
import StarRow from "../components/StarRow.jsx"

const fmt = (n) =>
  new Intl.NumberFormat("en-KE", { style: "currency", currency: "KES", maximumFractionDigits: 0 }).format(n);

const HomePage = () => {
  const { data:categories, isLoading:loadingCat } = useGetCategoriesQuery();
  const { data:products, error, isLoading } = useGetProductsQuery();
  const { data:brands, brandError, brandLoading } = useGetBrandsQuery();
  const { data:catProds, prodError, prodLoading } = useGetCatProductsQuery()

  const navigate = useNavigate()
  console.log("categories", categories)
  console.log("products", products)
  console.log("catProds", catProds?.categories)
  const scrollRef = useRef(null);


  const scroll = (dir) => {
    if (scrollRef.current) scrollRef.current.scrollLeft += dir * 280;
  };

  return (
    <div className="min-h-screen bg-gray-50 font-sans">
      <Navbar categories={categories} />

      <main className="max-w-7xl mx-auto px-4 lg:px-8 py-6 space-y-12">

        {/* ── Hero + Sidebar ── */}
        <section className="grid grid-cols-1 lg:grid-cols-4 gap-4">
          {/* Category sidebar */}
          <div className="hidden lg:flex flex-col gap-0.5 bg-white border border-gray-100 rounded-3xl p-2">
            {categories?.data?.map(c => (
              <Link to={`/categories/${c.slug}`} key={c._id} className="flex items-center gap-3 px-3 py-2.5 rounded-2xl hover:bg-amber-50 group transition-all">
                <span className="text-xl w-8 text-center">{c?.icon}</span>
                <div className="min-w-0">
                  <p className="text-xs font-semibold text-gray-800 group-hover:text-amber-800 leading-tight">{c.title}</p>
                  <p className="text-[10px] text-gray-400">{c?.count}</p>
                </div>
                <ChevronRight className="w-3.5 h-3.5 text-gray-300 group-hover:text-amber-500 ml-auto flex-shrink-0" />
              </Link>
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
            {categories?.data?.map(c => (
              <Link key={c._id} to={`/categories/${c.slug}`} className="group flex flex-col items-center gap-3 rounded-2xl py-6 px-4 hover:shadow-md transition-all duration-200 border border-transparent hover:border-amber-200 text-center">
                <span className="text-3xl group-hover:scale-110 transition-transform duration-300">{c?.icon}</span>
                <div>
                  <p className={`text-xs font-bold ${c?.accent} leading-tight`}>{c.title}</p>
                  <p className="text-[10px] text-gray-400 mt-0.5">{c?.count}</p>
                </div>
              </Link>
            ))}
          </div>
        </section>

        {/* ── Flash Deals ── */}
        <section>
          <SectionHeader icon={Zap} tag="Today Only" title="Flash Deals" sub="Grab them before they're gone" accent="red" />
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            {products?.products?.slice(0, 4).map(product => <FlashCard key={product._id} product={product} />)}
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
            {products?.products.slice(0, 9).map(product => (
              <div key={product.id} className="flex-shrink-0 w-44 lg:w-52 snap-start">
                <ProductCard2 product={product} key={product._id} />
              </div>
            ))}
          </div>
        </section>

        {/* ── Featured + Grid ── */}
        <section>
          <SectionHeader icon={null} tag="Handpicked" title="Editor's Picks" />
          <div className="grid grid-cols-12 lg:grid-cols-4 gap-4">
            {/* Large featured */}
            {/*<div className="lg:col-span-1 bg-gradient-to-br from-slate-900 to-slate-800 rounded-3xl p-6 flex flex-col justify-between min-h-[320px] relative overflow-hidden cursor-pointer group hover:shadow-xl transition-shadow">
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
            </div>*/}

            {/* 2×2 grid */}
            <div className="lg:col-span-4 grid grid-cols-4 gap-4">
              {products?.products?.slice(0, 8).map(product => <ProductCard2 key={product._id} product={product} />)}
            </div>
          </div>
        </section>

        {/* ── Brand Deals ── */}
        <section>
            <SectionHeader icon={null} tag="Official Stores" title="Top Brands" />
            <div className="grid grid-cols-3 lg:grid-cols-6 gap-3">
                {brands?.brands?.slice(0, 6).map(brand => (
                    // <Link key={brand.brand} to={`/${brand.brand}`}>
                    <button onClick={() => navigate(`/${brand.brand}`)} key={brand.brand} className="rounded-2xl bg-amber-100 hover:border border-amber-200 py-5 flex flex-col items-center gap-2 hover:opacity-90 hover:scale-105 transition-all duration-200 group">
                        <span className="text-2xl">{brand?.emoji}</span>
                        <p className="font-bold text-sm">{brand.brand}</p>
                        <p className="text-[10px] opacity-60">{brand?.count}+ items</p>
                    </button>
                ))}
            </div>
        </section>

        {/* ── Category Sections ── */}
        <section className="my-4">
            {catProds?.categories?.map(section => (
              <div className="my-2 md:my-4 lg:my-6" key={section.title}>
                <div className="flex items-center gap-3 mb-6">
                  <span className="text-2xl"></span>
                  {/*<h2 className="text-xl font-bold text-gray-900">{section.title}</h2>*/}
                  <SectionHeader icon={null} tag="Official Stores" title={`${section.title}`} />
                  <div className="flex-1 h-px bg-gray-100 ml-2" />
                  <button className="text-sm font-medium text-gray-500 hover:text-gray-800 flex items-center gap-1">View All <ArrowRight className="w-3.5 h-3.5" /></button>
                </div>
                <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                  {section?.products?.map(product => <ProductCard2 key={product.id} product={product} size="lg" />)}
                </div>
              </div>
            ))}
        </section>

        {/* ── Newsletter ── */}
        <section className="bg-gradient-to-br from-gray-900 to-slate-800 rounded-3xl p-8 lg:p-12 flex flex-col lg:flex-row items-center justify-between gap-8 relative overflow-hidden">
          <div className="absolute -top-12 -right-12 w-64 h-64 rounded-full bg-amber-400/10" />
          <div className="absolute -bottom-8 left-20 w-40 h-40 rounded-full bg-amber-400/5" />
          <div className="relative z-10 text-center lg:text-left">
            <p className="text-amber-400 text-xs font-semibold uppercase tracking-widest mb-2">Stay in the loop</p>
            <h2 className="text-2xl lg:text-3xl font-black text-white mb-2">Get Exclusive Deals</h2>
            <p className="text-white/50 text-sm">Join 240,000+ shoppers getting the best deals first.</p>
          </div>
          <div className="md:flex-row md:space-x-4 flex-col relative z-10 gap-2 w-full lg:w-auto">
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
            {products?.products?.slice(6, 10).map(product => <ProductCard2 key={product.id} product={product} />)}
          </div>
        </section>

      </main>

      {/* ── Footer ── */}
      <Footer />
    </div>
  );
}

export default HomePage