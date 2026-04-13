import React from 'react'

const SectionHeader = ({ number, title, subtitle }) => {
  return (
    <div className="flex items-start gap-3 mb-5">
        <div className="w-7 h-7 rounded-full bg-amber-500 text-white text-xs font-bold flex items-center justify-center flex-shrink-0 mt-0.5">
        {number}
        </div>
        <div>
            <h3 className="text-sm font-bold text-slate-900">{title}</h3>
            {subtitle && <p className="text-xs text-slate-400 mt-0.5">{subtitle}</p>}
        </div>
    </div>
  )
}

export default SectionHeader