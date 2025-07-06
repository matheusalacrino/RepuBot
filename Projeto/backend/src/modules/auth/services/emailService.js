// backend/src/services/emailService.js
const nodemailer = require('nodemailer');
const emailConfig = require('../../../config/email');

const transporter = nodemailer.createTransport({
  host: emailConfig.host,
  port: emailConfig.port,
  secure: false, // true for 465, false for other ports
  auth: {
    user: emailConfig.user,
    pass: emailConfig.pass,
  },
});

class EmailService {
  static async sendVerificationEmail(email, token) {
    const verificationUrl = `${process.env.CLIENT_URL}/verify-email?token=${token}`;

    //await transporter.sendMail({
      //from: `"RepuBot" <${emailConfig.user}>`,
      //to: email,
      //subject: 'Verifique seu email',
      //html: `
      //  <h2>Por favor, verifique seu email</h2>
       // <p>Clique no link abaixo para verificar seu endereço de email:</p>
        //<a href="${verificationUrl}">${verificationUrl}</a>
        //<p>Se você não criou uma conta, por favor ignore este email.</p>
      //`,
    //});
  }
}

module.exports = EmailService;