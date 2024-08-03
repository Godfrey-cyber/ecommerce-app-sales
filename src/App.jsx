import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

function App() {
    const [count, setCount] = useState(0)

    return (
        <div className="text-sm text-green-500 font-bold px-20">
            <p className="mt-4">Hello Great People</p>
        </div>
    )
}

export default App
