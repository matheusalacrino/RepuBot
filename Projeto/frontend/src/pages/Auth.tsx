import { useState } from "react"; 
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Eye, EyeOff, ChevronRight, Lock, Mail, User, Smartphone, ArrowLeft } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import axios from "axios";

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:3001/api/auth";

const Auth = () => {
  const navigate = useNavigate();
  const [isLogin, setIsLogin] = useState(true);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    password: "",
    confirmPassword: ""
  });
  const { toast } = useToast();

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const validateEmail = (email: string) => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  };

  const validatePhone = (phone: string) => {
    return /^\(\d{2}\)\s\d{4,5}-\d{4}$/.test(phone);
  };

  const formatPhone = (value: string) => {
    const numbers = value.replace(/\D/g, '');
    if (numbers.length <= 11) {
      return numbers.replace(/(\d{2})(\d{4,5})(\d{4})/, '($1) $2-$3');
    }
    return value;
  };

  const handlePhoneChange = (value: string) => {
    const formatted = formatPhone(value);
    handleInputChange('phone', formatted);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    if (!validateEmail(formData.email)) {
      toast({
        title: "E-mail inválido",
        description: "Por favor, insira um endereço de e-mail válido.",
        variant: "destructive"
      });
      setIsLoading(false);
      return;
    }

    if (!isLogin) {
      if (!formData.name.trim()) {
        toast({
          title: "Nome obrigatório",
          description: "Por favor, insira seu nome completo.",
          variant: "destructive"
        });
        setIsLoading(false);
        return;
      }

      if (!validatePhone(formData.phone)) {
        toast({
          title: "Telefone inválido",
          description: "Por favor, insira um número de telefone válido com DDD.",
          variant: "destructive"
        });
        setIsLoading(false);
        return;
      }

      if (formData.password.length < 6) {
        toast({
          title: "Senha muito curta",
          description: "A senha deve ter pelo menos 6 caracteres.",
          variant: "destructive"
        });
        setIsLoading(false);
        return;
      }

      if (formData.password !== formData.confirmPassword) {
        toast({
          title: "Senhas não coincidem",
          description: "As senhas digitadas não são iguais.",
          variant: "destructive"
        });
        setIsLoading(false);
        return;
      }
    }

    try {
      if (isLogin) {
        // Login
        const response = await axios.post(`${API_URL}/login`, {
          email: formData.email,
          password: formData.password
        });

        const { user, token } = response.data;
        
        // Armazenar token e user no localStorage ou contexto de autenticação
        localStorage.setItem('token', token);
        localStorage.setItem('user', JSON.stringify(user));

        toast({
          title: "Login realizado com sucesso",
          description: "Redirecionando para o painel...",
        });

        // Redirecionar após delay
        setTimeout(() => {
          navigate("/dashboard");
        }, 1500);
      } else {
        // Registro
        const response = await axios.post(`${API_URL}/register`, {
          name: formData.name,
          email: formData.email,
          phone: formData.phone,
          password: formData.password
        });

        toast({
          title: "Conta criada com sucesso",
          description: "Enviamos um email de confirmação. Por favor, verifique sua caixa de entrada.",
        });

        // Limpar formulário e mudar para login
        setFormData({
          name: "",
          email: "",
          phone: "",
          password: "",
          confirmPassword: ""
        });
        setIsLogin(true);
      }
    } catch (error) {
  let errorMessage = "Ocorreu um erro. Por favor, tente novamente.";
  
  if (axios.isAxiosError(error)) {  // Removi os parênteses extras aqui
    errorMessage = error.response?.data?.message || error.message;
  }

  toast({
    title: "Erro",
    description: errorMessage,
    variant: "destructive"
  });
} finally {
      setIsLoading(false);
    }
  };

 return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        {/* Logo/Brand */}
        <div className="text-center mb-8">
          <div className="mx-auto mb-4 flex items-center justify-center">
            <div className="bg-blue-600 text-white rounded-lg w-12 h-12 flex items-center justify-center shadow-md">
              <svg 
                xmlns="http://www.w3.org/2000/svg" 
                viewBox="0 0 24 24" 
                fill="none" 
                stroke="currentColor" 
                strokeWidth="2" 
                strokeLinecap="round" 
                strokeLinejoin="round"
                className="w-6 h-6"
              >
                <path d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z" />
              </svg>
            </div>
            <h1 className="text-2xl font-bold text-gray-800 ml-3">RepuBot</h1>
          </div>
          <p className="text-gray-600 text-sm">
            {isLogin 
              ? "Gerencie sua reputação online com eficiência" 
              : "Comece seu teste gratuito de 14 dias"
            }
          </p>
        </div>

        <Card className="shadow-sm border border-gray-200">
          <CardHeader className="pb-4">
            <CardTitle className="text-xl font-semibold text-gray-800">
              {isLogin ? "Acesse sua conta" : "Crie sua conta"}
            </CardTitle>
            <CardDescription className="text-gray-500 text-sm">
              {isLogin 
                ? "Insira suas credenciais para continuar" 
                : "Preencha os campos abaixo para se registrar"
              }
            </CardDescription>
          </CardHeader>

          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              {!isLogin && (
                <div className="space-y-2">
                  <Label htmlFor="name" className="text-gray-700 text-sm font-medium">
                    Nome completo
                  </Label>
                  <div className="relative">
                    <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                    <Input
                      id="name"
                      type="text"
                      placeholder="João Silva"
                      value={formData.name}
                      onChange={(e) => handleInputChange('name', e.target.value)}
                      required={!isLogin}
                      className="pl-10"
                    />
                  </div>
                </div>
              )}

              <div className="space-y-2">
                <Label htmlFor="email" className="text-gray-700 text-sm font-medium">
                  E-mail
                </Label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                  <Input
                    id="email"
                    type="email"
                    placeholder="seu@email.com"
                    value={formData.email}
                    onChange={(e) => handleInputChange('email', e.target.value)}
                    required
                    className="pl-10"
                  />
                </div>
              </div>

              {!isLogin && (
                <div className="space-y-2">
                  <Label htmlFor="phone" className="text-gray-700 text-sm font-medium">
                    Telefone
                  </Label>
                  <div className="relative">
                    <Smartphone className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                    <Input
                      id="phone"
                      type="tel"
                      placeholder="(11) 99999-9999"
                      value={formData.phone}
                      onChange={(e) => handlePhoneChange(e.target.value)}
                      required={!isLogin}
                      className="pl-10"
                    />
                  </div>
                </div>
              )}

              <div className="space-y-2">
                <Label htmlFor="password" className="text-gray-700 text-sm font-medium">
                  {isLogin ? "Senha" : "Crie uma senha"}
                </Label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                  <Input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    placeholder={isLogin ? "Sua senha" : "Mínimo 6 caracteres"}
                    value={formData.password}
                    onChange={(e) => handleInputChange('password', e.target.value)}
                    required
                    className="pl-10"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700"
                  >
                    {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                  </button>
                </div>
              </div>

              {!isLogin && (
                <div className="space-y-2">
                  <Label htmlFor="confirmPassword" className="text-gray-700 text-sm font-medium">
                    Confirme sua senha
                  </Label>
                  <div className="relative">
                    <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                    <Input
                      id="confirmPassword"
                      type={showConfirmPassword ? "text" : "password"}
                      placeholder="Digite novamente"
                      value={formData.confirmPassword}
                      onChange={(e) => handleInputChange('confirmPassword', e.target.value)}
                      required={!isLogin}
                      className="pl-10"
                    />
                    <button
                      type="button"
                      onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                      className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700"
                    >
                      {showConfirmPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                    </button>
                  </div>
                </div>
              )}

              <Button 
                type="submit" 
                className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2.5 transition-colors duration-200"
              >
                {isLogin ? "Entrar" : "Criar conta"} <ChevronRight className="w-4 h-4 ml-2" />
              </Button>

              {isLogin && (
                <div className="text-center">
                  <button
                    type="button"
                    className="text-blue-600 hover:text-blue-700 text-sm font-medium"
                    onClick={() => toast({
                      title: "Link enviado",
                      description: "Verifique seu e-mail para redefinir sua senha.",
                    })}
                  >
                    Esqueceu sua senha?
                  </button>
                </div>
              )}
            </form>

            <div className="mt-6 text-center">
              <button
                type="button"
                onClick={() => setIsLogin(!isLogin)}
                className="text-gray-600 hover:text-blue-600 text-sm font-medium transition-colors"
              >
                {isLogin ? (
                  "Não tem uma conta? Crie uma agora"
                ) : (
                  "Já tem uma conta? Faça login"
                )}
              </button>
            </div>
          </CardContent>
        </Card>

        {!isLogin && (
          <p className="text-xs text-gray-500 text-center mt-4 px-4">
            Ao se registrar, você concorda com nossos <a href="#" className="text-blue-600 hover:underline">Termos de Serviço</a> e <a href="#" className="text-blue-600 hover:underline">Política de Privacidade</a>.
          </p>
        )}
      </div>
    </div>
  );
};

export default Auth;