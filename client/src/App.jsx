import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './context/AuthContext';
import { CartProvider } from './context/CartContext';
import Login from './pages/Login';
import Signup from './pages/Signup';
import AdminDashboard from './pages/AdminDashboard';
import AdminUsers from './pages/AdminUsers';
import AdminVendors from './pages/AdminVendors';
import VendorDashboard from './pages/VendorDashboard';
import UserHome from './pages/UserHome';
import VendorList from './pages/VendorList';
import VendorProducts from './pages/VendorProducts';
import Cart from './pages/Cart';
import Checkout from './pages/Checkout';
import OrderStatus from './pages/OrderStatus';

const ProtectedRoute = ({ children, allowedRoles }) => {
  const { user, loading } = useAuth();
  
  if (loading) return <div>Loading...</div>;
  if (!user) return <Navigate to="/login" />;
  if (allowedRoles && !allowedRoles.includes(user.role)) {
      if (user.role === 'admin') return <Navigate to="/admin" />;
      if (user.role === 'vendor') return <Navigate to="/vendor" />;
      return <Navigate to="/home" />;
  }
  return children;
};

const RootRedirect = () => {
    const { user, loading } = useAuth();
    if (loading) return <div>Loading...</div>;
    if (!user) return <Navigate to="/login" />;
    
    if (user.role === 'admin') return <Navigate to="/admin" />;
    if (user.role === 'vendor') return <Navigate to="/vendor" />;
    return <Navigate to="/home" />;
};

function App() {
  return (
    <Router>
      <AuthProvider>
        <CartProvider>
            <Routes>
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
            
            {/* Admin Routes */}
            <Route path="/admin" element={
                <ProtectedRoute allowedRoles={['admin']}>
                <AdminDashboard />
                </ProtectedRoute>
            } />
            <Route path="/admin/users" element={
                <ProtectedRoute allowedRoles={['admin']}>
                <AdminUsers />
                </ProtectedRoute>
            } />
            <Route path="/admin/vendors" element={
                <ProtectedRoute allowedRoles={['admin']}>
                <AdminVendors />
                </ProtectedRoute>
            } />
            
            {/* Vendor Routes */}
            <Route path="/vendor" element={
                <ProtectedRoute allowedRoles={['vendor']}>
                <VendorDashboard />
                </ProtectedRoute>
            } />
            
            {/* User Routes */}
            <Route path="/home" element={
                <ProtectedRoute allowedRoles={['user']}>
                <UserHome />
                </ProtectedRoute>
            } />
            
            <Route path="/vendors" element={
                <ProtectedRoute allowedRoles={['user']}>
                    <VendorList />
                </ProtectedRoute>
            } />

            <Route path="/vendor/:vendorId/products" element={
                <ProtectedRoute allowedRoles={['user']}>
                    <VendorProducts />
                </ProtectedRoute>
            } />

            <Route path="/cart" element={
                <ProtectedRoute allowedRoles={['user']}>
                    <Cart />
                </ProtectedRoute>
            } />

            <Route path="/checkout" element={
                <ProtectedRoute allowedRoles={['user']}>
                    <Checkout />
                </ProtectedRoute>
            } />

            <Route path="/orders" element={
                <ProtectedRoute allowedRoles={['user']}>
                    <OrderStatus />
                </ProtectedRoute>
            } />

            <Route path="/" element={<RootRedirect />} />
            </Routes>
        </CartProvider>
      </AuthProvider>
    </Router>
  );
}

export default App;
