
import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  BarChart3, 
  Download, 
  TrendingUp, 
  Star, 
  MessageCircle, 
  Users, 
  Calendar,
  FileText,
  Target,
  DollarSign
} from "lucide-react";
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, ResponsiveContainer, LineChart, Line, PieChart, Pie, Cell } from "recharts";

const ReportsModule = () => {
  const [selectedPeriod, setSelectedPeriod] = useState("30d");

  const monthlyData = [
    { month: "Ago", reviews: 18, rating: 4.2, responses: 12 },
    { month: "Set", reviews: 25, rating: 4.5, responses: 19 },
    { month: "Out", reviews: 32, rating: 4.7, responses: 24 },
    { month: "Nov", reviews: 28, rating: 4.6, responses: 22 },
    { month: "Dez", reviews: 35, rating: 4.8, responses: 28 }
  ];

  const channelData = [
    { name: "WhatsApp", value: 45, color: "#25d366" },
    { name: "Google", value: 28, color: "#4285f4" },
    { name: "Facebook", value: 15, color: "#1877f2" },
    { name: "Reclame Aqui", value: 8, color: "#ff6b35" },
    { name: "Outros", value: 4, color: "#6b7280" }
  ];

  const satisfactionData = [
    { period: "Sem 1", promoters: 82, detractors: 8, neutral: 10 },
    { period: "Sem 2", promoters: 85, detractors: 6, neutral: 9 },
    { period: "Sem 3", promoters: 78, detractors: 12, neutral: 10 },
    { period: "Sem 4", promoters: 88, detractors: 5, neutral: 7 }
  ];

  const revenueImpact = [
    { month: "Ago", revenue: 15000, reviews: 18 },
    { month: "Set", revenue: 18000, reviews: 25 },
    { month: "Out", revenue: 22000, reviews: 32 },
    { month: "Nov", revenue: 20000, reviews: 28 },
    { month: "Dez", revenue: 28000, reviews: 35 }
  ];

  const performanceMetrics = {
    totalReviews: 138,
    averageRating: 4.8,
    responseRate: 78,
    npsScore: 71,
    conversionRate: 12.5,
    estimatedRevenue: 15600
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Relatórios & Insights</h2>
          <p className="text-gray-600">Análise completa do impacto da sua reputação nos resultados</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline">
            <FileText className="w-4 h-4 mr-2" />
            Relatório Executivo
          </Button>
          <Button>
            <Download className="w-4 h-4 mr-2" />
            Exportar PDF
          </Button>
        </div>
      </div>

      {/* KPIs principais */}
      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-6 gap-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Avaliações</CardTitle>
            <MessageCircle className="h-4 w-4 text-blue-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{performanceMetrics.totalReviews}</div>
            <p className="text-xs text-green-600">+26% vs período anterior</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Nota Média</CardTitle>
            <Star className="h-4 w-4 text-yellow-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{performanceMetrics.averageRating}</div>
            <p className="text-xs text-green-600">+0.4 vs período anterior</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Taxa Resposta</CardTitle>
            <Users className="h-4 w-4 text-purple-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{performanceMetrics.responseRate}%</div>
            <p className="text-xs text-green-600">+12% vs período anterior</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">NPS Score</CardTitle>
            <Target className="h-4 w-4 text-green-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600">{performanceMetrics.npsScore}</div>
            <p className="text-xs text-green-600">Zona de Excelência</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Conversão</CardTitle>
            <TrendingUp className="h-4 w-4 text-indigo-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{performanceMetrics.conversionRate}%</div>
            <p className="text-xs text-green-600">+2.3% vs período anterior</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Impacto Receita</CardTitle>
            <DollarSign className="h-4 w-4 text-emerald-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">R$ {performanceMetrics.estimatedRevenue.toLocaleString()}</div>
            <p className="text-xs text-green-600">Estimado este mês</p>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="evolution" className="space-y-6">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="evolution">Evolução</TabsTrigger>
          <TabsTrigger value="channels">Canais</TabsTrigger>
          <TabsTrigger value="satisfaction">Satisfação</TabsTrigger>
          <TabsTrigger value="revenue">Receita</TabsTrigger>
        </TabsList>

        <TabsContent value="evolution" className="space-y-6">
          {/* Gráfico de evolução mensal */}
          <Card>
            <CardHeader>
              <CardTitle>Evolução Mensal</CardTitle>
              <CardDescription>Avaliações recebidas e nota média por mês</CardDescription>
            </CardHeader>
            <CardContent>
              <ChartContainer 
                config={{ 
                  reviews: { label: "Avaliações", color: "#3b82f6" },
                  rating: { label: "Nota Média", color: "#10b981" }
                }} 
                className="h-80"
              >
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={monthlyData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="month" />
                    <YAxis yAxisId="left" />
                    <YAxis yAxisId="right" orientation="right" domain={[0, 5]} />
                    <ChartTooltip content={<ChartTooltipContent />} />
                    <Bar yAxisId="left" dataKey="reviews" fill="var(--color-reviews)" />
                    <Line yAxisId="right" type="monotone" dataKey="rating" stroke="var(--color-rating)" strokeWidth={3} />
                  </BarChart>
                </ResponsiveContainer>
              </ChartContainer>
            </CardContent>
          </Card>

          {/* Gráfico de taxa de resposta */}
          <Card>
            <CardHeader>
              <CardTitle>Taxa de Resposta</CardTitle>
              <CardDescription>Porcentagem de clientes que responderam às pesquisas</CardDescription>
            </CardHeader>
            <CardContent>
              <ChartContainer 
                config={{ responses: { label: "% Respostas", color: "#8b5cf6" } }}
                className="h-64"
              >
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={monthlyData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="month" />
                    <YAxis domain={[0, 100]} />
                    <ChartTooltip content={<ChartTooltipContent />} />
                    <Line 
                      type="monotone" 
                      dataKey="responses" 
                      stroke="var(--color-responses)" 
                      strokeWidth={3}
                      dot={{ fill: "var(--color-responses)", strokeWidth: 2, r: 4 }}
                    />
                  </LineChart>
                </ResponsiveContainer>
              </ChartContainer>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="channels" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Distribuição por canal */}
            <Card>
              <CardHeader>
                <CardTitle>Avaliações por Canal</CardTitle>
                <CardDescription>Onde seus clientes mais avaliam</CardDescription>
              </CardHeader>
              <CardContent>
                <ChartContainer config={{}} className="h-64">
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie
                        data={channelData}
                        cx="50%"
                        cy="50%"
                        innerRadius={60}
                        outerRadius={100}
                        paddingAngle={5}
                        dataKey="value"
                      >
                        {channelData.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={entry.color} />
                        ))}
                      </Pie>
                      <ChartTooltip content={<ChartTooltipContent />} />
                    </PieChart>
                  </ResponsiveContainer>
                </ChartContainer>
              </CardContent>
            </Card>

            {/* Estatísticas por canal */}
            <Card>
              <CardHeader>
                <CardTitle>Desempenho por Canal</CardTitle>
                <CardDescription>Eficácia de cada plataforma</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {channelData.map((channel) => (
                  <div key={channel.name} className="flex items-center justify-between p-3 border rounded-lg">
                    <div className="flex items-center space-x-3">
                      <div 
                        className="w-4 h-4 rounded-full" 
                        style={{ backgroundColor: channel.color }}
                      ></div>
                      <span className="font-medium">{channel.name}</span>
                    </div>
                    <div className="text-right">
                      <p className="font-bold">{channel.value}%</p>
                      <p className="text-sm text-gray-500">
                        {Math.floor((channel.value / 100) * performanceMetrics.totalReviews)} avaliações
                      </p>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="satisfaction" className="space-y-6">
          {/* NPS e satisfação */}
          <Card>
            <CardHeader>
              <CardTitle>Net Promoter Score (NPS)</CardTitle>
              <CardDescription>Evolução semanal de promotores vs detratores</CardDescription>
            </CardHeader>
            <CardContent>
              <ChartContainer 
                config={{ 
                  promoters: { label: "Promotores", color: "#10b981" },
                  detractors: { label: "Detratores", color: "#ef4444" },
                  neutral: { label: "Neutros", color: "#f59e0b" }
                }} 
                className="h-80"
              >
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={satisfactionData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="period" />
                    <YAxis />
                    <ChartTooltip content={<ChartTooltipContent />} />
                    <Bar dataKey="promoters" stackId="a" fill="var(--color-promoters)" />
                    <Bar dataKey="neutral" stackId="a" fill="var(--color-neutral)" />
                    <Bar dataKey="detractors" stackId="a" fill="var(--color-detractors)" />
                  </BarChart>
                </ResponsiveContainer>
              </ChartContainer>
            </CardContent>
          </Card>

          {/* Insights de satisfação */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Card className="bg-green-50 border-green-200">
              <CardHeader>
                <CardTitle className="text-green-800">Promotores</CardTitle>
                <div className="text-3xl font-bold text-green-600">83%</div>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-green-700">
                  Clientes que recomendam ativamente sua empresa
                </p>
              </CardContent>
            </Card>

            <Card className="bg-yellow-50 border-yellow-200">
              <CardHeader>
                <CardTitle className="text-yellow-800">Neutros</CardTitle>
                <div className="text-3xl font-bold text-yellow-600">9%</div>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-yellow-700">
                  Clientes satisfeitos mas não entusiasmados
                </p>
              </CardContent>
            </Card>

            <Card className="bg-red-50 border-red-200">
              <CardHeader>
                <CardTitle className="text-red-800">Detratores</CardTitle>
                <div className="text-3xl font-bold text-red-600">8%</div>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-red-700">
                  Clientes insatisfeitos que podem prejudicar a reputação
                </p>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="revenue" className="space-y-6">
          {/* Correlação receita x avaliações */}
          <Card>
            <CardHeader>
              <CardTitle>Impacto na Receita</CardTitle>
              <CardDescription>Correlação entre avaliações e faturamento</CardDescription>
            </CardHeader>
            <CardContent>
              <ChartContainer 
                config={{ 
                  revenue: { label: "Receita (R$)", color: "#059669" },
                  reviews: { label: "Avaliações", color: "#3b82f6" }
                }} 
                className="h-80"
              >
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={revenueImpact}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="month" />
                    <YAxis yAxisId="left" />
                    <YAxis yAxisId="right" orientation="right" />
                    <ChartTooltip content={<ChartTooltipContent />} />
                    <Bar yAxisId="right" dataKey="reviews" fill="var(--color-reviews)" opacity={0.3} />
                    <Line 
                      yAxisId="left" 
                      type="monotone" 
                      dataKey="revenue" 
                      stroke="var(--color-revenue)" 
                      strokeWidth={3}
                      dot={{ fill: "var(--color-revenue)", strokeWidth: 2, r: 6 }}
                    />
                  </LineChart>
                </ResponsiveContainer>
              </ChartContainer>
            </CardContent>
          </Card>

          {/* Insights de ROI */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card className="bg-gradient-to-r from-green-50 to-emerald-50 border-green-200">
              <CardHeader>
                <CardTitle className="text-green-800">ROI da Reputação</CardTitle>
                <div className="text-3xl font-bold text-green-600">340%</div>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-green-700">
                  Para cada R$ 1 investido em reputação, você ganha R$ 3,40 em vendas adicionais
                </p>
              </CardContent>
            </Card>

            <Card className="bg-gradient-to-r from-blue-50 to-indigo-50 border-blue-200">
              <CardHeader>
                <CardTitle className="text-blue-800">Vendas Influenciadas</CardTitle>
                <div className="text-3xl font-bold text-blue-600">R$ 47.200</div>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-blue-700">
                  Receita estimada gerada através de avaliações positivas nos últimos 3 meses
                </p>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>

      {/* Insights automatizados */}
      <Card className="bg-gradient-to-r from-purple-50 to-indigo-50 border-purple-200">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-purple-800">
            <BarChart3 className="w-5 h-5" />
            Insights Automatizados
          </CardTitle>
          <CardDescription>A IA analisou seus dados e encontrou oportunidades</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="p-4 bg-white rounded-lg border border-purple-200">
              <h4 className="font-medium text-purple-800 mb-2">📈 Tendência Positiva</h4>
              <p className="text-sm text-gray-700">
                Sua nota média subiu 8% no último mês. Continue focando no atendimento, 
                especialmente às terças e quintas quando a taxa de resposta é 25% maior.
              </p>
            </div>
            
            <div className="p-4 bg-white rounded-lg border border-blue-200">
              <h4 className="font-medium text-blue-800 mb-2">🎯 Oportunidade</h4>
              <p className="text-sm text-gray-700">
                Clientes que recebem follow-up têm 40% mais chance de fazer compras recorrentes. 
                Considere ativar a automação de follow-up.
              </p>
            </div>

            <div className="p-4 bg-white rounded-lg border border-green-200">
              <h4 className="font-medium text-green-800 mb-2">💰 Impacto Financeiro</h4>
              <p className="text-sm text-gray-700">
                Se mantiver o atual ritmo de avaliações, você pode alcançar R$ 65.000 
                em vendas influenciadas até o final do trimestre.
              </p>
            </div>

            <div className="p-4 bg-white rounded-lg border border-orange-200">
              <h4 className="font-medium text-orange-800 mb-2">⚠️ Atenção</h4>
              <p className="text-sm text-gray-700">
                8% dos seus detratores mencionam "tempo de entrega". 
                Revisar a logística pode melhorar sua nota em 0.3 pontos.
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default ReportsModule;
