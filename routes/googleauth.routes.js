import express from 'express';
import passport from '../config/passport.js';
import jwt from 'jsonwebtoken';
import { JWT_SECRET, JWT_EXPIRES_IN } from '../config/env.js';


const router = express.Router();

router.get('/google', passport.authenticate('google', { scope: ['profile', 'email'] }));

router.get('/google/callback',
    passport.authenticate('google', { failureRedirect: '/login?error=auth_failed' }),
    (req, res) => {
        const token = jwt.sign({ userId: req.user._id }, JWT_SECRET, { expiresIn: JWT_EXPIRES_IN });
        res.json({
            success: true,
            message: 'Google authentication successful',
            data: {
                token,
                user: {
                    id: req.user._id,
                    name: req.user.name,
                    email: req.user.email,
                    avatar: req.user.avatar,
                    provider: req.user.provider
                }
            }
        });
    }
);

export default router;
