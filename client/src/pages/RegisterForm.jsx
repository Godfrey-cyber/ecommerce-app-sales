import { slides } from "../utilities/assets.js"
import React, { useState, useEffect } from 'react'
import { ChevronRight, ChevronLeft, LogIn, User } from "lucide-react";

const RegisterForm = () => {
	const [formData, setFormData] = useState({
	    firstName: '',
	    lastName: '',
	    email: '',
	    password: ''
  	});
  	const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log('Form submitted:', formData);
    // Add your registration logic here
  };

  return (
  	<div className="grid grid-cols-12 w-full min-h-screen bg-white divide-gray-200 divide-x py-8">
	    <div className="col-span-12 lg:col-span-6 flex flex-col justify-center w-full max-w-md mx-auto bg-white p-6">
	      <span className="flex flex-row items-center space-x-3 text-2xl font-bold text-gray-800 mb-6">
				<User className=""/>	
	    		<p className="">Register</p>
	      </span>
	      
	      <div className="space-y-4">
	        <div className="w-full">
	          <label htmlFor="firstName" className="block text-sm font-medium text-gray-700 mb-1">
	            First Name
	          </label>
	          <input
	            type="text"
	            name="firstName"
	            id="firstName"
	            value={formData.firstName}
	            onChange={handleChange}
	            autoFocus
	            className="w-full px-4 py-2 border border-gray-300 rounded-sm focus:ring-2 focus:ring-amber-500 focus:border-amber-500 outline-none transition"
	          />
	        </div>

	        <div className="w-full">
	          <label htmlFor="lastName" className="block text-sm font-medium text-gray-700 mb-1">
	            Last Name
	          </label>
	          <input
	            type="text"
	            name="lastName"
	            id="lastName"
	            value={formData.lastName}
	            onChange={handleChange}
	            className="w-full px-4 py-2 border border-gray-300 rounded-sm focus:ring-2 focus:ring-amber-500 focus:border-amber-500 outline-none transition"
	          />
	        </div>

	        <div className="w-full">
	          <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
	            Email address <span className="text-red-500">*</span>
	          </label>
	          <input
	            type="email"
	            name="email"
	            id="email"
	            value={formData.email}
	            onChange={handleChange}
	            required
	            className="w-full px-4 py-2 border border-gray-300 rounded-sm focus:ring-2 focus:ring-amber-500 focus:border-amber-500 outline-none transition"
	          />
	        </div>

	        <div className="w-full">
	          <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">
	            Password <span className="text-red-500">*</span>
	          </label>
	          <input
	            type="password"
	            name="password"
	            id="password"
	            value={formData.password}
	            onChange={handleChange}
	            required
	            className="w-full px-4 py-2 border border-gray-300 rounded-sm focus:ring-2 focus:ring-amber-500 focus:border-amber-500 outline-none transition"
	          />
	        </div>

	        <button
	          onClick={handleSubmit}
	          className="w-full bg-amber-400 text-white font-semibold py-3 px-4 rounded-sm hover:bg-amber-600 transition duration-200 mt-6"
	        >
	          Register
	        </button>
	      </div>
	    </div>
	    <div className="col-span-12 lg:col-span-6 flex flex-col items-center justify-center lg:col-span-6 w-full max-w-md mx-auto bg-white p-6">
	    	<span className="flex flex-row items-center space-x-3 text-2xl font-bold text-gray-800 mb-6">
				<User className=""/>	
	    		<p className="">Register</p>
	      	</span>
	      	<p className="text-center text-sm font-semibold text-gray-400">Registering for this site allows you to access your order status and history. Just fill in the fields below, and you will get a new account set up for you in no time. We will only ask you for information necessary to make the purchase process faster and easier.</p>
	      	<button className="w-fit bg-amber-400 text-white font-semibold py-3 px-4 rounded-sm hover:bg-amber-600 transition duration-200 mt-6">
	          Register
	    	</button>
	    </div>
    </div>
  );
};

export default RegisterForm

