import { useState } from 'react';

const ProductForm = ({ vendorId, onProductAdded }) => {
    const [formData, setFormData] = useState({
        name: '',
        price: '',
        image_url: '',
        category: 'Catering', // Default
        description: ''
    });
    const [loading, setLoading] = useState(false);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            const res = await fetch('/api/products', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ ...formData, vendor_id: vendorId }),
            });
            if (res.ok) {
                setFormData({ name: '', price: '', image_url: '', category: 'Catering', description: '' });
                onProductAdded();
            } else {
                alert('Failed to add product');
            }
        } catch (error) {
            console.error(error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <form onSubmit={handleSubmit} className="bg-white p-6 rounded shadow-md mb-8">
            <h3 className="text-lg font-bold mb-4">Add New Product</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                    <label className="block text-gray-700 text-sm font-bold mb-2">Product Name</label>
                    <input name="name" value={formData.name} onChange={handleChange} required className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" />
                </div>
                <div>
                    <label className="block text-gray-700 text-sm font-bold mb-2">Price</label>
                    <input type="number" name="price" value={formData.price} onChange={handleChange} required className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" />
                </div>
                <div>
                    <label className="block text-gray-700 text-sm font-bold mb-2">Image URL</label>
                    <input name="image_url" value={formData.image_url} onChange={handleChange} placeholder="https://example.com/image.jpg" className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" />
                </div>
                <div>
                    <label className="block text-gray-700 text-sm font-bold mb-2">Category</label>
                    <select name="category" value={formData.category} onChange={handleChange} className="shadow border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline">
                        <option>Catering</option>
                        <option>Florist</option>
                        <option>Decoration</option>
                        <option>Lighting</option>
                    </select>
                </div>
                <div className="md:col-span-2">
                    <label className="block text-gray-700 text-sm font-bold mb-2">Description</label>
                    <textarea name="description" value={formData.description} onChange={handleChange} className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" rows="3"></textarea>
                </div>
            </div>
            <div className="mt-4">
                <button type="submit" disabled={loading} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">
                    {loading ? 'Adding...' : 'Add Product'}
                </button>
            </div>
        </form>
    );
};

export default ProductForm;
