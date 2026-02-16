import React, { useState } from 'react';
import { Plus, Package, ShoppingBag, CreditCard, User, Users, Settings, LogOut, Edit2, Trash2, Eye, X } from 'lucide-react';

export default function EcommerceDashboard() {
  const [activeTab, setActiveTab] = useState('products');
  const [userRole, setUserRole] = useState('vendor'); // vendor or admin
  const [products, setProducts] = useState([
    { id: 1, name: 'Wireless Headphones', price: 129.99, stock: 45, category: 'Electronics', vendor: 'TechVendor', image: '🎧' },
    { id: 2, name: 'Coffee Maker Pro', price: 89.99, stock: 23, category: 'Home', vendor: 'TechVendor', image: '☕' },
    { id: 3, name: 'Smart Watch', price: 299.99, stock: 12, category: 'Electronics', vendor: 'GadgetStore', image: '⌚' },
    { id: 4, name: 'Yoga Mat Premium', price: 49.99, stock: 67, category: 'Sports', vendor: 'FitGear', image: '🧘' },
  ]);
  const [orders] = useState([
    { id: 1001, customer: 'John Doe', items: 3, total: 459.97, status: 'shipped', date: '2026-02-12' },
    { id: 1002, customer: 'Jane Smith', items: 1, total: 129.99, status: 'pending', date: '2026-02-13' },
    { id: 1003, customer: 'Bob Wilson', items: 2, total: 339.98, status: 'delivered', date: '2026-02-10' },
  ]);
  const [users] = useState([
    { id: 1, name: 'TechVendor', email: 'tech@vendor.com', role: 'vendor', products: 45, joined: '2025-01-15' },
    { id: 2, name: 'GadgetStore', email: 'gadget@store.com', role: 'vendor', products: 23, joined: '2025-03-20' },
    { id: 3, name: 'FitGear', email: 'fit@gear.com', role: 'vendor', products: 67, joined: '2025-02-10' },
  ]);
  const [showAddModal, setShowAddModal] = useState(false);
  const [newProduct, setNewProduct] = useState({ name: '', price: '', stock: '', category: '' });

  const handleAddProduct = () => {
    if (newProduct.name && newProduct.price && newProduct.stock && newProduct.category) {
      setProducts([...products, {
        id: products.length + 1,
        name: newProduct.name,
        price: parseFloat(newProduct.price),
        stock: parseInt(newProduct.stock),
        category: newProduct.category,
        vendor: 'TechVendor',
        image: '📦'
      }]);
      setNewProduct({ name: '', price: '', stock: '', category: '' });
      setShowAddModal(false);
    }
  };

  const handleDeleteProduct = (id) => {
    setProducts(products.filter(p => p.id !== id));
  };

  const menuItems = userRole === 'vendor' 
    ? [
        { id: 'products', icon: Package, label: 'Products' },
        { id: 'orders', icon: ShoppingBag, label: 'Orders' },
        { id: 'payments', icon: CreditCard, label: 'Payments' },
        { id: 'profile', icon: User, label: 'Profile' },
      ]
    : [
        { id: 'products', icon: Package, label: 'All Products' },
        { id: 'users', icon: Users, label: 'All Users' },
        { id: 'orders', icon: ShoppingBag, label: 'All Orders' },
        { id: 'settings', icon: Settings, label: 'Settings' },
      ];

  const stats = userRole === 'vendor'
    ? [
        { label: 'Total Products', value: '24', change: '+12%', positive: true },
        { label: 'Active Orders', value: '18', change: '+8%', positive: true },
        { label: 'Revenue', value: '$12,450', change: '+23%', positive: true },
        { label: 'Stock Value', value: '$45,890', change: '-5%', positive: false },
      ]
    : [
        { label: 'Total Users', value: '1,284', change: '+15%', positive: true },
        { label: 'Total Products', value: '2,456', change: '+28%', positive: true },
        { label: 'Total Orders', value: '4,892', change: '+34%', positive: true },
        { label: 'Platform Revenue', value: '$284,530', change: '+19%', positive: true },
      ];

  return (
    <div className="min-h-screen bg-black text-white font-sans">
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Outfit:wght@300;400;500;600;700&family=Space+Mono:wght@400;700&display=swap');
        
        * {
          font-family: 'Outfit', sans-serif;
        }
        
        .mono {
          font-family: 'Space Mono', monospace;
        }
        
        @keyframes slideInLeft {
          from {
            opacity: 0;
            transform: translateX(-20px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }
        
        @keyframes slideInUp {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        
        .animate-slide-in-left {
          animation: slideInLeft 0.4s ease-out;
        }
        
        .animate-slide-in-up {
          animation: slideInUp 0.5s ease-out;
        }
        
        .animate-fade-in {
          animation: fadeIn 0.3s ease-out;
        }
        
        .stagger-1 { animation-delay: 0.1s; opacity: 0; animation-fill-mode: forwards; }
        .stagger-2 { animation-delay: 0.2s; opacity: 0; animation-fill-mode: forwards; }
        .stagger-3 { animation-delay: 0.3s; opacity: 0; animation-fill-mode: forwards; }
        .stagger-4 { animation-delay: 0.4s; opacity: 0; animation-fill-mode: forwards; }
        
        .gradient-border {
          position: relative;
          background: linear-gradient(135deg, rgba(251, 191, 36, 0.1) 0%, rgba(0, 0, 0, 0.8) 100%);
          border: 1px solid rgba(251, 191, 36, 0.2);
        }
        
        .gradient-border::before {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background: linear-gradient(135deg, rgba(251, 191, 36, 0.05) 0%, transparent 50%);
          pointer-events: none;
        }
        
        .hover-lift {
          transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
        }
        
        .hover-lift:hover {
          transform: translateY(-2px);
          box-shadow: 0 10px 40px rgba(251, 191, 36, 0.2);
        }
        
        .bg-noise {
          background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 400 400' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)' opacity='0.03'/%3E%3C/svg%3E");
        }
      `}</style>

      <div className="flex h-screen overflow-hidden">
        {/* Sidebar */}
        <aside className="w-64 bg-zinc-950 border-r border-zinc-800 flex flex-col animate-slide-in-left bg-noise">
          {/* Logo */}
          <div className="p-6 border-b border-zinc-800">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-gradient-to-br from-amber-400 to-yellow-500 flex items-center justify-center" style={{ clipPath: 'polygon(30% 0%, 70% 0%, 100% 30%, 100% 70%, 70% 100%, 30% 100%, 0% 70%, 0% 30%)' }}>
                <span className="text-black font-bold text-xl">V</span>
              </div>
              <div>
                <h1 className="text-xl font-bold text-amber-400 tracking-tight">VendorHub</h1>
                <p className="text-xs text-zinc-500 mono">{userRole.toUpperCase()}</p>
              </div>
            </div>
          </div>

          {/* Navigation */}
          <nav className="flex-1 p-4 space-y-1">
            {menuItems.map((item, index) => (
              <button
                key={item.id}
                onClick={() => setActiveTab(item.id)}
                className={`w-full flex items-center gap-3 px-4 py-3 text-sm font-medium transition-all duration-200 ${
                  activeTab === item.id
                    ? 'bg-gradient-to-r from-amber-400/20 to-transparent border-l-2 border-amber-400 text-amber-400'
                    : 'text-zinc-400 hover:text-white hover:bg-zinc-900/50'
                }`}
              >
                <item.icon size={18} />
                <span>{item.label}</span>
              </button>
            ))}
          </nav>

          {/* Role Switcher */}
          <div className="p-4 border-t border-zinc-800">
            <button
              onClick={() => setUserRole(userRole === 'vendor' ? 'admin' : 'vendor')}
              className="w-full px-4 py-2 bg-amber-400/10 hover:bg-amber-400/20 text-amber-400 text-sm font-medium border border-amber-400/30 transition-all duration-200"
            >
              Switch to {userRole === 'vendor' ? 'Admin' : 'Vendor'}
            </button>
          </div>

          {/* User Section */}
          <div className="p-4 border-t border-zinc-800">
            <div className="flex items-center gap-3 mb-3">
              <div className="w-10 h-10 bg-gradient-to-br from-amber-400 to-yellow-600 flex items-center justify-center font-bold text-black">
                A
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium truncate">Alex Johnson</p>
                <p className="text-xs text-zinc-500 truncate">alex@vendor.com</p>
              </div>
            </div>
            <button className="w-full flex items-center justify-center gap-2 px-4 py-2 text-sm text-zinc-400 hover:text-amber-400 transition-colors">
              <LogOut size={16} />
              <span>Logout</span>
            </button>
          </div>
        </aside>

        {/* Main Content */}
        <main className="flex-1 overflow-y-auto bg-black">
          {/* Header */}
          <header className="sticky top-0 z-10 bg-black/80 backdrop-blur-xl border-b border-zinc-800 p-6">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-3xl font-bold text-white mb-1">
                  {menuItems.find(item => item.id === activeTab)?.label}
                </h2>
                <p className="text-sm text-zinc-500 mono">
                  {new Date().toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}
                </p>
              </div>
              {activeTab === 'products' && (
                <button
                  onClick={() => setShowAddModal(true)}
                  className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-amber-400 to-yellow-500 text-black font-semibold hover:from-amber-500 hover:to-yellow-600 transition-all duration-200 hover-lift"
                >
                  <Plus size={20} />
                  <span>Add Product</span>
                </button>
              )}
            </div>
          </header>

          {/* Content Area */}
          <div className="p-6 space-y-6">
            {/* Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              {stats.map((stat, index) => (
                <div
                  key={stat.label}
                  className={`gradient-border p-6 hover-lift animate-slide-in-up stagger-${index + 1}`}
                >
                  <p className="text-sm text-zinc-500 mb-2">{stat.label}</p>
                  <div className="flex items-end justify-between">
                    <p className="text-3xl font-bold text-white mono">{stat.value}</p>
                    <span className={`text-sm font-medium ${stat.positive ? 'text-green-400' : 'text-red-400'}`}>
                      {stat.change}
                    </span>
                  </div>
                </div>
              ))}
            </div>

            {/* Products Tab */}
            {activeTab === 'products' && (
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
                      {products.map((product) => (
                        <tr key={product.id} className="hover:bg-zinc-900/30 transition-colors">
                          <td className="px-6 py-4">
                            <div className="flex items-center gap-3">
                              <div className="w-12 h-12 bg-zinc-900 flex items-center justify-center text-2xl border border-zinc-800">
                                {product.image}
                              </div>
                              <div>
                                <p className="font-medium text-white">{product.name}</p>
                                <p className="text-sm text-zinc-500 mono">ID: {product.id}</p>
                              </div>
                            </div>
                          </td>
                          <td className="px-6 py-4">
                            <span className="px-3 py-1 text-xs font-medium bg-amber-400/10 text-amber-400 border border-amber-400/20">
                              {product.category}
                            </span>
                          </td>
                          {userRole === 'admin' && (
                            <td className="px-6 py-4 text-sm text-zinc-300">{product.vendor}</td>
                          )}
                          <td className="px-6 py-4">
                            <span className="font-semibold text-amber-400 mono">${product.price}</span>
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
                                onClick={() => handleDeleteProduct(product.id)}
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
            )}

            {/* Orders Tab */}
            {activeTab === 'orders' && (
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
                      {orders.map((order) => (
                        <tr key={order.id} className="hover:bg-zinc-900/30 transition-colors">
                          <td className="px-6 py-4">
                            <span className="font-semibold text-amber-400 mono">#{order.id}</span>
                          </td>
                          <td className="px-6 py-4 text-sm text-white">{order.customer}</td>
                          <td className="px-6 py-4 text-sm text-zinc-300">{order.items}</td>
                          <td className="px-6 py-4">
                            <span className="font-semibold text-green-400 mono">${order.total}</span>
                          </td>
                          <td className="px-6 py-4">
                            <span className={`px-3 py-1 text-xs font-medium border ${
                              order.status === 'delivered' ? 'bg-green-400/10 text-green-400 border-green-400/20' :
                              order.status === 'shipped' ? 'bg-blue-400/10 text-blue-400 border-blue-400/20' :
                              'bg-amber-400/10 text-amber-400 border-amber-400/20'
                            }`}>
                              {order.status.toUpperCase()}
                            </span>
                          </td>
                          <td className="px-6 py-4 text-sm text-zinc-400 mono">{order.date}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}

            {/* Users Tab (Admin Only) */}
            {activeTab === 'users' && userRole === 'admin' && (
              <div className="animate-fade-in">
                <div className="gradient-border overflow-hidden">
                  <table className="w-full">
                    <thead className="bg-zinc-900/50 border-b border-zinc-800">
                      <tr>
                        <th className="px-6 py-4 text-left text-xs font-semibold text-zinc-400 uppercase tracking-wider">User</th>
                        <th className="px-6 py-4 text-left text-xs font-semibold text-zinc-400 uppercase tracking-wider">Email</th>
                        <th className="px-6 py-4 text-left text-xs font-semibold text-zinc-400 uppercase tracking-wider">Role</th>
                        <th className="px-6 py-4 text-left text-xs font-semibold text-zinc-400 uppercase tracking-wider">Products</th>
                        <th className="px-6 py-4 text-left text-xs font-semibold text-zinc-400 uppercase tracking-wider">Joined</th>
                        <th className="px-6 py-4 text-right text-xs font-semibold text-zinc-400 uppercase tracking-wider">Actions</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-zinc-800">
                      {users.map((user) => (
                        <tr key={user.id} className="hover:bg-zinc-900/30 transition-colors">
                          <td className="px-6 py-4">
                            <div className="flex items-center gap-3">
                              <div className="w-10 h-10 bg-gradient-to-br from-amber-400 to-yellow-600 flex items-center justify-center font-bold text-black">
                                {user.name[0]}
                              </div>
                              <span className="font-medium text-white">{user.name}</span>
                            </div>
                          </td>
                          <td className="px-6 py-4 text-sm text-zinc-300">{user.email}</td>
                          <td className="px-6 py-4">
                            <span className="px-3 py-1 text-xs font-medium bg-amber-400/10 text-amber-400 border border-amber-400/20">
                              {user.role.toUpperCase()}
                            </span>
                          </td>
                          <td className="px-6 py-4 text-sm text-zinc-300 mono">{user.products}</td>
                          <td className="px-6 py-4 text-sm text-zinc-400 mono">{user.joined}</td>
                          <td className="px-6 py-4">
                            <div className="flex items-center justify-end gap-2">
                              <button className="p-2 text-zinc-400 hover:text-blue-400 hover:bg-zinc-900 transition-all">
                                <Edit2 size={16} />
                              </button>
                              <button className="p-2 text-zinc-400 hover:text-red-400 hover:bg-zinc-900 transition-all">
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
            )}

            {/* Payments Tab */}
            {activeTab === 'payments' && (
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
            )}

            {/* Profile Tab */}
            {activeTab === 'profile' && (
              <div className="animate-fade-in">
                <div className="gradient-border p-8">
                  <div className="flex items-start gap-8 mb-8">
                    <div className="w-24 h-24 bg-gradient-to-br from-amber-400 to-yellow-600 flex items-center justify-center font-bold text-black text-4xl">
                      A
                    </div>
                    <div className="flex-1">
                      <h3 className="text-2xl font-bold text-white mb-2">Alex Johnson</h3>
                      <p className="text-zinc-400 mb-4">alex@vendor.com</p>
                      <div className="flex gap-4">
                        <button className="px-6 py-2 bg-amber-400 text-black font-medium hover:bg-amber-500 transition-colors">
                          Edit Profile
                        </button>
                        <button className="px-6 py-2 border border-zinc-700 text-white hover:bg-zinc-900 transition-colors">
                          Change Password
                        </button>
                      </div>
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm text-zinc-500 mb-2">Business Name</label>
                      <p className="text-white font-medium">TechVendor Store</p>
                    </div>
                    <div>
                      <label className="block text-sm text-zinc-500 mb-2">Member Since</label>
                      <p className="text-white font-medium mono">January 2025</p>
                    </div>
                    <div>
                      <label className="block text-sm text-zinc-500 mb-2">Phone</label>
                      <p className="text-white font-medium">+1 (555) 123-4567</p>
                    </div>
                    <div>
                      <label className="block text-sm text-zinc-500 mb-2">Location</label>
                      <p className="text-white font-medium">San Francisco, CA</p>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Settings Tab (Admin Only) */}
            {activeTab === 'settings' && userRole === 'admin' && (
              <div className="animate-fade-in">
                <div className="gradient-border p-8">
                  <h3 className="text-xl font-bold text-white mb-6">Platform Settings</h3>
                  <div className="space-y-6">
                    <div className="flex items-center justify-between pb-6 border-b border-zinc-800">
                      <div>
                        <p className="font-medium text-white">Enable New Vendor Registration</p>
                        <p className="text-sm text-zinc-500">Allow new vendors to sign up</p>
                      </div>
                      <button className="w-14 h-8 bg-amber-400 relative">
                        <div className="absolute right-1 top-1 w-6 h-6 bg-black"></div>
                      </button>
                    </div>
                    <div className="flex items-center justify-between pb-6 border-b border-zinc-800">
                      <div>
                        <p className="font-medium text-white">Automatic Payouts</p>
                        <p className="text-sm text-zinc-500">Process vendor payments automatically</p>
                      </div>
                      <button className="w-14 h-8 bg-zinc-700 relative">
                        <div className="absolute left-1 top-1 w-6 h-6 bg-zinc-900"></div>
                      </button>
                    </div>
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="font-medium text-white">Maintenance Mode</p>
                        <p className="text-sm text-zinc-500">Temporarily disable the platform</p>
                      </div>
                      <button className="w-14 h-8 bg-zinc-700 relative">
                        <div className="absolute left-1 top-1 w-6 h-6 bg-zinc-900"></div>
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </main>
      </div>

      {/* Add Product Modal */}
      {showAddModal && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center z-50 animate-fade-in">
          <div className="gradient-border w-full max-w-md p-8 animate-slide-in-up">
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
                <label className="block text-sm text-zinc-400 mb-2">Product Name</label>
                <input
                  type="text"
                  value={newProduct.name}
                  onChange={(e) => setNewProduct({...newProduct, name: e.target.value})}
                  className="w-full px-4 py-3 bg-zinc-900 border border-zinc-800 text-white focus:border-amber-400 focus:outline-none transition-colors"
                  placeholder="Enter product name"
                />
              </div>
              <div>
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
                <label className="block text-sm text-zinc-400 mb-2">Category</label>
                <input
                  type="text"
                  value={newProduct.category}
                  onChange={(e) => setNewProduct({...newProduct, category: e.target.value})}
                  className="w-full px-4 py-3 bg-zinc-900 border border-zinc-800 text-white focus:border-amber-400 focus:outline-none transition-colors"
                  placeholder="Enter category"
                />
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
      )}
    </div>
  );
}