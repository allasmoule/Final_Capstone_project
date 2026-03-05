import mongoose from 'mongoose';
import Course from './backend/models/Course.js';

mongoose.connect('mongodb://127.0.0.1:27017/law-main').then(async () => {
    try {
        console.log("Connected to local DB");
        const course = new Course({
            title: "Test Course",
            description: "Desc",
            instructor: "Inst",
            thumbnail: "Thumb",
            price: 10,
            category: "General",
            level: "Beginner",
            videos: []
        });
        await course.save();
        console.log("Course saved!");
    } catch (e) {
        console.error("Error saving course:", e);
    }
    process.exit(0);
}).catch(e => {
    console.error("Connection error:", e);
    process.exit(1);
});
