export function SellerProductReviewsModal({
  show,
  onClose,
  product,
  reviews,
  loading
}) {
  if (!show) return null;

  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
      <div className="bg-white rounded-xl w-full max-w-lg p-6 shadow-lg">

        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold text-gray-800">
            Reviews — {product?.name}
          </h2>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
            ✕
          </button>
        </div>

        {loading ? (
          <p className="text-center text-gray-500">Loading reviews…</p>
        ) : reviews.length === 0 ? (
          <p className="text-center text-gray-400 italic">
            No reviews yet for this product.
          </p>
        ) : (
          <div className="space-y-4 max-h-[400px] overflow-y-auto">
            {reviews.map(review => (
              <div
                key={review.id}
                className="border rounded-lg p-4"
              >
                <div className="flex justify-between mb-1">
                  <p className="font-semibold">{review.buyer.name}</p>
                  <p className="text-orange-500 font-bold">
                    {"★".repeat(review.rating)}
                  </p>
                </div>

                <p className="text-gray-600 text-sm">
                  {review.comment}
                </p>

                <p className="text-xs text-gray-400 mt-1">
                  {new Date(review.created_at).toDateString()}
                </p>
              </div>
            ))}
          </div>
        )}

      </div>
    </div>
  );
}