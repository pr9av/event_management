import Navbar from '../components/Navbar';
import { useState, useEffect } from 'react';

const AdminUsers = () => {
    const [users, setUsers] = useState([]);

    useEffect(() => {
        fetch('/api/admin/users')
            .then(res => res.json())
            .then(data => setUsers(data));
    }, []);

    return (
        <div className="min-h-screen bg-gray-100">
            <Navbar />
            <div className="p-8">
                <h1 className="text-3xl font-bold mb-6">User Management</h1>
                <div className="bg-white rounded shadow overflow-x-auto">
                    <table className="w-full text-left border-collapse">
                        <thead>
                            <tr className="bg-gray-100 border-b">
                                <th className="p-4">Name</th>
                                <th className="p-4">Email</th>
                                <th className="p-4">Role</th>
                                <th className="p-4">Phone</th>
                            </tr>
                        </thead>
                        <tbody>
                            {users.map(user => (
                                <tr key={user.id} className="border-b hover:bg-gray-50">
                                    <td className="p-4">{user.name}</td>
                                    <td className="p-4">{user.email}</td>
                                    <td className="p-4">{user.role}</td>
                                    <td className="p-4">{user.phone || '-'}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                    {users.length === 0 && <p className="p-6 text-center text-gray-500">No users found.</p>}
                </div>
            </div>
        </div>
    );
};

export default AdminUsers;
