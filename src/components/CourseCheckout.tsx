import React, { useState } from 'react';
import axios from 'axios';
import { X, CheckCircle, AlertCircle } from 'lucide-react';

interface CourseCheckoutProps {
    course: any;
    onClose: () => void;
    onSuccess: () => void;
}

const CourseCheckout: React.FC<CourseCheckoutProps> = ({ course, onClose, onSuccess }) => {
    const [couponCode, setCouponCode] = useState('');
    const [couponDetails, setCouponDetails] = useState<any>(null);
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const [applyingCoupon, setApplyingCoupon] = useState(false);

    const handleApplyCoupon = async () => {
        setError('');
        setApplyingCoupon(true);
        try {
            const userInfo = JSON.parse(localStorage.getItem('userInfo') || '{}');
            const config = { headers: { Authorization: `Bearer ${userInfo.token}` } };

            const { data } = await axios.post('http://localhost:5000/api/coupons/apply', {
                code: couponCode,
                originalPrice: course.price
            }, config);

            setCouponDetails(data);
        } catch (err: any) {
            setError(err.response?.data?.message || 'Invalid or expired coupon');
            setCouponDetails(null);
        } finally {
            setApplyingCoupon(false);
        }
    };

    const handlePurchase = async () => {
        setLoading(true);
        setError('');
        try {
            const userInfo = JSON.parse(localStorage.getItem('userInfo') || '{}');
            const config = { headers: { Authorization: `Bearer ${userInfo.token}` } };

            await axios.post('http://localhost:5000/api/orders', {
                courseId: course._id,
                couponCode: couponDetails ? couponDetails.couponCode : null
            }, config);

            onSuccess();
        } catch (err: any) {
            setError(err.response?.data?.message || 'Purchase failed');
            setLoading(false);
        }
    };

    const finalPrice = couponDetails ? couponDetails.newPrice : course.price;
    const isFree = finalPrice === 0;

    return (
        <div className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center p-4 z-[60]">
            <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full overflow-hidden">
                <div className="bg-gradient-to-r from-blue-600 to-indigo-700 p-6 text-white relative">
                    <button onClick={onClose} className="absolute top-4 right-4 text-white hover:text-gray-200">
                        <X className="w-6 h-6" />
                    </button>
                    <h2 className="text-2xl font-bold mb-2">Checkout</h2>
                    <p className="opacity-90">Review your order details below</p>
                </div>

                <div className="p-6">
                    <div className="flex items-center gap-4 mb-6 pb-6 border-b border-gray-100">
                        <img src={course.thumbnail} alt={course.title} className="w-20 h-20 object-cover rounded-lg shadow-sm" />
                        <div>
                            <h3 className="font-bold text-gray-900 line-clamp-2">{course.title}</h3>
                            <p className="text-sm text-gray-500">{course.instructor}</p>
                        </div>
                    </div>

                    <div className="mb-6 pb-6 border-b border-gray-100">
                        <h4 className="font-semibold text-gray-700 mb-3">Coupon Code</h4>
                        <div className="flex gap-2">
                            <input
                                type="text"
                                value={couponCode}
                                onChange={(e) => setCouponCode(e.target.value.toUpperCase())}
                                placeholder="Enter code"
                                className="flex-1 border border-gray-300 rounded-lg px-3 py-2 uppercase focus:ring-2 focus:ring-blue-500 focus:outline-none"
                            />
                            <button
                                onClick={handleApplyCoupon}
                                disabled={!couponCode || applyingCoupon}
                                className="bg-gray-900 text-white px-4 py-2 rounded-lg font-medium hover:bg-gray-800 disabled:opacity-50 transition-colors"
                            >
                                {applyingCoupon ? 'Applying...' : 'Apply'}
                            </button>
                        </div>
                        {error && (
                            <div className="mt-3 flex items-start text-red-600 text-sm bg-red-50 p-3 rounded-lg border border-red-100">
                                <AlertCircle className="w-4 h-4 mr-2 flex-shrink-0 mt-0.5" />
                                <span>{error}</span>
                            </div>
                        )}
                        {couponDetails && (
                            <div className="mt-3 flex items-start text-green-700 text-sm bg-green-50 p-3 rounded-lg border border-green-100">
                                <CheckCircle className="w-4 h-4 mr-2 flex-shrink-0 mt-0.5" />
                                <div>
                                    <span className="font-semibold">Coupon applied!</span> You saved ${couponDetails.discount.toFixed(2)}
                                </div>
                            </div>
                        )}
                    </div>

                    <div className="space-y-3 mb-8">
                        <div className="flex justify-between text-gray-600">
                            <span>Original Price</span>
                            <span className={couponDetails ? "line-through" : 'font-medium text-gray-900'}>${course.price.toFixed(2)}</span>
                        </div>
                        {couponDetails && (
                            <div className="flex justify-between text-green-600">
                                <span>Discount</span>
                                <span>-${couponDetails.discount.toFixed(2)}</span>
                            </div>
                        )}
                        <div className="flex justify-between font-bold text-xl text-gray-900 pt-3 border-t border-gray-100">
                            <span>Total</span>
                            <span>{isFree ? 'Free' : `$${finalPrice.toFixed(2)}`}</span>
                        </div>
                    </div>

                    <button
                        onClick={handlePurchase}
                        disabled={loading}
                        className="w-full bg-blue-600 text-white py-4 rounded-xl font-bold text-lg hover:bg-blue-700 shadow-lg hover:shadow-xl transition-all disabled:opacity-70 flex items-center justify-center"
                    >
                        {loading ? 'Processing...' : (isFree ? 'Enroll for Free' : `Pay $${finalPrice.toFixed(2)}`)}
                    </button>
                </div>
            </div>
        </div>
    );
};

export default CourseCheckout;
