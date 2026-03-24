import React, { useState } from 'react';
import { useGetOrdersQuery } from "../redux/orderApi.jsx"
import { useGetProductsQuery } from "../redux/productsApi.jsx"
import { useLogoutMutation, useGetMeQuery, useGetUsersQuery } from "../redux/authApi.jsx"
import { useGetCategoriesQuery, useGetCategoryByIdQuery } from "../redux/categoriesApi.jsx"
import Sidebar from "../components/dashboard/Sidebar.jsx"
import Header from "../components/dashboard/Header.jsx"
import Setting from "../components/dashboard/Setting.jsx"
import Profile from "../components/dashboard/Profile.jsx"
import UsersTab from "../components/dashboard/UsersTab.jsx"
import OrdersTab from "../components/dashboard/OrdersTab.jsx"
import PaymentTab from "../components/dashboard/PaymentTab.jsx"
import Grids from "../components/dashboard/Grids.jsx"
import ProductsTab from "../components/dashboard/ProductsTab.jsx"
import AddProductModal from "../components/dashboard/AddProductModal.jsx"
import { useNavigate } from "react-router-dom"
import { Plus, Package, ShoppingBag, CreditCard, User, Users, Settings, LogOut, Edit2, Trash2, Eye, X } from 'lucide-react';

export default function EcommerceDashboard() {
  const [activeTab, setActiveTab] = useState('products');
  const [userRole, setUserRole] = useState('customer'); // vendor or admin
  const { data, error, isLoading } = useGetProductsQuery();
  const { data:userData } = useGetMeQuery();
  const [logout, { isLoading:loading }] = useLogoutMutation();
  const { data:orders, isLoading:load, error:isError } = useGetOrdersQuery();
  const { data:categories, isLoading:loadingCat } = useGetCategoriesQuery();
  const { data:users, isLoading:loadingUsers } = useGetUsersQuery();
  // const data = orders?.orders
  const [showAddModal, setShowAddModal] = useState(false);
  const [newProduct, setNewProduct] = useState({ name: '', price: '', stock: '', category: '' });
  console.log("orders", orders)
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

      const handleLogout = async () => {    
	    try {
	      	await logout().unwrap();
	      	navigate('/');
	    } catch (error) {
	      	// toast.error("You have Successfully logged out!");
	      	console.log(error)
	    }
	    navigate('/auth/login');
  	};

  return (
    <div className="min-h-screen bg-black text-white font-sans">
      <div className="flex h-screen overflow-hidden">
        {/* Sidebar */}
        <Sidebar userData={userData} setUserRole={setUserRole} userRole={userRole} menuItems={menuItems} handleLogout={handleLogout} loading={loading} activeTab={activeTab} setActiveTab={setActiveTab} />

        {/* Main Content */}
        <main className="flex-1 overflow-y-auto bg-black">
          {/* Header */}
          <Header menuItems={menuItems} activeTab={activeTab} />

          {/* Content Area */}
          <div className="p-6 space-y-6">
            {/* Stats Grid */}
            <Grids stats={stats} />

            {/* Products Tab */}
            {activeTab === 'products' && (
              <ProductsTab userRole={userRole} data={data} />
            )}

            {/* Orders Tab */}
            {activeTab === 'orders' && (
              <OrdersTab orders={orders} isError={isError} load={load} />
            )}

            {/* Users Tab (Admin Only) */}
            {activeTab === 'users' && ( // VendorHub
              <UsersTab users={users} loadingUsers={loadingUsers} />
            )}

            {/* Payments Tab */}
            {activeTab === 'payments' && (
              <PaymentTab />
            )}

            {/* Profile Tab */}
            {activeTab === 'profile' && (
              <Profile userData={userData} />
            )}

            {/* Settings Tab (Admin Only) */}
            {activeTab === 'settings' && userRole === 'admin' && (
              <Setting />
            )}
          </div>
        </main>
      </div>

      {/* Add Product Modal */}
      {showAddModal && (
        <AddProductModal newProduct={setNewProduct} categories={categories} setNewProduct={setNewProduct} handleAddProduct={handleAddProduct} setShowAddModal={setShowAddModal} />
      )}
    </div>
  );
}