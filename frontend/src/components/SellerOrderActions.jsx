import api from "../api";


export function SellerOrderActions({ order }) {

  const handleShip = async () => {
    try {
      await api.post(`/seller/orders/${order.id}/ship`);

    } catch (err) {
      console.error(err);
      alert("Failed to mark order as shipped");
    }
  }









  if (order.status === "processing") {
    return (
      <button 
      onClick={handleShip}
      className="mt-4 w-full bg-orange-600 text-white py-2 rounded-lg hover:bg-orange-700">
        Mark as Shipped
      </button>
    );
  }

  if (order.order.status === "pending_payment") {
    return (
      <p className="mt-4 text-sm text-gray-500">
        Waiting for payment confirmation
      </p>
    );
  }

  return null;
}