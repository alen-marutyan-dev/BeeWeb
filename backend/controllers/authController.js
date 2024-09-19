const {response, generateUserToken} = require('../utils');
const {userService} = require('../services');
const bcrypt = require('bcrypt');
class AuthController {
    async login(req, res) {
        try {
            const { email, password } = req.body;
            const user = await userService.getUserByEmail(email);

            if (!user) {
                return response({res, status: 401, message: 'Invalid email or password'});
            }

            const confirmPassword = await bcrypt.compare(password, user.password);

            if (!confirmPassword) {
                return response({res, status: 401, message: 'Invalid email or password'});
            }

            const token = generateUserToken(user);
            response({res, status: 200, message: 'User logged in successfully', data: {user, token}});
        } catch (error) {
            response({res, status: 500, message: error.message});
        }
    }

    async signup(req, res) {
        try {
            const { fullName, email, password } = req.body;
            const user = await userService.creatUser({fullName, email, password});

            const token = generateUserToken(user);

            res.cookie('token', token, {
                httpOnly: true,
                secure: process.env.NODE_ENV === 'production',
                sameSite: 'Strict',
            });
            response({res, status: 201, message: 'User created successfully', data: {user, token}});
        } catch (error) {
            response({res, status: 500, message: error.message});
        }
    }
}

module.exports = new AuthController();