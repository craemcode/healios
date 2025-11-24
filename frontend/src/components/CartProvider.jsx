import { createContext, useContext, useState } from "react";

const CartContext = createContext();

export function CartProvider({ children }) {
    const [cart, setCart] = useState([]);
    const [isOpen, setIsOpen] = useState(false);

    const toggleCart = () => setIsOpen(prev => !prev);



    
    const addItem = (product, qty) => {
        setCart(prev => {
            const existing = prev.find(item => item.id === product.id);

            if (existing) {
                const newQty = existing.qty + qty;
                if (newQty > product.current_stock) return prev;

                return prev.map(item =>
                    item.id === product.id
                        ? { ...item, qty: newQty }
                        : item
                );
            }

            return [...prev, { ...product, qty }];
        });
    };

    const updateQuantity = (productId, qty, maxStock) => {
        setCart(prev =>
            prev.map(item =>
                item.id === productId
                    ? { ...item, qty: Math.min(qty, maxStock) }
                    : item
            )
        );
    };

    const removeItem = (productId) => {
        setCart(prev => prev.filter(item => item.id !== productId));
    };

    return (
        <CartContext.Provider value={{
            cart,
            isOpen,
            toggleCart,
            addItem,
            updateQuantity,
            removeItem
        }}>
            {children}
        </CartContext.Provider>
    );
}

export const useCart = () => useContext(CartContext);
