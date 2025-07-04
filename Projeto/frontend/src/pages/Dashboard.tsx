import { useState } from "react";
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardHeader, 
  CardTitle 
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { 
  Star, 
  MessageCircle, 
  Users, 
  BarChart3, 
  Settings, 
  HelpCircle,
  CheckCircle2,
  AlertCircle,
  Send,
  ChevronRight,
  Plus,
  Zap,
  Shield,
  Download,
  TrendingUp,
  Bell,
  Search,
  UserCircle
} from "lucide-react";
import ClientsModule from "@/components/dashboard/ClientsModule";
import AutomationModule from "@/components/dashboard/AutomationModule";
import ReputationModule from "@/components/dashboard/ReputationModule";
import ReportsModule from "@/components/dashboard/ReportsModule";
import SettingsModule from "@/components/dashboard/SettingsModule";

const Dashboard = () => {
  const [activeModule, setActiveModule] = useState("overview");
  const userName = "João";
  const userInitial = userName.charAt(0);

  // Estados simulados
  const [whatsappConnected, setWhatsappConnected] = useState(true);
  const [companySetup, setCompanySetup] = useState(true);
  const [firstSends, setFirstSends] = useState(true);
  const [reviewsReceived, setReviewsReceived] = useState(false);

  const onboardingProgress = [whatsappConnected, companySetup, firstSends, reviewsReceived].filter(Boolean).length * 25;

  const modules = [
    { id: "overview", label: "Visão Geral", icon: BarChart3 },
    { id: "whatsapp", label: "WhatsApp", icon: MessageCircle },
    { id: "clients", label: "Clientes", icon: Users },
    { id: "automation", label: "Automação", icon: Send },
    { id: "reputation", label: "Reputação", icon: Star },
    { id: "insights", label: "Relatórios", icon: TrendingUp },
    { id: "settings", label: "Configurações", icon: Settings },
  ];

  const renderOverview = () => (
    <div className="space-y-6">
      {/* Header e boas-vindas */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-800">Olá, {userName}!</h1>
          <p className="text-gray-600">Aqui está o resumo da sua reputação hoje</p>
        </div>
        <Button className="gap-2">
          <Plus size={16} />
          Nova campanha
        </Button>
      </div>

      {/* Cartão de onboarding */}
      {onboardingProgress < 100 && (
        <Card className="border-blue-100 bg-blue-50">
          <CardHeader className="pb-4">
            <CardTitle className="flex items-center gap-2 text-blue-800">
              <Zap className="w-5 h-5" />
              Complete seu setup inicial
            </CardTitle>
            <CardDescription className="text-blue-700">
              Finalize a configuração para começar a coletar avaliações automaticamente
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <span className="text-sm font-medium">Progresso</span>
                <span className="text-sm font-medium text-blue-700">{onboardingProgress}%</span>
              </div>
              <Progress value={onboardingProgress} className="h-2 bg-blue-200" />
              
              <div className="grid grid-cols-2 gap-4">
                {[
                  { done: whatsappConnected, label: "Conectar WhatsApp" },
                  { done: companySetup, label: "Dados da empresa" },
                  { done: firstSends, label: "Primeiros envios" },
                  { done: reviewsReceived, label: "Avaliações recebidas" }
                ].map((item, index) => (
                  <div key={index} className="flex items-center gap-3">
                    {item.done ? (
                      <CheckCircle2 className="w-5 h-5 text-green-500" />
                    ) : (
                      <div className="w-5 h-5 rounded-full border-2 border-gray-300" />
                    )}
                    <span className="text-sm">{item.label}</span>
                  </div>
                ))}
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Métricas principais */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <MetricCard 
          title="Avaliações este mês" 
          value="12" 
          change="+20%" 
          icon={<Star className="w-5 h-5 text-yellow-500" />} 
          positive 
        />
        <MetricCard 
          title="Média de nota" 
          value="4.8" 
          change="Excelente" 
          icon={<TrendingUp className="w-5 h-5 text-green-500" />} 
          positive 
        />
        <MetricCard 
          title="Mensagens enviadas" 
          value="84/200" 
          change="116 restantes" 
          icon={<MessageCircle className="w-5 h-5 text-blue-500" />} 
        />
        <MetricCard 
          title="Taxa de resposta" 
          value="78%" 
          change="Acima da média" 
          icon={<Shield className="w-5 h-5 text-purple-500" />} 
          positive 
        />
      </div>

      {/* Ações rápidas */}
      <Card>
        <CardHeader>
          <CardTitle>Ações Rápidas</CardTitle>
          <CardDescription>Funcionalidades mais usadas</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            <ActionButton 
              icon={<Send className="w-5 h-5" />}
              label="Enviar pesquisa"
              onClick={() => setActiveModule("automation")}
            />
            <ActionButton 
              icon={<Users className="w-5 h-5" />}
              label="Ver clientes"
              onClick={() => setActiveModule("clients")}
            />
            <ActionButton 
              icon={<Star className="w-5 h-5" />}
              label="Avaliações"
              onClick={() => setActiveModule("reputation")}
            />
            <ActionButton 
              icon={<Download className="w-5 h-5" />}
              label="Relatório"
              onClick={() => setActiveModule("insights")}
            />
          </div>
        </CardContent>
      </Card>

      {/* Seção de avaliações recentes */}
      <Card>
        <CardHeader>
          <CardTitle>Avaliações Recentes</CardTitle>
          <CardDescription>Últimas avaliações recebidas</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {[1, 2, 3].map((item) => (
              <div key={item} className="flex items-start gap-4 p-3 border rounded-lg hover:bg-gray-50 transition-colors">
                <div className="flex-shrink-0 w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center">
                  <UserCircle className="w-5 h-5 text-blue-600" />
                </div>
                <div className="flex-1">
                  <div className="flex items-center justify-between">
                    <h4 className="font-medium">Cliente {item}</h4>
                    <div className="flex items-center gap-1 text-yellow-500">
                      <Star className="w-4 h-4 fill-current" />
                      <span>5.0</span>
                    </div>
                  </div>
                  <p className="text-sm text-gray-600 mt-1">
                    {item === 1 ? "Ótimo atendimento, recomendo!" : 
                     item === 2 ? "Produto excelente e entrega rápida" : 
                     "Profissionais muito atenciosos"}
                  </p>
                  <div className="flex items-center gap-2 mt-2">
                    <span className="text-xs text-gray-500">2 dias atrás</span>
                    <span className="text-xs text-gray-500">•</span>
                    <span className="text-xs text-blue-600 font-medium">Responder</span>
                  </div>
                </div>
              </div>
            ))}
            <Button variant="ghost" className="w-full mt-2" onClick={() => setActiveModule("reputation")}>
              Ver todas as avaliações <ChevronRight className="w-4 h-4 ml-2" />
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );

  const renderWhatsApp = () => (
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
                  {whatsappConnected ? "+55 11 99999-9999" : "Conecte sua conta para começar"}
                </p>
              </div>
            </div>
            <Button 
              onClick={() => setWhatsappConnected(!whatsappConnected)}
              variant={whatsappConnected ? "outline" : "default"}
              className="shrink-0"
            >
              {whatsappConnected ? "Gerenciar" : "Conectar"}
            </Button>
          </div>

          {whatsappConnected && (
            <div className="space-y-6">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Configurações da Empresa</CardTitle>
                    <CardDescription>Personalize como sua empresa aparece</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="space-y-2">
                      <label className="text-sm font-medium">Nome da empresa</label>
                      <input 
                        className="w-full px-3 py-2 border rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition"
                        placeholder="Minha Empresa Ltda"
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-medium">Tom da mensagem</label>
                      <select className="w-full px-3 py-2 border rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition">
                        <option>Formal</option>
                        <option>Informal</option>
                        <option>Amigável</option>
                      </select>
                    </div>
                    <Button className="mt-2">Salvar alterações</Button>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Mensagem Padrão</CardTitle>
                    <CardDescription>Modelo para pesquisas de satisfação</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <textarea 
                      className="w-full h-32 p-3 border rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition resize-none text-sm"
                      placeholder="Olá [Nome]! Como foi sua experiência conosco? Sua opinião é muito importante para melhorarmos nosso atendimento."
                    />
                    <div className="flex justify-end mt-3">
                      <Button size="sm">Salvar modelo</Button>
                    </div>
                  </CardContent>
                </Card>
              </div>

              <div className="flex flex-col sm:flex-row gap-3">
                <Button variant="outline" className="flex-1">
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
    </div>
  );

  const renderContent = () => {
    switch (activeModule) {
      case "whatsapp":
        return renderWhatsApp();
      case "clients":
        return <ClientsModule />;
      case "automation":
        return <AutomationModule />;
      case "reputation":
        return <ReputationModule />;
      case "insights":
        return <ReportsModule />;
      case "settings":
        return <SettingsModule />;
      default:
        return renderOverview();
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b border-gray-200 sticky top-0 z-10">
        <div className="px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center gap-4">
              <div className="bg-blue-600 text-white rounded-lg p-2">
                <Star className="w-5 h-5" />
              </div>
              <h1 className="text-xl font-bold text-gray-900 hidden sm:block">RepuManager</h1>
            </div>
            
            <div className="flex items-center gap-2">
              <Button variant="ghost" size="icon" className="rounded-full">
                <Search className="w-5 h-5" />
              </Button>
              <Button variant="ghost" size="icon" className="rounded-full">
                <Bell className="w-5 h-5" />
              </Button>
              <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center ml-2 border border-blue-200">
                <span className="font-medium text-blue-800">{userInitial}</span>
              </div>
            </div>
          </div>
        </div>
      </header>

      <div className="flex">
        {/* Sidebar */}
        <aside className="w-64 bg-white border-r border-gray-200 hidden lg:block">
          <nav className="p-4 sticky top-16 h-[calc(100vh-4rem)] overflow-y-auto">
            <ul className="space-y-1">
              {modules.map((module) => {
                const Icon = module.icon;
                return (
                  <li key={module.id}>
                    <button
                      onClick={() => setActiveModule(module.id)}
                      className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-left transition-colors ${
                        activeModule === module.id
                          ? "bg-blue-50 text-blue-700 font-medium"
                          : "text-gray-700 hover:bg-gray-50"
                      }`}
                    >
                      <Icon className={`w-5 h-5 ${activeModule === module.id ? "text-blue-600" : "text-gray-500"}`} />
                      <span>{module.label}</span>
                      {activeModule === module.id && (
                        <div className="ml-auto w-1 h-6 bg-blue-600 rounded-full" />
                      )}
                    </button>
                  </li>
                );
              })}
            </ul>
          </nav>
        </aside>

        {/* Main Content */}
        <main className="flex-1 p-4 sm:p-6 lg:p-8">
          {renderContent()}
        </main>
      </div>
    </div>
  );
};

// Componentes auxiliares
const MetricCard = ({ title, value, change, icon, positive = false }) => (
  <Card className="hover:shadow-md transition-shadow">
    <CardHeader className="pb-3">
      <div className="flex justify-between items-center">
        <span className="text-sm font-medium text-gray-600">{title}</span>
        <div className="p-1.5 rounded-lg bg-gray-100">{icon}</div>
      </div>
    </CardHeader>
    <CardContent>
      <div className="text-2xl font-bold">{value}</div>
      <p className={`text-sm mt-1 ${positive ? "text-green-600" : "text-gray-600"}`}>
        {change}
      </p>
    </CardContent>
  </Card>
);

const ActionButton = ({ icon, label, onClick }) => (
  <Button 
    variant="outline" 
    className="h-20 flex flex-col gap-2 hover:bg-gray-50 hover:border-gray-300"
    onClick={onClick}
  >
    {icon}
    <span className="text-sm font-medium">{label}</span>
  </Button>
);

export default Dashboard;