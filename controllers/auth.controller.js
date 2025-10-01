import mongoose from "mongoose";
import User from "../models/user.model.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import {JWT_EXPIRES_IN, JWT_SECRET} from "../config/env.js";

export const signUp = async (req, res, next) => {
    const session = await mongoose.startSession();
    session.startTransaction();

    try {
        const {name, email, password} = req.body;

        // Additional security check
        const existingUser = await User.findOne(
            {email},
            null,
            {session, lean: true}  // Use lean for better performance
        );

        if (existingUser) {
            const error = new Error('User already exists');
            error.statusCode = 409;
            throw error;
        }

        // Enhanced password hashing
        const saltRounds = 12;  // Increased from 10
        const hashedPass = await bcrypt.hash(password, saltRounds);

        const newUser = await User.create([{
            name: name.trim(),
            email: email.toLowerCase().trim(),
            password: hashedPass
        }], {session});

        const token = jwt.sign(
            {userId: newUser[0]._id},
            JWT_SECRET,
            {expiresIn: JWT_EXPIRES_IN}
        );

        await session.commitTransaction();
        session.endSession();

        // Don't send password in response
        const userResponse = newUser[0].toObject();
        delete userResponse.password;

        res.status(201).json({
            success: true,
            message: 'User created successfully!',
            data: {
                token,
                user: userResponse
            }
        });

    } catch(error) {
        await session.abortTransaction();
        session.endSession();
        next(error);
    }
};

export const signIn = async (req, res, next) => {
    try {
        const {email, password} = req.body;
        const user = await User.findOne({email});

        if (!user) {
            const error = new Error('User not found');
            error.statusCode = 404;
            throw error;
        }

        const passwordValid = await bcrypt.compare(password, user.password);
        if (!passwordValid) {
            const error = new Error('Invalid Password');
            error.statusCode = 401;
            throw error;
        }

        const token = jwt.sign({userId: user._id}, JWT_SECRET, {expiresIn: JWT_EXPIRES_IN});
        res.status(200).json({
            success: true,
            message: 'User logged in successfully!',
            data: {
                token,
                user,
            }
        })

    } catch(error) {
        next(error);
    }
}

export const logOut = async (req, res, next) => {}