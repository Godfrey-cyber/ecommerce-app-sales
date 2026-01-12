import { useState, useEffect } from 'react'
import reactLogo from './assets/react.svg'
import './App.css';
import viteLogo from '/vite.svg'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { BrowserRouter, Route, Routes, Navigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { loginSuccess, getCurrentUserSuccess, loginFailure, logout } from "./redux/slices/authSlice.js"
import { refreshUser, initializeAuth } from "./redux/thunk/authThunk.js"
import { axiosInstance } from './utilities/apiCalls.js';
// Pages
import HomePage from "./pages/HomePage.jsx"
import CartPage from "./pages/CartPage.jsx"
import CheckoutPage from "./pages/CheckoutPage.jsx"
// import HeroCarousel from "./pages/LoginPage.jsx"
import RegisterForm from "./pages/RegisterForm.jsx"
import LoginForm from "./pages/LoginForm.jsx"
import NotFound404Page from "./pages/NotFound404Page.jsx"
import ProductsPage from "./pages/ProductsPage.jsx"

function App() {
    const dispatch = useDispatch();
    const [isloading, setisLoading] = useState(true);
    const { user, loading, error, accessToken, isAuthenticated } = useSelector(state => state.auth);

    useEffect(() => {
    // On initial load, check if the user is authenticated
    // if (isAuthenticated === null || isAuthenticated === undefined) {
      dispatch(refreshUser());
      // dispatch(initializeAuth());
      // dispatch(loginUser({ email, password }, navigate, toast));
    // }
  }, [dispatch]);

    return (
        <section className="min-h-screen font-['Nunito'] scroll-smooth w-full overflow-x-hidden">
            <ToastContainer />
            <BrowserRouter>
                <Routes>
                    <Route path="/" element={<HomePage />} />
                    <Route path="/items/cart" element={<CartPage />} />
                    <Route path="/cart/checkout" element={accessToken ? <CheckoutPage /> : <LoginForm />} />
                    {/*<Route path="/home/demo" element={<HeroCarousel />} />*/}
                    <Route path="/auth/register" element={<RegisterForm />} />
                    <Route path="/auth/login" element={<LoginForm />} />
                    <Route path="*" element={<NotFound404Page />} />
                    <Route path="/:id" element={<ProductsPage />} />
                </Routes>
            </BrowserRouter>
        </section>
    )
}

export default App
