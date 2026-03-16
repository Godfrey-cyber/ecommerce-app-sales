import React from 'react'

const Settings = () => {
	return (
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
	)
}

export default Settings