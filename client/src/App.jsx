import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import Header from "./components/Header.jsx"
import SmallHeader from "./components/SmallHeader.jsx"
import ShowcaseSection from "./components/ShowcaseSection.jsx"
import ProductsCat from "./components/ProductsCat.jsx"
import MoreProducts from "./components/MoreProducts.jsx"
import BestSellers from "./components/BestSellers.jsx"
import NewArrivals from "./components/NewArrivals.jsx"
import ProfiledProducts from "./components/ProfiledProducts.jsx"
import EmailSignUp from "./components/EmailSignUp.jsx"
import Test from "./components/Test.jsx"

import './App.css'

function App() {
    const [count, setCount] = useState(0)

    return (
        <div className="">
            <Header />
            <SmallHeader />
            <ShowcaseSection />
            <ProductsCat />
            <MoreProducts />
            <BestSellers />
            <NewArrivals />
            <ProfiledProducts />
            <EmailSignUp />
            <Test /> />
        </div>
    )
}

export default App
