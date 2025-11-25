import { useState } from "react";
import { useCart } from "./CartProvider";

export default function AddToCartModal({ product, show, onClose }) {
    const { addItem } = useCart();
    const [qty, setQty] = useState(1);

    if (!show) return null;

    const handleConfirm = () => {
        if (qty <= 0) return;
        if (qty > product.stock) return;

        addItem(product, qty);
        onClose();
    };

    return (
         <div className="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center z-50">
            <div className="bg-white w-full max-w-md rounded-2xl p-6 shadow-xl">
                
                <h2 className="text-2xl font-bold text-gray-800 mb-4">
                    Add to Cart
                </h2>

                <p className="text-gray-700 mb-2">
                    <span className="font-semibold text-lg"> {product.name}</span>
                </p>

                <p className="text-gray-700 mb-4">
                   <span className="font-bold text-lg">{product.stock}</span>  <span className="text-sm">Units Available</span> 
                </p>

                <label className="font-semibold text-gray-700">Quantity</label>
                <input
                    type="number"
                    min="1"
                    max={product.stock}
                    value={qty}
                    onChange={(e) => setQty(parseInt(e.target.value))}
                    className="w-full mt-1 p-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-orange-500 outline-none"
                />

                <div className="flex justify-end gap-3 mt-6">
                    <button
                        onClick={onClose}
                        className="px-5 py-2 rounded-xl text-gray-600 bg-gray-200 hover:bg-gray-300 transition"
                    >
                        Cancel
                    </button>

                    <button
                        onClick={handleConfirm}
                        className="px-5 py-2 rounded-xl bg-orange-500 hover:bg-orange-600 text-white font-semibold transition"
                    >
                        Confirm
                    </button>
                </div>
            </div>
        </div>
    );
}
