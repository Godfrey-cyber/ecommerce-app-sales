import React from 'react'
import { Star, ThumbsUp, Trash2, ShieldCheck, PenLine, ChevronDown, Loader2 } from 'lucide-react';

const StarDisplay = ({ size, value }) => {
	const sz = size === 'sm' ? 'w-3.5 h-3.5' : 'w-5 h-5';
	return (
	    <div className="flex items-center gap-0.5">
	      {[1, 2, 3, 4, 5].map((star) => (
	        <Star
	          key={star}
	          className={`${sz} ${
	            star <= value
	              ? 'fill-amber-400 text-amber-400'
	              : 'text-gray-200 fill-gray-100'
	          }`}
	        />
	      ))}
	    </div>
 	);
};

export default StarDisplay