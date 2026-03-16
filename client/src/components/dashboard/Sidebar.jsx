import React from 'react'
import { User, LogOut } from 'lucide-react';

const Sidebar = ({ userData, menuItems, setUserRole, userRole, handleLogout, loading, activeTab, setActiveTab }) => {
	return (
		<aside className="w-64 bg-zinc-950 border-r border-zinc-800 flex flex-col animate-slide-in-left bg-noise">
          {/* Logo */}
          <div className="p-6 border-b border-zinc-800">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-gradient-to-br from-amber-400 to-yellow-500 flex items-center justify-center" style={{ clipPath: 'polygon(30% 0%, 70% 0%, 100% 30%, 100% 70%, 70% 100%, 30% 100%, 0% 70%, 0% 30%)' }}>
                <span className="text-black font-bold text-xl">V</span>
              </div>
              <div>
                <h1 className="text-xl font-bold text-amber-400 tracking-tight">VendorHub</h1>
                <p className="text-xs text-zinc-500 mono">{userData.user.role.toUpperCase()}</p>
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
              <div className="w-10 h-10 bg-gradient-to-br from-amber-400 to-yellow-600 flex items-center justify-center font-bold text-black rounded-full">
                A
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium truncate">{userData?.user?.firstname} {userData?.user?.lastname}</p>
                <p className="text-xs text-zinc-500 truncate">{userData?.user?.email}</p>
              </div>
            </div>
            <button 
            	onClick={handleLogout}
                disabled={loading} className="w-full flex items-center justify-center gap-2 px-4 py-2 text-sm text-zinc-400 hover:text-amber-400 transition-colors">
              <LogOut size={16} />
              <span>{loading ? 'Logging Out...' : 'Logout'}</span>
            </button>
          </div>
        </aside>
	)
}

export default Sidebar