import React from 'react'
import { Star } from "lucide-react";

const StarRow = ({ rating, reviews }) => {
  return (
    <div className="flex items-center gap-1">
        {[1,2,3,4,5].map(i => (
            <Star key={i} className={`w-2.5 h-2.5 ${i <= Math.round(rating) ? "fill-amber-400 text-amber-400" : "fill-gray-200 text-gray-200"}`} />
        ))}
        <span className="text-[10px] text-gray-400 ml-0.5">({reviews?.toLocaleString()})</span>
    </div>
  );
}

export default StarRow