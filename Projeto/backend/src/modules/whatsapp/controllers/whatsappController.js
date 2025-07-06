// backend/src/modules/whatsapp/controllers/whatsappController.js
const WhatsappService = require('../services/whatsappService');
const { validationResult } = require('express-validator');

class WhatsappController {
  async connect(req, res, next) {
    try {
      const { id: userId } = req.user;
      const result = await WhatsappService.connectWhatsapp(userId);
      
      if (result.alreadyConnected) {
        return res.status(200).json({ 
          message: 'WhatsApp já conectado',
          connected: true
        });
      }

      res.status(200).json({
        qrCode: result.qrCode,
        sessionId: result.sessionId
      });
    } catch (error) {
      next(error);
    }
  }

  async disconnect(req, res, next) {
    try {
      const { id: userId } = req.user;
      await WhatsappService.disconnect(userId);
      res.status(200).json({ message: 'WhatsApp desconectado com sucesso' });
    } catch (error) {
      next(error);
    }
  }

  async status(req, res, next) {
    try {
      const { id: userId } = req.user;
      const status = await WhatsappService.getConnectionStatus(userId);
      res.status(200).json(status);
    } catch (error) {
      next(error);
    }
  }

  async testSend(req, res, next) {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }

      const { id: userId } = req.user;
      const { phoneNumber, message } = req.body;
      
      await WhatsappService.sendMessage(userId, phoneNumber, message);
      res.status(200).json({ message: 'Mensagem de teste enviada com sucesso' });
    } catch (error) {
      next(error);
    }
  }
}

module.exports = new WhatsappController();