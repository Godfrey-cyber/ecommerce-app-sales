import React, { useState, useRef, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import HeaderModal from "../components/header/HeaderModal.jsx"
import CategoriesModal from "../components/header/CategoriesModal.jsx"
import { 
  Search, 
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
import { useGetCartQuery } from "../redux/cartApi.jsx"

const Header1 = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [showUserMenu, setShowUserMenu] = useState(false);
  const [isOpen, setIsOpen] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const menuRef = useRef(null);
  const { data, error } = useGetCartQuery();
  const { user, isAuthenticated } = useSelector(state => state.auth);

console.log("isAuthenticated", isAuthenticated)
console.log("user", user)
  // ✅ Get auth state from Redux
  // const { user, isAuthenticated } = useSelector((state) => state.auth);
  
  // ✅ Get cart and wishlist counts from Redux
  const cartItems = useSelector((state) => state.cart?.items || []);
  const wishlistItems = useSelector((state) => state.wishlist?.items || []);
  const cartCount = cartItems.length;
  const wishlistCount = wishlistItems.length;

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setShowUserMenu(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Handle logout
  const handleLogout = () => {
    // Dispatch logout action (replace with your actual logout action)
    // dispatch(logout());
    
    localStorage.removeItem('user');
    localStorage.removeItem('token');
    setShowUserMenu(false);
    navigate('/login');
  };

  // Handle search
  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/search?q=${searchQuery}`);
    }
  };

  return (
    <header className="bg-white shadow-md sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 gap-4">
          
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2 flex-shrink-0">
            <div className="w-10 h-10 bg-amber-400 rounded-lg flex items-center justify-center">
              <span className="text-2xl font-bold text-gray-800">B</span>
            </div>
            <span className="text-xl font-bold text-gray-800 hidden sm:block">
              BookStore
            </span>
          </Link>

          <CategoriesModal isOpen={isOpen} setIsOpen={setIsOpen} />

          {/* Search Bar */}
          <form onSubmit={handleSearch} className="flex-1 max-w-2xl">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search books, authors..."
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-400 focus:border-transparent"
              />
            </div>
          </form>

          {/* Right Side Icons */}
          <div className="flex items-center space-x-2 md:space-x-4 flex-shrink-0">
            
            {/* Wishlist Icon */}
            <Link 
              to="/wishlist" 
              className="relative p-2 hover:bg-gray-100 rounded-lg transition group"
              title="Wishlist"
            >
              <Heart className="w-6 h-6 text-gray-700 group-hover:text-red-500 transition" />
              {wishlistCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center font-semibold">
                  {wishlistCount > 9 ? '9+' : wishlistCount}
                </span>
              )}
            </Link>

            {/* Cart Icon */}
            <Link 
              to="/items/cart" 
              className="relative p-2 hover:bg-gray-100 rounded-lg transition group"
              title="Shopping Cart"
            >
              <ShoppingCart className="w-6 h-6 text-gray-700 group-hover:text-amber-500 transition" />
              {data?.cart[0]?.totalItems > 0 && (
                <span className="absolute -top-1 -right-1 bg-amber-400 text-gray-800 text-xs rounded-full w-5 h-5 flex items-center justify-center font-semibold">
                  {data?.cart[0]?.totalItems > 9 ? '9+' : data?.cart[0]?.totalItems || 0}
                </span>
              )}
            </Link>

            {/* User Menu */}
            <div className="relative" ref={menuRef}>
              {isAuthenticated ? (
                // ✅ LOGGED IN - Show user info with checkmark
                <button
                  onClick={() => setShowUserMenu(!showUserMenu)}
                  className="flex items-center space-x-2 p-2 hover:bg-gray-100 rounded-lg transition"
                >
                  <div className="relative">
                    {/* User Avatar or Icon */}
                    {user?.avatar ? (
                      <img 
                        src={user.avatar} 
                        alt={user.name} 
                        className="w-8 h-8 rounded-full object-cover"
                      />
                    ) : (
                      <div className="w-8 h-8 bg-amber-400 rounded-full flex items-center justify-center">
                        <span className="text-sm font-bold text-gray-800">
                          {user?.firstname?.charAt(0).toUpperCase()}
                        </span>
                      </div>
                    )}
                    
                    {/* Green checkmark badge */}
                    <div className="absolute -bottom-0.5 -right-0.5 bg-green-500 rounded-full w-4 h-4 flex items-center justify-center border-2 border-white">
                      <Check className="w-2.5 h-2.5 text-white stroke-[3]" />
                    </div>
                  </div>
                  
                  {/* User Name (hidden on mobile) */}
                  <div className="hidden md:flex flex-col items-start">
                    <span className="text-xs text-gray-500">Hello,</span>
                    <span className="text-sm font-semibold text-gray-800 max-w-[100px] truncate">
                      {user?.firstname?.split(' ')[0] || 'User'}
                    </span>
                  </div>
                  
                  <ChevronDown 
                    className={`w-4 h-4 text-gray-500 transition-transform duration-200 ${
                      showUserMenu ? 'rotate-180' : ''
                    }`} 
                  />
                </button>
              ) : (
                // ✅ NOT LOGGED IN - Show login button
                <Link
                  to="/login"
                  className="flex items-center space-x-2 px-4 py-2 bg-amber-400 hover:bg-amber-500 rounded-lg transition"
                >
                  <User className="w-5 h-5 text-gray-800" />
                  <span className="font-semibold text-gray-800 hidden sm:block">
                    Login
                  </span>
                </Link>
              )}

              {/* ✅ Dropdown Menu */}
              {isAuthenticated && showUserMenu && (
                <HeaderModal showUserMenu={showUserMenu} setShowUserMenu={setShowUserMenu} handleLogout={handleLogout} />
              )}
            </div>
            <span className="hidden md:flex">
                <p className="font-bold text-xs text-gray-800 ">{new Intl.NumberFormat('en-KE', { style: 'currency', currency: 'KES' }).format(data?.cart[0]?.finalAmount) || 0}</p>
            </span>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header1;