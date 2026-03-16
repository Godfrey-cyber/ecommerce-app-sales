import React from 'react'

const Grids = ({ stats }) => {
	return (
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
	)
}

export default Grids