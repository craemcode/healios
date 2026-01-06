import api from "../api";
import { useState } from "react";
import { useCart } from "../components/CartProvider";


export default function Payment({ onNext, onBack }) {

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

   const { cart } = useCart();

  const handlePayment = async () => {
    try {
      setLoading(true);
      setError("");
      console.log(cart)
      // Create order (status = pending)
      const orderRes = await api.post("/orders", {
        items: cart
      });
      console.log(orderRes.data)
      const orderId = orderRes.data.order_id;

      // Initiate payment
      await api.post("/payments/initiate", {
        order_id: orderId
      });

      // imulate payment success (temporary)
      await api.post("/payments/confirm", {
        order_id: orderId
      });

      //onOrderCreated(orderId);

      // Proceed to confirmation
      onNext();

    } catch (err) {
      setError(err.response?.data?.message || "Payment failed");
    } finally {
      setLoading(false);
    }
  };








  return (
    <div className="bg-white p-6 rounded-xl shadow max-w-md mx-auto">
      <h2 className="text-xl font-bold mb-6">Payment</h2>

      <div className="space-y-4">
        <div className="p-4 border rounded-lg text-gray-600">
          💳 Payment gateway will be integrated here
        </div>

        <button
          onClick={handlePayment}
          disabled={loading}
          className="w-full bg-orange-600 text-white py-3 rounded-lg hover:bg-orange-700"
        >
          {loading ? "Processing.." : "Pay & Place Orders"}
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
