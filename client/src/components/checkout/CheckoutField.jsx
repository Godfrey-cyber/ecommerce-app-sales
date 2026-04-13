import React, { useState } from 'react'

const CheckoutField = ({ label, placeholder, type = "text", half = false, icon, value, onChange }) => {
	const [focused, setFocused] = useState(false);
	return (
		<div className={half ? "col-span-1" : "col-span-2"}>
	      <label className="block text-[11px] font-semibold text-slate-500 uppercase tracking-widest mb-1.5">
	        {label}
	      </label>
	      <div
	        className={`relative flex items-center rounded-xl border transition-all duration-150 bg-white
	          ${focused
	            ? "border-amber-500 ring-2 ring-amber-100 shadow-sm"
	            : "border-slate-200 hover:border-slate-300"
	          }`}
	      >
	        <input
	          type={type}
	          placeholder={placeholder}
	          value={value}
	          onChange={onChange}
	          onFocus={() => setFocused(true)}
	          onBlur={() => setFocused(false)}
	          className="w-full px-4 py-3 text-sm text-slate-800 bg-transparent outline-none placeholder:text-slate-300 font-medium"
	        />
	        {icon && (
	          <span className="pr-4 text-slate-300 flex-shrink-0">{icon}</span>
	        )}
	      </div>
    	</div>
	)
}

export default CheckoutField

// ────────────────────── Input Field ─────────────────────────────────
function Field({ label, placeholder, type = "text", half = false, icon, value, onChange }) {
  
  return (
    <div className={half ? "col-span-1" : "col-span-2"}>
      <label className="block text-[11px] font-semibold text-slate-500 uppercase tracking-widest mb-1.5">
        {label}
      </label>
      <div
        className={`relative flex items-center rounded-xl border transition-all duration-150 bg-white
          ${focused
            ? "border-violet-500 ring-2 ring-violet-100 shadow-sm"
            : "border-slate-200 hover:border-slate-300"
          }`}
      >
        <input
          type={type}
          placeholder={placeholder}
          value={value}
          onChange={onChange}
          onFocus={() => setFocused(true)}
          onBlur={() => setFocused(false)}
          className="w-full px-4 py-3 text-sm text-slate-800 bg-transparent outline-none placeholder:text-slate-300 font-medium"
        />
        {icon && (
          <span className="pr-4 text-slate-300 flex-shrink-0">{icon}</span>
        )}
      </div>
    </div>
  );
}
// ────────────────────── Input Field ─────────────────────────────────