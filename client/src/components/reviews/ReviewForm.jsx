import React from 'react'

const ReviewForm = ({ productId, onSuccess }) => {
	const [rating, setRating] = useState(0);
	const [comment, setComment] = useState('');
	const [createReview, { isLoading }] = useCreateReviewMutation();
	const [error, setError] = useState('');

	const handleSubmit = async (e) => {
	    e.preventDefault();
	    setError('');
	    if (rating === 0) return setError('Please select a star rating.');
	    if (comment.trim().length < 10) return setError('Comment must be at least 10 characters.');

	    try {
	      	await createReview({ productId, rating, comment }).unwrap();
	      	setRating(0);
	      	setComment('');
	      	onSuccess?.();
	    } catch (err) {
	      	setError(err?.data?.message || 'Something went wrong. Please try again.');
	    }
	};
	return (
		<form onSubmit={handleSubmit} className="bg-gradient-to-br from-amber-50 to-orange-50 border border-amber-100 rounded-2xl p-5 space-y-4">
		    <div className="flex items-center gap-2 mb-1">
		        <PenLine className="w-4 h-4 text-amber-600" />
		        <h3 className="font-bold text-gray-900 text-sm">Write Your Review</h3>
		    </div>

	      	{/* Star picker */}
	      	<div>
	        	<label className="block text-xs font-semibold text-gray-500 mb-2 uppercase tracking-wide">
	          	Your Rating
	        	</label>
	        	<StarPicker value={rating} onChange={setRating} />
	      	</div>

      		{/* Comment */}
	      	<div>
	        	<label className="block text-xs font-semibold text-gray-500 mb-2 uppercase tracking-wide">
	          	Your Review
	        	</label>
		        <textarea
		          value={comment}
		          onChange={(e) => setComment(e.target.value)}
		          rows={4}
		          maxLength={1000}
		          placeholder="Share your experience with this product..."
		          className="w-full text-sm text-gray-800 placeholder-gray-400 bg-white border border-amber-100 focus:border-amber-400 focus:ring-2 focus:ring-amber-100 rounded-xl px-4 py-3 resize-none outline-none transition-all duration-200"
		        />
		        <div className="flex justify-between mt-1">
		          {error && <p className="text-xs text-red-500">{error}</p>}
		          <span className="text-xs text-gray-400 ml-auto">{comment.length}/1000</span>
		        </div>
	      </div>

	      <button
	        type="submit"
	        disabled={isLoading}
	        className="w-full bg-gradient-to-r from-amber-400 to-orange-400 hover:from-amber-500 hover:to-orange-500 text-white font-bold py-3 px-6 rounded-xl flex items-center justify-center gap-2 transition-all duration-200 hover:shadow-lg active:scale-95 disabled:opacity-60 disabled:cursor-not-allowed"
	      >
	        {isLoading ? (
	          <>
	            <Loader2 className="w-4 h-4 animate-spin" />
	            Submitting…
	          </>
	        ) : (
	          <>
	            <Star className="w-4 h-4" />
	            Submit Review
	          </>
	        )}
	      </button>
    	</form>
	)
}

export default ReviewForm