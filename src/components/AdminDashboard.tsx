import { useState } from 'react';
import UserManagement from './admin/UserManagement';
import CourseManagement from './admin/CourseManagement';
import OrderManagement from './admin/OrderManagement';
import CouponManagement from './admin/CouponManagement';
import { Users, BookOpen, ShoppingCart, Tag } from 'lucide-react';

const AdminDashboard = () => {
    const [activeTab, setActiveTab] = useState<'users' | 'courses' | 'orders' | 'coupons'>('users');

    return (
        <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-7xl mx-auto">
                <div className="flex justify-between items-center mb-8">
                    <h1 className="text-3xl font-extrabold text-gray-900">Admin Panel</h1>
                </div>

                <div className="bg-white rounded-xl shadow mb-8">
                    <div className="border-b border-gray-200">
                        <nav className="flex -mb-px" aria-label="Tabs">
                            <button
                                onClick={() => setActiveTab('users')}
                                className={`w-1/4 py-4 px-1 text-center border-b-2 font-medium text-sm flex items-center justify-center ${activeTab === 'users' ? 'border-blue-500 text-blue-600' : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'}`}
                            >
                                <Users className="w-5 h-5 mr-2" /> Users
                            </button>
                            <button
                                onClick={() => setActiveTab('courses')}
                                className={`w-1/4 py-4 px-1 text-center border-b-2 font-medium text-sm flex items-center justify-center ${activeTab === 'courses' ? 'border-blue-500 text-blue-600' : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'}`}
                            >
                                <BookOpen className="w-5 h-5 mr-2" /> Courses
                            </button>
                            <button
                                onClick={() => setActiveTab('orders')}
                                className={`w-1/4 py-4 px-1 text-center border-b-2 font-medium text-sm flex items-center justify-center ${activeTab === 'orders' ? 'border-blue-500 text-blue-600' : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'}`}
                            >
                                <ShoppingCart className="w-5 h-5 mr-2" /> Purchases
                            </button>
                            <button
                                onClick={() => setActiveTab('coupons')}
                                className={`w-1/4 py-4 px-1 text-center border-b-2 font-medium text-sm flex items-center justify-center ${activeTab === 'coupons' ? 'border-blue-500 text-blue-600' : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'}`}
                            >
                                <Tag className="w-5 h-5 mr-2" /> Coupons
                            </button>
                        </nav>
                    </div>
                </div>

                <div className="mt-6">
                    {activeTab === 'users' && <UserManagement />}
                    {activeTab === 'courses' && <CourseManagement />}
                    {activeTab === 'orders' && <OrderManagement />}
                    {activeTab === 'coupons' && <CouponManagement />}
                </div>

            </div>
        </div>
    );
};

export default AdminDashboard;
