const { body } = require('express-validator');

// SignupForm Validation Rules
const workspaceValidator = [
    body('name')
        .isString()
        .withMessage('Workspace name must be a string!')
        .notEmpty()
        .withMessage('Workspace name is required!'),
    body('slug')
        .isString()
        .withMessage('Workspace slug must be a string!')
        .notEmpty()
        .withMessage('Workspace slug is required!'),
];



module.exports = {
    workspaceValidator
};
