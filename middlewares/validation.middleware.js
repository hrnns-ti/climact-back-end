import { body, validationResult } from 'express-validator';
import mongooseSanitizer from 'mongoose-sanitizer';

// General validation error handler
export const handleValidationErrors = (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({
            success: false,
            message: 'Validation failed',
            errors: errors.array()
        });
    }
    next();
};

// Sanitization middleware
export const sanitizeInput = (req, res, next) => {
    mongooseSanitizer.sanitize(req.body, {
        whitelist: false,  // Remove $ and . from input
        replaceWith: '_'   // Replace dangerous chars with _
    });
    next();
};

// Specific validations
export const validateRegistration = [
    body('name')
        .trim()
        .isLength({ min: 3, max: 50 })
        .withMessage('Name must be between 3-50 characters')
        .matches(/^[a-zA-Z0-9\s]+$/)
        .withMessage('Name can only contain letters, numbers, and spaces'),

    body('email')
        .isEmail()
        .normalizeEmail()
        .withMessage('Please provide a valid email'),

    body('password')
        .isLength({ min: 8 })
        .withMessage('Password must be at least 8 characters')
        .matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]/)
        .withMessage('Password must contain uppercase, lowercase, number, and special character'),

    handleValidationErrors
];

export const validateLogin = [
    body('email')
        .isEmail()
        .normalizeEmail()
        .withMessage('Please provide a valid email'),

    body('password')
        .notEmpty()
        .withMessage('Password is required'),

    handleValidationErrors
];