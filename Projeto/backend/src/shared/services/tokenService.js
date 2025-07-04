const jwt = require('jsonwebtoken');

class TokenService {
  static generateVerificationToken(userId) {
    return jwt.sign({ userId }, process.env.JWT_SECRET, { expiresIn: '1d' });
  }

  static verifyVerificationToken(token) {
    return jwt.verify(token, process.env.JWT_SECRET);
  }
}

module.exports = TokenService;