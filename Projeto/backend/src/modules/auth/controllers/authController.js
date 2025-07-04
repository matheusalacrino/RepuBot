// backend/src/controllers/authController.js
const AuthService = require('../services/authService');
const { validationResult } = require('express-validator');

class AuthController {
  static async register(req, res, next) {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }

      const { name, email, phone, password } = req.body;
      const user = await AuthService.register({ name, email, phone, password });

      res.status(201).json({
        success: true,
        message: 'Usuário registrado com sucesso. Por favor, verifique seu email.',
        user: {
          id: user.id,
          name: user.name,
          email: user.email,
          phone: user.phone,
        },
      });
    } catch (error) {
      next(error);
    }
  }

  static async login(req, res, next) {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }

      const { email, password } = req.body;
      const { user, token } = await AuthService.login(email, password);

      res.json({
        success: true,
        message: 'Login realizado com sucesso',
        user,
        token,
      });
    } catch (error) {
      next(error);
    }
  }

  static async verifyEmail(req, res, next) {
    try {
      const { token } = req.query;
      const user = await AuthService.verifyEmail(token);

      res.json({
        success: true,
        message: 'Email verificado com sucesso',
        user,
      });
    } catch (error) {
      next(error);
    }
  }
}

module.exports = AuthController;