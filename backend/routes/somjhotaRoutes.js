import express from 'express';
import Somjhota from '../models/Somjhota.js';
import { protect, admin } from '../middleware/authMiddleware.js';

const router = express.Router();

// @desc    Create a new Somjhota application
// @route   POST /api/somjhota
// @access  Private
router.post('/', protect, async (req, res) => {
    try {
        const {
            party1Name, party1Email, party1Phone,
            party2Name, party2Email, party2Phone,
            disputeType, preferredTime, description
        } = req.body;

        const application = new Somjhota({
            party1Name, party1Email, party1Phone,
            party2Name, party2Email, party2Phone,
            disputeType, preferredTime, description,
            createdBy: req.user._id
        });

        const createdApplication = await application.save();
        res.status(201).json(createdApplication);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

// @desc    Get Somjhota applications for the logged in user
// @route   GET /api/somjhota/my
// @access  Private
router.get('/my', protect, async (req, res) => {
    try {
        // Fetch where the current user is either party 1, party 2, or the creator
        const applications = await Somjhota.find({
            $or: [
                { createdBy: req.user._id },
                { party1Email: req.user.email },
                { party2Email: req.user.email }
            ]
        }).sort({ createdAt: -1 });

        res.json(applications);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

// @desc    Get all Somjhota applications
// @route   GET /api/somjhota
// @access  Private/Admin
router.get('/', protect, admin, async (req, res) => {
    try {
        const applications = await Somjhota.find({}).populate('createdBy', 'name email').sort({ createdAt: -1 });
        res.json(applications);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

// @desc    Update application status
// @route   PUT /api/somjhota/:id/status
// @access  Private/Admin
router.put('/:id/status', protect, admin, async (req, res) => {
    try {
        const application = await Somjhota.findById(req.params.id);

        if (application) {
            application.status = req.body.status || application.status;
            const updatedApplication = await application.save();
            res.json(updatedApplication);
        } else {
            res.status(404).json({ message: 'Application not found' });
        }
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

// @desc    Add a message to Somjhota application
// @route   POST /api/somjhota/:id/messages
// @access  Private
router.post('/:id/messages', protect, async (req, res) => {
    try {
        const { text } = req.body;
        const application = await Somjhota.findById(req.params.id);

        if (application) {
            // Verify if the user is authorized to send a message (must be party1 or party2)
            const isAuthorized = 
                application.party1Email === req.user.email || 
                application.party2Email === req.user.email ||
                application.createdBy.equals(req.user._id);

            if (!isAuthorized) {
                return res.status(403).json({ message: 'Not authorized to send messages for this application' });
            }

            if (application.status !== 'approved') {
                return res.status(400).json({ message: 'Chat is only available for approved applications' });
            }

            const message = {
                senderName: req.user.name,
                senderEmail: req.user.email,
                text,
            };

            application.messages.push(message);
            await application.save();
            res.status(201).json(application);
        } else {
            res.status(404).json({ message: 'Application not found' });
        }
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

// @desc    Save a legal document for Somjhota application
// @route   PUT /api/somjhota/:id/document
// @access  Private
router.put('/:id/document', protect, async (req, res) => {
    try {
        const { title, content } = req.body;
        const application = await Somjhota.findById(req.params.id);

        if (application) {
            // Verify if the user is authorized (must be party1, party2, or creator)
            const isAuthorized = 
                application.party1Email === req.user.email || 
                application.party2Email === req.user.email ||
                application.createdBy.equals(req.user._id);

            if (!isAuthorized) {
                return res.status(403).json({ message: 'Not authorized to save document for this application' });
            }

            application.legalDocument = {
                title,
                content,
                generatedAt: new Date()
            };

            await application.save();
            res.json(application);
        } else {
            res.status(404).json({ message: 'Application not found' });
        }
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

export default router;