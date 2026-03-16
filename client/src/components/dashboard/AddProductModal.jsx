import React from 'react'
import { X } from 'lucide-react';

const AddProductModal = ({ newProduct, categories, setNewProduct, handleAddProduct, setShowAddModal  }) => {
	return (
		<div className="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center z-50 animate-fade-in overflow-y-auto">
          <div className="gradient-border w-full max-w-md p-8 animate-slide-in-up h-auto">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-2xl font-bold text-white">Add New Product</h3>
              <button
                onClick={() => setShowAddModal(false)}
                className="text-zinc-400 hover:text-white transition-colors"
              >
                <X size={24} />
              </button>
            </div>
            <div className="space-y-4">
              <div>
              	{/*Title*/}
                <label className="block text-sm text-zinc-400 mb-2">Product Name*</label>
                <input
                  type="text"
                  value={newProduct.name}
                  onChange={(e) => setNewProduct({...newProduct, name: e.target.value})}
                  className="w-full px-4 py-3 bg-zinc-900 border border-zinc-800 text-white focus:border-amber-400 focus:outline-none transition-colors placeholder:text-sm"
                  placeholder="e.g. Lenovo IdeaPad Intel Core i7...."
                />
              </div>
              <div>
              	{/*Price*/}
                <label className="block text-sm text-zinc-400 mb-2">Price</label>
                <input
                  type="number"
                  value={newProduct.price}
                  onChange={(e) => setNewProduct({...newProduct, price: e.target.value})}
                  className="w-full px-4 py-3 bg-zinc-900 border border-zinc-800 text-white focus:border-amber-400 focus:outline-none transition-colors mono"
                  placeholder="0.00"
                />
              </div>
              <div>
              	{/*Stock*/}
                <label className="block text-sm text-zinc-400 mb-2">Stock</label>
                <input
                  type="number"
                  value={newProduct.stock}
                  onChange={(e) => setNewProduct({...newProduct, stock: e.target.value})}
                  className="w-full px-4 py-3 bg-zinc-900 border border-zinc-800 text-white focus:border-amber-400 focus:outline-none transition-colors mono"
                  placeholder="0"
                />
              </div>
              <div>
                <label className="block text-sm text-zinc-400 mb-2">Select Parent Category. e.g Laptop</label>
		            <select
		                value={newProduct.category}
		                onChange={(e) => setNewProduct({...newProduct, category: e.target.value})}
		                className="w-full px-4 py-3 bg-zinc-900 border border-zinc-800 text-white focus:border-amber-400 focus:outline-none transition-colors appearance-none cursor-pointer">
		                <option disabled>Select Category</option>
		                {categories?.data?.map(cat => (
		                	<option key={cat._id} value={cat._id}>{cat.title}</option>
		                ))}
	               	</select>
	            </div>
	            <div>
	                <label className="block text-sm text-zinc-400 mb-2">Subcategory *</label>
	                <select
	                  value={newProduct.subcategory}
	                  onChange={(e) => setNewProduct({...newProduct, subcategory: e.target.value})}
	                  disabled={!newProduct.category}
	                  className="w-full px-4 py-3 bg-zinc-900 border border-zinc-800 text-white focus:border-amber-400 focus:outline-none transition-colors appearance-none cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed">
	                  <option value="" disabled>
	                    Select subcategory
	                  </option>
	                  {categories?.data?.map(subcat => (
	                    <option key={subcat._id} value={subcat._id}>{subcat.title}</option>
	                  ))}
	                </select>
              </div>
              <div>
              	{/*Description*/}
                <label className="block text-sm text-zinc-400 mb-2">Description</label>
                <input
                  type="text"
                  value={newProduct.description}
                  onChange={(e) => setNewProduct({...newProduct, description: e.target.value})}
                  className="w-full px-4 py-3 bg-zinc-900 border border-zinc-800 text-white focus:border-amber-400 focus:outline-none transition-colors"
                  placeholder="Enter description"
                />
              </div>
              <div>
              	{/*image*/}
                <label className="block text-sm text-zinc-400 mb-2">Image</label>
                <input
                  type="text"
                  value={newProduct.image}
                  onChange={(e) => setNewProduct({...newProduct, image: e.target.value})}
                  className="w-full px-4 py-3 bg-zinc-900 border border-zinc-800 text-white focus:border-amber-400 focus:outline-none transition-colors"
                  placeholder="Enter image"
                />
              </div>
              <div>
                <label className="block text-sm text-zinc-400 mb-2">Brand</label>
                <input
                  type="text"
                  value={newProduct.brand}
                  onChange={(e) => setNewProduct({...newProduct, brand: e.target.value})}
                  className="w-full px-4 py-3 bg-zinc-900 border border-zinc-800 text-white focus:border-amber-400 focus:outline-none transition-colors"
                  placeholder="Enter brand name (optional)"
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm text-zinc-400 mb-2">Condition *</label>
                  <select
                    value={newProduct.condition}
                    onChange={(e) => setNewProduct({...newProduct, condition: e.target.value})}
                    className="w-full px-4 py-3 bg-zinc-900 border border-zinc-800 text-white focus:border-amber-400 focus:outline-none transition-colors appearance-none cursor-pointer">
                    <option value="New">New</option>
                    <option value="Refurblished">Refurblished</option>
                    <option value="Home Made">Home Made</option>
                    <option value="Generic">Generic</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm text-zinc-400 mb-2">Discount %</label>
                  <input
                    type="number"
                    value={newProduct.discount}
                    onChange={(e) => setNewProduct({...newProduct, discount: e.target.value})}
                    className="w-full px-4 py-3 bg-zinc-900 border border-zinc-800 text-white focus:border-amber-400 focus:outline-none transition-colors mono"
                    placeholder="0"
                    min="0"
                    max="100"
                  />
                </div>
              </div>
              <div className="flex gap-3 pt-4">
                <button
                  onClick={handleAddProduct}
                  className="flex-1 py-3 bg-gradient-to-r from-amber-400 to-yellow-500 text-black font-semibold hover:from-amber-500 hover:to-yellow-600 transition-all"
                >
                  Add Product
                </button>
                <button
                  onClick={() => setShowAddModal(false)}
                  className="flex-1 py-3 border border-zinc-700 text-white hover:bg-zinc-900 transition-colors"
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        </div>
	)
}

export default AddProductModal