import Navbar from '../components/Navbar';
import { Link } from 'react-router-dom';
import { Utensils, Flower2, PartyPopper, Lightbulb, ArrowRight, ShoppingBag, ListChecks } from 'lucide-react';

const UserHome = () => {
    const categories = [
        { name: 'Catering', icon: Utensils, color: 'bg-orange-100 text-orange-600' },
        { name: 'Florist', icon: Flower2, color: 'bg-pink-100 text-pink-600' },
        { name: 'Decoration', icon: PartyPopper, color: 'bg-purple-100 text-purple-600' },
        { name: 'Lighting', icon: Lightbulb, color: 'bg-yellow-100 text-yellow-600' }
    ];

    return (
        <div className="min-h-screen bg-gray-50 font-sans">
             <Navbar />
             
             {/* Hero Section */}
             <div className="relative bg-gradient-to-r from-blue-700 to-indigo-800 text-white overflow-hidden">
                <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1511795409835-a96041e7a2e9?q=80&w=2070&auto=format&fit=crop')] bg-cover bg-center opacity-20"></div>
                <div className="relative max-w-7xl mx-auto px-4 py-24 sm:px-6 lg:px-8 flex flex-col items-center text-center">
                    <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight mb-6 animate-fade-in-up">
                        Create Unforgettable <span className="text-transparent bg-clip-text bg-gradient-to-r from-pink-300 to-purple-300">Memories</span>
                    </h1>
                    <p className="max-w-2xl text-xl text-blue-100 mb-10">
                        Discover and book top-rated vendors for your special day. From exquisite catering to stunning decorations, we bring your vision to life.
                    </p>
                    <div className="flex gap-4">
                        <Link to="/vendors" className="bg-white text-blue-800 px-8 py-3 rounded-full font-bold shadow-lg hover:bg-blue-50 transition transform hover:-translate-y-1 flex items-center gap-2">
                            Browse Vendors <ArrowRight size={18} />
                        </Link>
                    </div>
                </div>
             </div>

             <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
                <div className="flex justify-between items-end mb-8">
                    <div>
                        <h2 className="text-3xl font-bold text-gray-900">Explore Categories</h2>
                        <p className="text-gray-500 mt-2">Find exactly what you need for your event</p>
                    </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8">
                    {categories.map((cat, idx) => (
                        <Link 
                            key={cat.name} 
                            to={`/vendors?category=${cat.name}`}
                            className="bg-white rounded-2xl p-6 shadow-sm hover:shadow-xl transition duration-300 border border-gray-100 group flex flex-col items-center text-center hover:border-blue-100"
                        >
                            <div className={`h-20 w-20 rounded-full flex items-center justify-center mb-6 transition-transform group-hover:scale-110 ${cat.color}`}>
                                <cat.icon size={32} />
                            </div>
                            <h3 className="text-xl font-bold text-gray-800 group-hover:text-blue-600 transition">{cat.name}</h3>
                            <p className="text-gray-400 text-sm mt-2">Browse {cat.name} experts</p>
                        </Link>
                    ))}
                </div>

                <div className="mt-20 bg-white rounded-3xl shadow-xl overflow-hidden border border-gray-100">
                    <div className="grid md:grid-cols-2 gap-0">
                        <div className="p-12 flex flex-col justify-center">
                            <h3 className="text-3xl font-bold text-gray-900 mb-4">Manage Your Event Like a Pro</h3>
                            <p className="text-gray-600 mb-8 text-lg">Keep track of your bookings, orders, and expenses in one place. Simple, efficient, and stress-free.</p>
                            <div className="flex flex-wrap gap-4">
                                <Link to="/orders" className="flex items-center gap-2 bg-gray-900 text-white px-6 py-3 rounded-xl hover:bg-gray-800 transition font-medium">
                                    <ListChecks size={20} />
                                    Track Orders
                                </Link>
                                <Link to="/cart" className="flex items-center gap-2 bg-white text-gray-900 border border-gray-200 px-6 py-3 rounded-xl hover:border-gray-400 transition font-medium">
                                    <ShoppingBag size={20} />
                                    View Cart
                                </Link>
                            </div>
                        </div>
                        <div className="bg-purple-50 p-12 flex items-center justify-center">
                             <img src="https://images.unsplash.com/photo-1492684223066-81342ee5ff30?w=800&auto=format&fit=crop&q=60" alt="Event Dashboard" className="rounded-xl shadow-lg rotate-3 hover:rotate-0 transition duration-500" />
                        </div>
                    </div>
                </div>
             </div>
        </div>
    );
};

export default UserHome;
