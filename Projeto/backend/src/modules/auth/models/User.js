const pool = require('../../../config/db');

class User {
  static async create({ name, email, phone, password }) {
    const query = `
      INSERT INTO users (name, email, phone, password, is_verified)
      VALUES ($1, $2, $3, $4, $5)
      RETURNING id, name, email, phone, is_verified, created_at
    `;
    const values = [name, email, phone, password, false];
    const { rows } = await pool.query(query, values);
    return rows[0];
  }

  static async findByEmail(email) {
    const query = 'SELECT * FROM users WHERE email = $1';
    const { rows } = await pool.query(query, [email]);
    return rows[0];
  }

  static async findById(id) {
    const query = 'SELECT * FROM users WHERE id = $1';
    const { rows } = await pool.query(query, [id]);
    return rows[0];
  }

  static async verifyEmail(id) {
    const query = 'UPDATE users SET is_verified = true WHERE id = $1 RETURNING *';
    const { rows } = await pool.query(query, [id]);
    return rows[0];
  }

  static async updatePassword(id, newPassword) {
    const query = 'UPDATE users SET password = $1 WHERE id = $2 RETURNING id, email';
    const { rows } = await pool.query(query, [newPassword, id]);
    return rows[0];
  }
}

module.exports = User;