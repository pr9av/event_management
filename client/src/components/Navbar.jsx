import { useAuth } from '../context/AuthContext';
import { useNavigate, Link } from 'react-router-dom';
import { LogOut, User as UserIcon } from 'lucide-react';

const Navbar = () => {
    const { user, logout } = useAuth();
    const navigate = useNavigate();

    const handleLogout = () => {
        logout();
        navigate('/login');
    };

    return (
        <nav className="bg-white/80 backdrop-blur-md sticky top-0 z-50 border-b border-gray-100 shadow-sm">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between items-center h-16">
                    <div className="flex-shrink-0 flex items-center gap-2 cursor-pointer" onClick={() => navigate('/')}>
                        <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white p-1.5 rounded-lg font-bold text-lg shadow-md">
                            EM
                        </div>
                        <span className="font-bold text-xl bg-clip-text text-transparent bg-gradient-to-r from-gray-800 to-gray-600">
                             {user?.role === 'admin' && 'Admin Panel'}
                             {user?.role === 'vendor' && 'Vendor Portal'}
                             {user?.role === 'user' && 'Event Management'}
                             {!user && 'Event Management System'}
                        </span>
                    </div>
                    <div>
                        {user ? (
                            <div className="flex items-center gap-6">
                                <div className="flex items-center gap-2 text-gray-600 bg-gray-50 px-3 py-1.5 rounded-full border border-gray-200">
                                    <UserIcon size={16} />
                                    <span className="font-medium text-sm">{user.name}</span>
                                </div>
                                <button 
                                    onClick={handleLogout}
                                    className="flex items-center gap-2 text-red-500 hover:text-red-700 font-medium transition text-sm"
                                >
                                    <LogOut size={18} />
                                    Logout
                                </button>
                            </div>
                        ) : (
                            <div className="flex gap-4">
                                <Link to="/login" className="text-gray-600 hover:text-blue-600 font-medium">Login</Link>
                                <Link to="/signup" className="bg-blue-600 text-white px-4 py-2 rounded-full shadow hover:bg-blue-700 transition text-sm font-medium">Sign Up</Link>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
