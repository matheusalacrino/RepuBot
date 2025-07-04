
import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  Star, 
  TrendingUp, 
  TrendingDown, 
  AlertCircle, 
  ExternalLink,
  MessageCircle,
  Globe,
  MapPin,
  Calendar,
  User
} from "lucide-react";
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, ResponsiveContainer, PieChart, Pie, Cell } from "recharts";

const ReputationModule = () => {
  const [selectedPeriod, setSelectedPeriod] = useState("30d");

  const chartData = [
    { date: "01/12", rating: 4.2 },
    { date: "08/12", rating: 4.5 },
    { date: "15/12", rating: 4.8 },
    { date: "22/12", rating: 4.6 },
    { date: "29/12", rating: 4.9 }
  ];

  const pieData = [
    { name: "5 estrelas", value: 45, color: "#10b981" },
    { name: "4 estrelas", value: 32, color: "#84cc16" },
    { name: "3 estrelas", value: 15, color: "#eab308" },
    { name: "2 estrelas", value: 6, color: "#f97316" },
    { name: "1 estrela", value: 2, color: "#ef4444" }
  ];

  const localReviews = [
    {
      id: 1,
      platform: "Google",
      author: "Maria S.",
      rating: 5,
      date: "2024-12-20",
      text: "Atendimento excepcional! Produto de qualidade e entrega rápida. Recomendo!",
      status: "recent"
    },
    {
      id: 2,
      platform: "Facebook",
      author: "João P.",
      rating: 4,
      date: "2024-12-19",
      text: "Boa experiência de compra. Apenas a entrega demorou um pouco mais que o esperado.",
      status: "responded"
    },
    {
      id: 3,
      platform: "Google",
      author: "Ana C.",
      rating: 2,
      date: "2024-12-18",
      text: "Produto chegou com defeito. Estou aguardando a troca há 3 dias.",
      status: "pending"
    }
  ];

  const onlineReviews = [
    {
      id: 1,
      platform: "Reclame Aqui",
      author: "Cliente Premium",
      status: "Respondida",
      date: "2024-12-20",
      text: "Problema com a entrega foi resolvido rapidamente após entrar em contato.",
      sentiment: "positive"
    },
    {
      id: 2,
      platform: "Trustpilot",
      author: "Usuário Verificado",
      status: "Pendente",
      date: "2024-12-19",
      text: "Experiência ruim com o atendimento. Ninguém responde no WhatsApp.",
      sentiment: "negative"
    }
  ];

  const renderStars = (rating: number) => {
    return (
      <div className="flex">
        {[1, 2, 3, 4, 5].map((star) => (
          <Star
            key={star}
            className={`w-4 h-4 ${
              star <= rating
                ? "text-yellow-400 fill-current"
                : "text-gray-300"
            }`}
          />
        ))}
      </div>
    );
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "recent":
        return "bg-green-100 text-green-800";
      case "responded":
        return "bg-blue-100 text-blue-800";
      case "pending":
        return "bg-red-100 text-red-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const getSentimentColor = (sentiment: string) => {
    switch (sentiment) {
      case "positive":
        return "text-green-600";
      case "negative":
        return "text-red-600";
      default:
        return "text-gray-600";
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Reputação</h2>
          <p className="text-gray-600">Monitore e gerencie sua reputação online</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline">
            <ExternalLink className="w-4 h-4 mr-2" />
            Google Meu Negócio
          </Button>
          <Button>
            <AlertCircle className="w-4 h-4 mr-2" />
            Configurar Alertas
          </Button>
        </div>
      </div>

      {/* Resumo geral */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Média Geral</CardTitle>
            <Star className="h-4 w-4 text-yellow-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">4.8</div>
            <div className="flex items-center space-x-1 mt-1">
              {renderStars(5)}
              <span className="text-xs text-green-600 ml-2">+0.3 este mês</span>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Avaliações</CardTitle>
            <MessageCircle className="h-4 w-4 text-blue-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">127</div>
            <p className="text-xs text-green-600">+12 este mês</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Respostas Pendentes</CardTitle>
            <AlertCircle className="h-4 w-4 text-red-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">3</div>
            <p className="text-xs text-red-600">Necessitam atenção</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Status Reputação</CardTitle>
            <TrendingUp className="h-4 w-4 text-green-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600">Excelente</div>
            <p className="text-xs text-gray-600">Acima da média</p>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="local" className="space-y-6">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="local" className="flex items-center gap-2">
            <MapPin className="w-4 h-4" />
            Reputação Local
          </TabsTrigger>
          <TabsTrigger value="online" className="flex items-center gap-2">
            <Globe className="w-4 h-4" />
            Reputação Online
          </TabsTrigger>
        </TabsList>

        <TabsContent value="local" className="space-y-6">
          {/* Gráficos de evolução */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Evolução da Nota Média</CardTitle>
                <CardDescription>Últimos 30 dias</CardDescription>
              </CardHeader>
              <CardContent>
                <ChartContainer config={{ rating: { label: "Nota", color: "#3b82f6" } }} className="h-64">
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={chartData}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="date" />
                      <YAxis domain={[0, 5]} />
                      <ChartTooltip content={<ChartTooltipContent />} />
                      <Line 
                        type="monotone" 
                        dataKey="rating" 
                        stroke="var(--color-rating)" 
                        strokeWidth={2}
                        dot={{ fill: "var(--color-rating)" }}
                      />
                    </LineChart>
                  </ResponsiveContainer>
                </ChartContainer>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Distribuição de Notas</CardTitle>
                <CardDescription>Últimos 30 dias</CardDescription>
              </CardHeader>
              <CardContent>
                <ChartContainer config={{}} className="h-64">
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie
                        data={pieData}
                        cx="50%"
                        cy="50%"
                        innerRadius={60}
                        outerRadius={100}
                        paddingAngle={5}
                        dataKey="value"
                      >
                        {pieData.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={entry.color} />
                        ))}
                      </Pie>
                      <ChartTooltip content={<ChartTooltipContent />} />
                    </PieChart>
                  </ResponsiveContainer>
                </ChartContainer>
              </CardContent>
            </Card>
          </div>

          {/* Avaliações recentes */}
          <Card>
            <CardHeader>
              <CardTitle>Avaliações Recentes</CardTitle>
              <CardDescription>Google Meu Negócio e Facebook</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {localReviews.map((review) => (
                <div key={review.id} className="p-4 border rounded-lg space-y-3">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                        <User className="w-4 h-4 text-blue-600" />
                      </div>
                      <div>
                        <p className="font-medium">{review.author}</p>
                        <div className="flex items-center space-x-2">
                          {renderStars(review.rating)}
                          <span className="text-sm text-gray-500">{review.platform}</span>
                        </div>
                      </div>
                    </div>
                    <div className="text-right">
                      <Badge className={getStatusColor(review.status)}>
                        {review.status === "recent" && "Nova"}
                        {review.status === "responded" && "Respondida"}
                        {review.status === "pending" && "Pendente"}
                      </Badge>
                      <p className="text-sm text-gray-500 mt-1">{review.date}</p>
                    </div>
                  </div>
                  <p className="text-gray-700">{review.text}</p>
                  <div className="flex space-x-2">
                    <Button size="sm" variant="outline">
                      <MessageCircle className="w-4 h-4 mr-1" />
                      Responder
                    </Button>
                    <Button size="sm" variant="outline">
                      <ExternalLink className="w-4 h-4 mr-1" />
                      Ver no {review.platform}
                    </Button>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="online" className="space-y-6">
          {/* Status das plataformas */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Reclame Aqui</CardTitle>
                <div className="w-2 h-2 bg-green-500 rounded-full"></div>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">8.7/10</div>
                <p className="text-xs text-green-600">Ótima reputação</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Trustpilot</CardTitle>
                <div className="w-2 h-2 bg-yellow-500 rounded-full"></div>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">4.2/5</div>
                <p className="text-xs text-yellow-600">Boa reputação</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Mencões Web</CardTitle>
                <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">23</div>
                <p className="text-xs text-blue-600">Esta semana</p>
              </CardContent>
            </Card>
          </div>

          {/* Avaliações e menções online */}
          <Card>
            <CardHeader>
              <CardTitle>Monitoramento Online</CardTitle>
              <CardDescription>Reclame Aqui, Trustpilot e outras plataformas</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {onlineReviews.map((review) => (
                <div key={review.id} className="p-4 border rounded-lg space-y-3">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <div className="w-8 h-8 bg-purple-100 rounded-full flex items-center justify-center">
                        <Globe className="w-4 h-4 text-purple-600" />
                      </div>
                      <div>
                        <p className="font-medium">{review.author}</p>
                        <p className="text-sm text-gray-500">{review.platform}</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <Badge variant={review.status === "Pendente" ? "destructive" : "default"}>
                        {review.status}
                      </Badge>
                      <p className="text-sm text-gray-500 mt-1">{review.date}</p>
                    </div>
                  </div>
                  <p className={`${getSentimentColor(review.sentiment)}`}>{review.text}</p>
                  {review.status === "Pendente" && (
                    <div className="flex space-x-2">
                      <Button size="sm">
                        <MessageCircle className="w-4 h-4 mr-1" />
                        Responder
                      </Button>
                      <Button size="sm" variant="outline">
                        Sugestão IA
                      </Button>
                    </div>
                  )}
                </div>
              ))}
            </CardContent>
          </Card>

          {/* Alertas e sugestões */}
          <Card className="bg-gradient-to-r from-red-50 to-orange-50 border-red-200">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-red-800">
                <AlertCircle className="w-5 h-5" />
                Alertas de Reputação
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="p-3 bg-white rounded-lg border border-red-200">
                <h4 className="font-medium text-red-800">🚨 Atenção Necessária</h4>
                <p className="text-sm text-gray-700 mt-1">
                  Nova reclamação no Reclame Aqui sobre atraso na entrega. 
                  Responda em até 24h para manter sua boa reputação.
                </p>
                <Button size="sm" className="mt-2">Responder Agora</Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default ReputationModule;
