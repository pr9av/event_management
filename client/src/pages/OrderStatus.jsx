import Navbar from '../components/Navbar';
import { useEffect, useState } from 'react';
import { useAuth } from '../context/AuthContext';

const OrderStatus = () => {
    const { user } = useAuth();
    const [orders, setOrders] = useState([]);

    useEffect(() => {
        if (user) {
            fetch(`/api/orders?user_id=${user.id}`)
                .then(res => res.json())
                .then(data => setOrders(data))
                .catch(err => console.error(err));
        }
    }, [user]);

    return (
        <div className="min-h-screen bg-gray-100">
            <Navbar />
            <div className="p-8 max-w-4xl mx-auto">
                <h1 className="text-3xl font-bold mb-6">Order Status</h1>
                
                {orders.length === 0 ? (
                    <p className="text-gray-600">No orders found.</p>
                ) : (
                    <div className="space-y-4">
                        {orders.map(order => (
                            <div key={order.id} className="bg-white p-6 rounded shadow border-l-4 border-blue-500">
                                <div className="flex justify-between items-start mb-4">
                                    <div>
                                        <h3 className="font-bold text-lg">Order #{order.id}</h3>
                                        <p className="text-sm text-gray-500">{new Date(order.created_at).toLocaleDateString()}</p>
                                    </div>
                                    <span className={`px-3 py-1 rounded-full text-sm font-semibold capitalize 
                                        ${order.status === 'pending' ? 'bg-yellow-100 text-yellow-800' : 
                                          order.status === 'completed' ? 'bg-green-100 text-green-800' : 'bg-gray-100'}`}>
                                        {order.status}
                                    </span>
                                </div>
                                <div className="border-t pt-4">
                                    <p className="text-gray-700"><strong>Amount:</strong> ${order.total_amount}</p>
                                    <p className="text-gray-700"><strong>Payment:</strong> {order.payment_method}</p>
                                    <p className="text-gray-700"><strong>Shipping to:</strong> {order.shipping_address}</p>
                                </div>
                                
                                {/* Status Tracker (Visual) */}
                                <div className="mt-6">
                                    <div className="w-full bg-gray-200 rounded-full h-2.5 dark:bg-gray-700">
                                        <div className="bg-blue-600 h-2.5 rounded-full" style={{ width: order.status === 'pending' ? '33%' : order.status === 'shipped' ? '66%' : '100%' }}></div>
                                    </div>
                                    <div className="flex justify-between text-xs mt-1 text-gray-500">
                                        <span>Received</span>
                                        <span>Ready for Shipping</span>
                                        <span>Out for Delivery</span>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
};

export default OrderStatus;
