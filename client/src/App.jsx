import { useState } from 'react'
import reactLogo from './assets/react.svg'
import './App.css';
import viteLogo from '/vite.svg'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { BrowserRouter, Route, Routes, Navigate } from 'react-router-dom';
// Pages
import HomePage from "./pages/HomePage.jsx"
import CartPage from "./pages/CartPage.jsx"
import CheckoutPage from "./pages/CheckoutPage.jsx"
import HeroCarousel from "./pages/LoginPage.jsx"

function App() {
    return (
        <section className="min-h-screen font-['Nunito'] scroll-smooth w-full overflow-x-hidden">
            <ToastContainer />
            <BrowserRouter>
                <Routes>
                    <Route path="/" element={<HomePage />} />
                    <Route path="/items/cart" element={<CartPage />} />
                    <Route path="/cart/checkout" element={<CheckoutPage />} />
                    <Route path="/home/demo" element={<HeroCarousel />} />
                </Routes>
            </BrowserRouter>
        </section>
    )
}

export default App
