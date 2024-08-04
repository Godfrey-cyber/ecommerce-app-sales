import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import Header from "./components/Header.jsx"
import SmallHeader from "./components/SmallHeader.jsx"
import ShowcaseSection from "./components/ShowcaseSection.jsx"

import './App.css'

function App() {
    const [count, setCount] = useState(0)

    return (
        <div className="">
            <Header />
            <SmallHeader />
            <ShowcaseSection />
        </div>
    )
}

export default App
