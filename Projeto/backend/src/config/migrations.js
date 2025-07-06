const database = require('./db');

const migrations = [
  // Tabela de sessões do WhatsApp
  `
  CREATE TABLE IF NOT EXISTS whatsapp_sessions (
    id SERIAL PRIMARY KEY,
    user_id INTEGER NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    session_id VARCHAR(255) NOT NULL UNIQUE,
    status VARCHAR(20) NOT NULL CHECK (status IN ('connected', 'disconnected', 'qr_required')),
    phone_number VARCHAR(20),
    last_connection TIMESTAMP,
    created_at TIMESTAMP DEFAULT NOW(),
    UNIQUE(user_id)
  );
  `
];

async function runMigrations() {
  try {
    console.log('Executando migrações...');
    for (const migration of migrations) {
      await database.query(migration);
    }
    console.log('Migrações executadas com sucesso');
  } catch (error) {
    console.error('Erro ao executar migrações:', error);
    process.exit(1);
  }
}

module.exports = { runMigrations };