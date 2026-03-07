import React from 'react'
// import Header from "../components/Header.jsx"
import Header1 from "../components/Header1.jsx"
import SmallHeader from "../components/SmallHeader.jsx"
import ShowcaseSection from "../components/ShowcaseSection.jsx"
import ProductsCat from "../components/ProductsCat.jsx"
import MoreProducts from "../components/MoreProducts.jsx"
import BestSellers from "../components/BestSellers.jsx"
import NewArrivals from "../components/NewArrivals.jsx"
import ProfiledProducts from "../components/ProfiledProducts.jsx"
import EmailSignUp from "../components/EmailSignUp.jsx"
import Footer from "../components/Footer.jsx"
import Test from "../components/Test.jsx"
import HelloPage from "../pages/HelloPage.jsx"
import { useSelector } from "react-redux"

const HomePage = () => {
    const { user, accessToken } = useSelector(state => state.auth);

	return (
		<div className="flex-col">
            {/*<Header />*/}
            <Header1 />
            <SmallHeader />
            <ShowcaseSection />
            <ProductsCat />
            <MoreProducts />
            <BestSellers />
            <NewArrivals />
            <ProfiledProducts />
            <EmailSignUp />
            <Footer />
            <HelloPage />
        </div>
	)
}

export default HomePage