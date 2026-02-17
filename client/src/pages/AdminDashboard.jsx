import Navbar from '../components/Navbar';
import { Link } from 'react-router-dom';

const AdminDashboard = () => {
    return (
        <div className="min-h-screen bg-gray-100">
            <Navbar />
            <div className="p-8">
                <h1 className="text-3xl font-bold mb-8">Admin Dashboard</h1>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <Link to="/admin/users" className="bg-white p-8 rounded shadow cursor-pointer hover:shadow-lg transition block group">
                        <div className="h-16 w-16 bg-blue-100 rounded-full mb-4 flex items-center justify-center text-blue-500 text-2xl">
                             👤
                        </div>
                        <h2 className="text-2xl font-bold mb-2 group-hover:text-blue-600">Maintain Users</h2>
                        <p className="text-gray-600">View registered users.</p>
                    </Link>
                    <Link to="/admin/vendors" className="bg-white p-8 rounded shadow cursor-pointer hover:shadow-lg transition block group">
                         <div className="h-16 w-16 bg-green-100 rounded-full mb-4 flex items-center justify-center text-green-500 text-2xl">
                             🏪
                        </div>
                        <h2 className="text-2xl font-bold mb-2 group-hover:text-green-600">Maintain Vendors</h2>
                        <p className="text-gray-600">View and manage vendor accounts.</p>
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default AdminDashboard;
