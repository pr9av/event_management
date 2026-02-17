import Navbar from '../components/Navbar';
import { useState, useEffect } from 'react';
import { useSearchParams, Link } from 'react-router-dom';

const VendorList = () => {
    const [searchParams] = useSearchParams();
    const category = searchParams.get('category');
    const [vendors, setVendors] = useState([]);

    useEffect(() => {
        fetch(`/api/admin/vendors`) // Simplified: fetch all vendors, filtering should ideally be backend
            .then(res => res.json())
            .then(data => {
                // In a real app we would filter by category in backend.
                // For now, show all vendors.
                setVendors(data);
            });
    }, [category]);

    return (
        <div className="min-h-screen bg-gray-100">
            <Navbar />
            <div className="p-8">
                <h1 className="text-3xl font-bold mb-6">{category} Vendors</h1>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {vendors.map(vendor => (
                        <div key={vendor.id} className="bg-white p-6 rounded shadow hover:shadow-lg transition text-center">
                            <div className="h-24 w-24 bg-blue-100 rounded-full mx-auto mb-4 flex items-center justify-center text-blue-500 font-bold text-2xl">
                                {vendor.name[0]}
                            </div>
                            <h2 className="text-xl font-bold mb-2">{vendor.name}</h2>
                            <p className="text-gray-600 mb-4">{vendor.address || 'No address provided'}</p>
                            <Link 
                                to={`/vendor/${vendor.id}/products`}
                                className="inline-block bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700"
                            >
                                Shop Items
                            </Link>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default VendorList;
