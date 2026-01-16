import { CheckCircle } from "lucide-react";
import { Navigate } from "react-router-dom";

export default function Confirmation() {
  return (
    <div className="bg-white p-8 rounded-xl shadow max-w-md mx-auto text-center">
      <CheckCircle className="mx-auto text-orange-500 w-12 h-12 mb-4" />
      <h2 className="text-2xl font-bold mb-2">Order Placed!</h2>
      <p className="text-gray-600 mb-6">
        Your order has been successfully placed.
      </p>

      <button onClick={Navigate(`/buyer/orders`)} className="bg-orange-600 text-white px-6 py-3 rounded-lg">
        Track Order
      </button>
    </div>
  );
}
