const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const authRoutes = require('./modules/auth/routes/authRoutes');
const whatsappRoutes = require('./modules/whatsapp/routes/whatsappRoutes');
const errorHandler = require('./middlewares/errorHandler');
const { runMigrations } = require('./config/migrations');
require('dotenv').config();

const app = express();

// Middlewares
app.use(cors({
  origin: process.env.FRONTEND_URL,
  credentials: true
}));
app.use(morgan('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Executar migrações
runMigrations();

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/whatsapp', whatsappRoutes);

// Error handling
app.use(errorHandler);

// Health check
app.get('/health', (req, res) => {
  res.status(200).json({ status: 'OK' });
});

module.exports = app;