import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Star, MessageCircle, TrendingUp, Shield, Clock, BarChart3, CheckCircle, ChevronRight, Zap, ThumbsUp, Award, Heart } from "lucide-react";

const Index = () => {
  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <header className="border-b bg-white/95 backdrop-blur-sm sticky top-0 z-50 shadow-sm">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <div className="flex items-center space-x-2">
            <div className="bg-gradient-to-br from-blue-600 to-indigo-600 text-white rounded-lg p-2">
              <Star className="w-6 h-6" fill="white" />
            </div>
            <span className="text-xl font-bold text-gray-800">RepuBot</span>
          </div>
          <div className="flex items-center space-x-4">
            <Button variant="ghost" className="text-gray-600 hover:text-blue-600" asChild>
              <a href="/auth">Entrar</a>
            </Button>
            <Button className="bg-gradient-to-br from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 shadow-md" asChild>
              <a href="/auth" className="flex items-center gap-1">
                Teste Grátis <ChevronRight className="w-4 h-4" />
              </a>
            </Button>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="py-20 px-4 text-center bg-gradient-to-br from-blue-50 to-indigo-50 relative overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-20 left-20 w-40 h-40 bg-blue-400 rounded-full filter blur-3xl"></div>
          <div className="absolute bottom-20 right-20 w-60 h-60 bg-indigo-400 rounded-full filter blur-3xl"></div>
        </div>
        <div className="container mx-auto max-w-4xl relative z-10">
          <Badge className="mb-6 bg-green-100 text-green-800 border-green-200 hover:scale-105 transition-transform">
            <ThumbsUp className="w-4 h-4 mr-1" /> Aprovado por +500 empresas
          </Badge>
          <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6 leading-tight">
            Transforme clientes em <span className="bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">promotores da sua marca</span>
          </h1>
          <p className="text-xl md:text-2xl text-gray-600 mb-8 max-w-3xl mx-auto">
            Colete avaliações 5 estrelas no Google automaticamente, proteja sua reputação e aumente suas vendas - tudo pelo WhatsApp.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-8">
            <Button size="lg" className="bg-gradient-to-br from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-lg px-8 py-6 shadow-lg hover:shadow-xl transition-all" asChild>
              <a href="/auth" className="flex items-center gap-2">
                <Zap className="w-5 h-5" /> Teste grátis por 14 dias
              </a>
            </Button>
            <div className="flex items-center gap-2 text-gray-600">
              <div className="flex -space-x-2">
                {[1, 2, 3].map((i) => (
                  <div key={i} className="w-8 h-8 rounded-full bg-blue-100 border-2 border-white"></div>
                ))}
              </div>
              <p>+1,000 negócios já usam</p>
            </div>
          </div>
          <div className="flex flex-wrap justify-center gap-6 text-sm text-gray-600">
            <span className="flex items-center gap-1"><CheckCircle className="w-4 h-4 text-green-500" /> Sem contrato</span>
            <span className="flex items-center gap-1"><CheckCircle className="w-4 h-4 text-green-500" /> Sem mensalidade no primeiro mês</span>
            <span className="flex items-center gap-1"><CheckCircle className="w-4 h-4 text-green-500" /> Suporte brasileiro</span>
          </div>
        </div>
      </section>

      {/* Social Proof */}
      <section className="py-12 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="flex flex-wrap items-center justify-center gap-8 md:gap-16">
            <p className="text-gray-500 font-medium">Confiança de marcas como:</p>
            {[1, 2, 3, 4, 5].map((i) => (
              <div key={i} className="w-24 h-12 bg-gray-200 rounded-md opacity-80 hover:opacity-100 transition-opacity"></div>
            ))}
          </div>
        </div>
      </section>

      {/* Video Demo */}
      <section className="py-16 px-4">
        <div className="container mx-auto max-w-5xl">
          <div className="bg-gray-100 rounded-xl overflow-hidden shadow-xl">
            <div className="aspect-w-16 aspect-h-9 bg-gray-200 flex items-center justify-center">
              <div className="text-center p-8">
                <Button className="bg-blue-600 hover:bg-blue-700 rounded-full w-16 h-16 flex items-center justify-center">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </Button>
                <p className="mt-4 text-lg font-medium text-gray-700">Veja como o RepuBot funciona em 1 minuto</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Como Funciona */}
      <section className="py-16 px-4">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-12">
            <Badge variant="outline" className="mb-4 bg-blue-50 text-blue-600 border-blue-100">
              Simples e eficaz
            </Badge>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Sua reputação em <span className="text-blue-600">5 passos automáticos</span>
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Mesmo quem não entende de tecnologia consegue usar e ver resultados na primeira semana
            </p>
          </div>
          
          <div className="grid md:grid-cols-5 gap-6">
            {[
              { 
                step: "1", 
                title: "Cliente compra", 
                description: "Você pergunta: 'Quer receber seu cupom no WhatsApp?' (Todo mundo diz sim)", 
                color: "blue" 
              },
              { 
                step: "2", 
                title: "Digita o número", 
                description: "Pesquisa é enviada automaticamente via WhatsApp em segundos", 
                color: "blue" 
              },
              { 
                step: "3", 
                title: "Nota boa?", 
                description: "Cliente vai direto pro Google avaliar você com 1 clique", 
                color: "green" 
              },
              { 
                step: "4", 
                title: "Nota ruim?", 
                description: "Vira feedback interno (não vai pro Google) e você é alertado", 
                color: "orange" 
              },
              { 
                step: "5", 
                title: "Painel completo", 
                description: "Acompanhe tudo em tempo real e tome decisões inteligentes", 
                color: "purple" 
              }
            ].map((item, index) => (
              <div key={index} className="group">
                <Card className="text-center border-2 hover:border-blue-200 transition-all h-full flex flex-col">
                  <CardHeader className="flex-1">
                    <div className={`w-12 h-12 ${item.color === 'blue' ? 'bg-blue-100 text-blue-600' : item.color === 'green' ? 'bg-green-100 text-green-600' : item.color === 'orange' ? 'bg-orange-100 text-orange-600' : 'bg-purple-100 text-purple-600'} rounded-full flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform`}>
                      <span className="font-bold text-lg">{item.step}</span>
                    </div>
                    <CardTitle className="text-lg font-semibold">{item.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-slate-600">{item.description}</p>
                  </CardContent>
                </Card>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Benefícios */}
      <section className="py-16 px-4 bg-gradient-to-br from-blue-50 to-indigo-50">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-12">
            <Badge variant="outline" className="mb-4 bg-white text-blue-600 border-blue-100">
              Vantagens competitivas
            </Badge>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Por que sua concorrência <span className="text-blue-600">já está usando</span>?
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Cada dia sem avaliações é um dia perdido para seus concorrentes
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              {
                icon: <TrendingUp className="w-12 h-12 text-green-500 mx-auto mb-4" />,
                title: "Aumenta tráfego no Google",
                description: "Mais avaliações = melhor posição no Google = mais clientes encontrando você"
              },
              {
                icon: <Star className="w-12 h-12 text-yellow-500 mx-auto mb-4" fill="#f59e0b" />,
                title: "Prova social que vende",
                description: "Cliente vê que outros aprovaram e compra com confiança"
              },
              {
                icon: <Shield className="w-12 h-12 text-blue-500 mx-auto mb-4" />,
                title: "Reputação blindada",
                description: "Problemas viram feedback interno, não reviews públicos"
              },
              {
                icon: <BarChart3 className="w-12 h-12 text-purple-500 mx-auto mb-4" />,
                title: "Dados em tempo real",
                description: "Acompanhe métricas e tome decisões baseadas em dados"
              }
            ].map((item, index) => (
              <Card key={index} className="text-center hover:shadow-lg transition-all bg-white border-0 shadow-sm">
                <CardHeader>
                  {item.icon}
                  <CardTitle className="text-lg">{item.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-slate-600">{item.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Dados e Provas */}
      <section className="py-16 px-4 bg-white">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-12">
            <Badge variant="outline" className="mb-4 bg-green-50 text-green-600 border-green-100">
              Comprovação científica
            </Badge>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Os números <span className="text-blue-600">não mentem</span>
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Cada avaliação que você não tem é dinheiro saindo do seu bolso
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
            {[
              { value: "93%", color: "blue", description: "dos consumidores leem reviews antes de comprar" },
              { value: "+15%", color: "green", description: "de aumento no tráfego com 10+ avaliações" },
              { value: "+30%", color: "orange", description: "nas vendas com +0,5 estrela no Google" },
              { value: "-40%", color: "red", description: "nas vendas com 1 review negativo visível" }
            ].map((item, index) => (
              <div key={index} className="text-center p-6 bg-gradient-to-br from-gray-50 to-white rounded-xl shadow-sm hover:shadow-md transition-shadow">
                <div className={`text-5xl font-bold mb-4 ${item.color === 'blue' ? 'text-blue-600' : item.color === 'green' ? 'text-green-600' : item.color === 'orange' ? 'text-orange-600' : 'text-red-600'}`}>
                  {item.value}
                </div>
                <p className="text-gray-600">{item.description}</p>
              </div>
            ))}
          </div>

          <div className="mt-12 text-center space-y-6 max-w-4xl mx-auto">
            <div className="bg-blue-50 p-6 rounded-xl border border-blue-100">
              <p className="text-lg font-semibold text-gray-800">"Com apenas 10 avaliações, você já aparece melhor que 90% dos concorrentes no Google."</p>
            </div>
            <div className="bg-green-50 p-6 rounded-xl border border-green-100">
              <p className="text-lg font-semibold text-gray-800">"Cada clique que seu caixa faz pode valer centenas de reais em vendas futuras."</p>
            </div>
            <div className="bg-purple-50 p-6 rounded-xl border border-purple-100">
              <p className="text-lg font-semibold text-gray-800">"A gente cuida da sua reputação pra você vender mais — automaticamente."</p>
            </div>
          </div>
        </div>
      </section>

      {/* Depoimentos */}
      <section className="py-16 px-4 bg-gray-50">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-12">
            <Badge variant="outline" className="mb-4 bg-white text-purple-600 border-purple-100">
              Quem usa recomenda
            </Badge>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              O que nossos clientes <span className="text-purple-600">estão dizendo</span>
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Histórias reais de negócios que transformaram sua reputação
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {[1, 2, 3].map((i) => (
              <Card key={i} className="hover:shadow-lg transition-shadow border-0 shadow-sm">
                <CardContent className="p-6">
                  <div className="flex items-center mb-4">
                    <div className="w-12 h-12 rounded-full bg-gray-200 mr-4"></div>
                    <div>
                      <p className="font-semibold">João Silva</p>
                      <p className="text-sm text-gray-500">Restaurante Sabor Mineiro</p>
                    </div>
                  </div>
                  <div className="flex mb-3">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <Star key={star} className="w-5 h-5 text-yellow-400 fill-yellow-400" />
                    ))}
                  </div>
                  <p className="text-gray-600 italic">"Em 1 mês já tínhamos 45 avaliações 5 estrelas no Google. As reservas aumentaram 30% e não precisamos mais pedir avaliações manualmente."</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Planos */}
      <section className="py-16 px-4 bg-white">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-12">
            <Badge variant="outline" className="mb-4 bg-blue-50 text-blue-600 border-blue-100">
              Preços simples
            </Badge>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Escolha o plano <span className="text-blue-600">perfeito</span> para você
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Quanto mais você usa, mais você economiza
            </p>
          </div>

          <div className="grid lg:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {[
              {
                name: "Básico",
                price: "R$ 99",
                description: "Para loja pequena",
                features: ["200 disparos/mês", "IA padrão", "Painel básico", "Suporte por email"],
                cta: "Começar agora",
                popular: false
              },
              {
                name: "Profissional",
                price: "R$ 197",
                description: "Para clínica, restaurante",
                features: ["500 disparos/mês", "IA customizada", "DALL-E integrado", "Análise detalhada", "Suporte prioritário"],
                cta: "Plano mais popular",
                popular: true
              },
              {
                name: "Empresarial",
                price: "R$ 397",
                description: "Para franquias, redes",
                features: ["Disparos ilimitados", "API disponível", "IA treinada", "Gerente dedicado", "Relatórios avançados"],
                cta: "Fale conosco",
                popular: false
              }
            ].map((plan, index) => (
              <div key={index} className="group">
                <Card className={`border-2 ${plan.popular ? 'border-blue-500' : 'hover:border-blue-200'} transition-all h-full flex flex-col`}>
                  {plan.popular && (
                    <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                      <Badge className="bg-blue-500 text-white shadow-md">
                        <Award className="w-4 h-4 mr-1" /> Mais Popular
                      </Badge>
                    </div>
                  )}
                  <CardHeader className="text-center pt-8">
                    <CardTitle className="text-2xl">{plan.name}</CardTitle>
                    <div className="text-4xl font-bold text-blue-600">
                      {plan.price}<span className="text-lg text-gray-500">/mês</span>
                    </div>
                    <CardDescription>{plan.description}</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4 flex-1">
                    <div className="space-y-3">
                      {plan.features.map((feature, i) => (
                        <div key={i} className="flex items-start gap-2">
                          <CheckCircle className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" />
                          <span className="text-slate-600">{feature}</span>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                  <div className="p-6 pt-0">
                    <Button 
                      className={`w-full ${plan.popular ? 'bg-gradient-to-br from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700' : ''}`}
                      size="lg"
                      asChild
                    >
                      <a href="/auth" className="flex items-center justify-center gap-2">
                        {plan.cta} {plan.popular && <Heart className="w-5 h-5" />}
                      </a>
                    </Button>
                  </div>
                </Card>
              </div>
            ))}
          </div>

          <div className="mt-8 text-center text-gray-500 text-sm">
            Todos os planos incluem teste grátis de 14 dias. Cancele quando quiser.
          </div>
        </div>
      </section>

      {/* Perguntas Frequentes */}
      <section className="py-16 px-4 bg-gray-50">
        <div className="container mx-auto max-w-4xl">
          <div className="text-center mb-12">
            <Badge variant="outline" className="mb-4 bg-white text-gray-600 border-gray-200">
              Dúvidas comuns
            </Badge>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Perguntas <span className="text-blue-600">frequentes</span>
            </h2>
          </div>

          <div className="space-y-4">
            {[
              {
                question: "Quanto tempo leva para configurar?",
                answer: "Menos de 5 minutos. Você só precisa conectar seu WhatsApp e configurar sua mensagem personalizada."
              },
              {
                question: "Precisa de cartão no trial?",
                answer: "Não, você pode testar gratuitamente por 14 dias sem fornecer nenhum dado de pagamento."
              },
              {
                question: "Funciona com qualquer tipo de negócio?",
                answer: "Sim, desde pequenos comércios até grandes redes. Já atendemos mais de 20 segmentos diferentes."
              },
              {
                question: "E se eu precisar de ajuda?",
                answer: "Nosso suporte brasileiro responde em menos de 1 hora útil por chat, email ou WhatsApp."
              }
            ].map((item, index) => (
              <Card key={index} className="hover:shadow-md transition-shadow">
                <CardContent className="p-6">
                  <details className="group">
                    <summary className="flex justify-between items-center font-medium cursor-pointer list-none">
                      <span className="text-lg text-gray-800 group-hover:text-blue-600">{item.question}</span>
                      <div className="text-blue-600 group-hover:rotate-90 transition-transform">
                        <ChevronRight className="w-5 h-5" />
                      </div>
                    </summary>
                    <p className="mt-4 text-gray-600">{item.answer}</p>
                  </details>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Final */}
      <section className="py-20 px-4 bg-gradient-to-br from-blue-600 to-indigo-700 text-white text-center relative overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-1/4 left-1/4 w-40 h-40 bg-white rounded-full filter blur-3xl"></div>
          <div className="absolute bottom-1/4 right-1/4 w-60 h-60 bg-indigo-400 rounded-full filter blur-3xl"></div>
        </div>
        <div className="container mx-auto max-w-4xl relative z-10">
          <Badge className="mb-6 bg-white/20 text-white border-white/30 backdrop-blur-sm">
            <Zap className="w-4 h-4 mr-1" /> Oferta especial
          </Badge>
          <h2 className="text-3xl md:text-5xl font-bold mb-6 leading-tight">
            Comece hoje e ganhe <span className="text-yellow-300">+15 dias grátis</span>
          </h2>
          <p className="text-xl mb-8 opacity-90 max-w-2xl mx-auto">
            Pare de perder clientes por falta de avaliações. 29 dias para testar sem risco.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Button size="lg" variant="secondary" className="text-lg px-8 py-6 bg-white text-blue-600 hover:bg-gray-100 shadow-lg" asChild>
              <a href="/auth" className="flex items-center gap-2">
                <Star className="w-5 h-5" /> Teste grátis agora
              </a>
            </Button>
            <Button size="lg" variant="outline" className="text-lg px-8 py-6 bg-transparent border-white text-white hover:bg-white hover:text-blue-600" asChild>
              <a href="/auth" className="flex items-center gap-2">
                <MessageCircle className="w-5 h-5" /> Fale com um especialista
              </a>
            </Button>
          </div>
          <div className="mt-8 flex items-center justify-center gap-2 text-sm text-white/80">
            <Shield className="w-4 h-4" /> Pagamento seguro • Cancelamento fácil
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 px-4 bg-gray-900 text-white">
        <div className="container mx-auto">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center space-x-2 mb-4">
                <div className="bg-gradient-to-br from-blue-600 to-indigo-600 text-white rounded-lg p-2">
                  <Star className="w-6 h-6" fill="white" />
                </div>
                <span className="text-xl font-bold">RepuBot</span>
              </div>
              <p className="text-gray-400 mb-4">Sua reputação automática e protegida.</p>
              <div className="flex space-x-4">
                {['Twitter', 'Facebook', 'Instagram', 'LinkedIn'].map((social) => (
                  <a key={social} href="#" className="text-gray-400 hover:text-white transition-colors">
                    <span className="sr-only">{social}</span>
                    <div className="w-6 h-6 bg-gray-700 rounded-full"></div>
                  </a>
                ))}
              </div>
            </div>
            
            <div>
              <h3 className="text-lg font-semibold mb-4">Produto</h3>
              <ul className="space-y-2">
                {['Recursos', 'Preços', 'Casos de sucesso', 'API'].map((item) => (
                  <li key={item}>
                    <a href="#" className="text-gray-400 hover:text-white transition-colors">{item}</a>
                  </li>
                ))}
              </ul>
            </div>
            
            <div>
              <h3 className="text-lg font-semibold mb-4">Empresa</h3>
              <ul className="space-y-2">
                {['Sobre nós', 'Blog', 'Carreiras', 'Contato'].map((item) => (
                  <li key={item}>
                    <a href="#" className="text-gray-400 hover:text-white transition-colors">{item}</a>
                  </li>
                ))}
              </ul>
            </div>
            
            <div>
              <h3 className="text-lg font-semibold mb-4">Legal</h3>
              <ul className="space-y-2">
                {['Termos', 'Privacidade', 'Cookies', 'Segurança'].map((item) => (
                  <li key={item}>
                    <a href="#" className="text-gray-400 hover:text-white transition-colors">{item}</a>
                  </li>
                ))}
              </ul>
            </div>
          </div>
          
          <div className="border-t border-gray-800 mt-12 pt-8 text-center text-gray-400">
            <p>© {new Date().getFullYear()} RepuBot. Todos os direitos reservados.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;