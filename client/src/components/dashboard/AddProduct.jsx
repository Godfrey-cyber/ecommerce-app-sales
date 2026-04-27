import React, { useState } from 'react'
import { ToastContainer, toast } from 'react-toastify';
import { X } from 'lucide-react';

const AddProduct = ({ categories, setShowAddModal  }) => {
    const [newProduct, setNewProduct] = useState({ title: '', price: '', stock: '', category: '', condition: '', brand: '', description: '' });

    const handleChange = (event) => {
        setNewProduct({
          ...newProduct,
          [event.target.name]: event.target.value
        });
        // setErrors({ ...errors, [event.target.name]: "" });
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            // if (newProduct.title && newProduct.price && newProduct.stock && newProduct.category && newProduct.description && newProduct.condition) {
                await createProduct(newProduct).unwrap();
            // }
        } catch (error) {
            console.error(error.data);
            toast.error(error.data.message);
        }
        setNewProduct({ title: '', price: '', stock: '', category: '', condition: '', brand: '', description: '' });
        setShowAddModal(false);
    };
    console.log("newProduct", newProduct)

	return (
		<div className="animate-fade-in bg ">
      <div className="gradient-border overflow-hidden">
            <div className="space-y-4">
              <div>
              	{/*Title*/}
                <label className="block text-sm text-zinc-400 mb-2">Product Name*</label>
                <input
                  type="text"
                  name="title"
                  value={newProduct.title}
                  onChange={handleChange}
                  className="w-full px-4 py-3 bg-zinc-900 border border-zinc-800 text-white focus:border-amber-400 focus:outline-none transition-colors placeholder:text-sm"
                  placeholder="e.g. Lenovo IdeaPad Intel Core i7...."
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm text-zinc-400 mb-2">Price *</label>
                  <input
                    type="number"
                    name="price"
                    value={newProduct.price}
                    onChange={handleChange}
                    className="w-full px-4 py-3 bg-zinc-900 border border-zinc-800 text-white focus:border-amber-400 focus:outline-none transition-colors mono"
                    placeholder="0"
                    min="0"
                    // max="100"
                  />
                </div>
                <div>
                  <label className="block text-sm text-zinc-400 mb-2">Stock *</label>
                  <input
                    type="number"
                    name="stock"
                    value={newProduct.stock}
                    onChange={handleChange}
                    className="w-full px-4 py-3 bg-zinc-900 border border-zinc-800 text-white focus:border-amber-400 focus:outline-none transition-colors mono"
                    placeholder="0"
                    min="0"
                    // max="100"
                  />
                </div>
              </div>
              <div>
                <label className="block text-sm text-zinc-400 mb-2">Select Parent Category. e.g Laptop</label>
		            <select
		                value={newProduct.category}
                        name="category"
                        onChange={handleChange}
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
                      onChange={handleChange}
                      name="subcategory"
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
                  name="description"
                  value={newProduct.description}
                  onChange={handleChange}
                  className="w-full px-4 py-3 bg-zinc-900 border border-zinc-800 text-white focus:border-amber-400 focus:outline-none transition-colors"
                  placeholder="Enter description"
                />
              </div>
              <div>
              	{/*image*/}
                <label className="block text-sm text-zinc-400 mb-2">Image</label>
                <input
                  type="text"
                  name="image"
                  value={newProduct.image}
                  onChange={handleChange}
                  className="w-full px-4 py-3 bg-zinc-900 border border-zinc-800 text-white focus:border-amber-400 focus:outline-none transition-colors"
                  placeholder="Enter image"
                />
              </div>
              <div>
                <label className="block text-sm text-zinc-400 mb-2">Brand</label>
                <input
                  type="text"
                  name="brand"
                  value={newProduct.brand}
                  onChange={handleChange}
                  className="w-full px-4 py-3 bg-zinc-900 border border-zinc-800 text-white focus:border-amber-400 focus:outline-none transition-colors"
                  placeholder="Enter brand name (optional)"
                />
              </div>
              {/*Condition & Discount*/}
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm text-zinc-400 mb-2">Condition *</label>
                  <select
                    value={newProduct.condition}
                    onChange={handleChange}
                    name="condition"
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
                    name="discount"
                    value={newProduct.discount}
                    onChange={handleChange}
                    className="w-full px-4 py-3 bg-zinc-900 border border-zinc-800 text-white focus:border-amber-400 focus:outline-none transition-colors mono"
                    placeholder="0"
                    min="0"
                    max="100"
                  />
                </div>
              </div>

              <div className="flex gap-3 pt-4">
                <button type="submit"
                  onClick={handleSubmit}
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

export default AddProduct