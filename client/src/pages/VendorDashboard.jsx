import Navbar from '../components/Navbar';
import ProductForm from '../components/ProductForm';
import { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';

const VendorDashboard = () => {
    const { user } = useAuth();
    const [products, setProducts] = useState([]);
    const [showAddForm, setShowAddForm] = useState(false);
    
    const fetchProducts = () => {
        if(user) {
            fetch(`/api/products?vendor_id=${user.id}`)
             .then(res => res.json())
             .then(data => setProducts(data))
             .catch(err => console.log(err));
        }
    };

    useEffect(() => {
        fetchProducts();
    }, [user]);

    const handleDelete = async (id) => {
        if(confirm('Are you sure you want to delete this product?')) {
            try {
                await fetch(`/api/products/${id}`, { method: 'DELETE' });
                fetchProducts();
            } catch (err) {
                console.error(err);
            }
        }
    };

    return (
        <div className="min-h-screen bg-gray-100">
            <Navbar />
            <div className="p-8">
                <div className="flex justify-between items-center mb-6">
                    <h1 className="text-3xl font-bold">Vendor Dashboard</h1>
                    <div className="space-x-4">
                        <button 
                            onClick={() => setShowAddForm(!showAddForm)}
                            className="bg-blue-600 text-white px-4 py-2 rounded shadow hover:bg-blue-700"
                        >
                            {showAddForm ? 'Cancel' : 'Add New Product'}
                        </button>
                        <button className="bg-green-600 text-white px-4 py-2 rounded shadow hover:bg-green-700">Request Item</button>
                    </div>
                </div>
                
                {showAddForm && <ProductForm vendorId={user?.id} onProductAdded={() => { setShowAddForm(false); fetchProducts(); }} />}

                <div className="bg-white p-6 rounded shadow">
                    <h2 className="text-xl font-bold mb-4">My Products</h2>
                    {products.length === 0 ? (
                        <p className="text-gray-500">No products added yet.</p>
                    ) : (
                        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6">
                            {products.map(p => (
                                <div key={p.id} className="border rounded-lg overflow-hidden shadow-sm hover:shadow-md transition bg-gray-50">
                                    {p.image_url ? (
                                        <div className="h-48 bg-gray-200">
                                            <img src={p.image_url} alt={p.name} className="w-full h-full object-cover" />
                                        </div>
                                    ) : (
                                        <div className="h-48 bg-gray-200 flex items-center justify-center text-gray-400">No Image</div>
                                    )}
                                    <div className="p-4">
                                        <h3 className="font-bold text-lg mb-1">{p.name}</h3>
                                        <p className="text-gray-600 text-sm mb-2">{p.category}</p>
                                        <div className="flex justify-between items-center">
                                            <span className="font-bold text-blue-600">${p.price}</span>
                                            <button 
                                                onClick={() => handleDelete(p.id)}
                                                className="text-red-500 hover:text-red-700 text-sm underline"
                                            >
                                                Delete
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default VendorDashboard;
