import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { 
  User,
  Heart, 
  ShoppingCart, 
  LogOut, 
  Package, 
  Mail, 
  UserCircle,
  Check,
  ChevronDown
} from 'lucide-react';
import { useGetCartQuery } from "../../redux/cartApi.jsx"

const HeaderModal = ({ showUserMenu, setShowUserMenu, handleLogout, isLoading }) => {

  	const { user } = useSelector(state => state.auth);
	const { data, error } = useGetCartQuery();

  	const cartItems = useSelector((state) => state.cart?.items || []);
  	const wishlistItems = useSelector((state) => state.wishlist?.items || []);
  	const cartCount = cartItems.length;
  	const wishlistCount = wishlistItems.length;

	return (
		<div className="absolute right-0 mt-2 w-64 bg-white rounded-lg shadow-xl border border-gray-200 py-2 z-50 animate-fadeIn">
            {/* User Info Header */}
            <div className="px-4 py-3 border-b border-gray-200">
                <div className="flex items-center space-x-3">
                    {user?.avatar ? (
                        <img 
          	              src={user.avatar} 
                          alt={user.firstname} 
                          className="w-12 h-12 rounded-full object-cover"
                        />
                      ) : (
                        <div className="w-12 h-12 bg-amber-400 rounded-full flex items-center justify-center">
                          	<span className="text-xl font-bold text-gray-800">
	                            {user?.firstname?.charAt(0).toUpperCase()}
	                        </span>
                        </div>
                      	)}
                      	<div className="flex-1 min-w-0">
                        	<p className="text-xs font-semibold text-gray-800 truncate">
                          	{user?.firstname || 'User'}
                        	</p>
                        	<p className="text-xs text-gray-500 truncate">
                          	{user?.email || ''}
                        	</p>
                      	</div>
                </div>
            </div>

                  {/* Menu Items */}
	        <div className="py-2">
	            <Link
	              to="/account"
	              className="flex items-center space-x-3 px-4 py-3 hover:bg-gray-50 transition-colors group"
	              onClick={() => setShowUserMenu(false)}
	            >
	              <UserCircle className="w-5 h-5 text-gray-600 group-hover:text-amber-500 transition" />
	              <span className="text-sm text-gray-700 font-medium">My Account</span>
	            </Link>

	            <Link
	              to="/orders"
	              className="flex items-center space-x-3 px-4 py-3 hover:bg-gray-50 transition-colors group"
	              onClick={() => setShowUserMenu(false)}
	            >
	              <Package className="w-5 h-5 text-gray-600 group-hover:text-amber-500 transition" />
	              <span className="text-sm text-gray-700 font-medium">Orders</span>
	            </Link>

	            <Link
	              to="/inbox"
	              className="flex items-center space-x-3 px-4 py-3 hover:bg-gray-50 transition-colors group"
	              onClick={() => setShowUserMenu(false)}
	            >
	              <Mail className="w-5 h-5 text-gray-600 group-hover:text-amber-500 transition" />
	              <div className="flex items-center justify-between flex-1">
	                <span className="text-sm text-gray-700 font-medium">Inbox</span>
	                <span className="bg-red-500 text-white text-xs rounded-full px-2 py-0.5 font-semibold">
	                  3
	                </span>
	              </div>
	            </Link>

	            <Link
	              to="/wishlist"
	              className="flex items-center space-x-3 px-4 py-3 hover:bg-gray-50 transition-colors group"
	              onClick={() => setShowUserMenu(false)}
	            >
	              <Heart className="w-5 h-5 text-gray-600 group-hover:text-red-500 transition" />
	              <div className="flex items-center justify-between flex-1">
	                <span className="text-sm text-gray-700 font-medium">Wishlist</span>
	                {wishlistCount > 0 && (
	                  <span className="text-xs text-gray-500">
	                    {wishlistCount} {wishlistCount === 1 ? 'item' : 'items'}
	                  </span>
	                )}
	              </div>
	            </Link>
	          </div>

                  {/* Logout Button */}
                <div className="border-t border-gray-200 pt-2">
                    <button
                      onClick={handleLogout}
                      disabled={isLoading}
                      className="flex items-center space-x-3 px-4 py-3 hover:bg-red-50 transition-colors w-full text-left group"
                    >
                      <LogOut className="w-5 h-5 text-red-600" />
                    <span className="text-sm text-red-600 font-semibold">{isLoading ? 'Logging Out...' : 'Logout'}</span>
                </button>
            </div>
    	</div>
	)
}

export default HeaderModal