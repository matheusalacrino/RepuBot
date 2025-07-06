// backend/src/middlewares/validation.js
const { body } = require('express-validator');

exports.registerValidation = [
  body('name')
    .trim()
    .notEmpty().withMessage('Nome é obrigatório')
    .isLength({ min: 3 }).withMessage('Nome deve ter pelo menos 3 caracteres'),

  body('email')
    .trim()
    .notEmpty().withMessage('Email é obrigatório')
    .isEmail().withMessage('Email inválido')
    .normalizeEmail(),

  body('phone')
    .trim()
    .notEmpty().withMessage('Telefone é obrigatório')
    .matches(/^\(\d{2}\)\s\d{4,5}-\d{4}$/).withMessage('Telefone inválido'),

  body('password')
    .trim()
    .notEmpty().withMessage('Senha é obrigatória')
    .isLength({ min: 6 }).withMessage('Senha deve ter pelo menos 6 caracteres'),

  body('confirmPassword')
    .trim()
    .notEmpty().withMessage('Confirmação de senha é obrigatória')
    .custom((value, { req }) => value === req.body.password)
    .withMessage('Senhas não coincidem'),
];

exports.loginValidation = [
  body('email')
    .trim()
    .notEmpty().withMessage('Email é obrigatório')
    .isEmail().withMessage('Email inválido')
    .normalizeEmail(),

  body('password')
    .trim()
    .notEmpty().withMessage('Senha é obrigatória'),
];

// Validação para envio de mensagem teste WhatsApp
exports.whatsappTestSendValidation = [
  body('phoneNumber')
    .trim()
    .notEmpty().withMessage('Número de telefone é obrigatório')
    .matches(/^\d{11,15}$/).withMessage('Número de telefone inválido. Use somente dígitos, ex: 5511999999999'),

  body('message')
    .trim()
    .notEmpty().withMessage('Mensagem é obrigatória')
    .isLength({ min: 1 }).withMessage('Mensagem não pode ser vazia'),
];
