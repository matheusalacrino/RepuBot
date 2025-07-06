// backend/src/middlewares/authMiddleware.js
const jwt = require('jsonwebtoken');

const authMiddleware = (req, res, next) => {
  try {
    const authHeader = req.headers['authorization'];

    if (!authHeader) {
      return res.status(401).json({ error: 'Token não fornecido' });
    }

    // O header vem no formato "Bearer <token>"
    const token = authHeader.split(' ')[1];
    if (!token) {
      return res.status(401).json({ error: 'Token inválido' });
    }

    const secret = process.env.JWT_SECRET || 'seu_segredo_supersecreto';

    const decoded = jwt.verify(token, secret);

    // Popula req.user com os dados do token decodificado
    req.user = decoded;

    // Continua para o controller
    next();
  } catch (error) {
    return res.status(401).json({ error: 'Token inválido ou expirado' });
  }
};

module.exports = authMiddleware;
