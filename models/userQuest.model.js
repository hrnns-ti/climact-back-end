import mongoose from "mongoose";
const userQuestSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
    questId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Quest",
        required: true
    },
    status: {
        type: String,
        enum: ['Started', 'Completed'],
        default: 'Started'
    },
    proof: {
        type: String,
        required: true
    },
    pointsEarned: {
        type: Number,
        default: 0
    },
    completedAt: {
        type: Date
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
    updatedAt: {
        type: Date,
        default: Date.now
    }
})

const UserQuest = mongoose.model("UserQuest", userQuestSchema);
export default UserQuest;