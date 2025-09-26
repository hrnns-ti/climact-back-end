import mongoose from 'mongoose';

const badgeSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Name is required'],
        trim: true,
    },
    description: {
        type: String,
        required: [true, 'Description is required'],
        trim: true,
    },
    criteria: {
        type: String,
        required: [true, 'Criteria is required'],
        trim: true,
        default: ''
    },
    iconURL: {
        type: String
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
})

const Badge = mongoose.model('Badge', badgeSchema);
export default Badge;