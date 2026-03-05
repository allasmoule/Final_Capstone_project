import { useState, useEffect } from 'react';
import axios from 'axios';
import { BookOpen, PlayCircle, Clock } from 'lucide-react';

const StudentDashboard = () => {
    const [orders, setOrders] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchOrders = async () => {
            try {
                const userInfo = JSON.parse(localStorage.getItem('userInfo') || '{}');
                if (!userInfo.token) {
                    window.location.hash = '#login';
                    return;
                }
                const config = { headers: { Authorization: `Bearer ${userInfo.token}` } };
                const { data } = await axios.get('http://localhost:5000/api/orders/myorders', config);
                setOrders(data);
            } catch (err) {
                console.error(err);
            } finally {
                setLoading(false);
            }
        };
        fetchOrders();
    }, []);

    const handleWatchVideo = (courseId: string) => {
        window.location.hash = `#course-player/${courseId}`;
    };

    if (loading) return <div className="text-center p-12 text-xl">Loading Dashboard...</div>;

    return (
        <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-7xl mx-auto">
                <div className="mb-8">
                    <h1 className="text-3xl font-extrabold text-gray-900 flex items-center">
                        <BookOpen className="w-8 h-8 mr-3 text-blue-600" /> My Learning
                    </h1>
                    <p className="mt-2 text-gray-600">Access and track your purchased courses</p>
                </div>

                {orders.length === 0 ? (
                    <div className="bg-white rounded-xl shadow p-12 text-center">
                        <p className="text-gray-500 mb-4 text-lg">You haven't purchased any courses yet.</p>
                        <button
                            onClick={() => window.location.hash = '#education'}
                            className="bg-blue-600 text-white px-6 py-3 rounded-lg font-medium hover:bg-blue-700"
                        >
                            Browse Courses
                        </button>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {orders.map((order) => {
                            if (!order.course) return null; // In case course was deleted
                            return (
                                <div key={order._id} className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition-shadow">
                                    <img src={order.course.thumbnail} alt={order.course.title} className="w-full h-40 object-cover" />
                                    <div className="p-6">
                                        <h3 className="font-bold text-lg text-gray-900 line-clamp-2 mb-2">{order.course.title}</h3>
                                        <p className="text-gray-500 text-sm mb-4">Instructor: {order.course.instructor}</p>

                                        <div className="flex justify-between items-center text-sm text-gray-500 mb-6">
                                            <span className="flex items-center"><Clock className="w-4 h-4 mr-1" /> Purchased</span>
                                            <span>{new Date(order.createdAt).toLocaleDateString()}</span>
                                        </div>

                                        <button
                                            onClick={() => handleWatchVideo(order.course._id)}
                                            className="w-full bg-indigo-50 text-indigo-700 font-bold py-3 rounded flex items-center justify-center hover:bg-indigo-100 transition-colors"
                                        >
                                            <PlayCircle className="w-5 h-5 mr-2" /> Start Learning
                                        </button>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                )}
            </div>
        </div>
    );
};

export default StudentDashboard;
