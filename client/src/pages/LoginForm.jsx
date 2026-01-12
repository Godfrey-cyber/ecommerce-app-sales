import { slides } from "../utilities/assets.js"
import React, { useState, useEffect } from 'react'
import { ChevronRight, ChevronLeft, LogIn, User } from "lucide-react";
import { useNavigate, Link } from "react-router-dom"
import { ToastContainer, toast } from 'react-toastify';
import { loginUser } from "../redux/thunk/authThunk.js"
import { useDispatch, useSelector } from 'react-redux';

const LoginForm = () => {
	const dispatch = useDispatch()
	const navigate = useNavigate()
	const [focusedField, setFocusedField] = useState(null);
	const [formData, setFormData] = useState({
	    email: '',
	    password: ''
  	});

	const { email, password  } = formData;
	const isFormValid = email.trim() !== '' && password.trim() !== '';
	const { user, loading, error, accessToken } = useSelector(state => state.auth);

  const handleChange = (event) => {
    setFormData({
      ...formData,
      [event.target.name]: event.target.value
    });
  };
  const resetForm = () => setFormData({ email: "", password: "" });
  const handleSubmit = (event) => {
    event.preventDefault();
    if (email && password && isFormValid) {
		  dispatch(loginUser({ email, password }, navigate, toast));
		  resetForm();
	  } else {
	    	toast.error("Sorry! Cannot log you without credentials");
	  }
  };

  return (
  	<div className="lg:flex lg:flex-row flex-col w-full min-h-screen bg-white divide-gray-200 divide-x py-8">
	    <div className=" flex flex-col justify-center w-full max-w-md mx-auto bg-white p-6">
	      <span className="flex flex-row items-center space-x-3 text-2xl font-bold text-gray-800 mb-6">
				<LogIn className=""/>	
	    		<p className="">Login</p>
	      </span>
	      
	      <div className="space-y-4">
	        <div className="w-full">
	          <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
	            Email address <span className="text-red-500">*</span>
	          </label>
	          <input
	            type="email"
	            name="email"
	            id="email"
	            value={email}
	            onChange={handleChange}
	            required
	            className="w-full px-4 py-2.5 border border-gray-300 rounded-sm focus:ring-2 focus:ring-amber-500 focus:border-amber-500 outline-none transition"
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
	            value={password}
	            onChange={handleChange}
	            required
	            className="w-full px-4 py-2.5 border border-gray-300 rounded-sm focus:ring-2 focus:ring-amber-500 focus:border-amber-500 outline-none transition"
	          />
	        </div>

	        <button
	          onClick={handleSubmit}
	          className="w-full bg-amber-400 text-white font-semibold py-3 px-4 rounded-sm hover:bg-amber-600 transition duration-200 my-10">
	          Login
	        </button>
	      </div>
	    </div>
	    <div className="flex md:hidden items-center space-x-4 px-5 w-full">
	    	<span className="h-[.5px] w-1/2 bg-gray-500" />
	    	<p className="text-lg font-semibold text-gray-800">OR</p>
	    	<span className="h-[.5px] w-1/2 bg-gray-500" />
	    </div>
	    <div className=" flex flex-col items-center justify-center lg:col-span-6 w-full lg:w-1/2 max-w-md mx-auto bg-white p-6">
	    	<span className="flex flex-row items-center space-x-3 text-2xl font-bold text-gray-800 mb-6">
				<User className=""/>	
	    		<p className="">Login</p>
	      	</span>
	      	<p className="text-center text-sm font-semibold text-gray-400">Loging in this site allows you to access your order status and history. Just fill in the fields below, and you will get a new account set up for you in no time. We will only ask you for information necessary to make the purchase process faster and easier.</p>
	      	<Link to="/auth/register">
		      	<button className="w-fit bg-amber-400 text-white font-semibold py-3 px-6 rounded-sm hover:bg-amber-600 transition duration-200 mt-6">
		          Register
		    		</button>
	    	</Link>
	    </div>
    </div>
  );
};

export default LoginForm

