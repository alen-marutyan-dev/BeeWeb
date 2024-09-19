const express = require('express');
const router = express.Router();

const { authController } = require('../controllers');
const { validate, signupValidator, loginValidator, checkEmailDuplicate} = require('../middleware');

router.post('/signup', signupValidator, validate, checkEmailDuplicate, authController.signup );
router.post('/login', loginValidator, validate, authController.login );

module.exports = router;
