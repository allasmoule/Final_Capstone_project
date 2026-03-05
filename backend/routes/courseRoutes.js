import express from 'express';
import Course from '../models/Course.js';
import Order from '../models/Order.js';
import { protect, admin } from '../middleware/authMiddleware.js';

const router = express.Router();

// @route   GET /api/courses
// @desc    Get all courses (Public)
// @access  Public
router.get('/', async (req, res) => {
    try {
        const courses = await Course.find({}).select('-videos'); // Hide videos by default
        res.json(courses);
    } catch (error) {
        res.status(500).json({ message: 'Server Error', error: error.message });
    }
});

// @route   GET /api/courses/:id
// @desc    Get single course details
// @access  Public / Protected (for videos)
router.get('/:id', async (req, res) => {
    try {
        const course = await Course.findById(req.params.id);
        if (!course) {
            return res.status(404).json({ message: 'Course not found' });
        }

        // Check if user is logged in
        let hasPurchased = false;
        let isAdmin = false;

        if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
            try {
                // Determine hasPurchased
                const jwt = await import('jsonwebtoken');
                const token = req.headers.authorization.split(' ')[1];
                const decoded = jwt.default.verify(token, process.env.JWT_SECRET || 'fallback_secret');

                const User = (await import('../models/User.js')).default;
                const user = await User.findById(decoded.id);

                if (user && user.role === 'admin') {
                    isAdmin = true;
                }

                if (user) {
                    const order = await Order.findOne({ user: user._id, course: course._id, status: 'Completed' });
                    if (order) {
                        hasPurchased = true;
                    }
                }
            } catch (err) {
                // Ignore token errors for public view
            }
        }

        if (isAdmin || hasPurchased) {
            res.json(course); // Send full course including videos
        } else {
            // Strip videos if not purchased
            const courseData = course.toObject();
            delete courseData.videos;
            res.json({ ...courseData, isLocked: true });
        }
    } catch (error) {
        res.status(500).json({ message: 'Server Error', error: error.message });
    }
});

// @route   POST /api/courses
// @desc    Create a course
// @access  Private/Admin
router.post('/', protect, admin, async (req, res) => {
    try {
        const { title, description, instructor, thumbnail, price, category, level, videos } = req.body;

        const course = new Course({
            title,
            description,
            instructor,
            thumbnail,
            price,
            category,
            level,
            videos: videos || []
        });

        const createdCourse = await course.save();
        res.status(201).json(createdCourse);
    } catch (error) {
        res.status(500).json({ message: 'Server Error', error: error.message });
    }
});

// @route   PUT /api/courses/:id
// @desc    Update a course
// @access  Private/Admin
router.put('/:id', protect, admin, async (req, res) => {
    try {
        const { title, description, instructor, thumbnail, price, category, level, videos } = req.body;

        const course = await Course.findById(req.params.id);

        if (course) {
            course.title = title || course.title;
            course.description = description || course.description;
            course.instructor = instructor || course.instructor;
            course.thumbnail = thumbnail || course.thumbnail;
            course.price = price !== undefined ? price : course.price;
            course.category = category || course.category;
            course.level = level || course.level;

            if (videos) {
                course.videos = videos;
            }

            const updatedCourse = await course.save();
            res.json(updatedCourse);
        } else {
            res.status(404).json({ message: 'Course not found' });
        }
    } catch (error) {
        res.status(500).json({ message: 'Server Error', error: error.message });
    }
});

// @route   DELETE /api/courses/:id
// @desc    Delete a course
// @access  Private/Admin
router.delete('/:id', protect, admin, async (req, res) => {
    try {
        const course = await Course.findById(req.params.id);

        if (course) {
            await Course.deleteOne({ _id: req.params.id });
            res.json({ message: 'Course removed' });
        } else {
            res.status(404).json({ message: 'Course not found' });
        }
    } catch (error) {
        res.status(500).json({ message: 'Server Error', error: error.message });
    }
});

export default router;
