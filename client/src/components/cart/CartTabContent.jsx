import React, { useState } from 'react';
import { Star,  RotateCcw, Check } from 'lucide-react';
import { products } from "../../assets/products.js"
import ProductReviews from "../../components/ProductReviews.jsx"

const CartTabContent = ({ activeTab, product }) => {
	return (
		<div className="p-3 md:p-5 lg:p-8">
            {activeTab === 'details' && (
              <div className="space-y-4">
                <h3 className="text-lg md:text-xl text-2xl  font-bold text-gray-900 mb-6">Features</h3>
                <div className="grid gap-3">
                 {/*{product.features.map((feature, index) => (*/} 
                    <div className="flex items-start gap-3">
                        <Check className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" />
                        <span className="text-gray-700 font-semibold">{product?.description}</span>
                    </div>
                    <div className="flex items-start gap-3">
                        <Check className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" />
                        <span className="text-gray-700 font-semibold">{product?.description}</span>
                    </div>
                    <div className="flex items-start gap-3">
                        <Check className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" />
                        <span className="text-gray-700 font-semibold">{product?.description}</span>
                    </div>
                  {/*))}*/}
                </div>
              </div>
            )}

            {activeTab === 'specs' && (
              <div className="space-y-4">
                <h3 className="text-lg md:text-xl text-2xl font-bold text-gray-900 mb-6">Specifications</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {Object.entries(product?.specifications).map(([key, value]) => (
                    <div key={key} className="flex justify-between p-4 bg-gray-50 rounded-xl">
                      <span className="font-semibold text-gray-900">{key}:</span>
                      <span className="text-gray-600">{value}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {activeTab === 'reviews' && (
              <div className="space-y-6">
                <div className="flex items-center justify-between mb-6">
                  <h3 className="text-lg md:text-xl text-2xl font-bold text-gray-900">Reviews</h3>
                  <button className="px-6 py-2 bg-yellow-400 hover:bg-yellow-500 text-gray-900 font-semibold rounded-xl transition">
                    Write a Review
                  </button>
                </div>
                
                <ProductReviews />
              </div>
            )}
          </div>
	)
}

export default CartTabContent