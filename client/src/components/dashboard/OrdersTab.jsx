import React from 'react'

const OrdersTab = ({ orders, isError, load }) => {
  const data = orders?.orders
  console.log(data)
	return (
		<div className="animate-fade-in">
            <div className="gradient-border overflow-hidden">
              <table className="w-full">
                <thead className="bg-zinc-900/50 border-b border-zinc-800">
                  <tr>
                    <th className="title-table">Order ID</th>
                    <th className="title-table">Customer</th>
                    <th className="title-table">Mode</th>
                    <th className="title-table">Total(Ksh.)</th>
                    <th className="title-table">Status</th>
                    <th className="title-table">Date</th>
                    <th className="title-table">Time</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-zinc-800">
                  {data?.map((order) => (
                    <tr key={order._id} className="hover:bg-zinc-900/30 transition-colors">
                      <td className="px-6 py-4">
                        <span className="font-semibold text-amber-400 mono">#{order._id.slice(0, 6)}</span>
                      </td>
                      <td className="px-6 py-4 text-sm text-white">{order.shippingAddress.firstname}</td>
                      <td className="px-6 py-4 text-sm text-zinc-300">{order?.paymentMethod}</td>
                      <td className="px-6 py-4">
                        <span className="font-semibold text-green-400 mono">{new Intl.NumberFormat('en-KE', { style: 'currency', currency: 'KES' }).format(order.totalAmount)}</span>

                      </td>
                      <td className="px-6 py-4">
                        <span className={`px-3 py-1 text-xs font-medium border ${
                          order.orderStatus === 'Delivered' ? 'bg-green-400/10 text-green-400 border-green-400/20' :
                          order.orderStatus === 'Shipped' ? 'bg-blue-400/10 text-blue-400 border-blue-400/20' :
                          order.orderStatus === 'Cancelled' ? 'bg-red-400/10 text-red-400 border-red-400/20' :
                          'bg-amber-400/10 text-amber-400 border-amber-400/20'
                        }`}>
                          {order.orderStatus.toUpperCase()}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-sm text-zinc-400 mono">{new Date(order.createdAt).toLocaleString("en-KE", { timeZone: "Africa/Nairobi", year: "numeric", month: "short" })}</td>
                      <td className="px-6 py-4 text-sm text-zinc-400 mono">{new Date(order.createdAt).toLocaleString("en-KE", { hour: "2-digit", minute: "2-digit" })}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
        </div>
	)
}

export default OrdersTab