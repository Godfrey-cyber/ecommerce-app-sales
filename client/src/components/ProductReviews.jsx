import { useState } from 'react';
import { Star, ThumbsUp, Trash2, ShieldCheck, PenLine, ChevronDown, Loader2 } from 'lucide-react';
import { useSelector } from 'react-redux';
import {
    useGetProductReviewsQuery,
    useCanUserReviewQuery,
    useCreateReviewMutation,
    useDeleteReviewMutation,
} from "../redux/reviewsApi.jsx"
const ProductReviews = ({ productId }) => {
  const [sort, setSort] = useState('recent');
  const [page, setPage] = useState(1);
  const [showSuccess, setShowSuccess] = useState(false);

  const { user } = useSelector((state) => state.auth);

  const {
    data,
    isLoading: reviewsLoading,
    isFetching,
  } = useGetProductReviewsQuery({ productId, page, sort });

  const {
    data: canReviewData,
    isLoading: checkLoading,
  } = useCanUserReviewQuery(productId, { skip: !user });

  const [deleteReview] = useDeleteReviewMutation();

  const avgRating = data?.reviews?.length
    ? (
        data.reviews.reduce((sum, r) => sum + r.rating, 0) / data.reviews.length
      ).toFixed(1)
    : '—';

  const handleSuccess = () => {
    setShowSuccess(true);
    setTimeout(() => setShowSuccess(false), 4000);
  };

  return (
    <div className="w-full space-y-6 py-4">
      {/* ── Header + Stats ── */}
      <div className="flex flex-col sm:flex-row sm:items-start gap-6 pb-6 border-b border-gray-100">

        {/* Overall score */}
        <div className="flex flex-col items-center justify-center bg-gradient-to-br from-amber-50 to-orange-50 border border-amber-100 rounded-2xl p-5 min-w-[120px]">
          <span className="text-4xl font-black text-gray-900 tracking-tight">{avgRating}</span>
          <StarDisplay value={Math.round(parseFloat(avgRating))} size="md" />
          <span className="text-xs text-gray-500 mt-1">{data?.total || 0} reviews</span>
        </div>

        {/* Breakdown bars */}
        <div className="flex-1 flex flex-col justify-center">
          <RatingBreakdown ratingCounts={data?.ratingCounts} total={data?.total || 0} />
        </div>
      </div>

      {/* ── Review Form Area ── */}
      {!user && (
        <div className="bg-gray-50 border border-dashed border-gray-200 rounded-2xl p-5 text-center">
          <p className="text-sm text-gray-500">
            <span className="font-semibold text-gray-700">Sign in</span> to leave a review
          </p>
        </div>
      )}

      {user && checkLoading && (
        <div className="flex items-center gap-2 text-sm text-gray-400 py-2">
          <Loader2 className="w-4 h-4 animate-spin" />
          Checking eligibility…
        </div>
      )}

      {user && !checkLoading && canReviewData?.canReview && (
        <>
          {showSuccess && (
            <div className="flex items-center gap-2 bg-emerald-50 border border-emerald-200 text-emerald-700 text-sm font-medium px-4 py-3 rounded-xl">
              <ShieldCheck className="w-4 h-4 flex-shrink-0" />
              Review submitted successfully! Thank you for your feedback.
            </div>
          )}
          <ReviewForm productId={productId} onSuccess={handleSuccess} />
        </>
      )}

      {user && !checkLoading && !canReviewData?.canReview && (
        <div className="bg-gray-50 border border-dashed border-gray-200 rounded-2xl p-4 text-center">
          <p className="text-sm text-gray-500">
            {canReviewData?.reason === 'purchase_required'
              ? '🛒 Purchase this product to leave a review.'
              : '✅ You have already reviewed this product.'}
          </p>
        </div>
      )}

      {/* ── Sort + List ── */}
      <div>
        <div className="flex items-center justify-between mb-4">
          <h3 className="font-bold text-gray-900 text-sm">
            {data?.total || 0} Review{data?.total !== 1 ? 's' : ''}
          </h3>
          <div className="relative">
            <select
              value={sort}
              onChange={(e) => { setSort(e.target.value); setPage(1); }}
              className="appearance-none text-xs font-semibold text-gray-600 bg-white border border-gray-200 rounded-xl pl-3 pr-8 py-2 focus:outline-none focus:border-amber-400 cursor-pointer"
            >
              <option value="recent">Most Recent</option>
              <option value="highest">Highest Rated</option>
              <option value="lowest">Lowest Rated</option>
              <option value="oldest">Oldest</option>
            </select>
            <ChevronDown className="absolute right-2 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-gray-400 pointer-events-none" />
          </div>
        </div>

        {(reviewsLoading || isFetching) && (
          <div className="space-y-3">
            {[...Array(3)].map((_, i) => (
              <div key={i} className="bg-gray-50 rounded-2xl p-5 animate-pulse">
                <div className="flex gap-3">
                  <div className="w-10 h-10 rounded-full bg-gray-200" />
                  <div className="flex-1 space-y-2">
                    <div className="h-3 bg-gray-200 rounded w-1/3" />
                    <div className="h-2 bg-gray-100 rounded w-1/4" />
                  </div>
                </div>
                <div className="mt-3 space-y-2">
                  <div className="h-2 bg-gray-100 rounded" />
                  <div className="h-2 bg-gray-100 rounded w-5/6" />
                </div>
              </div>
            ))}
          </div>
        )}

        {!reviewsLoading && data?.reviews?.length === 0 && (
          <div className="text-center py-12">
            <Star className="w-10 h-10 text-gray-200 mx-auto mb-3" />
            <p className="text-sm font-semibold text-gray-400">No reviews yet</p>
            <p className="text-xs text-gray-300 mt-1">Be the first to share your experience</p>
          </div>
        )}

        {!reviewsLoading && (
          <div className="space-y-3">
            {data?.reviews?.map((review) => (
              <ReviewCard
                key={review._id}
                review={review}
                currentUserId={user?._id}
                productId={productId}
                onDelete={deleteReview}
              />
            ))}
          </div>
        )}

        {/* Pagination */}
        {data?.pages > 1 && (
          <div className="flex items-center justify-center gap-2 mt-6">
            <button
              onClick={() => setPage((p) => Math.max(1, p - 1))}
              disabled={page === 1}
              className="px-4 py-2 text-xs font-semibold rounded-xl border border-gray-200 disabled:opacity-40 hover:bg-gray-50 transition"
            >
              Previous
            </button>
            <span className="text-xs text-gray-500">
              Page {page} of {data.pages}
            </span>
            <button
              onClick={() => setPage((p) => Math.min(data.pages, p + 1))}
              disabled={page === data.pages}
              className="px-4 py-2 text-xs font-semibold rounded-xl border border-gray-200 disabled:opacity-40 hover:bg-gray-50 transition"
            >
              Next
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProductReviews;