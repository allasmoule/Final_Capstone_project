import express from 'express';
import Coupon from '../models/Coupon.js';
import { protect, admin } from '../middleware/authMiddleware.js';

const router = express.Router();

// @route   POST /api/coupons
// @desc    Create a coupon
// @access  Private/Admin
router.post('/', protect, admin, async (req, res) => {
    try {
        const { code, discountPercentage, discountAmount, expiryDate, usageLimit, isActive } = req.body;

        const couponExists = await Coupon.findOne({ code: code.toUpperCase() });
        if (couponExists) {
            return res.status(400).json({ message: 'Coupon exactly with this code already exists' });
        }

        const coupon = new Coupon({
            code: code.toUpperCase(),
            discountPercentage,
            discountAmount,
            expiryDate,
            usageLimit,
            isActive: isActive !== undefined ? isActive : true
        });

        const createdCoupon = await coupon.save();
        res.status(201).json(createdCoupon);
    } catch (error) {
        res.status(500).json({ message: 'Server Error', error: error.message });
    }
});

// @route   GET /api/coupons
// @desc    Get all coupons
// @access  Private/Admin
router.get('/', protect, admin, async (req, res) => {
    try {
        const coupons = await Coupon.find({});
        res.json(coupons);
    } catch (error) {
        res.status(500).json({ message: 'Server Error', error: error.message });
    }
});

// @route   DELETE /api/coupons/:id
// @desc    Delete a coupon
// @access  Private/Admin
router.delete('/:id', protect, admin, async (req, res) => {
    try {
        const coupon = await Coupon.findById(req.params.id);
        if (coupon) {
            await Coupon.deleteOne({ _id: req.params.id });
            res.json({ message: 'Coupon removed' });
        } else {
            res.status(404).json({ message: 'Coupon not found' });
        }
    } catch (error) {
        res.status(500).json({ message: 'Server Error', error: error.message });
    }
});

// @route   POST /api/coupons/apply
// @desc    Apply/Validate a coupon before checkout
// @access  Private
router.post('/apply', protect, async (req, res) => {
    try {
        const { code, originalPrice } = req.body;

        const coupon = await Coupon.findOne({ code: code.toUpperCase(), isActive: true });

        if (!coupon) {
            return res.status(404).json({ message: 'Invalid coupon code' });
        }

        if (new Date(coupon.expiryDate) < new Date()) {
            return res.status(400).json({ message: 'Coupon has expired' });
        }

        if (coupon.usageLimit && coupon.usedCount >= coupon.usageLimit) {
            return res.status(400).json({ message: 'Coupon usage limit reached' });
        }

        let newPrice = originalPrice;
        let discount = 0;

        if (coupon.discountPercentage > 0) {
            discount = originalPrice * (coupon.discountPercentage / 100);
            newPrice = originalPrice - discount;
        } else if (coupon.discountAmount > 0) {
            discount = coupon.discountAmount;
            newPrice = originalPrice - discount;
        }

        newPrice = Math.max(0, newPrice);

        res.json({
            couponCode: coupon.code,
            originalPrice,
            newPrice,
            discount
        });
    } catch (error) {
        res.status(500).json({ message: 'Server Error', error: error.message });
    }
});

export default router;
