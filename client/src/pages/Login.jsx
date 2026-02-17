import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import FormInput from '../components/FormInput';
import { Sparkles, Calendar } from 'lucide-react';

const Login = () => {
    const [formData, setFormData] = useState({ email: '', password: '' });
    const [error, setError] = useState('');
    const { login } = useAuth();
    const navigate = useNavigate();

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        const res = await login(formData.email, formData.password);
        if (res.success) {
           navigate('/');
        } else {
            setError(res.error || 'Login failed');
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-indigo-900 via-purple-900 to-pink-800 relative overflow-hidden">
            {/* Background Decorations */}
            <div className="absolute top-0 left-0 w-full h-full overflow-hidden z-0 pointer-events-none">
                <div className="absolute -top-24 -left-24 w-96 h-96 bg-purple-600 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob"></div>
                <div className="absolute top-0 -right-4 w-72 h-72 bg-yellow-600 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob animation-delay-2000"></div>
                <div className="absolute -bottom-32 left-20 w-80 h-80 bg-pink-600 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob animation-delay-4000"></div>
            </div>

            <div className="bg-white/10 backdrop-blur-lg border border-white/20 p-8 rounded-2xl shadow-2xl w-full max-w-md z-10 relative">
                <div className="text-center mb-8">
                    <div className="bg-white/20 p-3 rounded-full w-16 h-16 mx-auto flex items-center justify-center mb-4 shadow-inner">
                        <Sparkles className="text-yellow-300 w-8 h-8" />
                    </div>
                    <h2 className="text-3xl font-extrabold text-white tracking-tight">Welcome Back</h2>
                    <p className="text-purple-200 mt-2 text-sm">Sign in to manage your events seamlessly</p>
                </div>

                {error && (
                    <div className="bg-red-500/20 border border-red-500/50 text-red-100 px-4 py-3 rounded-lg mb-6 text-sm text-center backdrop-blur-sm">
                        {error}
                    </div>
                )}

                <form onSubmit={handleSubmit} className="space-y-6">
                    <div>
                        <label className="block text-purple-100 text-sm font-medium mb-2 ml-1">Email Address</label>
                        <input
                            type="email"
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                            required
                            className="w-full px-4 py-3 rounded-lg bg-white/5 border border-purple-300/30 text-white placeholder-purple-300/50 focus:outline-none focus:ring-2 focus:ring-purple-400 focus:border-transparent transition duration-200"
                            placeholder="you@example.com"
                        />
                    </div>
                    
                    <div>
                        <label className="block text-purple-100 text-sm font-medium mb-2 ml-1">Password</label>
                        <input
                            type="password"
                            name="password"
                            value={formData.password}
                            onChange={handleChange}
                            required
                            className="w-full px-4 py-3 rounded-lg bg-white/5 border border-purple-300/30 text-white placeholder-purple-300/50 focus:outline-none focus:ring-2 focus:ring-purple-400 focus:border-transparent transition duration-200"
                            placeholder="••••••••"
                        />
                    </div>

                    <button 
                        type="submit" 
                        className="w-full bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white font-bold py-3.5 px-4 rounded-lg shadow-lg transform transition hover:-translate-y-0.5 hover:shadow-xl focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500"
                    >
                        Sign In
                    </button>
                </form>

                <div className="mt-8 text-center border-t border-white/10 pt-6">
                    <p className="text-sm text-purple-200/80">
                        Don't have an account?{' '}
                        <Link to="/signup" className="text-white hover:text-purple-300 font-semibold transition underline decoration-purple-400/50 hover:decoration-purple-300">
                            Create Account
                        </Link>
                    </p>
                </div>
            </div>
        </div>
    );
};

export default Login;
