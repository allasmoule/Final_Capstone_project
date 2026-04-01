import express from 'express';
import Withdrawal from '../models/Withdrawal.js';
import User from '../models/User.js';
import { protect, admin } from '../middleware/authMiddleware.js';

const router = express.Router();

// @route   POST /api/withdrawals
// @desc    Request a withdrawal
// @access  Private (Advocate)
router.post('/', protect, async (req, res) => {
    try {
        if (req.user.role !== 'advocate') {
            return res.status(403).json({ message: 'Not authorized as an advocate' });
        }

        const { amount, method, accountNumber } = req.body;
        const advocate = await User.findById(req.user._id);

        if (!advocate || advocate.balance < amount) {
            return res.status(400).json({ message: 'Insufficient balance' });
        }

        // Deduct from balance
        advocate.balance -= amount;
        await advocate.save();

        const withdrawal = new Withdrawal({
            advocate: req.user._id,
            amount: Number(amount),
            method,
            accountNumber,
            status: 'pending'
        });

        const createdWithdrawal = await withdrawal.save();
        res.status(201).json({ withdrawal: createdWithdrawal, newBalance: advocate.balance });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server Error' });
    }
});

// @route   GET /api/withdrawals/advocate
// @desc    Get advocate's withdrawals
// @access  Private (Advocate)
router.get('/advocate', protect, async (req, res) => {
    try {
        const withdrawals = await Withdrawal.find({ advocate: req.user._id }).sort({ createdAt: -1 });
        res.json(withdrawals);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server Error' });
    }
});

// @route   GET /api/withdrawals/all
// @desc    Get all withdrawals
// @access  Private (Admin)
router.get('/all', protect, admin, async (req, res) => {
    try {
        const withdrawals = await Withdrawal.find().populate('advocate', 'name email phone').sort({ createdAt: -1 });
        res.json(withdrawals);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server Error' });
    }
});

// @route   PUT /api/withdrawals/:id/status
// @desc    Update withdrawal status
// @access  Private (Admin)
router.put('/:id/status', protect, admin, async (req, res) => {
    try {
        const { status } = req.body;
        const withdrawal = await Withdrawal.findById(req.params.id);

        if (!withdrawal) {
            return res.status(404).json({ message: 'Withdrawal not found' });
        }

        // If rejecting, refund the balance
        if (status === 'rejected' && withdrawal.status !== 'rejected') {
            const advocate = await User.findById(withdrawal.advocate);
            if (advocate) {
                advocate.balance += withdrawal.amount;
                await advocate.save();
            }
        } else if (status === 'completed' && withdrawal.status === 'rejected') {
            // Re-deduct if changing from rejected to completed
            const advocate = await User.findById(withdrawal.advocate);
            if (advocate) {
                advocate.balance -= withdrawal.amount;
                await advocate.save();
            }
        }

        withdrawal.status = status;
        const updatedWithdrawal = await withdrawal.save();
        res.json(updatedWithdrawal);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server Error' });
    }
});

export default router;
