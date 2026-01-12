import React, { useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom'
import { product } from "../../assets/products.js"

const CartTabHeaders = () => {
	const [activeTab, setActiveTab] = useState('details');
	return (
		<div className="flex border-b border-gray-200">
            <button
              onClick={() => setActiveTab('details')}
              className={`flex-1 py-4 px-6 font-semibold transition-all ${
                activeTab === 'details'
                  ? 'text-yellow-600 border-b-2 border-yellow-400 bg-yellow-50'
                  : 'text-gray-600 hover:bg-gray-50'
              }`}
            >
              Product Details
            </button>
            <button
              onClick={() => setActiveTab('specs')}
              className={`flex-1 py-4 px-6 font-semibold transition-all ${
                activeTab === 'specs'
                  ? 'text-yellow-600 border-b-2 border-yellow-400 bg-yellow-50'
                  : 'text-gray-600 hover:bg-gray-50'
              }`}
            >
              Specifications
            </button>
            <button
              onClick={() => setActiveTab('reviews')}
              className={`flex-1 py-4 px-6 font-semibold transition-all ${
                activeTab === 'reviews'
                  ? 'text-yellow-600 border-b-2 border-yellow-400 bg-yellow-50'
                  : 'text-gray-600 hover:bg-gray-50'
              }`}
            >
              Customer Reviews ({product.totalReviews})
            </button>
          </div>
	)
}

export default CartTabHeaders