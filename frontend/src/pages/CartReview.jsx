import { useCart } from "../components/CartProvider";

export default function CartReview({ onNext }) {
  const { cartItems, total } = useCart();

  if (cartItems.length === 0) {
    return (
      <div className="text-center text-gray-500">
        Your cart is empty.
      </div>
    );
  }

  return (
    <div className="bg-white p-6 rounded-xl shadow max-w-3xl mx-auto">
      <h2 className="text-xl font-bold mb-4">Order Summary</h2>

      <div className="divide-y">
        {cartItems.map(item => (
          <div key={item.id} className="flex justify-between py-4">
            <div>
              <p className="font-medium">{item.name}</p>
              <p className="text-sm text-gray-500">
                Qty: {item.quantity}
              </p>
            </div>
            <p className="font-semibold">
              KES {item.quantity * item.price}
            </p>
          </div>
        ))}
      </div>

      {/* Totals */}
      <div className="border-t mt-4 pt-4 space-y-2">
        <p className="flex justify-between text-sm">
          <span>Subtotal</span>
          <span>KES {total.subtotal}</span>
        </p>
        <p className="flex justify-between text-sm">
          <span>VAT (10%)</span>
          <span>KES {total.vat}</span>
        </p>
        <p className="flex justify-between text-sm">
          <span>Healios Fee (0.5%)</span>
          <span>KES {total.fee}</span>
        </p>
        <p className="flex justify-between font-bold text-lg">
          <span>Total</span>
          <span>KES {total.total}</span>
        </p>
      </div>

      <button
        onClick={onNext}
        className="mt-6 w-full bg-orange-600 text-white py-3 rounded-lg hover:bg-orange-700"
      >
        Proceed to Payment
      </button>
    </div>
  );
}
