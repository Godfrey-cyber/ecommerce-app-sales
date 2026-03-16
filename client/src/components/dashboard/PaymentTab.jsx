import React from 'react'

const PaymentTab = () => {
	return (
		<div className="animate-fade-in">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="gradient-border p-6">
                <p className="text-sm text-zinc-500 mb-2">This Month</p>
                <p className="text-4xl font-bold text-amber-400 mono mb-4">$12,450</p>
                <div className="h-2 bg-zinc-900 overflow-hidden">
                  <div className="h-full bg-gradient-to-r from-amber-400 to-yellow-500" style={{width: '78%'}}></div>
                </div>
                <p className="text-xs text-zinc-500 mt-2">78% of target</p>
              </div>
              <div className="gradient-border p-6">
                <p className="text-sm text-zinc-500 mb-2">Pending</p>
                <p className="text-4xl font-bold text-white mono mb-4">$2,340</p>
                <div className="h-2 bg-zinc-900 overflow-hidden">
                  <div className="h-full bg-gradient-to-r from-blue-400 to-blue-500" style={{width: '45%'}}></div>
                </div>
                <p className="text-xs text-zinc-500 mt-2">7 transactions</p>
              </div>
              <div className="gradient-border p-6">
                <p className="text-sm text-zinc-500 mb-2">Completed</p>
                <p className="text-4xl font-bold text-white mono mb-4">$10,110</p>
                <div className="h-2 bg-zinc-900 overflow-hidden">
                  <div className="h-full bg-gradient-to-r from-green-400 to-green-500" style={{width: '92%'}}></div>
                </div>
                <p className="text-xs text-zinc-500 mt-2">23 transactions</p>
              </div>
            </div>
        </div>
	)
}

export default PaymentTab