import React from 'react'
import { Edit2, Trash2, Eye } from 'lucide-react';

const UsersTab = ({ users }) => {
	return (
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
                  {users?.map((user) => (
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
	)
}

export default UsersTab