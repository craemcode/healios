export default function Payment({ onNext, onBack }) {
  return (
    <div className="bg-white p-6 rounded-xl shadow max-w-md mx-auto">
      <h2 className="text-xl font-bold mb-6">Payment</h2>

      <div className="space-y-4">
        <div className="p-4 border rounded-lg text-gray-600">
          💳 Payment gateway will be integrated here
        </div>

        <button
          onClick={onNext}
          className="w-full bg-orange-600 text-white py-3 rounded-lg hover:bg-orange-700"
        >
          Pay & Place Order
        </button>

        <button
          onClick={onBack}
          className="w-full text-gray-500 mt-2"
        >
          Back to Cart
        </button>
      </div>
    </div>
  );
}
