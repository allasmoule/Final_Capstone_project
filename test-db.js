import mongoose from 'mongoose';
import Course from './backend/models/Course.js';

async function test() {
    try {
        await mongoose.connect('mongodb://127.0.0.1:27017/law-main');
        console.log("Connected to MongoDB");

        const course = new Course({
            title: "Test Course",
            description: "Test Desc",
            instructor: "Test Inst",
            thumbnail: "http://example.com/thumb.jpg",
            price: 99,
            category: "General",
            level: "Beginner",
            videos: []
        });

        const saved = await course.save();
        console.log("SUCCESS:", saved);
    } catch (e) {
        console.error("FAIL:", e);
    } finally {
        process.exit();
    }
}
test();
