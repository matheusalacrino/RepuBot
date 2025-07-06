
const express = require('express');
const router = express.Router();
const WhatsappController = require('../controllers/whatsappController');
const { testSendValidation } = require('../validations/whatsappValidations');
const authMiddleware = require('../../../middlewares/authMiddleware');
const { whatsappTestSendValidation } = require('../../../middlewares/validation');

router.post('/connect', authMiddleware, WhatsappController.connect);
router.post('/disconnect', authMiddleware, WhatsappController.disconnect);
router.get('/status', authMiddleware, WhatsappController.status);
router.post('/test', whatsappTestSendValidation, WhatsappController.testSend);


module.exports = router;