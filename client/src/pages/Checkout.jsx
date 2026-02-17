import Navbar from '../components/Navbar';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import FormInput from '../components/FormInput'; // Assuming reusable component

const Checkout = () => {
    const { cart, clearCart } = useCart();
    const { user } = useAuth();
    const navigate = useNavigate();
    
    // Pre-fill from user profile
    const [formData, setFormData] = useState({
        name: user?.name || '',
        email: user?.email || '',
        address: user?.address || '',
        city: '',
        state: '',
        zip: '',
        paymentMethod: 'Cash'
    });

    const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

    const handleChange = (e) => {
        setFormData({...formData, [e.target.name]: e.target.value});
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        
        const orderData = {
            user_id: user.id,
            total_amount: total,
            payment_method: formData.paymentMethod,
            shipping_address: `${formData.address}, ${formData.city}, ${formData.state} ${formData.zip}`,
            items: cart
        };

        try {
            const res = await fetch('/api/orders', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(orderData)
            });
            const data = await res.json();
            if (res.ok) {
                clearCart();
                navigate('/orders');
            } else {
                alert('Order failed: ' + data.error);
            }
        } catch (err) {
            console.error(err);
        }
    };

    if (cart.length === 0) return <div className="p-8">Cart is empty</div>;

    return (
        <div className="min-h-screen bg-gray-100">
            <Navbar />
            <div className="p-8 max-w-4xl mx-auto">
                <h1 className="text-3xl font-bold mb-6">Checkout</h1>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    {/* Order Summary */}
                    <div className="bg-white p-6 rounded shadow h-fit">
                        <h2 className="text-xl font-bold mb-4">Order Summary</h2>
                        {cart.map(item => (
                            <div key={item.product_id} className="flex justify-between mb-2">
                                <span>{item.name} x {item.quantity}</span>
                                <span>${item.price * item.quantity}</span>
                            </div>
                        ))}
                        <div className="border-t pt-2 mt-2 flex justify-between font-bold text-lg">
                            <span>Total</span>
                            <span>${total}</span>
                        </div>
                    </div>

                    {/* Checkout Form */}
                    <div className="bg-white p-6 rounded shadow">
                        <h2 className="text-xl font-bold mb-4">Shipping & Payment</h2>
                        <form onSubmit={handleSubmit}>
                            <FormInput label="Name" name="name" value={formData.name} onChange={handleChange} required />
                            <FormInput label="Email" name="email" value={formData.email} onChange={handleChange} required />
                            <FormInput label="Address" name="address" value={formData.address} onChange={handleChange} required />
                            
                            <div className="grid grid-cols-2 gap-4">
                                <FormInput label="City" name="city" value={formData.city} onChange={handleChange} required />
                                <FormInput label="State" name="state" value={formData.state} onChange={handleChange} required />
                            </div>
                            <FormInput label="Zip Code" name="zip" value={formData.zip} onChange={handleChange} required />

                            <div className="mb-4">
                                <label className="block text-gray-700 text-sm font-bold mb-2">Payment Method</label>
                                <select 
                                    name="paymentMethod" 
                                    value={formData.paymentMethod} 
                                    onChange={handleChange}
                                    className="shadow border rounded w-full py-2 px-3 focus:outline-none focus:shadow-outline"
                                >
                                    <option>Cash</option>
                                    <option>UPI</option>
                                    <option>Card</option>
                                </select>
                            </div>

                            <button type="submit" className="w-full bg-blue-600 text-white font-bold py-3 rounded hover:bg-blue-700 transition">
                                Order Now
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Checkout;
