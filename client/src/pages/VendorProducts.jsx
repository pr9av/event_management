import Navbar from '../components/Navbar';
import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useCart } from '../context/CartContext';

const VendorProducts = () => {
    const { vendorId } = useParams();
    const [products, setProducts] = useState([]);
    const { addToCart } = useCart();

    useEffect(() => {
        fetch(`/api/products?vendor_id=${vendorId}`)
            .then(res => res.json())
            .then(data => setProducts(data));
    }, [vendorId]);

    return (
        <div className="min-h-screen bg-gray-100">
            <Navbar />
            <div className="p-8">
                <div className="flex justify-between items-center mb-6">
                   <h1 className="text-3xl font-bold">Products</h1>
                   <Link to="/cart" className="bg-yellow-500 text-white px-4 py-2 rounded shadow hover:bg-yellow-600">
                       Go to Cart
                   </Link>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                    {products.map(p => (
                        <div key={p.id} className="bg-white rounded-lg shadow overflow-hidden group hover:shadow-lg transition">
                           <div className="h-48 bg-gray-200 overflow-hidden">
                                {p.image_url ? (
                                    <img src={p.image_url} alt={p.name} className="w-full h-full object-cover group-hover:scale-105 transition duration-300" />
                                ) : (
                                    <div className="flex items-center justify-center h-full text-gray-400">No Image</div>
                                )}
                           </div>
                           <div className="p-4 text-center">
                               <h3 className="font-bold text-lg mb-2">{p.name}</h3>
                               <p className="text-blue-600 font-bold mb-4">${p.price}</p>
                               <button 
                                   onClick={() => addToCart(p)}
                                   className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 w-full transition"
                               >
                                   Add to Cart
                               </button>
                           </div>
                        </div>
                    ))}
                    {products.length === 0 && <p className="col-span-4 text-center text-gray-500">No products found for this vendor.</p>}
                </div>
            </div>
        </div>
    );
};

export default VendorProducts;
