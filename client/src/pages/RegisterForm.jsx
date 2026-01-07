import { slides } from "../utilities/assets.js"
import React, { useState, useEffect } from 'react'
import { ChevronRight, ChevronLeft, LogIn, User } from "lucide-react";
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer, toast } from 'react-toastify';
import { useSelector, useDispatch } from "react-redux"
import { useNavigate, Link } from "react-router-dom"
// files
import { signUpUser } from "../redux/thunk/authThunk.js"

const RegisterForm = () => {
	const navigate = useNavigate();
	const dispatch = useDispatch();
	const [formData, setFormData] = useState({
	    firstname: '',
	    lastname: '',
	    email: '',
	    password: ''
  	});
  	const [toggle, setToggle] = useState(false);
  	const { email, password, lastname, firstname } = formData;
  	const [showPassword, setShowPassword] = useState(false);
  	const [focusedField, setFocusedField] = useState(null);
  	const [errors, setErrors] = useState({});

  	const { user, loading, error, accessToken } = useSelector(state => state.auth);
  	const handleChange = (event) => {
    setFormData({
      ...formData,
      [event.target.name]: event.target.value
    });
    // setErrors({ ...errors, [event.target.name]: "" });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    dispatch(signUpUser(formData, navigate, toast));
	    setFormData({ email: "", password: "", firstname: "", lastname: "" });
	    // setErrors({});
  };

  return (
  	<div className="lg:flex lg:flex-row flex-col w-full min-h-screen bg-white divide-gray-200 divide-x py-8">
	    <div className=" flex flex-col justify-center w-full max-w-md mx-auto bg-white p-6">
	      <span className="flex flex-row items-center space-x-3 text-2xl font-bold text-gray-800 mb-6">
				<User className=""/>	
	    		<p className="">Register</p>
	      </span>
	      
	      <div className="space-y-4">
	        <div className="w-full">
	          <label htmlFor="firstname" className="block text-sm font-medium text-gray-700 mb-1">
	            First Name
	          </label>
	          <input
	            type="text"
	            name="firstname"
	            id="firstname"
	            value={formData.firstname}
	            onChange={handleChange}
	            autoFocus
	            className="w-full px-4 py-2.5 border border-gray-300 rounded-sm focus:ring-2 focus:ring-amber-500 focus:border-amber-500 outline-none transition"
	          />
	        </div>

	        <div className="w-full">
	          <label htmlFor="lastname" className="block text-sm font-medium text-gray-700 mb-1">
	            Last Name
	          </label>
	          <input
	            type="text"
	            name="lastname"
	            id="lastname"
	            value={formData.lastname}
	            onChange={handleChange}
	            className="w-full px-4 py-2.5 border border-gray-300 rounded-sm focus:ring-2 focus:ring-amber-500 focus:border-amber-500 outline-none transition"
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
	            value={formData.password}
	            onChange={handleChange}
	            required
	            className="w-full px-4 py-2.5 border border-gray-300 rounded-sm focus:ring-2 focus:ring-amber-500 focus:border-amber-500 outline-none transition"
	          />
	        </div>

	        <button
	          onClick={handleSubmit}
	          className="w-full bg-amber-400 text-white font-semibold py-3 px-4 rounded-sm hover:bg-amber-600 transition duration-200 my-10">
	          Register
	        </button>
	      </div>
	    </div>
	    <div className="flex md:hidden items-center space-x-4 px-5 w-full">
	    	<span className="h-[.5px] w-1/2 bg-gray-500" />
	    	<p className="text-lg font-semibold text-gray-800">OR</p>
	    	<span className="h-[.5px] w-1/2 bg-gray-500" />
	    </div>
	    <div className=" flex flex-col items-center justify-center lg:col-span-6 w-full max-w-md mx-auto bg-white p-6">
	    	<span className="flex flex-row items-center space-x-3 text-2xl font-bold text-gray-800 mb-6">
				<User className=""/>	
	    		<p className="">Register</p>
	      	</span>
	      	<p className="text-center text-sm font-semibold text-gray-400">Registering for this site allows you to access your order status and history. Just fill in the fields below, and you will get a new account set up for you in no time. We will only ask you for information necessary to make the purchase process faster and easier.</p>
	      	<Link to="/auth/login">
		      	<button className="w-fit bg-amber-400 text-white font-semibold py-3 px-6 rounded-sm hover:bg-amber-600 transition duration-200 mt-6">
		          Login
		    		</button>
	    	</Link>
	    </div>
    </div>
  );
};

export default RegisterForm

