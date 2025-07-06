const jwt = require('jsonwebtoken');

class TokenService {
  static generateVerificationToken(userId) {
    return jwt.sign({ userId }, process.env.JWT_SECRET||'secretoJwtSuperForte456@$!', { expiresIn: '1d' });
  }

  static verifyVerificationToken(token) {
    return jwt.verify(token, process.env.JWT_SECRET|| 'secretoJwtSuperForte456@$!');
  }
}

module.exports = TokenService;

