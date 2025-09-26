import mongoose from 'mongoose'
const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Username is required'],
        trim: true,
        minLength: 3,
        maxLength: 50,
    },
    email: {
        type: String,
        required: [true, 'Email is required'],
        unique: [true, 'Email is unique'],
        trim: true,
        lowercase: true,
        match: /\S+@\S+\.\S+/,
    },
    password: {
        type: String,
        required: [true, 'Password is required'],
        trim: true,
        minLength: 6,
    }
}, {timestamps: true});

const User = mongoose.model('User', userSchema);

export default User;