import Navbar from '../components/Navbar';
import { useState, useEffect } from 'react';

const AdminVendors = () => {
    const [vendors, setVendors] = useState([]);

    useEffect(() => {
        fetch('/api/admin/vendors')
            .then(res => res.json())
            .then(data => setVendors(data));
    }, []);

    return (
        <div className="min-h-screen bg-gray-100">
            <Navbar />
            <div className="p-8">
                <h1 className="text-3xl font-bold mb-6">Vendor Management</h1>
                <div className="bg-white rounded shadow overflow-x-auto">
                    <table className="w-full text-left border-collapse">
                        <thead>
                            <tr className="bg-gray-100 border-b">
                                <th className="p-4">Name</th>
                                <th className="p-4">Email</th>
                                <th className="p-4">Address</th>
                                <th className="p-4">Phone</th>
                            </tr>
                        </thead>
                        <tbody>
                            {vendors.map(v => (
                                <tr key={v.id} className="border-b hover:bg-gray-50">
                                    <td className="p-4">{v.name}</td>
                                    <td className="p-4">{v.email}</td>
                                    <td className="p-4">{v.address || '-'}</td>
                                    <td className="p-4">{v.phone || '-'}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                     {vendors.length === 0 && <p className="p-6 text-center text-gray-500">No vendors found.</p>}
                </div>
            </div>
        </div>
    );
};

export default AdminVendors;
