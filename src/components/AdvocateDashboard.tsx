import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Briefcase, User as UserIcon, Settings, DollarSign, CheckCircle, Clock, CreditCard, PieChart as PieChartIcon, Activity } from 'lucide-react';
import { PieChart, Pie, Cell, Tooltip, Legend, ResponsiveContainer, BarChart, Bar, XAxis, YAxis, CartesianGrid } from 'recharts';

const AdvocateDashboard = () => {
    const [hirings, setHirings] = useState<any[]>([]);
    const [withdrawals, setWithdrawals] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);
    const [activeTab, setActiveTab] = useState('overview');
    const [profile, setProfile] = useState({
        name: '',
        phone: '',
        location: '',
        experience: '',
        serviceFee: 0,
        workplace: '',
        balance: 0
    });
    
    // Withdrawal form state
    const [withdrawAmount, setWithdrawAmount] = useState('');
    const [withdrawMethod, setWithdrawMethod] = useState('');
    const [withdrawAccount, setWithdrawAccount] = useState('');
    
    const [updateMessage, setUpdateMessage] = useState('');

    useEffect(() => {
        const fetchDashboardData = async () => {
            try {
                const userInfo = JSON.parse(localStorage.getItem('userInfo') || '{}');
                if (!userInfo.token || userInfo.role !== 'advocate') {
                    window.location.hash = '#home';
                    return;
                }
                const config = { headers: { Authorization: `Bearer ${userInfo.token}` } };
                
                // Fetch Hirings
                const { data: hiringsData } = await axios.get('http://localhost:5000/api/hirings/advocate', config);
                setHirings(hiringsData);

                // Fetch Withdrawals
                const { data: withdrawalData } = await axios.get('http://localhost:5000/api/withdrawals/advocate', config);
                setWithdrawals(withdrawalData);

                // Fetch current user from localStorage
                setProfile({
                    name: userInfo.name || '',
                    phone: userInfo.phone || '',
                    location: userInfo.location || '',
                    experience: userInfo.experience || '',
                    serviceFee: userInfo.serviceFee || 0,
                    workplace: userInfo.workplace || '',
                    balance: userInfo.balance || 0
                });

            } catch (err) {
                console.error(err);
            } finally {
                setLoading(false);
            }
        };
        fetchDashboardData();
    }, []);

    const handleStatusUpdate = async (id: string, status: string) => {
        try {
            const userInfo = JSON.parse(localStorage.getItem('userInfo') || '{}');
            const config = { headers: { Authorization: `Bearer ${userInfo.token}` } };
            
            await axios.put(`http://localhost:5000/api/hirings/${id}/status`, { status }, config);
            
            const { data } = await axios.get('http://localhost:5000/api/hirings/advocate', config);
            setHirings(data);
        } catch (err) {
            console.error("Failed to update status", err);
        }
    };

    const handleProfileUpdate = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            const userInfo = JSON.parse(localStorage.getItem('userInfo') || '{}');
            const config = { headers: { Authorization: `Bearer ${userInfo.token}` } };
            
            const { data } = await axios.put('http://localhost:5000/api/advocates/profile', profile, config);
            
            localStorage.setItem('userInfo', JSON.stringify({ ...userInfo, ...data }));
            setUpdateMessage('Profile updated successfully!');
            setTimeout(() => setUpdateMessage(''), 3000);
        } catch (err) {
            console.error("Failed to update profile", err);
            setUpdateMessage('Failed to update profile.');
        }
    };

    const handleWithdrawalRequest = async (e: React.FormEvent) => {
        e.preventDefault();
        if (Number(withdrawAmount) > profile.balance) {
            setUpdateMessage("Insufficient Balance");
            return;
        }

        try {
            const userInfo = JSON.parse(localStorage.getItem('userInfo') || '{}');
            const config = { headers: { Authorization: `Bearer ${userInfo.token}` } };
            
            const { data } = await axios.post('http://localhost:5000/api/withdrawals', {
                amount: Number(withdrawAmount),
                method: withdrawMethod,
                accountNumber: withdrawAccount
            }, config);
            
            // Update local state
            setWithdrawals([data.withdrawal, ...withdrawals]);
            setProfile({ ...profile, balance: data.newBalance });
            
            // Update localStorage
            localStorage.setItem('userInfo', JSON.stringify({ ...userInfo, balance: data.newBalance }));
            
            setWithdrawAmount('');
            setWithdrawMethod('');
            setWithdrawAccount('');
            setUpdateMessage('Withdrawal requested successfully!');
            setTimeout(() => setUpdateMessage(''), 3000);
        } catch (err) {
            console.error("Failed to request withdrawal", err);
            setUpdateMessage('Failed to request withdrawal.');
        }
    };

    if (loading) return <div className="text-center p-12 text-xl">Loading Dashboard...</div>;

    const totalEarnings = hirings.filter(h => h.paymentStatus === 'paid').reduce((acc, curr) => acc + curr.amount, 0);
    const activeCases = hirings.filter(h => h.status === 'active').length;

    // --- Chart Data Preparation ---
    const caseStatusCounts = hirings.reduce((acc, curr) => {
        acc[curr.status] = (acc[curr.status] || 0) + 1;
        return acc;
    }, {});
    
    const pieData = Object.keys(caseStatusCounts).map(status => ({
        name: status.toUpperCase(),
        value: caseStatusCounts[status]
    }));
    const COLORS = ['#F59E0B', '#3B82F6', '#10B981', '#EF4444']; // Pending, Active, Completed, Cancelled colors mapped loosely

    // Mock weekly earnings from hirings (real app would group by date)
    const barData = [
        { name: 'Week 1', earnings: 0 },
        { name: 'Week 2', earnings: totalEarnings > 0 ? totalEarnings * 0.3 : 0 },
        { name: 'Week 3', earnings: totalEarnings > 0 ? totalEarnings * 0.5 : 0 },
        { name: 'Week 4', earnings: totalEarnings > 0 ? totalEarnings * 0.2 : 0 },
    ];

    return (
        <div className="min-h-screen bg-gray-50 flex flex-col md:flex-row">
            {/* Sidebar */}
            <div className="w-full md:w-64 bg-white shadow-md p-6">
                <h2 className="text-xl font-bold text-gray-800 mb-8 flex items-center">
                    <Briefcase className="mr-2 text-blue-600" /> Advocate Panel
                </h2>
                <nav className="space-y-2">
                    <button onClick={() => setActiveTab('overview')} className={`w-full text-left px-4 py-3 rounded-lg flex items-center transition-colors ${activeTab === 'overview' ? 'bg-blue-50 text-blue-700 font-semibold' : 'text-gray-600 hover:bg-gray-100'}`}>
                        <Activity className="w-5 h-5 mr-3" /> Dashboard Overview
                    </button>
                    <button onClick={() => setActiveTab('cases')} className={`w-full text-left px-4 py-3 rounded-lg flex items-center transition-colors ${activeTab === 'cases' ? 'bg-blue-50 text-blue-700 font-semibold' : 'text-gray-600 hover:bg-gray-100'}`}>
                        <UserIcon className="w-5 h-5 mr-3" /> Client Cases
                    </button>
                    <button onClick={() => setActiveTab('withdrawals')} className={`w-full text-left px-4 py-3 rounded-lg flex items-center transition-colors ${activeTab === 'withdrawals' ? 'bg-blue-50 text-blue-700 font-semibold' : 'text-gray-600 hover:bg-gray-100'}`}>
                        <DollarSign className="w-5 h-5 mr-3" /> Earnings & Payouts
                    </button>
                    <button onClick={() => setActiveTab('profile')} className={`w-full text-left px-4 py-3 rounded-lg flex items-center transition-colors ${activeTab === 'profile' ? 'bg-blue-50 text-blue-700 font-semibold' : 'text-gray-600 hover:bg-gray-100'}`}>
                        <Settings className="w-5 h-5 mr-3" /> Profile Settings
                    </button>
                </nav>
            </div>

            {/* Main Content */}
            <div className="flex-1 p-8 overflow-y-auto h-screen">
                
                {/* Stats Overview */}
                <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
                    <div className="bg-white p-6 rounded-xl shadow-sm flex items-center">
                        <div className="bg-blue-100 p-4 rounded-full mr-4"><Briefcase className="text-blue-600" /></div>
                        <div><p className="text-gray-500 text-sm">Total Cases</p><p className="text-2xl font-bold text-gray-900">{hirings.length}</p></div>
                    </div>
                    <div className="bg-white p-6 rounded-xl shadow-sm flex items-center">
                        <div className="bg-green-100 p-4 rounded-full mr-4"><DollarSign className="text-green-600" /></div>
                        <div><p className="text-gray-500 text-sm">All-Time Earnings</p><p className="text-2xl font-bold text-gray-900">৳{totalEarnings}</p></div>
                    </div>
                    <div className="bg-white p-6 rounded-xl shadow-sm flex items-center">
                        <div className="bg-purple-100 p-4 rounded-full mr-4"><CreditCard className="text-purple-600" /></div>
                        <div><p className="text-gray-500 text-sm">Available Balance</p><p className="text-2xl font-bold text-gray-900">৳{profile.balance}</p></div>
                    </div>
                    <div className="bg-white p-6 rounded-xl shadow-sm flex items-center">
                        <div className="bg-orange-100 p-4 rounded-full mr-4"><Clock className="text-orange-600" /></div>
                        <div><p className="text-gray-500 text-sm">Active Cases</p><p className="text-2xl font-bold text-gray-900">{activeCases}</p></div>
                    </div>
                </div>

                {updateMessage && <div className="mb-4 p-3 bg-blue-50 text-blue-700 rounded border border-blue-200">{updateMessage}</div>}

                {/* Dashboard Overview Charts */}
                {activeTab === 'overview' && (
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
                            <h3 className="text-lg font-bold text-gray-800 mb-6 flex items-center"><PieChartIcon className="mr-2" /> Case Status Distribution</h3>
                            {hirings.length > 0 ? (
                                <div className="h-64">
                                    <ResponsiveContainer width="100%" height="100%">
                                        <PieChart>
                                            <Pie data={pieData} cx="50%" cy="50%" innerRadius={60} outerRadius={80} fill="#8884d8" paddingAngle={5} dataKey="value">
                                                {pieData.map((_entry, index) => <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />)}
                                            </Pie>
                                            <Tooltip />
                                            <Legend />
                                        </PieChart>
                                    </ResponsiveContainer>
                                </div>
                            ) : (
                                <p className="text-gray-500 text-center py-10">No case data available to chart.</p>
                            )}
                        </div>

                        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
                            <h3 className="text-lg font-bold text-gray-800 mb-6">Recent Earnings</h3>
                            <div className="h-64">
                                <ResponsiveContainer width="100%" height="100%">
                                    <BarChart data={barData}>
                                        <CartesianGrid strokeDasharray="3 3" vertical={false} />
                                        <XAxis dataKey="name" />
                                        <YAxis />
                                        <Tooltip cursor={{fill: 'transparent'}} />
                                        <Bar dataKey="earnings" fill="#3B82F6" radius={[4, 4, 0, 0]} />
                                    </BarChart>
                                </ResponsiveContainer>
                            </div>
                        </div>
                    </div>
                )}

                {/* Client Cases Tab */}
                {activeTab === 'cases' && (
                    <div className="bg-white rounded-xl shadow-sm overflow-hidden">
                        <div className="p-6 border-b">
                            <h3 className="text-lg font-bold text-gray-900">Client Requests & Cases</h3>
                        </div>
                        <div className="overflow-x-auto">
                            <table className="w-full">
                                <thead className="bg-gray-50 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">
                                    <tr>
                                        <th className="px-6 py-4">Client Name</th>
                                        <th className="px-6 py-4">Required Service</th>
                                        <th className="px-6 py-4">Fee (৳)</th>
                                        <th className="px-6 py-4">Job Status</th>
                                        <th className="px-6 py-4">Payment</th>
                                        <th className="px-6 py-4 whitespace-nowrap">Actions</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-gray-200">
                                    {hirings.map(hiring => (
                                        <tr key={hiring._id} className="hover:bg-gray-50">
                                            <td className="px-6 py-4">
                                                <div className="font-medium text-gray-900">{hiring.user?.name || 'Unknown'}</div>
                                                <div className="text-xs text-gray-500">{hiring.user?.phone}</div>
                                            </td>
                                            <td className="px-6 py-4">
                                                <p className="text-sm text-gray-700 line-clamp-2 max-w-xs">{hiring.caseDetails}</p>
                                            </td>
                                            <td className="px-6 py-4 font-semibold text-gray-900">{hiring.amount}</td>
                                            <td className="px-6 py-4">
                                                <span className={`px-2 py-1 text-xs rounded-full font-medium ${
                                                    hiring.status === 'pending' ? 'bg-yellow-100 text-yellow-800' :
                                                    hiring.status === 'active' ? 'bg-blue-100 text-blue-800' :
                                                    hiring.status === 'completed' ? 'bg-green-100 text-green-800' :
                                                    'bg-red-100 text-red-800'
                                                }`}>
                                                    {hiring.status.toUpperCase()}
                                                </span>
                                            </td>
                                            <td className="px-6 py-4">
                                                <span className={`px-2 py-1 text-xs rounded-full font-medium ${hiring.paymentStatus === 'paid' ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-600'}`}>
                                                    {hiring.paymentStatus.toUpperCase()}
                                                </span>
                                            </td>
                                            <td className="px-6 py-4">
                                                <select
                                                    value={hiring.status}
                                                    onChange={(e) => handleStatusUpdate(hiring._id, e.target.value)}
                                                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2"
                                                >
                                                    <option value="pending">Pending</option>
                                                    <option value="active">Accept / Active</option>
                                                    <option value="completed">Complete</option>
                                                    <option value="cancelled">Cancel</option>
                                                </select>
                                            </td>
                                        </tr>
                                    ))}
                                    {hirings.length === 0 && (
                                        <tr>
                                            <td colSpan={6} className="px-6 py-8 text-center text-gray-500 text-sm">
                                                No clients or cases found. Check back later!
                                            </td>
                                        </tr>
                                    )}
                                </tbody>
                            </table>
                        </div>
                    </div>
                )}

                {/* Withdrawals Tab */}
                {activeTab === 'withdrawals' && (
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                        <div className="lg:col-span-1 border rounded-xl shadow-sm bg-white p-6 h-fit">
                            <h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center"><DollarSign className="mr-2 text-green-600" /> Request Payout</h3>
                            <div className="bg-gray-50 p-4 rounded-lg mb-6 border border-gray-100">
                                <p className="text-sm text-gray-500 mb-1">Available for withdrawal</p>
                                <p className="text-3xl font-bold text-green-600">৳{profile.balance}</p>
                            </div>
                            
                            <form onSubmit={handleWithdrawalRequest} className="space-y-4">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Amount to Withdraw (৳)</label>
                                    <input type="number" value={withdrawAmount} onChange={e => setWithdrawAmount(e.target.value)} max={profile.balance} className="w-full p-2.5 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none" required min="100" />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Withdrawal Method</label>
                                    <select value={withdrawMethod} onChange={e => setWithdrawMethod(e.target.value)} className="w-full p-2.5 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none bg-white" required>
                                        <option value="">Select Method</option>
                                        <option value="Bank Transfer">Bank Transfer</option>
                                        <option value="bKash">bKash</option>
                                        <option value="Nagad">Nagad</option>
                                        <option value="Rocket">Rocket</option>
                                    </select>
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Account Number / Details</label>
                                    <input type="text" value={withdrawAccount} onChange={e => setWithdrawAccount(e.target.value)} placeholder="e.g. 01700000000" className="w-full p-2.5 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none" required />
                                </div>
                                <button type="submit" disabled={profile.balance <= 0 || !withdrawAmount || !withdrawMethod || !withdrawAccount} className="w-full bg-green-600 disabled:bg-gray-400 disabled:cursor-not-allowed text-white p-3 rounded-lg font-bold hover:bg-green-700 transition mt-2">
                                    Submit Request
                                </button>
                            </form>
                        </div>
                        
                        <div className="lg:col-span-2 border rounded-xl shadow-sm bg-white overflow-hidden">
                            <div className="p-6 border-b bg-gray-50">
                                <h3 className="text-lg font-bold text-gray-900">Withdrawal History</h3>
                            </div>
                            <div className="overflow-x-auto">
                                <table className="w-full">
                                    <thead className="bg-white border-b text-left text-xs font-semibold text-gray-500 uppercase">
                                        <tr>
                                            <th className="px-6 py-4">Date</th>
                                            <th className="px-6 py-4">Amount (৳)</th>
                                            <th className="px-6 py-4">Method & Account</th>
                                            <th className="px-6 py-4">Status</th>
                                        </tr>
                                    </thead>
                                    <tbody className="divide-y divide-gray-100 font-medium">
                                        {withdrawals.map(w => (
                                            <tr key={w._id} className="hover:bg-gray-50">
                                                <td className="px-6 py-4 text-gray-600 text-sm">{new Date(w.createdAt).toLocaleDateString()}</td>
                                                <td className="px-6 py-4 font-bold text-gray-900">- {w.amount}</td>
                                                <td className="px-6 py-4">
                                                    <div className="text-gray-900 text-sm font-bold">{w.method}</div>
                                                    <div className="text-xs text-gray-500">{w.accountNumber}</div>
                                                </td>
                                                <td className="px-6 py-4">
                                                    <span className={`px-2 py-1 text-xs rounded-full ${w.status === 'completed' ? 'bg-green-100 text-green-800' : w.status === 'rejected' ? 'bg-red-100 text-red-800' : 'bg-yellow-100 text-yellow-800'}`}>
                                                        {w.status.toUpperCase()}
                                                    </span>
                                                </td>
                                            </tr>
                                        ))}
                                        {withdrawals.length === 0 && (
                                            <tr>
                                                <td colSpan={4} className="px-6 py-12 text-center text-gray-500 text-sm">
                                                    No past withdrawals found. 
                                                </td>
                                            </tr>
                                        )}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                )}

                {/* Profile Tab */}
                {activeTab === 'profile' && (
                    <div className="bg-white rounded-xl shadow-sm p-8 max-w-2xl">
                        <h3 className="text-lg font-bold text-gray-900 mb-6">Profile & Service Settings</h3>
                        <form onSubmit={handleProfileUpdate} className="space-y-6">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Full Name</label>
                                    <input type="text" value={profile.name} onChange={e => setProfile({...profile, name: e.target.value})} className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none" required />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Phone Number</label>
                                    <input type="text" value={profile.phone} onChange={e => setProfile({...profile, phone: e.target.value})} className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none" required />
                                </div>
                            </div>
                            
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Service Fee / Hiring Cost (৳)</label>
                                    <input type="number" value={profile.serviceFee} onChange={e => setProfile({...profile, serviceFee: Number(e.target.value)})} className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none bg-blue-50" required min="0" />
                                    <p className="text-xs text-gray-500 mt-1">This amount will be charged to users when they hire you.</p>
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Location</label>
                                    <input type="text" value={profile.location} onChange={e => setProfile({...profile, location: e.target.value})} className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none" />
                                </div>
                            </div>
                            
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Experience (Years)</label>
                                <input type="text" value={profile.experience} onChange={e => setProfile({...profile, experience: e.target.value})} className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none" />
                            </div>

                            <button type="submit" className="w-full bg-blue-600 text-white p-3 rounded-lg font-bold hover:bg-blue-700 transition flex items-center justify-center">
                                <CheckCircle className="w-5 h-5 mr-2" /> Save Changes
                            </button>
                        </form>
                    </div>
                )}
            </div>
        </div>
    );
};

export default AdvocateDashboard;