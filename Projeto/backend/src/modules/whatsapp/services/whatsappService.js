const { Client, LocalAuth } = require('whatsapp-web.js');
const qrcode = require('qrcode');
const path = require('path');
const fs = require('fs');
const WhatsappRepository = require('../repositories/whatsappRepository');

class WhatsappService {
  constructor() {
    this.clients = new Map();
    this.sessionFiles = new Map();
    this.maxRetries = 3;
    this.retryDelay = 10000; // 10 segundos entre tentativas

    // Garante que o diretório de sessões existe
    this.ensureSessionsDir();
  }

  ensureSessionsDir() {
    const sessionsDir = path.join(__dirname, '../../sessions');
    if (!fs.existsSync(sessionsDir)) {
      fs.mkdirSync(sessionsDir, { recursive: true });
    }
  }

  async connectWhatsapp(userId) {
    try {
      // Verifica se já existe uma conexão ativa
      if (this.clients.has(userId)) {
        const client = this.clients.get(userId);
        if (client.pupPage && !client.pupPage.isClosed()) {
          return { status: 'already_connected', userId };
        }
        await this.cleanupClient(userId);
      }

      // Configuração otimizada do cliente
      const client = new Client({
        authStrategy: new LocalAuth({
          clientId: userId.toString(),
          dataPath: path.join(__dirname, `../../sessions/${userId}`)
        }),
        puppeteer: {
          headless: true,
          args: [
            '--no-sandbox',
            '--disable-setuid-sandbox',
            '--disable-dev-shm-usage',
            '--disable-accelerated-2d-canvas',
            '--no-first-run',
            '--no-zygote',
            '--single-process',
            '--disable-gpu',
            '--disable-software-rasterizer',
            '--disable-notifications'
          ],
          executablePath: process.env.CHROME_BIN || undefined,
          timeout: 0
        },
        webVersionCache: {
          type: 'remote',
          remotePath: 'https://raw.githubusercontent.com/wppconnect-team/wa-version/main/html/2.2412.54.html'
        },
        takeoverOnConflict: true,
        restartOnAuthFail: true
      });

      return new Promise((resolve, reject) => {
        let qrGenerated = false;
        let readyFired = false;
        let retryCount = 0;

        const connectionTimeout = setTimeout(() => {
          if (!qrGenerated && !readyFired) {
            this.cleanupClient(userId);
            reject(new Error('Connection timeout after 2 minutes'));
          }
        }, 120000);

        const attemptConnection = async () => {
          try {
            await client.initialize();
          } catch (initError) {
            console.error(`Initialization attempt ${retryCount + 1} failed:`, initError);
            
            if (retryCount < this.maxRetries) {
              retryCount++;
              setTimeout(attemptConnection, this.retryDelay);
            } else {
              clearTimeout(connectionTimeout);
              this.cleanupClient(userId);
              reject(new Error('Max retries reached'));
            }
          }
        };

        client.on('qr', async (qr) => {
          qrGenerated = true;
          console.log(`QR code generated for user ${userId}`);
          
          try {
            const qrCode = await qrcode.toDataURL(qr);
            resolve({ 
              status: 'qr_generated',
              qrCode,
              sessionId: `user_${userId}`
            });
          } catch (qrError) {
            console.error('QR code generation error:', qrError);
            reject(new Error('QR code generation failed'));
          }
        });

        client.on('ready', () => {
          readyFired = true;
          clearTimeout(connectionTimeout);
          console.log(`Client ready for user ${userId}`);
          
          this.clients.set(userId, client);
          WhatsappRepository.createOrUpdateSession(userId, `user_${userId}`)
            .catch(err => console.error('Session save error:', err));
        });

        client.on('authenticated', () => {
          console.log(`User ${userId} authenticated`);
        });

        client.on('auth_failure', (msg) => {
          console.error(`Authentication failed for user ${userId}:`, msg);
          clearTimeout(connectionTimeout);
          this.cleanupClient(userId);
          reject(new Error('Authentication failed'));
        });

        client.on('disconnected', async (reason) => {
          console.log(`Client disconnected for user ${userId}:`, reason);
          await this.handleDisconnection(userId, reason);
        });

        // Inicia a tentativa de conexão
        attemptConnection();
      });
    } catch (error) {
      console.error(`Connect error for user ${userId}:`, error);
      await this.cleanupClient(userId);
      throw error;
    }
  }

  async isClientActive(client) {
    try {
      return client.pupPage && !client.pupPage.isClosed();
    } catch (e) {
      return false;
    }
  }

  async handleDisconnection(userId, reason) {
    await this.cleanupClient(userId);
    
    // Reconecta apenas para erros recuperáveis
    if (!reason.includes('CONFLICT') && !reason.includes('LOGGED_OUT')) {
      console.log(`Attempting to reconnect user ${userId}...`);
      setTimeout(() => {
        this.connectWhatsapp(userId)
          .catch(err => console.error(`Reconnect failed for user ${userId}:`, err));
      }, this.retryDelay);
    }
  }

  async cleanupClient(userId) {
    if (this.clients.has(userId)) {
      try {
        const client = this.clients.get(userId);
        await client.destroy().catch(err => console.error('Client destroy error:', err));
        this.clients.delete(userId);
      } catch (error) {
        console.error(`Cleanup error for user ${userId}:`, error);
      }
    }
  }

  async getConnectionStatus(userId) {
    try {
      if (this.clients.has(userId)) {
        const client = this.clients.get(userId);
        const isActive = await this.isClientActive(client);
        return {
          connected: isActive,
          status: isActive ? 'connected' : 'disconnected'
        };
      }
      return { connected: false, status: 'disconnected' };
    } catch (error) {
      console.error(`Status check error for user ${userId}:`, error);
      return { connected: false, status: 'error' };
    }
  }

  async sendMessage(userId, phoneNumber, message) {
    try {
      if (!this.clients.has(userId)) {
        throw new Error('Client not connected');
      }

      const client = this.clients.get(userId);
      if (!(await this.isClientActive(client))) {
        throw new Error('Client session expired');
      }

      const chatId = `${phoneNumber}@c.us`;
      await client.sendMessage(chatId, message);
      return { success: true, message: 'Message sent' };
    } catch (error) {
      console.error(`Send message error for user ${userId}:`, error);
      
      // Se for erro de contexto, limpa o cliente
      if (error.message.includes('Execution context was destroyed')) {
        await this.cleanupClient(userId);
      }
      
      throw error;
    }
  }

  async disconnect(userId) {
    await this.cleanupClient(userId);
    await WhatsappRepository.deleteSession(userId)
      .catch(err => console.error('Session delete error:', err));
    return { success: true, message: 'Disconnected successfully' };
  }
}

module.exports = new WhatsappService();