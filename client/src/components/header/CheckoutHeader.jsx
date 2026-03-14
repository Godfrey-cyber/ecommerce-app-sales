import React from 'react'
import { HelpCircle, Phone, RotateCcw, Lock } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';

const CheckoutHeader = () => {
	const FeatureItem = ({ icon, text }) => (
		<button className="flex items-center gap-2 text-sm text-gray-600 hover:text-orange-500 transition-colors">
		    <div className="w-5 h-5 flex items-center justify-center bg-gray-100 rounded-full">
		      {icon}
		    </div>
		    <span className="hidden xl:inline">{text}</span>
		  </button>
	);
	
	return (
		<header className="sticky top-0 z-50 bg-white border-b border-gray-200 shadow-sm">
	        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
		        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 items-center">
		            {/* Logo */}
		            <Link to="/" className="flex items-center space-x-2 flex-shrink-0">
			            <div className="w-10 h-10 bg-amber-400 rounded-lg flex items-center justify-center">
			              <span className="text-2xl font-bold text-gray-800">B</span>
			            </div>
			            <span className="text-xl font-bold text-gray-800 hidden sm:block">
			              BookStore
			            </span>
			          </Link>

		            {/* Checkout Step */}
		            <div className="text-center">
		              	<h2 className="text-lg font-semibold text-gray-900 mb-2">
		                	Select Shipping Options
		              	</h2>
		            </div>

		            {/* Features */}
		            <div className="hidden lg:flex items-center justify-end gap-6">
			            <FeatureItem icon={<HelpCircle size={16} />} text="Need Help?" />
			            {/*<FeatureItem icon={<Phone size={16} />} text="Contact Us" />*/}
			            <FeatureItem icon={<RotateCcw size={16} />} text="Easy Return" />
			            <FeatureItem icon={<Lock size={16} />} text="Secure" />
		            </div>
		        </div>
	        </div>
      </header>
	)
}

export default CheckoutHeader