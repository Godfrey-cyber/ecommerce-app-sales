import React from 'react'
import { ArrowRight } from "lucide-react";

const SectionHeader = ({ icon: Icon, tag, title, sub, cta = "View All", accent = "amber" }) => {
	const clr = accent === "red" ? "text-red-600 bg-red-50" : accent === "blue" ? "text-blue-600 bg-blue-50" : "text-amber-700 bg-amber-50";
  	const btn = accent === "red" ? "text-red-600 hover:text-red-700" : accent === "blue" ? "text-blue-600 hover:text-blue-700" : "text-amber-700 hover:text-amber-800";
	return (
		<div className="flex items-end justify-between mb-6">
	      	<div className="flex items-center gap-3">
	        	{Icon && <div className={`w-9 h-9 rounded-xl ${clr} flex items-center justify-center`}><Icon className="w-4.5 h-4.5" /></div>}
	        <div>
	          {tag && <p className="text-[10px] font-semibold uppercase tracking-widest text-gray-400 mb-0.5">{tag}</p>}
	          <h2 className="text-xl font-bold text-gray-900 leading-none">{title}</h2>
	          {sub && <p className="text-xs text-gray-500 mt-0.5">{sub}</p>}
	        </div>
	      </div>
	      <button className={`flex items-center gap-1 text-sm font-medium ${btn} transition-colors`}>
	        {cta} <ArrowRight className="w-3.5 h-3.5" />
	      </button>
    	</div>
	)
}

export default SectionHeader