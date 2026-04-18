import mongoose from 'mongoose';

const hiringSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    advocate: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    caseDetails: {
        type: String,
        required: true,
    },
    attachedFiles: [{
        type: String, // Store base64 strings or URLs
    }],
    status: {
        type: String,
        enum: ['pending', 'active', 'completed', 'cancelled'],
        default: 'pending',
    },
    amount: {
        type: Number,
        default: 0,
    },
    paymentStatus: {
        type: String,
        enum: ['pending', 'paid'],
        default: 'pending',
    },
}, { timestamps: true });

const Hiring = mongoose.model('Hiring', hiringSchema);

export default Hiring;
