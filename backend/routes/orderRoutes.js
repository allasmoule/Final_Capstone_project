import express from 'express';
import Order from '../models/Order.js';
import Course from '../models/Course.js';
import Coupon from '../models/Coupon.js';
import { protect, admin } from '../middleware/authMiddleware.js';

const router = express.Router();

// @route   POST /api/orders
// @desc    Create new order (purchase course)
// @access  Private
router.post('/', protect, async (req, res) => {
    try {
        const { courseId, couponCode } = req.body;

        const course = await Course.findById(courseId);
        if (!course) {
            return res.status(404).json({ message: 'Course not found' });
        }

        // Check if user already purchased
        const existingOrder = await Order.findOne({ user: req.user._id, course: courseId, status: 'Completed' });
        if (existingOrder) {
            return res.status(400).json({ message: 'You have already purchased this course' });
        }

        let amountPaid = course.price;
        let couponAppliedId = null;

        if (couponCode) {
            const coupon = await Coupon.findOne({ code: couponCode.toUpperCase(), isActive: true });
            if (coupon) {
                // Check expiry
                if (new Date(coupon.expiryDate) < new Date()) {
                    return res.status(400).json({ message: 'Coupon has expired' });
                }
                // Check usage
                if (coupon.usageLimit && coupon.usedCount >= coupon.usageLimit) {
                    return res.status(400).json({ message: 'Coupon usage limit reached' });
                }

                if (coupon.discountPercentage > 0) {
                    amountPaid = amountPaid - (amountPaid * (coupon.discountPercentage / 100));
                } else if (coupon.discountAmount > 0) {
                    amountPaid = amountPaid - coupon.discountAmount;
                }

                amountPaid = Math.max(0, amountPaid);
                couponAppliedId = coupon._id;

                // Update coupon usage
                coupon.usedCount += 1;
                await coupon.save();
            } else {
                return res.status(400).json({ message: 'Invalid coupon code' });
            }
        }

        const order = new Order({
            user: req.user._id,
            course: courseId,
            amountPaid,
            couponApplied: couponAppliedId,
            status: 'Completed' // Mock successful payment right away
        });

        const createdOrder = await order.save();
        res.status(201).json(createdOrder);
    } catch (error) {
        res.status(500).json({ message: 'Server Error', error: error.message });
    }
});

// @route   GET /api/orders/myorders
// @desc    Get logged in user orders
// @access  Private
router.get('/myorders', protect, async (req, res) => {
    try {
        const orders = await Order.find({ user: req.user._id }).populate('course', 'title thumbnail instructor');
        res.json(orders);
    } catch (error) {
        res.status(500).json({ message: 'Server Error', error: error.message });
    }
});

// @route   GET /api/orders
// @desc    Get all orders
// @access  Private/Admin
router.get('/', protect, admin, async (req, res) => {
    try {
        const orders = await Order.find({}).populate('user', 'id name email').populate('course', 'title price');
        res.json(orders);
    } catch (error) {
        res.status(500).json({ message: 'Server Error', error: error.message });
    }
});

export default router;
