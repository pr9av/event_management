import Navbar from '../components/Navbar';
import { useCart } from '../context/CartContext';
import { Link, useNavigate } from 'react-router-dom';

const Cart = () => {
    const { cart, removeFromCart, clearCart } = useCart();
    const navigate = useNavigate();

    const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

    return (
        <div className="min-h-screen bg-gray-100">
            <Navbar />
            <div className="p-8">
                <h1 className="text-3xl font-bold mb-6">Shopping Cart</h1>
                
                {cart.length === 0 ? (
                    <div className="text-center">
                        <p className="text-xl text-gray-600 mb-4">Your cart is empty.</p>
                        <Link to="/home" className="text-blue-600 hover:underline">Browse Vendors</Link>
                    </div>
                ) : (
                    <div className="bg-white p-6 rounded shadow max-w-4xl mx-auto">
                        {cart.map(item => (
                            <div key={item.product_id} className="flex items-center justify-between border-b py-4">
                                <div className="flex items-center gap-4">
                                    <div className="h-16 w-16 bg-gray-200 overflow-hidden rounded">
                                        {item.image_url && <img src={item.image_url} alt={item.name} className="w-full h-full object-cover" />}
                                    </div>
                                    <div>
                                        <h3 className="font-bold">{item.name}</h3>
                                        <p className="text-gray-600">Qty: {item.quantity}</p>
                                    </div>
                                </div>
                                <div className="flex items-center gap-6">
                                    <p className="font-bold">${item.price * item.quantity}</p>
                                    <button 
                                        onClick={() => removeFromCart(item.product_id)}
                                        className="text-red-500 hover:text-red-700"
                                    >
                                        Remove
                                    </button>
                                </div>
                            </div>
                        ))}
                        
                        <div className="mt-6 flex justify-between items-center border-t pt-4">
                            <h2 className="text-xl font-bold">Total: ${total}</h2>
                            <div className="space-x-4">
                                <button 
                                    onClick={clearCart}
                                    className="text-red-600 hover:text-red-800"
                                >
                                    Clear Cart
                                </button>
                                <Link 
                                    to="/checkout"
                                    className="bg-green-600 text-white px-6 py-2 rounded shadow hover:bg-green-700"
                                >
                                    Proceed to Checkout
                                </Link>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default Cart;
