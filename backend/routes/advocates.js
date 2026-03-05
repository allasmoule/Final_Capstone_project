import express from 'express';
import User from '../models/User.js';

const router = express.Router();

// @route   GET /api/advocates
// @desc    Get all advocates for public suggestion page
// @access  Public
router.get('/', async (req, res) => {
    try {
        // Find all users where role is "advocate"
        const advocates = await User.find({ role: 'advocate' }).select('-password -email');
        res.json(advocates);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server Error' });
    }
});

export default router;
