import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'

import { Provider } from 'react-redux';
import { store } from './redux/store.js';

// Stripe
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";

const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PUBLIC_KEY);

ReactDOM.createRoot(document.getElementById('root')).render(
    <React.StrictMode>
        <Elements stripe={stripePromise}>
            <Provider store={store}>
                <App />
            </Provider>
        </Elements>
    </React.StrictMode>,
)