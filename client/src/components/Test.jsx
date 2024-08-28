import React from 'react'

const Test = () => {
	return (
		// <section class="bg-gray-100 flex items-center justify-center min-h-screen">
		//     <div class="flex flex-col max-w-sm bg-white rounded-lg shadow-md overflow-hidden">
		//         <img class="w-36 h-44 object-cover  mx-auto" src="https://electrox.arenacommerce.com/cdn/shop/products/ipadgreen_12974f4c-4274-4704-b489-9bc4ce10e211.png?v=1649400717&width=180" alt="Product Image" />
		//         <div class="p-6">
		//             <h2 class="text-xl font-semibold text-gray-800">Product Name</h2>
		//             <p class="text-gray-600 mt-2">This is a brief description of the product. It provides essential details and highlights features.</p>
		//             <div class="flex items-center justify-between mt-4">
		//                 <span class="text-gray-700 font-bold text-lg">$29.99</span>
		//                 <button class="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50">Add to Cart</button>
		//             </div>
		//         </div>
		//     </div>
		// </section>
		<div className="min-h-screen bg-gray-100 flex items-center justify-center">
      
		<div className="max-w-sm bg-white shadow-lg rounded-lg overflow-hidden">
      <img className="w-full h-48 object-cover" src="https://via.placeholder.com/300" alt="Product" />
      <div className="p-4">
        <h3 className="text-gray-900 font-semibold text-lg">Product Title</h3>
        <p className="text-gray-600 mt-2">This is a short description of the product.</p>
        <div className="flex items-center justify-between mt-3">
          <span className="text-gray-900 font-bold text-xl">$49.99</span>
          <button className="px-4 py-2 bg-blue-500 text-white text-sm font-medium rounded hover:bg-blue-600">
            Add to Cart
          </button>
        </div>
      </div>
    </div>
    </div>
	)
}

export default Test