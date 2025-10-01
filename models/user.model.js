import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Name is required'],
        trim: true,
        minLength: [3, 'Name must be at least 3 characters'],
        maxLength: [50, 'Name cannot exceed 50 characters'],
        match: [/^[a-zA-Z\s]+$/, 'Name can only contain letters and spaces'],
        set: v => typeof v === 'string' ? v : ''
    },
    email: {
        type: String,
        required: [true, 'Email is required'],
        unique: true,
        lowercase: true,
        trim: true,
        match: [/^\S+@\S+\.\S+$/, 'Please provide a valid email'],
        set: v => typeof v === 'string' ? v.toLowerCase() : ''
    },
    password: {
        type: String,
        required: function() { return !this.googleId; },
        minLength: [8, 'Password must be at least 8 characters'],
        select: false
    },
    googleId: {
        type: String,
        unique: true,
        sparse: true,
        set: v => typeof v === 'string' ? v : undefined
    },
    avatar: {
        type: String,
        default: '',
        set: v => typeof v === 'string' ? v : ''
    },
    provider: {
        type: String,
        enum: ['local', 'google'],
        default: 'local'
    },
    role: {
        type: String,
        enum: ['user', 'moderator', 'admin'],
        default: 'user'
    },
    isActive: { type: Boolean, default: true },
    emailVerified: { type: Boolean, default: false },
    loginAttempts: { type: Number, default: 0 },
    lockUntil: Date,
    lastLogin: Date,
    points: {
        type: Number,
        default: 0,
        min: [0, 'Points cannot be negative'],
        set: v => typeof v === 'number' ? Math.max(0, v) : 0
    }
}, {
    timestamps: true,
    strict: true,
    strictQuery: true
});

// Hash password before save
userSchema.pre('save', async function(next) {
    if (!this.isModified('password')) return next();
    this.password = await bcrypt.hash(this.password, 12);
    next();
});

// Indexes
userSchema.index({ email: 1 }, { unique: true });
userSchema.index({ googleId: 1 }, { unique: true, sparse: true });

export default mongoose.model('User', userSchema);
