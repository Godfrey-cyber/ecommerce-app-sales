import React from 'react'
import { useParams, useNavigate, Link, useLocation } from 'react-router-dom'

const MpesaPayment = () => {
	const { id, method } = useParams()
	const params = useParams()
	return (
		<div className="w-full flex flex-col items-center justify-center h-screen">
			<p className="">Order ID: {id}</p> 
			<p className="">Payment Method: {method}</p> 
		</div>
	)
}

export default MpesaPayment