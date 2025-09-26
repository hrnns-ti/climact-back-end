import mongoose from 'mongoose';

const userBadgeSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    badgeId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Badge',
        required: true
    },
    awardedAt: {
        type: Date,
        default: Date.now
    }
})

const userBadge = mongoose.model('User', userBadgeSchema);
export default userBadge;