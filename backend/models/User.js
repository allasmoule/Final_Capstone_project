import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';

const userSchema = new mongoose.Schema({
    role: {
        type: String,
        enum: ['user', 'advocate', 'student', 'admin'],
        required: true,
    },
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    phone: {
        type: String,
        required: true,
    },
    password: {
        type: String,
        required: true,
    },
    location: {
        type: String,
    },
    gender: {
        type: String,
    },
    image: {
        type: String, // URL from ImgBB
    },
    // Advocate-specific fields
    workplace: {
        type: String,
    },
    details: {
        type: String,
    },
    barCouncilId: {
        type: String,
    },
    experience: {
        type: Number,
    },
    expertise: {
        type: [String],
    },
}, { timestamps: true });

// Hash password before saving
userSchema.pre('save', async function () {
    if (!this.isModified('password')) {
        return;
    }

    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
});

// Method to compare passwords
userSchema.methods.matchPassword = async function (enteredPassword) {
    return await bcrypt.compare(enteredPassword, this.password);
};

const User = mongoose.model('User', userSchema);

export default User;
