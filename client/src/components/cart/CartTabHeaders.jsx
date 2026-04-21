import React, { useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom'
import { item } from "../../assets/products.js"
import { useGetProductReviewsQuery } from "../../redux/reviewsApi.jsx"

const CartTabHeaders = ({ id, activeTab, setActiveTab, product }) => {
    const {
        data,
        isLoading: reviewsLoading,
        isFetching,
    } = useGetProductReviewsQuery({ id });
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
            Details
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
            Reviews ({data?.reviews?.length})
          </button>
    </div>
	)
}

export default CartTabHeaders