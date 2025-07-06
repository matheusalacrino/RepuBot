// backend/src/modules/whatsapp/repositories/whatsappRepository.js

const WhatsappSession = require('../models/whatsappSession');

class WhatsappRepository {
  async createSession(userId, sessionId) {
    return await WhatsappSession.create(userId, sessionId);
  }

  async updateSession(userId, updateData) {
    return await WhatsappSession.update(userId, updateData);
  }

  async getSessionByUserId(userId) {
    return await WhatsappSession.findByUserId(userId);
  }

  async deleteSession(userId) {
    return await WhatsappSession.delete(userId);
  }
}

module.exports = new WhatsappRepository();
