import { useState } from "react";

const PromoCode = () => {
	const [code, setCode] = useState("");
	const [applied, setApplied] = useState(false);

	const handleApply = () => {
	    if (code.toUpperCase() === "WAVE20") setApplied(true);
	};

	return (
		<div className="wave-card p-5">
	      	<p className="text-[12px] font-bold tracking-[0.06em] uppercase text-mist mb-3">
	        	Promo Code
	      	</p>
	      	{applied ? (
		        <p className="text-sm font-semibold text-[#2E7D32] bg-[#E8F5E9] rounded-xl px-4 py-3">
		          	✓ WAVE20 applied — 20% off!
		        </p>
	      	) : (
		        <div className="flex gap-2.5">
			        <input
			            value={code}
			            onChange={(event) => setCode(event.target.value)}
			            placeholder="Try WAVE20"
			            className="wave-input bg-[#FFFDD0] focus:border-[#D4AF37] text-[#1F2937] "
			        />
			        <button
			            onClick={handleApply}
			            className="bg-[#1F2937] text-white border-0 rounded-xl px-5 text-xs font-[#D4AF37]
			                       tracking-widest uppercase cursor-pointer hover:bg-[#D4AF37]
			                       transition-colors whitespace-nowrap"
				        >
			            Apply
		          	</button>
		        </div>
	      	)}
    	</div>
	)
}

export default PromoCode