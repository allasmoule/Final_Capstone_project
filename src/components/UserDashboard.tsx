import { useState, useEffect } from 'react';
import axios from 'axios';
import { User, Shield, CreditCard, CheckCircle, PieChart as PieChartIcon, Activity } from 'lucide-react';
import { PieChart, Pie, Cell, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const UserDashboard = () => {
    const [hirings, setHirings] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);
    const [activeTab, setActiveTab] = useState('overview');

    useEffect(() => {
        const fetchDashboardData = async () => {
            try {
                const userInfo = JSON.parse(localStorage.getItem('userInfo') || '{}');
                if (!userInfo.token) {
                    window.location.hash = '#login';
                    return;
                }
                const config = { headers: { Authorization: `Bearer ${userInfo.token}` } };
                
                const { data } = await axios.get('http://localhost:5000/api/hirings/user', config);
                setHirings(data);
            } catch (err) {
                console.error(err);
            } finally {
                setLoading(false);
            }
        };
        fetchDashboardData();
    }, []);

    const handlePayAdvocate = async (id: string) => {
        try {
            const userInfo = JSON.parse(localStorage.getItem('userInfo') || '{}');
            const config = { headers: { Authorization: `Bearer ${userInfo.token}` } };
            
            await axios.put(`http://localhost:5000/api/hirings/${id}/pay`, {}, config);
            
            // Refresh hirings
            const { data } = await axios.get('http://localhost:5000/api/hirings/user', config);
            setHirings(data);
            alert("Payment simulated successfully!");
        } catch (err) {
            console.error("Payment failed", err);
            alert("Payment failed");
        }
    };

    if (loading) return <div className="text-center p-12 text-xl">Loading Dashboard...</div>;

    const userInfo = JSON.parse(localStorage.getItem('userInfo') || '{}');

    // Chart Data calculations
    const statusCounts = hirings.reduce((acc, curr) => {
        const statusStr = curr.status.charAt(0).toUpperCase() + curr.status.slice(1);
        acc[statusStr] = (acc[statusStr] || 0) + 1;
        return acc;
    }, {});
    
    const pieData = Object.keys(statusCounts).map(status => ({
        name: status,
        value: statusCounts[status]
    }));
    const COLORS = ['#F59E0B', '#3B82F6', '#10B981', '#EF4444'];

    const totalPaid = hirings.filter(h => h.paymentStatus === 'paid').reduce((a, b) => a + b.amount, 0);

    return (
        <div className="min-h-screen bg-gray-50 flex flex-col md:flex-row">
            {/* Sidebar */}
            <div className="w-full md:w-64 bg-white shadow-md p-6">
                <h2 className="text-xl font-bold text-gray-800 mb-8 flex items-center">
                    <User className="mr-2 text-blue-600 w-6 h-6" /> User Profile
                </h2>
                <nav className="space-y-2">
                    <button 
                        onClick={() => setActiveTab('overview')}
                        className={`w-full text-left px-4 py-3 rounded-lg flex items-center transition-colors ${activeTab === 'overview' ? 'bg-blue-50 text-blue-700 font-semibold' : 'text-gray-600 hover:bg-gray-100'}`}
                    >
                        <Activity className="w-5 h-5 mr-3" /> Dashboard Overview
                    </button>
                    <button 
                        onClick={() => setActiveTab('advocates')}
                        className={`w-full text-left px-4 py-3 rounded-lg flex items-center transition-colors ${activeTab === 'advocates' ? 'bg-blue-50 text-blue-700 font-semibold' : 'text-gray-600 hover:bg-gray-100'}`}
                    >
                        <Shield className="w-5 h-5 mr-3" /> Hired Advocates
                    </button>
                    <button 
                        onClick={() => setActiveTab('details')}
                        className={`w-full text-left px-4 py-3 rounded-lg flex items-center transition-colors ${activeTab === 'details' ? 'bg-blue-50 text-blue-700 font-semibold' : 'text-gray-600 hover:bg-gray-100'}`}
                    >
                        <User className="w-5 h-5 mr-3" /> Personal Info
                    </button>
                </nav>
            </div>

            {/* Main Content */}
            <div className="flex-1 p-4 md:p-8">

                {activeTab === 'overview' && (
                    <div>
                        <h1 className="text-2xl font-bold text-gray-900 mb-6">Dashboard Overview</h1>
                        
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                            <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
                                <p className="text-gray-500 text-sm">Total Legal Cases</p>
                                <p className="text-3xl font-bold text-blue-600 mt-1">{hirings.length}</p>
                            </div>
                            <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
                                <p className="text-gray-500 text-sm">Active Cases</p>
                                <p className="text-3xl font-bold text-green-600 mt-1">{hirings.filter(h => h.status === 'active').length}</p>
                            </div>
                            <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
                                <p className="text-gray-500 text-sm">Amount Spent</p>
                                <p className="text-3xl font-bold text-purple-600 mt-1">৳{totalPaid}</p>
                            </div>
                        </div>

                        <div className="bg-white p-8 rounded-xl shadow-sm border border-gray-100">
                            <h3 className="text-lg font-bold text-gray-900 mb-6 flex items-center"><PieChartIcon className="mr-2" /> Hiring Status Breakdown</h3>
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
                                <div className="text-center py-12 text-gray-500">No cases found to display data.</div>
                            )}
                        </div>
                    </div>
                )}
                
                {activeTab === 'advocates' && (
                    <div>
                        <div className="mb-6 flex justify-between items-end">
                            <div>
                                <h1 className="text-2xl font-bold text-gray-900">Your Legal Representation</h1>
                                <p className="text-gray-600">Track and manage the advocates you have hired</p>
                            </div>
                            <button onClick={() => window.location.hash = '#advocates'} className="bg-blue-600 text-white px-4 py-2 rounded shadow hover:bg-blue-700">Find Advocate</button>
                        </div>

                        {hirings.length === 0 ? (
                            <div className="bg-white p-12 rounded-xl border border-dashed border-gray-300 text-center">
                                <Shield className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                                <h3 className="text-xl font-medium text-gray-700 mb-2">No Advocates Hired Yet</h3>
                                <p className="text-gray-500 mb-6">You haven't requested any legal services. Browse our vetted advocates if you need help.</p>
                            </div>
                        ) : (
                            <div className="space-y-6">
                                {hirings.map(hiring => (
                                    <div key={hiring._id} className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 flex flex-col md:flex-row gap-6">
                                        <div className="flex-shrink-0">
                                            <img src={hiring.advocate?.image || 'https://via.placeholder.com/100'} alt="Advocate" className="w-24 h-24 rounded-full object-cover shadow-sm border" />
                                        </div>
                                        <div className="flex-grow">
                                            <div className="flex justify-between items-start mb-2">
                                                <div>
                                                    <h3 className="text-xl font-bold text-gray-900">{hiring.advocate?.name || 'Advocate'}</h3>
                                                    <p className="text-blue-600 font-medium text-sm">{hiring.advocate?.expertise?.join(', ') || 'General Law'}</p>
                                                </div>
                                                <span className={`px-3 py-1 rounded-full text-xs font-bold ${
                                                    hiring.status === 'pending' ? 'bg-yellow-100 text-yellow-800' :
                                                    hiring.status === 'active' ? 'bg-blue-100 text-blue-800' :
                                                    hiring.status === 'completed' ? 'bg-green-100 text-green-800' :
                                                    'bg-red-100 text-red-800'
                                                }`}>
                                                    {hiring.status.toUpperCase()}
                                                </span>
                                            </div>
                                            
                                            <div className="bg-gray-50 p-3 rounded mt-3 mb-4 text-sm text-gray-700">
                                                <span className="font-semibold text-gray-900">Your Query / Case: </span>
                                                {hiring.caseDetails}
                                            </div>

                                            <div className="flex flex-wrap gap-4 items-center justify-between border-t border-gray-100 pt-4">
                                                <div className="text-sm font-medium">
                                                    Fee: <span className="text-gray-900 text-lg">৳{hiring.amount}</span>
                                                </div>
                                                <div>
                                                    {hiring.paymentStatus === 'pending' ? (
                                                        <button 
                                                            onClick={() => handlePayAdvocate(hiring._id)}
                                                            className="flex items-center text-sm font-bold bg-green-50 text-green-700 hover:bg-green-100 px-4 py-2 rounded transition-colors"
                                                        >
                                                            <CreditCard className="w-4 h-4 mr-2" /> Pay Now
                                                        </button>
                                                    ) : (
                                                        <span className="flex items-center text-sm font-bold text-green-600 px-4 py-2">
                                                            <CheckCircle className="w-4 h-4 mr-2" /> Paid
                                                        </span>
                                                    )}
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>
                )}

                {activeTab === 'details' && (
                    <div className="bg-white rounded-xl shadow-sm p-8 max-w-2xl">
                        <h3 className="text-lg font-bold text-gray-900 mb-6">Personal Data & Records</h3>
                        <div className="space-y-4">
                            <div className="border-b pb-4">
                                <p className="text-sm text-gray-500">Full Name</p>
                                <p className="font-medium text-gray-900">{userInfo.name}</p>
                            </div>
                            <div className="border-b pb-4">
                                <p className="text-sm text-gray-500">Email Address</p>
                                <p className="font-medium text-gray-900">{userInfo.email}</p>
                            </div>
                            <div className="border-b pb-4">
                                <p className="text-sm text-gray-500">Account Type</p>
                                <p className="font-medium capitalize text-blue-600">{userInfo.role}</p>
                            </div>
                        </div>
                    </div>
                )}

            </div>
        </div>
    );
};

export default UserDashboard;