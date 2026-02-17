import { createContext, useState, useContext, useEffect } from 'react';
import { useAuth } from './AuthContext';

const CartContext = createContext();

export const CartProvider = ({ children }) => {
    const [cart, setCart] = useState([]);
    const { user } = useAuth();

    // Fetch cart on load
    useEffect(() => {
        if (user) {
            fetch(`/api/cart?user_id=${user.id}`)
                .then(res => res.json())
                .then(data => setCart(data))
                .catch(err => console.error(err));
        } else {
            setCart([]);
        }
    }, [user]);

    const addToCart = async (product) => {
        if (!user) return alert('Please login');
        
        // Optimistic update
        const existing = cart.find(item => item.product_id === product.id);
        if (existing) {
             setCart(cart.map(item => item.product_id === product.id ? { ...item, quantity: item.quantity + 1 } : item));
        } else {
             setCart([...cart, { ...product, product_id: product.id, quantity: 1 }]);
        }

        try {
            await fetch('/api/cart', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ user_id: user.id, product_id: product.id }),
            });
        } catch (err) {
            console.error(err);
            // Revert on error?
        }
    };

    const removeFromCart = (productId) => {
        // Implement remove API if needed, for now just state
        setCart(cart.filter(item => item.product_id !== productId));
    };

    const clearCart = () => setCart([]);

    return (
        <CartContext.Provider value={{ cart, addToCart, removeFromCart, clearCart }}>
            {children}
        </CartContext.Provider>
    );
};

export const useCart = () => useContext(CartContext);
