const express = require('express');
const router = express.Router();
const AuthController = require('../controllers/authController');
const { registerValidation, loginValidation } = require('../../../middlewares/validation');

router.post('/register', registerValidation, AuthController.register);
router.post('/login', loginValidation, AuthController.login);
router.get('/verify-email', AuthController.verifyEmail);

module.exports = router;