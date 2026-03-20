import React from 'react'

const OrdersTab = ({ orders, isError, load }) => {
  const data = orders?.orders
  console.log(orders?.orders)
  console.log(orders)
  console.log(data?.map(t => t.orderStatus))
	return (
		<div className="animate-fade-in">
            <div className="gradient-border overflow-hidden">
              <table className="w-full">
                <thead className="bg-zinc-900/50 border-b border-zinc-800">
                  <tr>
                    <th className="px-6 py-4 text-left text-xs font-semibold text-zinc-400 uppercase tracking-wider">Order ID</th>
                    <th className="px-6 py-4 text-left text-xs font-semibold text-zinc-400 uppercase tracking-wider">Customer</th>
                    <th className="px-6 py-4 text-left text-xs font-semibold text-zinc-400 uppercase tracking-wider">Items</th>
                    <th className="px-6 py-4 text-left text-xs font-semibold text-zinc-400 uppercase tracking-wider">Total</th>
                    <th className="px-6 py-4 text-left text-xs font-semibold text-zinc-400 uppercase tracking-wider">Status</th>
                    <th className="px-6 py-4 text-left text-xs font-semibold text-zinc-400 uppercase tracking-wider">Date</th>
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
                      <td className="px-6 py-4 text-sm text-zinc-400 mono">{order.createdAt}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
        </div>
	)
}

export default OrdersTab