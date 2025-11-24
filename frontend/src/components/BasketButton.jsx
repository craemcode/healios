import { ShoppingCart } from "lucide-react";
import { useCart } from "./CartProvider";

export default function BasketButton() {
    const { toggleCart } = useCart();

    return (
        <button
            onClick={toggleCart}
            className="
                fixed bottom-6 right-6 w-14 h-14 
                rounded-full bg-orange-500 text-white 
                flex items-center justify-center shadow-2xl 
                hover:bg-orange-600 transition z-50
            "
        >
            <ShoppingCart size={28} />
        </button>
    );
}
