import React from 'react'

const Done = ({ orders, setDone }) => {
	return (
		<div className="min-h-screen bg-slate-50 flex items-center justify-center p-6">
	        <div className="text-center max-w-sm">
		        <div className="w-20 h-20 rounded-full bg-emerald-100 flex items-center justify-center mx-auto mb-6">
		            <svg className="w-9 h-9 text-emerald-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
		              <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
		            </svg>
		        </div>
		        <h2 className="text-2xl font-bold text-slate-900 mb-2">Payment Successful!</h2>
		        <p className="text-sm text-slate-500 mb-1">Your order has been placed.</p>
		        <p className="text-xs text-slate-400 font-mono mb-8">Order #ORD-{Math.floor(Math.random() * 90000 + 10000)}</p>
		        <p className="text-sm font-semibold text-slate-700 mb-6">{new Intl.NumberFormat('en-KE', { style: 'currency', currency: 'KES' }).format(orders?.orders[0]?.totalAmount)} charged to your card.</p>

		        <button
		            onClick={() => setDone(false)}
		            className="px-8 py-3 rounded-xl bg-slate-900 text-white text-sm font-semibold hover:bg-slate-700 transition-colors"
		        >
		            Continue Shopping
		        </button>
	        </div>
      	</div>
	)
}

export default Done