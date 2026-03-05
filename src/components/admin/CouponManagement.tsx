import { useState, useEffect } from 'react';
import axios from 'axios';
import { Trash2, Plus, X } from 'lucide-react';

const CouponManagement = () => {
    const [coupons, setCoupons] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);
    const [isFormOpen, setIsFormOpen] = useState(false);

    const [formData, setFormData] = useState({
        code: '',
        discountPercentage: 0,
        discountAmount: 0,
        expiryDate: '',
        usageLimit: ''
    });

    const fetchCoupons = async () => {
        try {
            const userInfo = JSON.parse(localStorage.getItem('userInfo') || '{}');
            const config = { headers: { Authorization: `Bearer ${userInfo.token}` } };
            const { data } = await axios.get('http://localhost:5000/api/coupons', config);
            setCoupons(data);
        } catch (err) {
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchCoupons();
    }, []);

    const handleDelete = async (id: string) => {
        if (!window.confirm("Are you sure?")) return;
        try {
            const userInfo = JSON.parse(localStorage.getItem('userInfo') || '{}');
            const config = { headers: { Authorization: `Bearer ${userInfo.token}` } };
            await axios.delete(`http://localhost:5000/api/coupons/${id}`, config);
            setCoupons(coupons.filter(c => c._id !== id));
        } catch (err) {
            alert('Failed to delete coupon');
        }
    };

    const handleFormSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            const userInfo = JSON.parse(localStorage.getItem('userInfo') || '{}');
            const config = { headers: { Authorization: `Bearer ${userInfo.token}` } };

            const payload = {
                ...formData,
                usageLimit: formData.usageLimit ? Number(formData.usageLimit) : null
            };

            await axios.post(`http://localhost:5000/api/coupons`, payload, config);
            setIsFormOpen(false);
            setFormData({ code: '', discountPercentage: 0, discountAmount: 0, expiryDate: '', usageLimit: '' });
            fetchCoupons();
        } catch (err: any) {
            alert(err.response?.data?.message || 'Failed to create coupon');
        }
    };

    if (loading) return <div className="text-center p-8">Loading Coupons...</div>;

    return (
        <div>
            <div className="flex justify-end mb-4">
                <button onClick={() => setIsFormOpen(true)} className="bg-blue-600 text-white px-4 py-2 rounded flex items-center hover:bg-blue-700">
                    <Plus className="w-4 h-4 mr-2" /> Add Coupon
                </button>
            </div>

            <div className="bg-white rounded-xl shadow overflow-hidden flex-1">
                <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                        <tr>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Code</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Discount</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Usage Limit</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Expiry Status</th>
                            <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase">Actions</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200">
                        {coupons.map((coupon) => {
                            const isExpired = new Date(coupon.expiryDate) < new Date();
                            const isExhausted = coupon.usageLimit && coupon.usedCount >= coupon.usageLimit;
                            const isActive = coupon.isActive && !isExpired && !isExhausted;

                            return (
                                <tr key={coupon._id}>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm font-bold text-gray-900 border-l-4" style={{ borderLeftColor: isActive ? '#10B981' : '#EF4444' }}>
                                        {coupon.code}
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                        {coupon.discountPercentage > 0 ? `${coupon.discountPercentage}% off` : `$${coupon.discountAmount} off`}
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                        {coupon.usedCount} / {coupon.usageLimit ? coupon.usageLimit : '∞'}
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm">
                                        {isExpired ? (
                                            <span className="text-red-600 font-medium">Expired</span>
                                        ) : (
                                            <span className="text-gray-500">Expires: {new Date(coupon.expiryDate).toLocaleDateString()}</span>
                                        )}
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm">
                                        <button onClick={() => handleDelete(coupon._id)} className="text-red-600 hover:text-red-900"><Trash2 className="w-5 h-5 inline" /></button>
                                    </td>
                                </tr>
                            );
                        })}
                    </tbody>
                </table>
            </div>

            {isFormOpen && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
                    <div className="bg-white rounded max-w-md w-full p-6">
                        <div className="flex justify-between items-center mb-4">
                            <h2 className="text-xl font-bold">Create Coupon</h2>
                            <button onClick={() => setIsFormOpen(false)}><X className="w-5 h-5" /></button>
                        </div>
                        <form onSubmit={handleFormSubmit} className="space-y-4">
                            <div>
                                <label className="block text-sm">Code</label>
                                <input type="text" value={formData.code} onChange={e => setFormData({ ...formData, code: e.target.value })} className="w-full border rounded p-2 uppercase" required />
                            </div>
                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-sm">% Discount</label>
                                    <input type="number" value={formData.discountPercentage} onChange={e => setFormData({ ...formData, discountPercentage: Number(e.target.value) })} className="w-full border rounded p-2" min="0" max="100" />
                                </div>
                                <div>
                                    <label className="block text-sm">$ Discount</label>
                                    <input type="number" value={formData.discountAmount} onChange={e => setFormData({ ...formData, discountAmount: Number(e.target.value) })} className="w-full border rounded p-2" min="0" />
                                </div>
                            </div>
                            <div>
                                <label className="block text-sm">Expiry Date</label>
                                <input type="date" value={formData.expiryDate} onChange={e => setFormData({ ...formData, expiryDate: e.target.value })} className="w-full border rounded p-2" required />
                            </div>
                            <div>
                                <label className="block text-sm">Usage Limit (Leave blank for unlimited)</label>
                                <input type="number" value={formData.usageLimit} onChange={e => setFormData({ ...formData, usageLimit: e.target.value })} className="w-full border rounded p-2" min="1" />
                            </div>
                            <div className="flex justify-end gap-2 pt-2">
                                <button type="button" onClick={() => setIsFormOpen(false)} className="px-4 py-2 bg-gray-200 rounded">Cancel</button>
                                <button type="submit" className="px-4 py-2 bg-blue-600 text-white rounded">Save</button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
};

export default CouponManagement;
