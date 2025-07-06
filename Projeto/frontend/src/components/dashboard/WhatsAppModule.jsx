import { useState, useEffect } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  MessageCircle,
  HelpCircle,
  CheckCircle2,
  AlertCircle,
  Send,
  Users
} from "lucide-react";
import { useSession } from "@/contexts/SessionContext";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { useToast } from "@/components/ui/use-toast";

const Loader = () => (
  <div className="flex flex-col items-center justify-center space-y-4 py-8 animate-pulse">
    <svg
      className="animate-spin h-10 w-10 text-green-500"
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
    >
      <circle
        className="opacity-25"
        cx="12"
        cy="12"
        r="10"
        stroke="currentColor"
        strokeWidth="4"
      ></circle>
      <path
        className="opacity-75"
        fill="currentColor"
        d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"
      ></path>
    </svg>
    <p className="text-sm text-gray-600">Aguardando geração do QR Code...</p>
  </div>
);

const WhatsAppModule = () => {
  const { session } = useSession();
  const [whatsappConnected, setWhatsappConnected] = useState(false);
  const [qrCode, setQrCode] = useState(null);
  const [showQrModal, setShowQrModal] = useState(false);
  const [showTestModal, setShowTestModal] = useState(false);
  const [phoneNumber, setPhoneNumber] = useState("");
  const [email, setEmail] = useState("");
  const [testMessage, setTestMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();
  const [statusCheckInterval, setStatusCheckInterval] = useState(null);

  const checkConnection = async () => {
    try {
      const response = await fetch('/api/whatsapp/status', {
        credentials: 'include',
        headers: {
          'Authorization': `Bearer ${session.token}`
        }
      });

      if (!response.ok) {
        console.error('Falha ao verificar conexão:', response.status);
        return;
      }

      const text = await response.text();
      if (!text) {
        console.error('Resposta vazia');
        return;
      }

      const data = JSON.parse(text);
      setWhatsappConnected(data.connected);
      
      // Se estiver conectado e o modal do QR Code estiver aberto, fecha o modal
      if (data.connected && showQrModal) {
        setShowQrModal(false);
        if (statusCheckInterval) {
          clearInterval(statusCheckInterval);
          setStatusCheckInterval(null);
        }
      }
    } catch (error) {
      console.error('Erro ao verificar conexão:', error);
    }
  };

  useEffect(() => {
    if (session?.token) {
      checkConnection();
    }
  }, [session]);

  useEffect(() => {
    // Quando o modal do QR Code abre, inicia a verificação periódica
    if (showQrModal && !whatsappConnected) {
      const interval = setInterval(checkConnection, 10000); // Verifica a cada 3 segundos
      setStatusCheckInterval(interval);
      
      // Limpa o intervalo quando o modal fecha
      return () => {
        clearInterval(interval);
        setStatusCheckInterval(null);
      };
    }
  }, [showQrModal, whatsappConnected]);

  const handleConnect = async () => {
    if (whatsappConnected) {
      try {
        await fetch('/api/whatsapp/disconnect', {
          method: 'POST',
          credentials: 'include',
          headers: {
            'Authorization': `Bearer ${session.token}`
          }
        });
        setWhatsappConnected(false);
        toast({
          title: "Desconectado",
          description: "WhatsApp desconectado com sucesso",
          variant: "default",
        });
      } catch (error) {
        console.error('Erro ao desconectar:', error);
        toast({
          title: "Erro",
          description: "Falha ao desconectar WhatsApp",
          variant: "destructive",
        });
      }
    } else {
      setIsLoading(true);
      setShowQrModal(true);
      try {
        const response = await fetch('/api/whatsapp/connect', {
          method: 'POST',
          credentials: 'include',
          headers: {
            'Authorization': `Bearer ${session.token}`
          }
        });
        const data = await response.json();
        setQrCode(data.qrCode);
      } catch (error) {
        console.error('Erro ao conectar:', error);
        toast({
          title: "Erro",
          description: "Falha ao iniciar conexão com WhatsApp",
          variant: "destructive",
        });
      } finally {
        setIsLoading(false);
      }
    }
  };

  const handleTestSend = async () => {
    if (!phoneNumber || !testMessage) {
      toast({
        title: "Atenção",
        description: "Preencha o número e a mensagem",
        variant: "destructive",
      });
      return;
    }
    setIsLoading(true);
    try {
      const response = await fetch('/api/whatsapp/test', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${session.token}`
        },
        body: JSON.stringify({
          phoneNumber,
          email,
          message: testMessage
        }),
        credentials: 'include'
      });
      if (response.ok) {
        toast({
          title: "Sucesso",
          description: "Mensagem de teste enviada com sucesso",
          variant: "default",
        });
        setShowTestModal(false);
        setPhoneNumber("");
        setEmail("");
        setTestMessage("");
      } else {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Erro ao enviar mensagem');
      }
    } catch (error) {
      console.error('Erro ao enviar teste:', error);
      toast({
        title: "Erro",
        description: error.message || "Falha ao enviar mensagem de teste",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-800 flex items-center gap-2">
            <MessageCircle className="w-6 h-6 text-green-500" />
            WhatsApp Business
          </h1>
          <p className="text-gray-600">Gerencie sua conexão e envios pelo WhatsApp</p>
        </div>
        <Button variant="outline">
          <HelpCircle className="w-4 h-4 mr-2" />
          Ajuda
        </Button>
      </div>

      <Card>
        <CardContent className="p-6 space-y-6">
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 p-4 border rounded-lg bg-gray-50">
            <div className="flex items-center gap-4">
              {whatsappConnected ? (
                <div className="p-2 rounded-full bg-green-100">
                  <CheckCircle2 className="w-6 h-6 text-green-600" />
                </div>
              ) : (
                <div className="p-2 rounded-full bg-orange-100">
                  <AlertCircle className="w-6 h-6 text-orange-600" />
                </div>
              )}
              <div>
                <h3 className="font-medium">
                  {whatsappConnected ? "WhatsApp Conectado" : "WhatsApp Desconectado"}
                </h3>
                <p className="text-sm text-gray-600">
                  {whatsappConnected ? `Conectado como ${session?.user?.name}` : "Conecte sua conta para começar"}
                </p>
              </div>
            </div>
            <Button
              onClick={handleConnect}
              variant={whatsappConnected ? "outline" : "default"}
              className="shrink-0"
              disabled={isLoading}
            >
              {isLoading ? "Processando..." : whatsappConnected ? "Desconectar" : "Conectar"}
            </Button>
          </div>

          {whatsappConnected && (
            <div className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Mensagem Padrão</CardTitle>
                  <CardDescription>Modelo para pesquisas de satisfação</CardDescription>
                </CardHeader>
                <CardContent>
                  <Textarea
                    className="w-full h-32 p-3 border rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition resize-none text-sm"
                    placeholder="Olá [Nome]! Como foi sua experiência conosco? Sua opinião é muito importante para melhorarmos nosso atendimento."
                  />
                  <div className="flex justify-end mt-4">
                    <Button size="sm" className="w-full sm:w-auto">
                      Salvar modelo
                    </Button>
                  </div>
                </CardContent>
              </Card>

              <div className="flex flex-col sm:flex-row gap-3">
                <Button
                  variant="outline"
                  className="flex-1"
                  onClick={() => setShowTestModal(true)}
                >
                  <Send className="w-4 h-4 mr-2" />
                  Testar envio agora
                </Button>
                <Button variant="outline" className="flex-1">
                  <Users className="w-4 h-4 mr-2" />
                  Enviar para lista de clientes
                </Button>
              </div>
            </div>
          )}
        </CardContent>
      </Card>

      <Dialog open={showQrModal} onOpenChange={setShowQrModal}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Conectar WhatsApp</DialogTitle>
            <DialogDescription>
              Escaneie o QR Code com o seu WhatsApp para conectar
            </DialogDescription>
          </DialogHeader>
          {isLoading ? (
            <Loader />
          ) : (
            <div className="flex flex-col items-center py-4">
              {qrCode && (
                <div className="p-4 bg-white rounded-lg border">
                  <img
                    src={qrCode}
                    alt="QR Code do WhatsApp"
                    className="w-64 h-64 object-contain"
                  />
                </div>
              )}
              <p className="mt-4 text-sm text-gray-600 text-center">
                Abra o WhatsApp no seu celular, toque em <strong>Menu</strong> ou <strong>Configurações</strong> e selecione <strong>Dispositivos conectados</strong>
              </p>
            </div>
          )}
          <div className="flex justify-end">
            <Button onClick={() => setShowQrModal(false)}>Fechar</Button>
          </div>
        </DialogContent>
      </Dialog>

      {/* Modal de teste de envio */}
      <Dialog open={showTestModal} onOpenChange={setShowTestModal}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Testar Envio</DialogTitle>
            <DialogDescription>
              Envie uma mensagem de teste para verificar a conexão
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4">
            <div>
              <Label htmlFor="phone">Número de WhatsApp</Label>
              <Input
                id="phone"
                placeholder="5511999999999"
                value={phoneNumber}
                onChange={(e) => setPhoneNumber(e.target.value)}
              />
            </div>
            <div>
              <Label htmlFor="email">E-mail (opcional)</Label>
              <Input
                id="email"
                placeholder="cliente@exemplo.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div>
              <Label htmlFor="message">Mensagem</Label>
              <Textarea
                id="message"
                placeholder="Digite sua mensagem de teste aqui..."
                value={testMessage}
                onChange={(e) => setTestMessage(e.target.value)}
                rows={4}
              />
            </div>
          </div>
          <div className="flex justify-end gap-2 mt-4">
            <Button variant="outline" onClick={() => setShowTestModal(false)}>
              Cancelar
            </Button>
            <Button onClick={handleTestSend} disabled={isLoading}>
              {isLoading ? "Enviando..." : "Enviar Mensagem"}
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default WhatsAppModule;