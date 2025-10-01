// middleware/sanitize.middleware.js
import mongoSanitize from 'express-mongo-sanitize';
import { body, validationResult } from 'express-validator';

// Global sanitization middleware
export const sanitizeInput = mongoSanitize({
    replaceWith: '_',  // Replace forbidden characters
    onSanitize: ({ req, key }) => {
        console.warn(`Sanitized field ${key} in request from ${req.ip}`);
    },
});

// Custom validation middleware
export const validateAndSanitize = (validations) => {
    return async (req, res, next) => {
        // Run all validations
        await Promise.all(validations.map(validation => validation.run(req)));

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
};

// Specific field validators
export const authValidators = {
    register: [
        body('name')
            .trim()
            .isLength({ min: 3, max: 50 })
            .matches(/^[a-zA-Z\s]+$/)
            .withMessage('Name must be 3-50 characters, letters only'),
        body('email')
            .isEmail()
            .normalizeEmail()
            .withMessage('Valid email required'),
        body('password')
            .isLength({ min: 8 })
            .matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]/)
            .withMessage('Password must be 8+ chars with uppercase, lowercase, number, special char')
    ],
    login: [
        body('email').isEmail().normalizeEmail(),
        body('password').isLength({ min: 1 })
    ]
};
