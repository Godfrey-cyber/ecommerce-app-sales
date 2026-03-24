import React from 'react'

const EmptyState = () => {
  return (
    <div className="flex flex-col items-center justify-center py-20 px-6 text-center">
      <div className="w-16 h-16 rounded-2xl bg-slate-100 flex items-center justify-center mb-4">
        <svg className="w-7 h-7 text-slate-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M9 12h6m-6 4h4M5 3h14a2 2 0 012 2v14a2 2 0 01-2 2H5a2 2 0 01-2-2V5a2 2 0 012-2z" />
        </svg>
      </div>
      <p className="text-sm font-semibold text-slate-600 mb-1">No orders yet</p>
      <p className="text-xs text-slate-400 max-w-[200px] leading-relaxed">
        You don't have any ongoing or delivered orders right now.
      </p>
      <button className="mt-5 px-5 py-2 rounded-lg bg-slate-900 text-white text-xs font-semibold hover:bg-slate-700 transition-colors">
        Start Shopping
      </button>
    </div>
  );
}

export default EmptyState