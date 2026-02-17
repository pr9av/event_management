import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import FormInput from '../components/FormInput';
import { UserPlus, Sparkles } from 'lucide-react';

const Signup = () => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: '',
        role: 'user',
        address: '', 
        phone: ''
    });
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        
        try {
            const res = await fetch('/api/auth/register', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(formData),
            });
            const data = await res.json();
            if (!res.ok) throw new Error(data.error);
            
            navigate('/login');
        } catch (err) {
            setError(err.message);
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-indigo-900 via-purple-900 to-pink-800 relative overflow-hidden py-10">
             {/* Background Decorations */}
             <div className="absolute top-0 left-0 w-full h-full overflow-hidden z-0 pointer-events-none">
                <div className="absolute top-10 left-10 w-72 h-72 bg-blue-600 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob"></div>
                <div className="absolute bottom-10 right-10 w-80 h-80 bg-pink-600 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-2000"></div>
            </div>

            <div className="bg-white/10 backdrop-blur-lg border border-white/20 p-8 rounded-2xl shadow-2xl w-full max-w-lg z-10 relative">
                <div className="text-center mb-8">
                     <div className="bg-white/20 p-3 rounded-full w-16 h-16 mx-auto flex items-center justify-center mb-4 shadow-inner">
                        <UserPlus className="text-pink-300 w-8 h-8" />
                    </div>
                    <h2 className="text-3xl font-extrabold text-white tracking-tight">Create Account</h2>
                    <p className="text-purple-200 mt-2 text-sm">Join us to plan unforgettable events</p>
                </div>

                {error && <p className="bg-red-500/20 border border-red-500/50 text-red-100 px-4 py-2 rounded-lg mb-6 text-sm text-center">{error}</p>}
                
                <form onSubmit={handleSubmit} className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                             <label className="block text-purple-100 text-sm font-medium mb-1 ml-1">Full Name</label>
                             <input name="name" value={formData.name} onChange={handleChange} required className="w-full px-4 py-2 rounded-lg bg-white/5 border border-purple-300/30 text-white placeholder-purple-300/50 focus:outline-none focus:ring-2 focus:ring-purple-400 transition" />
                        </div>
                         <div>
                             <label className="block text-purple-100 text-sm font-medium mb-1 ml-1">Phone</label>
                             <input name="phone" value={formData.phone} onChange={handleChange} className="w-full px-4 py-2 rounded-lg bg-white/5 border border-purple-300/30 text-white placeholder-purple-300/50 focus:outline-none focus:ring-2 focus:ring-purple-400 transition" />
                        </div>
                    </div>

                    <div>
                        <label className="block text-purple-100 text-sm font-medium mb-1 ml-1">Email</label>
                        <input name="email" type="email" value={formData.email} onChange={handleChange} required className="w-full px-4 py-2 rounded-lg bg-white/5 border border-purple-300/30 text-white placeholder-purple-300/50 focus:outline-none focus:ring-2 focus:ring-purple-400 transition" />
                    </div>

                    <div>
                        <label className="block text-purple-100 text-sm font-medium mb-1 ml-1">Password</label>
                        <input name="password" type="password" value={formData.password} onChange={handleChange} required className="w-full px-4 py-2 rounded-lg bg-white/5 border border-purple-300/30 text-white placeholder-purple-300/50 focus:outline-none focus:ring-2 focus:ring-purple-400 transition" />
                    </div>
                    
                    <div>
                        <label className="block text-purple-100 text-sm font-medium mb-1 ml-1">Role</label>
                        <select 
                            name="role" 
                            value={formData.role} 
                            onChange={handleChange}
                            className="w-full px-4 py-2 rounded-lg bg-white/5 border border-purple-300/30 text-white focus:outline-none focus:ring-2 focus:ring-purple-400 transition [&>option]:text-gray-900"
                        >
                            <option value="user">User</option>
                            <option value="vendor">Vendor</option>
                            <option value="admin">Admin</option> 
                        </select>
                    </div>

                    <div>
                        <label className="block text-purple-100 text-sm font-medium mb-1 ml-1">Address</label>
                        <textarea name="address" value={formData.address} onChange={handleChange} rows="2" className="w-full px-4 py-2 rounded-lg bg-white/5 border border-purple-300/30 text-white placeholder-purple-300/50 focus:outline-none focus:ring-2 focus:ring-purple-400 transition"></textarea>
                    </div>

                    <button 
                        type="submit" 
                        className="w-full bg-gradient-to-r from-pink-500 to-purple-500 hover:from-pink-600 hover:to-purple-600 text-white font-bold py-3 px-4 rounded-lg shadow-lg transform transition hover:-translate-y-0.5 mt-4"
                    >
                        Sign Up
                    </button>
                </form>
                <div className="mt-6 text-center border-t border-white/10 pt-4">
                    <p className="text-sm text-purple-200/80">
                        Already have an account? <Link to="/login" className="text-white hover:text-purple-300 font-semibold transition underline decoration-purple-400/50">Login</Link>
                    </p>
                </div>
            </div>
        </div>
    );
};

export default Signup;
