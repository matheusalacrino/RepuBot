
import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  Settings, 
  Building, 
  Link, 
  Users, 
  CreditCard, 
  Palette,
  Save,
  Upload,
  Trash2,
  Shield,
  Bell,
  Globe,
  MessageCircle,
  Star
} from "lucide-react";

const SettingsModule = () => {
  const [companyData, setCompanyData] = useState({
    name: "Minha Empresa Ltda",
    cnpj: "12.345.678/0001-90",
    address: "Rua das Flores, 123 - São Paulo/SP",
    phone: "(11) 99999-9999",
    email: "contato@minhaempresa.com.br"
  });

  const [integrations, setIntegrations] = useState({
    whatsapp: { connected: true, phone: "+5511999999999" },
    google: { connected: true, businessId: "ABC123456789" },
    facebook: { connected: false, pageId: "" },
    reclameAqui: { connected: true, companyId: "empresa-123" },
    crm: { connected: false, apiKey: "" }
  });

  const [team] = useState([
    { id: 1, name: "João Silva", email: "joao@empresa.com", role: "Administrador", status: "active" },
    { id: 2, name: "Maria Santos", email: "maria@empresa.com", role: "Gerente", status: "active" },
    { id: 3, name: "Pedro Costa", email: "pedro@empresa.com", role: "Vendedor", status: "pending" }
  ]);

  const [aiSettings, setAiSettings] = useState({
    tone: "amigavel",
    greeting: "Olá! Como foi sua experiência conosco? Sua opinião é muito importante!",
    followUp: "Obrigado pelo seu feedback! Estamos sempre buscando melhorar.",
    customImage: false
  });

  const planData = {
    current: "Profissional",
    price: "R$ 97/mês",
    features: ["500 mensagens/mês", "Automações ilimitadas", "Relatórios avançados", "Suporte prioritário"],
    nextBilling: "15/01/2025",
    usage: {
      messages: { used: 234, total: 500 },
      storage: { used: 1.2, total: 10 }
    }
  };

  const getIntegrationStatus = (connected: boolean) => {
    return connected ? (
      <Badge className="bg-green-100 text-green-800">Conectado</Badge>
    ) : (
      <Badge className="bg-red-100 text-red-800">Desconectado</Badge>
    );
  };

  const getRoleColor = (role: string) => {
    switch (role) {
      case "Administrador":
        return "bg-purple-100 text-purple-800";
      case "Gerente":
        return "bg-blue-100 text-blue-800";
      case "Vendedor":
        return "bg-green-100 text-green-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Configurações</h2>
          <p className="text-gray-600">Gerencie sua conta, integrações e preferências</p>
        </div>
        <Button>
          <Save className="w-4 h-4 mr-2" />
          Salvar Alterações
        </Button>
      </div>

      <Tabs defaultValue="company" className="space-y-6">
        <TabsList className="grid w-full grid-cols-5">
          <TabsTrigger value="company" className="flex items-center gap-2">
            <Building className="w-4 h-4" />
            Empresa
          </TabsTrigger>
          <TabsTrigger value="integrations" className="flex items-center gap-2">
            <Link className="w-4 h-4" />
            Integrações
          </TabsTrigger>
          <TabsTrigger value="team" className="flex items-center gap-2">
            <Users className="w-4 h-4" />
            Equipe
          </TabsTrigger>
          <TabsTrigger value="billing" className="flex items-center gap-2">
            <CreditCard className="w-4 h-4" />
            Plano
          </TabsTrigger>
          <TabsTrigger value="customization" className="flex items-center gap-2">
            <Palette className="w-4 h-4" />
            Personalização
          </TabsTrigger>
        </TabsList>

        <TabsContent value="company" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Dados da Empresa</CardTitle>
              <CardDescription>Informações básicas da sua empresa</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="text-sm font-medium">Nome da Empresa</label>
                  <Input
                    value={companyData.name}
                    onChange={(e) => setCompanyData({...companyData, name: e.target.value})}
                    className="mt-1"
                  />
                </div>
                <div>
                  <label className="text-sm font-medium">CNPJ</label>
                  <Input
                    value={companyData.cnpj}
                    onChange={(e) => setCompanyData({...companyData, cnpj: e.target.value})}
                    className="mt-1"
                  />
                </div>
                <div className="md:col-span-2">
                  <label className="text-sm font-medium">Endereço</label>
                  <Input
                    value={companyData.address}
                    onChange={(e) => setCompanyData({...companyData, address: e.target.value})}
                    className="mt-1"
                  />
                </div>
                <div>
                  <label className="text-sm font-medium">Telefone</label>
                  <Input
                    value={companyData.phone}
                    onChange={(e) => setCompanyData({...companyData, phone: e.target.value})}
                    className="mt-1"
                  />
                </div>
                <div>
                  <label className="text-sm font-medium">E-mail</label>
                  <Input
                    value={companyData.email}
                    onChange={(e) => setCompanyData({...companyData, email: e.target.value})}
                    className="mt-1"
                  />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Logo da Empresa</CardTitle>
              <CardDescription>Imagem que aparecerá nas mensagens do WhatsApp</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex items-center space-x-4">
                <div className="w-20 h-20 bg-gray-200 rounded-lg flex items-center justify-center">
                  <Building className="w-8 h-8 text-gray-400" />
                </div>
                <div className="space-y-2">
                  <Button variant="outline">
                    <Upload className="w-4 h-4 mr-2" />
                    Enviar Logo
                  </Button>
                  <p className="text-sm text-gray-500">PNG, JPG até 2MB</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="integrations" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Integrações Disponíveis</CardTitle>
              <CardDescription>Conecte suas ferramentas favoritas</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {/* WhatsApp */}
              <div className="flex items-center justify-between p-4 border rounded-lg">
                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
                    <MessageCircle className="w-6 h-6 text-green-600" />
                  </div>
                  <div>
                    <h3 className="font-semibold">WhatsApp Business</h3>
                    <p className="text-sm text-gray-600">
                      {integrations.whatsapp.connected ? 
                        `Conectado: ${integrations.whatsapp.phone}` : 
                        "Conecte sua conta do WhatsApp"
                      }
                    </p>
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  {getIntegrationStatus(integrations.whatsapp.connected)}
                  <Button variant="outline" size="sm">
                    {integrations.whatsapp.connected ? "Reconectar" : "Conectar"}
                  </Button>
                </div>
              </div>

              {/* Google Meu Negócio */}
              <div className="flex items-center justify-between p-4 border rounded-lg">
                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                    <Globe className="w-6 h-6 text-blue-600" />
                  </div>
                  <div>
                    <h3 className="font-semibold">Google Meu Negócio</h3>
                    <p className="text-sm text-gray-600">
                      {integrations.google.connected ? 
                        `Conectado: ${integrations.google.businessId}` : 
                        "Monitore avaliações do Google"
                      }
                    </p>
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  {getIntegrationStatus(integrations.google.connected)}
                  <Button variant="outline" size="sm">
                    {integrations.google.connected ? "Reconectar" : "Conectar"}
                  </Button>
                </div>
              </div>

              {/* Facebook */}
              <div className="flex items-center justify-between p-4 border rounded-lg">
                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                    <Star className="w-6 h-6 text-blue-600" />
                  </div>
                  <div>
                    <h3 className="font-semibold">Facebook</h3>
                    <p className="text-sm text-gray-600">
                      {integrations.facebook.connected ? 
                        `Conectado: ${integrations.facebook.pageId}` : 
                        "Monitore avaliações da sua página"
                      }
                    </p>
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  {getIntegrationStatus(integrations.facebook.connected)}
                  <Button variant="outline" size="sm">
                    Conectar
                  </Button>
                </div>
              </div>

              {/* Reclame Aqui */}
              <div className="flex items-center justify-between p-4 border rounded-lg">
                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center">
                    <Bell className="w-6 h-6 text-orange-600" />
                  </div>
                  <div>
                    <h3 className="font-semibold">Reclame Aqui</h3>
                    <p className="text-sm text-gray-600">
                      {integrations.reclameAqui.connected ? 
                        `Conectado: ${integrations.reclameAqui.companyId}` : 
                        "Monitore reclamações"
                      }
                    </p>
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  {getIntegrationStatus(integrations.reclameAqui.connected)}
                  <Button variant="outline" size="sm">
                    {integrations.reclameAqui.connected ? "Reconectar" : "Conectar"}
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="team" className="space-y-6">
          <Card>
            <CardHeader>
              <div className="flex justify-between items-center">
                <div>
                  <CardTitle>Membros da Equipe</CardTitle>
                  <CardDescription>Gerencie acessos e permissões</CardDescription>
                </div>
                <Button>
                  <Users className="w-4 h-4 mr-2" />
                  Convidar Membro
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {team.map((member) => (
                  <div key={member.id} className="flex items-center justify-between p-4 border rounded-lg">
                    <div className="flex items-center space-x-4">
                      <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                        <Users className="w-5 h-5 text-blue-600" />
                      </div>
                      <div>
                        <h3 className="font-semibold">{member.name}</h3>
                        <p className="text-sm text-gray-600">{member.email}</p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Badge className={getRoleColor(member.role)}>
                        {member.role}
                      </Badge>
                      <Badge variant={member.status === "active" ? "default" : "secondary"}>
                        {member.status === "active" ? "Ativo" : "Pendente"}
                      </Badge>
                      <Button variant="outline" size="sm">
                        <Settings className="w-4 h-4" />
                      </Button>
                      <Button variant="outline" size="sm">
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Permissões por Função</CardTitle>
              <CardDescription>Configure o que cada função pode fazer</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="p-4 border rounded-lg">
                    <h4 className="font-semibold text-purple-800">Administrador</h4>
                    <ul className="text-sm text-gray-600 mt-2 space-y-1">
                      <li>✅ Todas as permissões</li>
                      <li>✅ Gerenciar equipe</li>
                      <li>✅ Alterar configurações</li>
                      <li>✅ Ver relatórios</li>
                    </ul>
                  </div>
                  <div className="p-4 border rounded-lg">
                    <h4 className="font-semibold text-blue-800">Gerente</h4>
                    <ul className="text-sm text-gray-600 mt-2 space-y-1">
                      <li>✅ Ver clientes</li>
                      <li>✅ Enviar mensagens</li>
                      <li>✅ Ver relatórios</li>
                      <li>❌ Alterar configurações</li>
                    </ul>
                  </div>
                  <div className="p-4 border rounded-lg">
                    <h4 className="font-semibold text-green-800">Vendedor</h4>
                    <ul className="text-sm text-gray-600 mt-2 space-y-1">
                      <li>✅ Ver clientes</li>
                      <li>✅ Enviar mensagens</li>
                      <li>❌ Ver relatórios</li>
                      <li>❌ Alterar configurações</li>
                    </ul>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="billing" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Plano Atual</CardTitle>
              <CardDescription>Gerencie sua assinatura e uso</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div>
                    <h3 className="text-xl font-bold">{planData.current}</h3>
                    <p className="text-2xl font-bold text-blue-600">{planData.price}</p>
                    <p className="text-sm text-gray-600">Próxima cobrança: {planData.nextBilling}</p>
                  </div>
                  <ul className="space-y-2">
                    {planData.features.map((feature, index) => (
                      <li key={index} className="flex items-center space-x-2">
                        <Shield className="w-4 h-4 text-green-500" />
                        <span className="text-sm">{feature}</span>
                      </li>
                    ))}
                  </ul>
                  <Button className="w-full">Fazer Upgrade</Button>
                </div>
                
                <div className="space-y-4">
                  <div>
                    <h4 className="font-semibold">Uso de Mensagens</h4>
                    <div className="flex justify-between text-sm mt-1">
                      <span>{planData.usage.messages.used} de {planData.usage.messages.total}</span>
                      <span>{Math.round((planData.usage.messages.used / planData.usage.messages.total) * 100)}%</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2 mt-2">
                      <div 
                        className="bg-blue-600 h-2 rounded-full" 
                        style={{ width: `${(planData.usage.messages.used / planData.usage.messages.total) * 100}%` }}
                      ></div>
                    </div>
                  </div>
                  
                  <div>
                    <h4 className="font-semibold">Armazenamento</h4>
                    <div className="flex justify-between text-sm mt-1">
                      <span>{planData.usage.storage.used}GB de {planData.usage.storage.total}GB</span>
                      <span>{Math.round((planData.usage.storage.used / planData.usage.storage.total) * 100)}%</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2 mt-2">
                      <div 
                        className="bg-green-600 h-2 rounded-full" 
                        style={{ width: `${(planData.usage.storage.used / planData.usage.storage.total) * 100}%` }}
                      ></div>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Histórico de Pagamentos</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {[
                  { date: "15/12/2024", amount: "R$ 97,00", status: "Pago" },
                  { date: "15/11/2024", amount: "R$ 97,00", status: "Pago" },
                  { date: "15/10/2024", amount: "R$ 97,00", status: "Pago" },
                ].map((payment, index) => (
                  <div key={index} className="flex justify-between items-center p-3 border rounded-lg">
                    <div>
                      <p className="font-medium">{payment.amount}</p>
                      <p className="text-sm text-gray-600">{payment.date}</p>
                    </div>
                    <Badge className="bg-green-100 text-green-800">{payment.status}</Badge>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="customization" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Personalização da IA</CardTitle>
              <CardDescription>Configure como a IA se comunica com seus clientes</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <label className="text-sm font-medium">Tom de voz da IA</label>
                <select 
                  className="w-full mt-1 p-2 border rounded"
                  value={aiSettings.tone}
                  onChange={(e) => setAiSettings({...aiSettings, tone: e.target.value})}
                >
                  <option value="formal">Formal</option>
                  <option value="amigavel">Amigável</option>
                  <option value="descontraido">Descontraído</option>
                  <option value="profissional">Profissional</option>
                </select>
              </div>

              <div>
                <label className="text-sm font-medium">Mensagem de saudação</label>
                <textarea 
                  className="w-full mt-1 p-2 border rounded h-20 resize-none"
                  value={aiSettings.greeting}
                  onChange={(e) => setAiSettings({...aiSettings, greeting: e.target.value})}
                />
              </div>

              <div>
                <label className="text-sm font-medium">Mensagem de follow-up</label>
                <textarea 
                  className="w-full mt-1 p-2 border rounded h-20 resize-none"
                  value={aiSettings.followUp}
                  onChange={(e) => setAiSettings({...aiSettings, followUp: e.target.value})}
                />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Personalização Visual</CardTitle>
              <CardDescription>Customize a aparência das suas mensagens</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <h4 className="font-medium">Usar imagem personalizada</h4>
                  <p className="text-sm text-gray-600">Adicione uma imagem às suas pesquisas</p>
                </div>
                <input 
                  type="checkbox" 
                  checked={aiSettings.customImage}
                  onChange={(e) => setAiSettings({...aiSettings, customImage: e.target.checked})}
                  className="w-4 h-4"
                />
              </div>

              {aiSettings.customImage && (
                <div className="p-4 border rounded-lg">
                  <Button variant="outline">
                    <Upload className="w-4 h-4 mr-2" />
                    Enviar Imagem
                  </Button>
                  <p className="text-sm text-gray-500 mt-2">PNG, JPG até 1MB</p>
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default SettingsModule;
