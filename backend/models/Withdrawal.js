import mongoose from 'mongoose';

const withdrawalSchema = new mongoose.Schema({
    advocate: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    amount: {
        type: Number,
        required: true,
    },
    method: {
        type: String,
        required: true,
    },
    accountNumber: {
        type: String,
        required: true,
    },
    status: {
        type: String,
        enum: ['pending', 'completed', 'rejected'],
        default: 'pending',
    },
}, { timestamps: true });

const Withdrawal = mongoose.model('Withdrawal', withdrawalSchema);

export default Withdrawal;
