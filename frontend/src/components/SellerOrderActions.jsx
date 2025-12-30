
export function SellerOrderActions({ order }) {
  if (order.status === "processing") {
    return (
      <button className="mt-4 w-full bg-orange-600 text-white py-2 rounded-lg hover:bg-orange-700">
        Mark as Shipped
      </button>
    );
  }

  if (order.status === "pending") {
    return (
      <p className="mt-4 text-sm text-gray-500">
        Waiting for payment confirmation
      </p>
    );
  }

  return null;
}