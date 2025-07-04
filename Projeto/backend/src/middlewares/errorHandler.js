// backend/src/middlewares/errorHandler.js
function errorHandler(err, req, res, next) {
  console.error(err.stack);

  if (err.name === 'ValidationError') {
    return res.status(400).json({
      success: false,
      message: 'Erro de validação',
      errors: err.errors,
    });
  }

  res.status(500).json({
    success: false,
    message: err.message || 'Algo deu errado',
  });
}

module.exports = errorHandler;