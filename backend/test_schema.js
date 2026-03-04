import 'dotenv/config';
import mongoose from 'mongoose';
import User from './models/User.js';

const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/law-main';

async function test() {
    try {
        await mongoose.connect(MONGODB_URI);
        console.log('Connected to MongoDB');
        const user = await User.create({
            role: 'user',
            name: 'Test Test',
            email: `test${Date.now()}@test.com`,
            phone: '0170000000',
            password: 'password123'
        });
        console.log('Successfully created user:', user._id);
    } catch (err) {
        console.error('MONGOOSE ERROR:');
        console.error(err);
    } finally {
        process.exit(0);
    }
}

test();
