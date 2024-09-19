const { response } = require('../utils');
const jwt = require('jsonwebtoken');

const authMiddleware = (req, res, next) => {
    try {
        if (!req.headers.authorization) {
            return response({ res, status: 401, message: 'Unauthorized' });
        }

        const token = req.headers.authorization.split(' ')[1];
        req.user = jwt.verify(token, 's3cr3t')
        next();
    } catch (error) {
        console.error(error); // Add this line to see the error details
        response({ res, status: 500, message: 'Internal Server Error' });
    }
}

module.exports = authMiddleware;
