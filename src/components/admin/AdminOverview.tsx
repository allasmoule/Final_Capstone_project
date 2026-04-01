import { useState, useEffect } from 'react';
import axios from 'axios';
import { PieChart, Pie, Cell, Tooltip, Legend, ResponsiveContainer, BarChart, Bar, XAxis, YAxis, CartesianGrid } from 'recharts';
import { Users, Briefcase, Activity, CheckCircle, XCircle } from 'lucide-react';

const AdminOverview = () => {
    const [users, setUsers] = useState<any[]>([]);
    const [hirings, setHirings] = useState<any[]>([]);
    const [withdrawals, setWithdrawals] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const userInfo = JSON.parse(localStorage.getItem('userInfo') || '{}');
                const config = { headers: { Authorization: `Bearer ${userInfo.token}` } };
                
                const [usersRes, hiringsRes, withdrawalsRes] = await Promise.all([
                    axios.get('http://localhost:5000/api/admin/users', config),
                    axios.get('http://localhost:5000/api/hirings/all', config).catch(() => ({ data: [] })),
                    axios.get('http://localhost:5000/api/withdrawals/all', config).catch(() => ({ data: [] }))
                ]);

                setUsers(usersRes.data);
                setHirings(hiringsRes.data);
                setWithdrawals(withdrawalsRes.data);
            } catch (err) {
                console.error("Failed to fetch admin overview data", err);
            } finally {
                setLoading(false);
            }
        };
        fetchData();
    }, []);

    const handleWithdrawalStatus = async (id: string, status: string) => {
        try {
            const userInfo = JSON.parse(localStorage.getItem('userInfo') || '{}');
            const config = { headers: { Authorization: `Bearer ${userInfo.token}` } };
            
            await axios.put(`http://localhost:5000/api/withdrawals/${id}/status`, { status }, config);
            
            // Local update for responsiveness
            setWithdrawals(withdrawals.map(w => w._id === id ? { ...w, status } : w));
        } catch (err) {
            console.error("Failed to update status", err);
            alert("Error updating withdrawal status");
        }
    };

    if (loading) return <div className="text-center p-12 text-xl">Loading Overview Data...</div>;

    // Chart Data Preparation
    const roleDistribution = users.reduce((acc, curr) => {
        const roleStr = curr.role.charAt(0).toUpperCase() + curr.role.slice(1);
        acc[roleStr] = (acc[roleStr] || 0) + 1;
        return acc;
    }, {});
    
    const pieData = Object.keys(roleDistribution).map(role => ({
        name: role,
        value: roleDistribution[role]
    }));
    const COLORS = ['#F59E0B', '#3B82F6', '#10B981', '#EF4444', '#8B5CF6'];

    const hiringStatusData = hirings.reduce((acc, curr) => {
        const statusStr = curr.status.charAt(0).toUpperCase() + curr.status.slice(1);
        acc[statusStr] = (acc[statusStr] || 0) + 1;
        return acc;
    }, {});
    const barData = Object.keys(hiringStatusData).map(status => ({
        name: status,
        cases: hiringStatusData[status]
    }));

    return (
        <div className="space-y-8">
            {/* Top Stats */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 flex items-center">
                    <div className="bg-blue-100 p-4 rounded-full mr-4"><Users className="text-blue-600" /></div>
                    <div><p className="text-gray-500 text-sm">Total Accounts</p><p className="text-2xl font-bold text-gray-900">{users.length}</p></div>
                </div>
                <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 flex items-center">
                    <div className="bg-green-100 p-4 rounded-full mr-4"><Briefcase className="text-green-600" /></div>
                    <div><p className="text-gray-500 text-sm">Total Legal Cases</p><p className="text-2xl font-bold text-gray-900">{hirings.length}</p></div>
                </div>
                <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 flex items-center">
                    <div className="bg-purple-100 p-4 rounded-full mr-4"><Activity className="text-purple-600" /></div>
                    <div><p className="text-gray-500 text-sm">Advocates Registered</p><p className="text-2xl font-bold text-gray-900">{users.filter(u => u.role === 'advocate').length}</p></div>
                </div>
            </div>

            {/* Charts */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
                    <h3 className="text-lg font-bold text-gray-800 mb-6">User Role Distribution</h3>
                    <div className="h-[300px]">
                        <ResponsiveContainer width="100%" height="100%">
                            <PieChart>
                                <Pie data={pieData} cx="50%" cy="50%" innerRadius={60} outerRadius={100} fill="#8884d8" paddingAngle={5} dataKey="value" label>
                                    {pieData.map((_entry, index) => <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />)}
                                </Pie>
                                <Tooltip />
                                <Legend />
                            </PieChart>
                        </ResponsiveContainer>
                    </div>
                </div>

                <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
                    <h3 className="text-lg font-bold text-gray-800 mb-6">Aggregate Case Statuses</h3>
                    <div className="h-[300px]">
                        <ResponsiveContainer width="100%" height="100%">
                            <BarChart data={barData}>
                                <CartesianGrid strokeDasharray="3 3" vertical={false} />
                                <XAxis dataKey="name" />
                                <YAxis />
                                <Tooltip cursor={{fill: 'transparent'}} />
                                <Bar dataKey="cases" fill="#3B82F6" radius={[4, 4, 0, 0]} barSize={50} />
                            </BarChart>
                        </ResponsiveContainer>
                    </div>
                </div>
            </div>

            {/* Admin Withdrawal Management */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden mt-8">
                <div className="p-6 border-b bg-gray-50">
                    <h3 className="text-lg font-bold text-gray-900 flex items-center">
                        <Briefcase className="mr-2 text-blue-600 w-5 h-5" /> Pending Advocate Payouts
                    </h3>
                </div>
                <div className="overflow-x-auto">
                    <table className="w-full">
                        <thead className="bg-white border-b text-left text-xs font-semibold text-gray-500 uppercase">
                            <tr>
                                <th className="px-6 py-4">Advocate</th>
                                <th className="px-6 py-4">Amount (৳)</th>
                                <th className="px-6 py-4">Method & Account</th>
                                <th className="px-6 py-4">Status</th>
                                <th className="px-6 py-4">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-100 text-sm">
                            {withdrawals.map(w => (
                                <tr key={w._id} className="hover:bg-gray-50">
                                    <td className="px-6 py-4">
                                        <div className="font-bold text-gray-900">{w.advocate?.name || 'Unknown'}</div>
                                    </td>
                                    <td className="px-6 py-4 font-bold text-gray-900">৳{w.amount}</td>
                                    <td className="px-6 py-4">
                                        <div className="text-gray-900 font-bold">{w.method}</div>
                                        <div className="text-gray-500">{w.accountNumber}</div>
                                    </td>
                                    <td className="px-6 py-4">
                                        <span className={`px-2 py-1 text-xs font-bold rounded-full ${w.status === 'completed' ? 'bg-green-100 text-green-800' : w.status === 'rejected' ? 'bg-red-100 text-red-800' : 'bg-yellow-100 text-yellow-800'}`}>
                                            {w.status.toUpperCase()}
                                        </span>
                                    </td>
                                    <td className="px-6 py-4 flex space-x-2">
                                        {w.status === 'pending' && (
                                            <>
                                                <button onClick={() => handleWithdrawalStatus(w._id, 'completed')} className="text-green-600 hover:bg-green-50 p-1 rounded-full group relative">
                                                    <CheckCircle className="w-6 h-6" />
                                                </button>
                                                <button onClick={() => handleWithdrawalStatus(w._id, 'rejected')} className="text-red-600 hover:bg-red-50 p-1 rounded-full group relative">
                                                    <XCircle className="w-6 h-6" />
                                                </button>
                                            </>
                                        )}
                                    </td>
                                </tr>
                            ))}
                            {withdrawals.length === 0 && (
                                <tr>
                                    <td colSpan={5} className="px-6 py-12 text-center text-gray-500">
                                        No withdrawal requests found.
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

export default AdminOverview;
