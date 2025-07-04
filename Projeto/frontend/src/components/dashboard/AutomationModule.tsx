
import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { 
  Send, 
  Star, 
  MessageCircle, 
  Plus, 
  Zap, 
  Clock, 
  CheckCircle2,
  AlertCircle,
  Settings,
  Play,
  Pause
} from "lucide-react";

const AutomationModule = () => {
  const [activeAutomations, setActiveAutomations] = useState({
    afterPurchase: true,
    positiveReview: true,
    negativeReview: true,
    followUp: false
  });

  const automationRules = [
    {
      id: 1,
      name: "Pesquisa pós-compra",
      description: "Dispara mensagem no WhatsApp 24h após a compra",
      trigger: "Após compra confirmada",
      action: "Enviar pesquisa de satisfação",
      status: activeAutomations.afterPurchase,
      icon: MessageCircle,
      color: "text-blue-600",
      bgColor: "bg-blue-100",
      stats: { triggered: 47, responses: 32, conversion: "68%" }
    },
    {
      id: 2,
      name: "Avaliação positiva",
      description: "Se nota ≥ 4, direciona para Google/redes sociais",
      trigger: "Nota alta recebida",
      action: "Solicitar avaliação pública",
      status: activeAutomations.positiveReview,
      icon: Star,
      color: "text-yellow-600",
      bgColor: "bg-yellow-100",
      stats: { triggered: 28, responses: 19, conversion: "68%" }
    },
    {
      id: 3,
      name: "Recuperação de insatisfeitos",
      description: "Se nota ≤ 3, notifica gerente e oferece solução",
      trigger: "Nota baixa recebida",
      action: "Alerta + resposta personalizada",
      status: activeAutomations.negativeReview,
      icon: AlertCircle,
      color: "text-red-600",
      bgColor: "bg-red-100",
      stats: { triggered: 8, responses: 6, conversion: "75%" }
    },
    {
      id: 4,
      name: "Follow-up semanal",
      description: "Mensagem de follow-up para clientes que não responderam",
      trigger: "7 dias sem resposta",
      action: "Enviar lembrete amigável",
      status: activeAutomations.followUp,
      icon: Clock,
      color: "text-purple-600",
      bgColor: "bg-purple-100",
      stats: { triggered: 0, responses: 0, conversion: "0%" }
    }
  ];

  const recentActivity = [
    {
      id: 1,
      time: "14:32",
      event: "Pesquisa enviada",
      client: "Maria Silva",
      automation: "Pesquisa pós-compra",
      status: "success"
    },
    {
      id: 2,
      time: "13:45",
      event: "Avaliação 5⭐ recebida",
      client: "João Santos",
      automation: "Avaliação positiva",
      status: "success"
    },
    {
      id: 3,
      time: "12:18",
      event: "Alerta gerente",
      client: "Ana Costa",
      automation: "Recuperação de insatisfeitos",
      status: "alert"
    },
    {
      id: 4,
      time: "11:05",
      event: "Pesquisa enviada",
      client: "Pedro Oliveira",
      automation: "Pesquisa pós-compra",
      status: "success"
    }
  ];

  const toggleAutomation = (automationKey: string) => {
    setActiveAutomations(prev => ({
      ...prev,
      [automationKey]: !prev[automationKey as keyof typeof prev]
    }));
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "success":
        return <CheckCircle2 className="w-4 h-4 text-green-500" />;
      case "alert":
        return <AlertCircle className="w-4 h-4 text-orange-500" />;
      default:
        return <Clock className="w-4 h-4 text-gray-500" />;
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Automações</h2>
          <p className="text-gray-600">Configure e monitore as automações da sua reputação</p>
        </div>
        <Button>
          <Plus className="w-4 h-4 mr-2" />
          Nova Automação
        </Button>
      </div>

      {/* Cards de estatísticas */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Automações Ativas</CardTitle>
            <Zap className="h-4 w-4 text-blue-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">3</div>
            <p className="text-xs text-green-600">de 4 configuradas</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Disparos hoje</CardTitle>
            <Send className="h-4 w-4 text-green-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">12</div>
            <p className="text-xs text-gray-600">83 este mês</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Taxa de resposta</CardTitle>
            <MessageCircle className="h-4 w-4 text-purple-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">69%</div>
            <p className="text-xs text-green-600">+5% vs mês passado</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Alertas hoje</CardTitle>
            <AlertCircle className="h-4 w-4 text-red-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">2</div>
            <p className="text-xs text-gray-600">Clientes insatisfeitos</p>
          </CardContent>
        </Card>
      </div>

      {/* Regras de automação */}
      <Card>
        <CardHeader>
          <CardTitle>Regras de Automação</CardTitle>
          <CardDescription>Configure quando e como suas automações devem ser executadas</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          {automationRules.map((rule) => {
            const Icon = rule.icon;
            return (
              <div key={rule.id} className="flex items-center justify-between p-4 border rounded-lg">
                <div className="flex items-center space-x-4">
                  <div className={`w-12 h-12 ${rule.bgColor} rounded-lg flex items-center justify-center`}>
                    <Icon className={`w-6 h-6 ${rule.color}`} />
                  </div>
                  <div className="space-y-1">
                    <h3 className="font-semibold">{rule.name}</h3>
                    <p className="text-sm text-gray-600">{rule.description}</p>
                    <div className="flex items-center space-x-4 text-xs text-gray-500">
                      <span>Disparos: {rule.stats.triggered}</span>
                      <span>Respostas: {rule.stats.responses}</span>
                      <span>Taxa: {rule.stats.conversion}</span>
                    </div>
                  </div>
                </div>
                
                <div className="flex items-center space-x-2">
                  <Badge variant={rule.status ? "default" : "secondary"}>
                    {rule.status ? "Ativa" : "Inativa"}
                  </Badge>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => {
                      if (rule.id === 1) toggleAutomation("afterPurchase");
                      else if (rule.id === 2) toggleAutomation("positiveReview");
                      else if (rule.id === 3) toggleAutomation("negativeReview");
                      else if (rule.id === 4) toggleAutomation("followUp");
                    }}
                  >
                    {rule.status ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
                  </Button>
                  <Button variant="outline" size="sm">
                    <Settings className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            );
          })}
        </CardContent>
      </Card>

      {/* Timeline de atividades recentes */}
      <Card>
        <CardHeader>
          <CardTitle>Atividade Recente</CardTitle>
          <CardDescription>Acompanhe em tempo real as automações sendo executadas</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {recentActivity.map((activity) => (
              <div key={activity.id} className="flex items-center space-x-4 p-3 bg-gray-50 rounded-lg">
                {getStatusIcon(activity.status)}
                <div className="flex-1">
                  <div className="flex items-center justify-between">
                    <span className="font-medium">{activity.event}</span>
                    <span className="text-sm text-gray-500">{activity.time}</span>
                  </div>
                  <div className="text-sm text-gray-600">
                    Cliente: {activity.client} • {activity.automation}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Sugestões de IA */}
      <Card className="bg-gradient-to-r from-purple-50 to-blue-50 border-purple-200">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Zap className="w-5 h-5 text-purple-600" />
            Sugestões Inteligentes
          </CardTitle>
          <CardDescription>A IA analisou seus dados e tem algumas recomendações</CardDescription>
        </CardHeader>
        <CardContent className="space-y-3">
          <div className="p-3 bg-white rounded-lg border border-purple-200">
            <h4 className="font-medium text-purple-800">💡 Oportunidade Detectada</h4>
            <p className="text-sm text-gray-700 mt-1">
              Você tem 12 clientes que compraram há mais de 30 dias e nunca receberam uma pesquisa. 
              Que tal criar uma automação de "cliente antigo"?
            </p>
            <Button size="sm" className="mt-2">Criar Automação</Button>
          </div>
          
          <div className="p-3 bg-white rounded-lg border border-blue-200">
            <h4 className="font-medium text-blue-800">📈 Melhoria Sugerida</h4>
            <p className="text-sm text-gray-700 mt-1">
              Seus clientes respondem melhor às pesquisas enviadas às terças e quintas. 
              Ajustar o timing pode aumentar sua taxa de resposta em 15%.
            </p>
            <Button size="sm" variant="outline" className="mt-2">Otimizar Horários</Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default AutomationModule;
