const { userService } = require('../services');
const { response } = require("../utils");

const checkEmailDuplicate = async (req, res, next) => {
    try {
        const { email } = req.body;

        const user = await userService.getUserByEmail(email);

        if (user) {
            return response({ res, status: 409, message: 'Email already exists!' });
        }

        next();
    } catch (error) {
        response({ res, status: 500, message: error.message });
    }
};

module.exports = checkEmailDuplicate;