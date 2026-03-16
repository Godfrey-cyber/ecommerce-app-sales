import React from 'react'

const Profile = ({ userData }) => {
	return (
		<div className="animate-fade-in">
		    <div className="gradient-border p-8">
		      <div className="flex items-start gap-8 mb-8">
		        <div className="w-24 h-24 bg-gradient-to-br from-amber-400 to-yellow-600 flex items-center justify-center font-bold text-black text-4xl rounded-full border-2 border-white">
		          {userData?.user?.firstname?.charAt(0).toUpperCase()}
		        </div>
		        <div className="flex-1">
		          <h3 className="text-2xl font-bold text-white mb-2">{userData?.user?.firstname} {userData?.user?.lastname}</h3>
		          <p className="text-zinc-400 mb-4">{userData?.user?.email}</p>
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
	)
}

export default Profile