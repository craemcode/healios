import { useCart } from "./CartProvider";
import { X, Trash, Plus, Minus } from "lucide-react";

export default function CartSidebar() {
    const { cart, isOpen, toggleCart, updateQuantity, removeItem } = useCart();

    return (
        <div
            className={`fixed top-0 right-0 h-full w-80 bg-white shadow-xl border-l border-gray-200 
                transform transition-transform duration-300 z-50
                ${isOpen ? "translate-x-0" : "translate-x-full"}`}
        >
            {/* Header */}
            <div className="flex justify-between items-center p-5 border-b">
                <h2 className="text-xl font-bold text-gray-800">Your Cart</h2>
                <button onClick={toggleCart} className="text-gray-500 hover:text-gray-700">
                    <X size={24} />
                </button>
            </div>

            {/* Body */}
            <div className="p-4 overflow-y-auto h-[calc(100%-75px)]">
                {cart.length === 0 && (
                    <p className="text-gray-500 text-center mt-10">Your cart is empty.</p>
                )}

                {cart.map((item) => (
                    <div key={item.id} className="border p-4 rounded-xl mb-4 shadow-sm">
                        <div className="flex justify-between items-start">
                            <div>
                                <h3 className="font-semibold text-gray-800">{item.name}</h3>
                                <p className="text-gray-500 text-sm">
                                    Max available: {item.stock}
                                </p>
                            </div>

                            <button
                                onClick={() => removeItem(item.id)}
                                className="text-red-500 hover:text-red-700"
                            >
                                <Trash size={20} />
                            </button>
                        </div>

                        {/* Quantity Controls */}
                        <div className="flex items-center gap-3 mt-4">
                            <button
                                className="p-2 bg-gray-200 hover:bg-gray-300 rounded-xl"
                                disabled={item.qty <= 1}
                                onClick={() => updateQuantity(item.id, item.qty - 1, item.stock)}
                            >
                                <Minus size={18} />
                            </button>

                            <span className="text-lg font-semibold">{item.qty}</span>

                            <button
                                className="p-2 bg-orange-500 hover:bg-orange-600 text-white rounded-xl"
                                disabled={item.qty >= item.current_stock}
                                onClick={() => updateQuantity(item.id, item.qty + 1, item.stock)}
                            >
                                <Plus size={18} />
                            </button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
