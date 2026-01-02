import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useSelector, useDispatch } from "react-redux"
import { selectUser, logoutStart, logoutFailure, logoutSuccess, loginSuccess } from "../Redux/slices/userSlice.js"
import { getLoggedinUser } from '../apiCalls.js'

const Header = () => {

	const navigate = useNavigate()
	const dispatch = useDispatch()
	const user = useSelector(selectUser)
	

	console.log(user)

	const token = JSON.parse(localStorage?.getItem("tokens")).access
	const [showModal, setShowModal] = useState(false)
	const [userData, setUserData] = useState([])
	console.log(user)

    // useEffect(() => {
    // 	getLoggedinUser(token, setUserData, dispatch, loginSuccess, navigate)
    // }, [])

	const Button = () => {
		return (
			<button onClick={() => navigate("/")} className="header-button">Login</button>
		)
	}

		const handleLogout = () => {
			dispatch(logoutStart())
			dispatch(logoutSuccess())
			navigate("/")
			console.log("User loged out")
		}
	
	// console.log(user)
	return (
		<nav className="large_header">
			<div className="header-div1">
				{/*header*/}
	        	<div className="flex space-x-3 items-center">
		        	<span onClick={() => navigate("/home")} className="flex flex-col h-10 lg:h-8 cursor-pointer w-auto">
		        		<h4 className="text-lg lg:text-xl text-black font-bold font-['Montserrat']">Kilele Health</h4>
		        		<h4 className="text-sm text-black font-bold font-['Lemon']">Bracelets</h4>
		        	</span>
	        	</div>
	        	<div className="hidden lg:flex items-center space-x-4">
	        		<p className="header-list">Pages</p>
	        		<p onClick={() => navigate("/dashboard")} className="header-list">Dashboard</p>
	        		<p className="header-list">Doctors</p>
	        		<p className="header-list">Contacts</p>
	        	</div>
	        	
	        	<div className="flex space-x-2 items-center rounded-full cursor-pointer">
		    		{user && <span onClick={() => setShowModal(prev => !prev)} className="flex h-10 w-10 rounded-full m-1">
		    			<img className="object-cover w-full h-full rounded-full" src="https://doccure-wp.dreamstechnologies.com/wp-content/uploads/2023/07/work-img.png" alt="" />
		    		</span>}
		    		{user ? <span className="hidden lg:flex flex-col space-y-.5">
		    			<p className="text-xs font-semibold text-black">{user?.user?.is_patient ? "" : "Dr."} {user?.user?.username}</p>
		    			<p className="text-xs font-normal text-gray-400">MBBS, Gynacologist</p>
		    		</span> : <button onClick={() => navigate("/login-user")} className="text-white bg-green-500 hover:bg-green-400 hover:border-2 hover:border-green-600 rounded-md px-4 py-2 font-semibold text-sm">Log In</button>}
		    		{user && <button onClick={handleLogout} className="text-white bg-black hover:bg-green-500 hover:border-2 hover:border-green-600 rounded-md px-4 py-2 font-semibold text-sm">Log Out</button>}
		    	</div>
	        	
	        	{showModal && (
					<div className="flex flex-col w-44 rounded-md shadow-md shadow-gray-300 h-auto absolute bg-red-200 z-40 right-52 top-10">
						<p className="text-sm font-normal text-gray-600 px-4 py-1">My Profile</p>
						<p className="text-sm font-normal text-gray-600 px-4 py-1">Dashboard</p>
						<p className="text-sm font-normal text-gray-600 px-4 py-1">Log Out</p>
					</div>
				)}
	        </div> 	
		</nav>
	)
}

export default Header