import React, { useState, useEffect } from 'react';
import { ShoppingCart, Star, Heart, Share2, Truck, Shield, RotateCcw, Check } from 'lucide-react';
import { useParams, useNavigate, Link } from 'react-router-dom'
import CartTabHeaders from "../components/cart/CartTabHeaders.jsx"
import CartTabContent from "../components/cart/CartTabContent.jsx"
import Header from "../components/Header.jsx"
import Header1 from "../components/Header1.jsx"
import { ToastContainer, toast } from 'react-toastify';
import { useSelector,useDispatch } from "react-redux"
import { useGetProductByIdQuery, useGetProductsQuery } from "../redux/productsApi.jsx"
import { useAddToCartMutation, useGetCartQuery, useUpdateCartItemMutation, useRemoveFromCartMutation } from "../redux/cartApi.jsx"

const ProductsPage = () => {
	const [selectedImage, setSelectedImage] = useState(0);
    const { id, slug } = useParams();
    const { data, error } = useGetProductByIdQuery(id);
    const { data:cartData, error:cartError } = useGetCartQuery(id);
    const [addToCart, { isLoading }] = useAddToCartMutation();
    const { data: products, error: productsError, isLoading: productsLoading } = useGetProductsQuery();
    const [updateCartItem, { isLoading: isProcessing }] = useUpdateCartItemMutation();
    const [removeFromCart, { isLoading: isRemoving }] = useRemoveFromCartMutation();
  	const [quantity, setQuantity] = useState(1);
  	const [activeTab, setActiveTab] = useState('details');
    const dispatch = useDispatch()

    const prod = products?.products.find(item => item?._id === data?.product._id)
    const prod2 = products?.products?.map(item => item._id)
    const itemInCart = cartData?.cart[0]?.items.find(item => item.product === data?.product._id)
    // console.log("prod ->", data)
    // console.log("cartData ->", cartData?.cart[0]?.items)
    // console.log("if item is in cart ->", prod)
    // // console.log("newProd ->", prod)
    // console.log("newProd ->", prod2)
    // console.log("products ->", products)
  	// console.log("itemInCart", itemInCart)
  
    const product = data?.product

    // @Add to cart
    const handleAdd = async () => {
        console.log("add to cart")
        await addToCart({
            productId: product._id,
            quantity: 1,
        });
        console.log("add to cart")
    };

    // @Add/Subtract cart items - cart update
    const handleQtyUpdate = async (product, delta) => {
        const newQuantity = itemInCart.quantity + delta;
        
        if (newQuantity < 1) return;
        // if (newQuantity === 0) {
        //  // Remove item if quantity becomes 0
        //  try {
        //      await removeFromCart(item.product).unwrap();
        //  } catch (error) {
        //      console.error('Failed to remove item:', error);
        //  }
        // } else if (newQuantity > 0) {
            // Update quantity
            console.log("item.itemInCart", itemInCart)
            console.log("item.product", product)
            console.log("newQuantity", newQuantity)
            try {
                await updateCartItem({
                    itemId: itemInCart._id,        // Cart item ID
                    quantity: newQuantity,   // New calculated quantity
                }).unwrap();
                toast.success(data.message);
            } catch (error) {
                // toast.error(error.data.message);
                console.log(error?.data?.message);
                console.error('Failed to update quantity:', error);
            }
        // }
    };

    console.log(product)

	return (
		<div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
		{/*<Header />*/}
    <Header1 />
      <div className="max-w-7xl mx-auto px-4 py-2 lg:py-6 mt-4">
        {/* Main Product Section */}  
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 mb-2">
          
          {/* Left - Images */}
          <div className="space-y-4">
            {/* Main Image */}
            <div className="bg-white rounded-sm overflow-hidden ">
              <div className="aspect-square bg-gradient-to-br from-gray-50 to-gray-100 rounded-sm flex items-center justify-center flex items-center justify-center">
                <img
                  src={product?.image}
                  alt={product?.title}
                  className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
                />
              </div>
            </div>
            
            {/* Thumbnail Images */}
            {/*<div className="grid grid-cols-4 gap-3">
              {product?.image && product?.image.map((img, index) => (
                <button
                  key={index}
                  onClick={() => setSelectedImage(index)}
                  className={`aspect-square rounded-xl overflow-hidden border-2 transition-all duration-200 ${
                    selectedImage === index
                      ? 'border-yellow-400 shadow-lg scale-105'
                      : 'border-gray-200 hover:border-gray-300'
                  }`}
                >
                  <img src={img} alt="" className="w-full h-full object-cover" />
                </button>
              ))}
            </div>*/}
          </div>

          {/* Right - Product Info */}
          <div className="space-y-6">
            {/* Brand & Category */}
            <div className="flex items-center gap-3">
              <span className="px-4 py-1.5 bg-blue-50 text-blue-600 rounded-full text-sm font-semibold">
                {product?.brand}
              </span>
              <span className="text-sm text-gray-500">{product?.condition}</span> 
            </div>

            {/* Title */}
            <h1 className="text-lg md:text-2xl lg:3xl font-bold text-gray-900 leading-tight"> 
              {product?.title}
            </h1>

            {/* Rating */}
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-1">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    className={`w-5 h-5 ${
                      i < Math.floor(product?.rating)
                        ? 'fill-yellow-400 text-yellow-400'
                        : 'text-gray-300'
                    }`}
                  />
                ))}
              </div>
              {/*<span className="text-sm font-semibold text-gray-900">{product?.rating}</span>*/}
              <span className="text-sm text-gray-500">({product?.rating} reviews)</span>
            </div>

            {/* Price */}
            <div className="flex lg:flex-row flex-col items-baseline gap-4">
            	<div className="flex items-center space-x-4">

                    {/*<div className={`w-2 h-2 rounded-full ${product.inStock ? 'bg-green-500' : 'bg-red-500'}`} />*/}

	                {product?.discount > 0 && <span className="text-lg md:text-2xl lg:3xl font-bold text-gray-900">
                        {new Intl.NumberFormat('en-KE', { style: 'currency', currency: 'KES' }).format(product?.price * ((100 - product?.discount) / 100).toFixed(1))}
                    </span>}
	              <span className={`text-lg md:text-xl lg:2xl ${product?.discount > 0 ? 'line-through text-gray-400' : 'font-bold text-gray-900'}`}>
	                {new Intl.NumberFormat('en-KE', { style: 'currency', currency: 'KES' }).format(product?.price)} 
	              </span>
              </div>
              {product?.discount > 0 && <span className="px-3 py-1 bg-red-500 text-white rounded-lg text-sm font-bold">
                Save {product?.discount}%
              </span>}
            </div>

            {/* Description */}
            <p className="text-gray-600 leading-relaxed">
              {product?.description}
            </p>

            {product?.stock < 1 && <div className="flex items-center space-x-1">
                <div className={`w-4 h-4 rounded-full ${product?.stock < 3 && 'bg-red-500'}`} />
                <span className={`text-xs md:text-sm font-medium md:font-semibold ${product?.stock < 3 ? 'text-red-600' : ""}`}>
                  {product?.stock <= 3 && product?.stock > 1 ? `Only ${product?.stock} units left.` : `Product is out of Stock.`}
                </span>
            </div>}
            {/*</div>*/}

            {/* Quantity & Add to Cart */}
            <div className="flex flex-col sm:flex-row gap-4 pt-4">
              {itemInCart && <div className="flex items-center gap-3 bg-gray-100 rounded-xl p-2 w-fit">
                <button onClick={() => handleQtyUpdate(product, -1)} disabled={isProcessing} className="w-10 h-10 bg-white rounded-lg flex items-center justify-center hover:bg-gray-200 transition font-semibold"
                >
                  -
                </button>
                <span className="w-12 text-center font-semibold text-lg">{itemInCart?.quantity}</span>
                <button onClick={() => handleQtyUpdate(product, +1)} disabled={isProcessing} className="w-10 h-10 bg-white rounded-lg flex items-center justify-center hover:bg-gray-200 transition font-semibold"
                >
                  +
                </button>
              </div>}
              {!itemInCart && <button onClick={handleAdd} disabled={isLoading} className={`flex-1 font-bold py-4 px-8 rounded-md flex items-center justify-center gap-3 shadow-lg hover:shadow-xl transition-all duration-200 hover:scale-10 ${product?.stock < 1 ? "bg-gray-300 text-gray-100 cursor-not-allowed" : "bg-gradient-to-r from-amber-400 to-amber-500 hover:from-amber-500 hover:to-amber-600 text-gray-900"}`}>
                <ShoppingCart className="w-6 h-6" />
                Add to Cart
              </button>}
            </div>

            {/* Action Buttons */}
            <div className="flex gap-3">
              <button className="flex-1 border-2 border-gray-200 hover:border-gray-300 text-gray-700 font-semibold py-3 px-6 rounded-xl flex items-center justify-center gap-2 transition-all">
                <Heart className="w-5 h-5" />
                Wishlist
              </button>
              <button className="flex-1 border-2 border-gray-200 hover:border-gray-300 text-gray-700 font-semibold py-3 px-6 rounded-xl flex items-center justify-center gap-2 transition-all">
                <Share2 className="w-5 h-5" />
                Share
              </button>
            </div>

            {/* Features */}
            <div className="grid grid-cols-3 gap-4 pt-4">
              <div className="flex flex-col items-center text-center p-4 bg-blue-50 rounded-xl">
                <Truck className="w-8 h-8 text-blue-600 mb-2" />
                <span className="text-xs font-semibold text-gray-700">Free Delivery</span>
              </div>
              <div className="flex flex-col items-center text-center p-4 bg-green-50 rounded-xl">
                <Shield className="w-8 h-8 text-green-600 mb-2" />
                <span className="text-xs font-semibold text-gray-700">2 Year Warranty</span>
              </div>
              <div className="flex flex-col items-center text-center p-4 bg-purple-50 rounded-xl">
                <RotateCcw className="w-8 h-8 text-purple-600 mb-2" />
                <span className="text-xs font-semibold text-gray-700">30 Day Returns</span>
              </div>
            </div>
          </div>
        </div>

        {/* Tabs Section */}
        <div className="bg-white rounded-md sm:shadow md:shadow shadow-lg border border-gray-100 overflow-hidden">
          	{/* Tab Headers */}
        	<CartTabHeaders activeTab={activeTab} product={product} setActiveTab={setActiveTab} />
          {/* Tab Content */}
          
        </div>
        <CartTabContent product={product} activeTab={activeTab} />
      </div>
    </div>
	)
}

export default ProductsPage