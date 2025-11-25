import { ShoppingCart } from "lucide-react";
import { useCart } from "./CartProvider";

export default function BasketButton() {
    const { toggleCart, isOpen,cartCount } = useCart();
    
    //console.log("cartcount:",cartCount)

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


            {/* BADGE */}
            {!isOpen && cartCount > 0 && (
                <span className="
          absolute -top-1 -right-1 
          bg-red-500 text-white 
          text-xs font-bold 
          rounded-full 
          w-5 h-5 
          flex items-center justify-center
          shadow
        ">
                    {cartCount}
                </span>
            )}
        </button>
    );
}
