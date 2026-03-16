import React from 'react'
import { Edit2, Trash2, Eye } from 'lucide-react';

const ProductsTab = ({ userRole, data }) => {
	return (
		<div className="animate-fade-in">
            <div className="gradient-border overflow-hidden">
              <table className="w-full">
                <thead className="bg-zinc-900/50 border-b border-zinc-800">
                  <tr>
                    <th className="px-6 py-4 text-left text-xs font-semibold text-zinc-400 uppercase tracking-wider">Product</th>
                    <th className="px-6 py-4 text-left text-xs font-semibold text-zinc-400 uppercase tracking-wider">Category</th>
                    {userRole === 'admin' && (
                      <th className="px-6 py-4 text-left text-xs font-semibold text-zinc-400 uppercase tracking-wider">Vendor</th>
                    )}
                    <th className="px-6 py-4 text-left text-xs font-semibold text-zinc-400 uppercase tracking-wider">Price</th>
                    <th className="px-6 py-4 text-left text-xs font-semibold text-zinc-400 uppercase tracking-wider">Stock</th>
                    <th className="px-6 py-4 text-right text-xs font-semibold text-zinc-400 uppercase tracking-wider">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-zinc-800">
                  {data?.products?.map((product) => (
                    <tr key={product?._id} className="hover:bg-zinc-900/30 transition-colors">
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-3">
                          <div className="w-16 h-16 bg-zinc-900 flex items-center justify-center text-2xl border border-zinc-800">
                            
                            <img className="h-auto w-auto" src={product?.image} alt={product?.title} />
                          </div>
                          <div>
                            <p className="font-medium text-xs text-white leading-2">{product.title.length > 20 ? product.title.slice(0, 29) : product.title}</p>
                            <p className="text-sm text-zinc-500 mono">ID: {product._id.slice(0, 10)}</p>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        {/*<span className="px-3 py-1 text-xs font-medium bg-amber-400/10 text-amber-400 border border-amber-400/20">
                          {product.category}
                        </span>*/}
                        <span className="px-3 py-1 text-xs font-medium bg-amber-400/10 text-amber-400 border border-amber-400/20">
                          {product.brand}
                        </span>
                      </td>
                      {userRole === 'admin' && (
                        <td className="px-6 py-4 text-sm text-zinc-300">{product.vendor}</td>
                      )}
                      <td className="px-6 py-4">
                        <span className="font-semibold text-amber-400 mono">{new Intl.NumberFormat('en-KE', { style: 'currency', currency: 'KES' }).format(product.price)}</span>
                      </td>
                      <td className="px-6 py-4">
                        <span className={`font-medium ${product.stock < 20 ? 'text-red-400' : 'text-green-400'}`}>
                          {product.stock}
                        </span>
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex items-center justify-end gap-2">
                          <button className="p-2 text-zinc-400 hover:text-amber-400 hover:bg-zinc-900 transition-all">
                            <Eye size={16} />
                          </button>
                          <button className="p-2 text-zinc-400 hover:text-blue-400 hover:bg-zinc-900 transition-all">
                            <Edit2 size={16} />
                          </button>
                          <button
                            onClick={() => handleDeleteProduct(product._id)}
                            className="p-2 text-zinc-400 hover:text-red-400 hover:bg-zinc-900 transition-all"
                          >
                            <Trash2 size={16} />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
        </div>
	)
}

export default ProductsTab