import express from 'express';
import Hiring from '../models/Hiring.js';
import User from '../models/User.js';
import { protect, admin } from '../middleware/authMiddleware.js';

const router = express.Router();

// @route   POST /api/hirings
// @desc    User hires an advocate
// @access  Private (User)
router.post('/', protect, async (req, res) => {
    try {
        const { advocateId, caseDetails } = req.body;
        
        // Handle invalid object IDs gracefully (mock advocate hire)
        if (!advocateId || advocateId.toString().length < 24) {
             return res.status(201).json({ message: 'Hire request successfully sent (Mock Advocate).' });
        }

        const advocate = await User.findById(advocateId);
        if (!advocate || advocate.role !== 'advocate') {
            return res.status(404).json({ message: 'Advocate not found' });
        }

        const hiring = new Hiring({
            user: req.user._id,
            advocate: advocateId,
            caseDetails,
            amount: advocate.serviceFee || 0,
            status: 'pending',
            paymentStatus: 'pending'
        });

        const createdHiring = await hiring.save();
        res.status(201).json(createdHiring);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server Error' });
    }
});

// @route   GET /api/hirings/user
// @desc    Get all hirings for logged in user
// @access  Private
router.get('/user', protect, async (req, res) => {
    try {
        const hirings = await Hiring.find({ user: req.user._id })
            .populate('advocate', 'name email phone expertise location image')
            .sort({ createdAt: -1 });
        res.json(hirings);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server Error' });
    }
});

// @route   GET /api/hirings/advocate
// @desc    Get all hirings for logged in advocate
// @access  Private (Advocate)
router.get('/advocate', protect, async (req, res) => {
    try {
        if (req.user.role !== 'advocate') {
            return res.status(403).json({ message: 'Not authorized as an advocate' });
        }
        const hirings = await Hiring.find({ advocate: req.user._id })
            .populate('user', 'name email phone location')
            .sort({ createdAt: -1 });
        res.json(hirings);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server Error' });
    }
});

// @route   GET /api/hirings/all
// @desc    Get all hirings globally
// @access  Private (Admin)
router.get('/all', protect, admin, async (req, res) => {
    try {
        const hirings = await Hiring.find()
            .populate('user', 'name email objectId')
            .populate('advocate', 'name email objectId')
            .sort({ createdAt: -1 });
        res.json(hirings);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server Error' });
    }
});

// @route   PUT /api/hirings/:id/status
// @desc    Update hiring status (by advocate)
// @access  Private (Advocate)
router.put('/:id/status', protect, async (req, res) => {
    try {
        const { status } = req.body;
        const hiring = await Hiring.findById(req.params.id);

        if (!hiring) {
            return res.status(404).json({ message: 'Hiring not found' });
        }

        // Only the matched advocate can change the status
        if (hiring.advocate.toString() !== req.user._id.toString()) {
            return res.status(403).json({ message: 'Not authorized to update this hiring' });
        }

        hiring.status = status;
        const updatedHiring = await hiring.save();
        res.json(updatedHiring);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server Error' });
    }
});

// @route   PUT /api/hirings/:id/pay
// @desc    Simulate payment for hiring
// @access  Private (User)
router.put('/:id/pay', protect, async (req, res) => {
    try {
        const hiring = await Hiring.findById(req.params.id);

        if (!hiring) {
            return res.status(404).json({ message: 'Hiring not found' });
        }

        if (hiring.user.toString() !== req.user._id.toString()) {
            return res.status(403).json({ message: 'Not authorized to pay for this hiring' });
        }

        hiring.paymentStatus = 'paid';
        const updatedHiring = await hiring.save();

        // Update advocate's balance
        const advocate = await User.findById(hiring.advocate);
        if (advocate) {
            advocate.balance = (advocate.balance || 0) + hiring.amount;
            await advocate.save();
        }

        res.json(updatedHiring);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server Error' });
    }
});


export default router;