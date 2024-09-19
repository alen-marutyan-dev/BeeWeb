const jwt = require('jsonwebtoken');
const configEnv = require("../config/env");

const generateUserToken = (user) => {
    return jwt.sign({_id: user._id, fullName: user.fullName, email: user.email},configEnv.jwtSecret, {
        expiresIn: '30d'
    });
}

module.exports = generateUserToken;