// backend/src/modules/whatsapp/validations/whatsappValidations.js
const { body } = require('express-validator');

const testSendValidation = [
  body('phoneNumber')
    .notEmpty().withMessage('Número de telefone é obrigatório')
    .matches(/^\d+$/).withMessage('Número deve conter apenas dígitos')
    .isLength({ min: 11, max: 13 }).withMessage('Número deve ter entre 11 e 13 dígitos'),
  body('message')
    .notEmpty().withMessage('Mensagem é obrigatória')
    .isLength({ max: 1000 }).withMessage('Mensagem muito longa')
];

module.exports = {
  testSendValidation
};