// backend/src/services/authService.js
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/User');
const TokenService = require('../../../shared/services/tokenService');
const EmailService = require('./emailService');

class AuthService {
  static async register({ name, email, phone, password }) {
    // Verificar se o usuário já existe
    const existingUser = await User.findByEmail(email);
    if (existingUser) {
      throw new Error('Email já está em uso');
    }

    // Criptografar a senha
    const hashedPassword = await bcrypt.hash(password, 10);

    // Criar usuário
    const user = await User.create({
      name,
      email,
      phone,
      password: hashedPassword,
    });

    // Gerar token de verificação
    const verificationToken = TokenService.generateVerificationToken(user.id);

    // Enviar email de verificação
    await EmailService.sendVerificationEmail(user.email, verificationToken);

    return user;
  }

  static async login(email, password) {
    // Verificar se o usuário existe
    const user = await User.findByEmail(email);
    if (!user) {
      throw new Error('Credenciais inválidas');
    }

    // Verificar se o email foi confirmado
    if (!user.is_verified) {
      throw new Error('Por favor, verifique seu email antes de fazer login');
    }

    // Verificar a senha
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      throw new Error('Credenciais inválidas');
    }

    // Gerar token JWT
    const token = jwt.sign(
      { id: user.id, email: user.email },
      process.env.JWT_SECRET,
      { expiresIn: process.env.JWT_EXPIRES_IN }
    );

    return {
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        phone: user.phone,
      },
      token,
    };
  }

  static async verifyEmail(token) {
    const { userId } = TokenService.verifyVerificationToken(token);
    const user = await User.verifyEmail(userId);
    return user;
  }
}

module.exports = AuthService;