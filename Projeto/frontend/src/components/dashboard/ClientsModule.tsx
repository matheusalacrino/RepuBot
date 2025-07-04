
import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { 
  Users, 
  Search, 
  Filter, 
  Plus, 
  Star, 
  MessageCircle, 
  Upload,
  Eye,
  Edit
} from "lucide-react";

const ClientsModule = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedFilter, setSelectedFilter] = useState("todos");

  const mockClients = [
    {
      id: 1,
      name: "Maria Silva",
      phone: "(11) 99999-1234",
      lastContact: "2024-12-20",
      rating: 5,
      status: "promotor",
      tag: "VIP",
      lastPurchase: "2024-12-15",
      notes: "Cliente muito satisfeita com o atendimento"
    },
    {
      id: 2,
      name: "João Santos",
      phone: "(11) 99999-5678",
      lastContact: "2024-12-19",
      rating: 2,
      status: "detrator",
      tag: "Crítico",
      lastPurchase: "2024-12-10",
      notes: "Reclamou do tempo de entrega"
    },
    {
      id: 3,
      name: "Ana Costa",
      phone: "(11) 99999-9012",
      lastContact: "2024-12-18",
      rating: 4,
      status: "neutro",
      tag: "Frequente",
      lastPurchase: "2024-12-17",
      notes: "Cliente recorrente, sempre elogia o produto"
    },
    {
      id: 4,
      name: "Pedro Oliveira",
      phone: "(11) 99999-3456",
      lastContact: "2024-12-17",
      rating: 5,
      status: "promotor",
      tag: "Novo",
      lastPurchase: "2024-12-16",
      notes: "Primeira compra, muito animado"
    },
    {
      id: 5,
      name: "Carla Ferreira",
      phone: "(11) 99999-7890",
      lastContact: "Nunca respondeu",
      rating: null,
      status: "nunca-respondeu",
      tag: "Nunca respondeu",
      lastPurchase: "2024-12-12",
      notes: "Cliente não responde mensagens"
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case "promotor":
        return "bg-green-100 text-green-800";
      case "detrator":
        return "bg-red-100 text-red-800";
      case "neutro":
        return "bg-yellow-100 text-yellow-800";
      case "nunca-respondeu":
        return "bg-gray-100 text-gray-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const getTagColor = (tag: string) => {
    switch (tag) {
      case "VIP":
        return "bg-purple-100 text-purple-800";
      case "Crítico":
        return "bg-red-100 text-red-800";
      case "Frequente":
        return "bg-blue-100 text-blue-800";
      case "Novo":
        return "bg-green-100 text-green-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const renderStars = (rating: number | null) => {
    if (!rating) return <span className="text-gray-400">Sem avaliação</span>;
    
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

  const filteredClients = mockClients.filter(client => {
    const matchesSearch = client.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         client.phone.includes(searchTerm);
    
    if (selectedFilter === "todos") return matchesSearch;
    if (selectedFilter === "promotores") return matchesSearch && client.status === "promotor";
    if (selectedFilter === "detratores") return matchesSearch && client.status === "detrator";
    if (selectedFilter === "nunca-respondeu") return matchesSearch && client.status === "nunca-respondeu";
    
    return matchesSearch;
  });

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Clientes</h2>
          <p className="text-gray-600">Gerencie sua base de clientes e acompanhe o histórico</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline">
            <Upload className="w-4 h-4 mr-2" />
            Importar CSV
          </Button>
          <Button>
            <Plus className="w-4 h-4 mr-2" />
            Adicionar Cliente
          </Button>
        </div>
      </div>

      {/* Filtros e busca */}
      <Card>
        <CardContent className="p-4">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1 relative">
              <Search className="w-4 h-4 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <Input
                placeholder="Buscar por nome ou telefone..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            <div className="flex gap-2">
              <Button
                variant={selectedFilter === "todos" ? "default" : "outline"}
                size="sm"
                onClick={() => setSelectedFilter("todos")}
              >
                Todos ({mockClients.length})
              </Button>
              <Button
                variant={selectedFilter === "promotores" ? "default" : "outline"}
                size="sm"
                onClick={() => setSelectedFilter("promotores")}
              >
                Promotores ({mockClients.filter(c => c.status === "promotor").length})
              </Button>
              <Button
                variant={selectedFilter === "detratores" ? "default" : "outline"}
                size="sm"
                onClick={() => setSelectedFilter("detratores")}
              >
                Detratores ({mockClients.filter(c => c.status === "detrator").length})
              </Button>
              <Button
                variant={selectedFilter === "nunca-respondeu" ? "default" : "outline"}
                size="sm"
                onClick={() => setSelectedFilter("nunca-respondeu")}
              >
                Nunca Respondeu ({mockClients.filter(c => c.status === "nunca-respondeu").length})
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Lista de clientes */}
      <div className="grid gap-4">
        {filteredClients.map((client) => (
          <Card key={client.id} className="hover:shadow-md transition-shadow">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                    <Users className="w-6 h-6 text-blue-600" />
                  </div>
                  <div className="space-y-1">
                    <h3 className="font-semibold text-lg">{client.name}</h3>
                    <p className="text-gray-600">{client.phone}</p>
                    <div className="flex items-center space-x-2">
                      {renderStars(client.rating)}
                      <Badge className={getTagColor(client.tag)}>{client.tag}</Badge>
                    </div>
                  </div>
                </div>
                
                <div className="text-right space-y-2">
                  <Badge className={getStatusColor(client.status)}>
                    {client.status === "promotor" && "Promotor"}
                    {client.status === "detrator" && "Detrator"}
                    {client.status === "neutro" && "Neutro"}
                    {client.status === "nunca-respondeu" && "Nunca Respondeu"}
                  </Badge>
                  <p className="text-sm text-gray-500">
                    Último contato: {client.lastContact}
                  </p>
                  <p className="text-sm text-gray-500">
                    Última compra: {client.lastPurchase}
                  </p>
                </div>
                
                <div className="flex space-x-2">
                  <Button variant="outline" size="sm">
                    <MessageCircle className="w-4 h-4" />
                  </Button>
                  <Button variant="outline" size="sm">
                    <Eye className="w-4 h-4" />
                  </Button>
                  <Button variant="outline" size="sm">
                    <Edit className="w-4 h-4" />
                  </Button>
                </div>
              </div>
              
              {client.notes && (
                <div className="mt-4 p-3 bg-gray-50 rounded-lg">
                  <p className="text-sm text-gray-700">
                    <strong>Anotações:</strong> {client.notes}
                  </p>
                </div>
              )}
            </CardContent>
          </Card>
        ))}
      </div>

      {filteredClients.length === 0 && (
        <Card>
          <CardContent className="p-12 text-center">
            <Users className="w-12 h-12 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">Nenhum cliente encontrado</h3>
            <p className="text-gray-600">Tente ajustar os filtros ou adicionar novos clientes.</p>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default ClientsModule;
