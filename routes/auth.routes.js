import express from 'express';
import { signUp, signIn, logOut } from '../controllers/auth.controller.js';
import { validateRegistration, validateLogin, sanitizeInput } from '../middlewares/validation.middleware.js';
import aj from '../config/arcjet.js';

const router = express.Router();

// Apply Arcjet protection and sanitization to all routes
router.use(aj.protect);
router.use(sanitizeInput);

router.post('/register', validateRegistration, signUp);
router.post('/login', validateLogin, signIn);
router.post('/logout', logOut);

export default router;
