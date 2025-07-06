const database = require('../../../config/db');

class WhatsappSession {
  constructor() {
    this.tableName = 'whatsapp_sessions';
  }

  async create(userId, sessionId) {
    const query = `
      INSERT INTO ${this.tableName} 
      (user_id, session_id, status) 
      VALUES ($1, $2, 'qr_required')
      RETURNING *;
    `;
    const result = await database.query(query, [userId, sessionId]);
    return result.rows[0];
  }

  async update(userId, updateData) {
    const fields = [];
    const values = [];
    let paramCount = 1;

    for (const [key, value] of Object.entries(updateData)) {
      fields.push(`${key} = $${paramCount}`);
      values.push(value);
      paramCount++;
    }

    values.push(userId);
    const query = `
      UPDATE ${this.tableName} 
      SET ${fields.join(', ')}
      WHERE user_id = $${paramCount}
      RETURNING *;
    `;
    const result = await database.query(query, values);
    return result.rows[0];
  }

  async findByUserId(userId) {
    const query = `SELECT * FROM ${this.tableName} WHERE user_id = $1;`;
    const result = await database.query(query, [userId]);
    return result.rows[0];
  }

  async delete(userId) {
    const query = `
      DELETE FROM ${this.tableName} 
      WHERE user_id = $1
      RETURNING *;
    `;
    const result = await database.query(query, [userId]);
    return result.rows[0];
  }
}

module.exports = new WhatsappSession();