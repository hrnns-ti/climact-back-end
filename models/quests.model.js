import mongoose from 'mongoose';

const questSchema = new mongoose.Schema({
    title: {
        type: String,
        required: [true, 'Title is required'],
        trim: true,
        maxLength: 150
    },
    description: {
        type: String,
        required: [true, 'Description is required'],
        maxLength: 1500
    },
    period: {
        type: String,
        enum: ['Daily', 'Weekly', 'Monthly'],
        default: 'Daily',
        required: [true, 'Type is required']
    },
    points: {
        type: Number,
        default: 0
    },
    active: {
        type: Boolean,
        default: true
    },

    completed: {
        quest: {}
    },

    createdAt: {
        type: Date,
        default: Date.now
    },
    updatedAt: {
        type: Date,
        default: Date.now
    }
}, { timestamps: true });

const Quest = mongoose.model('Quest', questSchema);
export default Quest;
