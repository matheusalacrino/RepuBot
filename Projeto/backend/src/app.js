// backend/src/app.js
const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const authRoutes = require('./modules/auth/routes/authRoutes');
const errorHandler = require('./middlewares/errorHandler');


const app = express();

// Middlewares
app.use(cors());
app.use(morgan('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes
app.use('/api/auth', authRoutes);

// Error handling
app.use(errorHandler);

// Health check
app.get('/health', (req, res) => {
  res.status(200).json({ status: 'OK' });
});

const PORT = process.env.PORT || 3001;

app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});

module.exports = app;