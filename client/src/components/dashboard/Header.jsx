import React from 'react'
import { Plus } from 'lucide-react';

const Header = ({ menuItems, activeTab, setShowAddModal }) => {
	return (
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
	)
}

export default Header