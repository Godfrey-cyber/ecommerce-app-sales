import React from 'react'
import { useParams, useNavigate, Link } from 'react-router-dom'

const BankPayment = () => {
	const params = useParams()
	const { id } = useParams()
	console.log(params)
	return (
		<div>
			<p className="">ID: {id}</p> 
			<p className="">ID: {params}</p> 
		</div>
	)
}

export default BankPayment