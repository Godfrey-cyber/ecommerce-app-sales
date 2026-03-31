import { useState, useEffect } from 'react'
import reactLogo from './assets/react.svg'
import './App.css';
import viteLogo from '/vite.svg'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { BrowserRouter, Route, Routes, Navigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { useGetMeQuery} from "./redux/authApi.jsx"
import { axiosInstance } from './utilities/apiCalls.js';
// Pages
import HomePage from "./pages/HomePage.jsx"
import CartPage from "./pages/CartPage.jsx"
import CheckoutPage1 from "./pages/CheckoutPage1.jsx"
import CheckoutPage from "./pages/CheckoutPage.jsx"
// import HeroCarousel from "./pages/LoginPage.jsx"
import RegisterForm from "./pages/RegisterForm.jsx"
import LoginForm from "./pages/LoginForm.jsx"
import NotFound404Page from "./pages/NotFound404Page.jsx"
import ProductsPage from "./pages/ProductsPage.jsx"
import { setUser } from "./redux/slices/authSlice.js"
import Dashboard from "./pages/Dashboard.jsx"
import Orders from "./pages/Orders.jsx"
import BankPayment from "./pages/BankPayment.jsx"
import MpesaPayment from "./pages/MpesaPayment.jsx"
import DummyCheck from "./pages/DummyCheck.jsx"
// payment/mpesa/${result.order._id}

function App() {
    const dispatch = useDispatch();
    // const { data:me, isSuccess } = useGetMeQuery();
    // const { isAuthenticated, user } = useSelector((state) => state.auth);
    const { data: user, isLoading } = useGetMeQuery();
    console.log("user -=-=", user)

    if (isLoading) return <div className="w-full h-screen flex flex-col items-center justify-center bg-yellow-400">Loading...</div>

    return (
        <section className="min-h-screen font-['Nunito'] relative scroll-smooth w-screen overflow-x-auto">
            <ToastContainer />
            <BrowserRouter>
                <Routes>
                    <Route path="/" element={<HomePage />} />
                    <Route path="/items/cart" element={<CartPage />} />
                    <Route path="/cart/checkout" element={user ? <CheckoutPage /> : <LoginForm />} />
                    <Route path="/auth/register" element={<RegisterForm />} />
                    <Route path="/auth/login" element={<LoginForm />} />
                    <Route path="*" element={<NotFound404Page />} />
                    <Route path="/:slug/:id" element={<ProductsPage />} />
                    <Route path="/checkout/select-payment" element={user ? <CheckoutPage1 /> : <HomePage />} />
                    <Route path="/dashboard" element={user ? <Dashboard /> : <HomePage />} />
                    <Route path="/orders" element={<Orders />} />
                    {/* Payments */}
                    <Route path="/payment/:method/order/:id" element={<MpesaPayment />} />
                    <Route path="/payment/:method/order/:id" element={<BankPayment />} />
                    <Route path="/payment" element={<DummyCheck />} />
                </Routes>
            </BrowserRouter>
        </section>
    )
}

export default App


// docker run -d \
//   --name mysql-container \
//   -e MYSQL_ROOT_PASSWORD=godfrey0860 \
//   -e MYSQL_DATABASE=chat-app \
//   -e MYSQL_token=godfrey \
//   -e MYSQL_PASSWORD=chat-godfrey \
//   -p 3306:3306 \
//   -v mysql57-data:/var/lib/mysql \
//   mysql:5.7


