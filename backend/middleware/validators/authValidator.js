const { body } = require('express-validator');

// SignupForm Validation Rules
const signupValidator = [
    body('fullName')
        .isString()
        .withMessage('Full name must be a string!')
        .notEmpty()
        .withMessage('Full name is required!'),

    body('email')
        .isEmail()
        .withMessage('Email must be a valid email address!')
        .notEmpty()
        .withMessage('Email is required!'),

    body('password')
        .isLength({ min: 6 })
        .withMessage('Password must be at least 6 characters long!')
        .notEmpty()
        .withMessage('Password is required!'),
];

// Login Validation Rules
const loginValidator = [
    body('email')
        .isEmail()
        .withMessage('Email must be a valid email address!')
        .notEmpty()
        .withMessage('Email is required!'),

    body('password')
        .isLength({ min: 6 })
        .withMessage('Password must be at least 6 characters long!')
        .notEmpty()
        .withMessage('Password is required!'),
];

module.exports = {
    signupValidator,
    loginValidator,
};
