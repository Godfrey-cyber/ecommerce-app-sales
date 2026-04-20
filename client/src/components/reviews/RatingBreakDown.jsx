import React from 'react'
import { Star, ThumbsUp, Trash2, ShieldCheck, PenLine, ChevronDown, Loader2 } from 'lucide-react';

const RatingBreakDown = ({ ratingCounts, total }) => {
	return (
		<div className="flex flex-col gap-1.5 w-full">
		    {[5, 4, 3, 2, 1].map((star) => {
		      const count = ratingCounts?.[star] || 0;
		      const pct = total > 0 ? Math.round((count / total) * 100) : 0;
		      return (
		        <div key={star} className="flex items-center gap-2 text-xs">
		          <span className="w-3 text-right text-gray-500 font-medium">{star}</span>
		          <Star className="w-3 h-3 fill-amber-400 text-amber-400 flex-shrink-0" />
		          <div className="flex-1 h-2 bg-gray-100 rounded-full overflow-hidden">
		            <div
		              className="h-full bg-amber-400 rounded-full transition-all duration-500"
		              style={{ width: `${pct}%` }}
		            />
		          </div>
		          <span className="w-7 text-gray-400">{count}</span>
		        </div>
		      );
		    })}
  		</div>
	)
}

export default RatingBreakDown