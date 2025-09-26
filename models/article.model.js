import mongoose from 'mongoose';

const articleSchema = new mongoose.Schema({
    title: {
        type: String,
        required: [true, 'Title is required'],
        trim: true,
        maxLength: 200
    },
    content: {
        type: String,
        required: [true, 'Content is required']
    },
    category: {
        type: String,
        trim: true,
        default: 'General'
    },
    author: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',                                // referensi ke user sebagai penulis
        required: true
    },
    mediaUrl: {
        type: String,
        trim: true,
        default: ''
    }
}, { timestamps: true });

const Article = mongoose.model('Article', articleSchema);

export default Article;
