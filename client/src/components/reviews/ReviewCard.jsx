import React, { useState } from 'react'
import { Star, ThumbsUp, Trash2, ShieldCheck, PenLine, ChevronDown, Loader2 } from 'lucide-react';
import StarDisplay from "./StarDisplay.jsx"

const ReviewCard = ({ review, currentUserId, productId, onDelete }) => {
  	const [deleting, setDeleting] = useState(false);
  	const isOwner = review.user?._id === currentUserId;
  	console.log("review", review)
  	console.log("isOwner", isOwner)

  	const handleDelete = async () => {
    	setDeleting(true);
    	await onDelete({ reviewId: review._id, productId });
    	setDeleting(false);
  	};

  	const timeAgo = (date) => {
	    const diff = Date.now() - new Date(date).getTime();
	    const days = Math.floor(diff / 86400000);
	    if (days === 0) return 'Today';
	    if (days === 1) return 'Yesterday';
	    if (days < 30) return `${days} days ago`;
	    if (days < 365) return `${Math.floor(days / 30)} months ago`;
	    return `${Math.floor(days / 365)} years ago`;
 	};

 	const Avatar = ({ user, size = 'md' }) => {
      const sz = size === 'md' ? 'w-10 h-10 text-sm' : 'w-8 h-8 text-xs';
      const initials = `${user?.firstname} ${user?.lastname}`
        ?.split(' ')
        .map((n) => n[0])
        .slice(0, 2)
        .join('')
        .toUpperCase();
     
      if (user?.avatar) {
        return (
          <img
            src={user.avatar}
            alt={user.name}
            className={`${sz} rounded-full object-cover ring-2 ring-white flex-shrink-0`}
          />
        );
      }
      return (
        <div
          className={`${sz} rounded-full bg-gradient-to-br from-amber-400 to-orange-500 flex items-center justify-center font-bold text-white flex-shrink-0 ring-2 ring-white`}
        >
          {initials || '?'}
        </div>
      );
    };
	return (
	    <div className="group bg-white border border-gray-100 rounded-2xl p-5 hover:border-amber-100 hover:shadow-md transition-all duration-300">
	      <div className="flex items-start justify-between gap-3">
	        <div className="flex items-start gap-3">
	          <Avatar user={review.userId} />
	          <div>
	            <div className="flex items-center gap-2 flex-wrap">
	              <span className="font-semibold text-gray-900 text-sm">
	                {review?.userId?.firstname} {review?.userId?.lastname || 'Anonymous'}
	              </span>
	              {review?.verified && (
	                <span className="inline-flex items-center gap-1 text-[10px] font-bold text-emerald-700 bg-emerald-50 border border-emerald-100 px-2 py-0.5 rounded-full">
	                  <ShieldCheck className="w-3 h-3" />
	                  Verified Purchase
	                </span>
	              )}
	            </div>
	            <div className="flex items-center gap-2 mt-0.5">
	              <StarDisplay value={review?.rating} />
	              <span className="text-xs text-gray-400">{timeAgo(review?.createdAt)}</span>
	            </div>
	          </div>
	        </div>

	        {isOwner && (
	          <button
	            onClick={handleDelete}
	            disabled={deleting}
	            className="opacity-0 group-hover:opacity-100 transition-opacity p-1.5 rounded-lg text-gray-400 hover:text-red-500 hover:bg-red-50"
	            title="Delete review"
	          >
	            {deleting ? (
	              <Loader2 className="w-4 h-4 animate-spin" />
	            ) : (
	              <Trash2 className="w-4 h-4" />
	            )}
	          </button>
	        )}
	      </div>

	      <p className="mt-3 text-sm text-gray-600 leading-relaxed">{review?.comment}</p>
	    </div>
  	);
};

export default ReviewCard