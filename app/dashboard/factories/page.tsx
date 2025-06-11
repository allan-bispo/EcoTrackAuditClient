"use client"

import { useState } from "react"
import { 
  Building2, 
  Search, 
  Plus, 
  AlertTriangle, 
  CheckCircle2, 
  XCircle,
  MoreVertical,
  Filter
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

// Dados de exemplo
const factories = [
  {
    id: 1,
    name: "Fábrica Norte",
    location: "São Paulo, SP",
    status: "active",
    lastInspection: "2024-03-10",
    alerts: 2,
    compliance: 95,
  },
  {
    id: 2,
    name: "Fábrica Sul",
    location: "Curitiba, PR",
    status: "warning",
    lastInspection: "2024-03-08",
    alerts: 5,
    compliance: 82,
  },
  {
    id: 3,
    name: "Fábrica Leste",
    location: "Rio de Janeiro, RJ",
    status: "inactive",
    lastInspection: "2024-03-05",
    alerts: 0,
    compliance: 100,
  },
  {
    id: 4,
    name: "Fábrica Oeste",
    location: "Belo Horizonte, MG",
    status: "active",
    lastInspection: "2024-03-09",
    alerts: 1,
    compliance: 98,
  },
]

export default function FactoriesPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [statusFilter, setStatusFilter] = useState("all")

  const filteredFactories = factories.filter(factory => {
    const matchesSearch = factory.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         factory.location.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesStatus = statusFilter === "all" || factory.status === statusFilter
    return matchesSearch && matchesStatus
  })

  const getStatusColor = (status: string) => {
    switch (status) {
      case "active":
        return "bg-green-100 text-green-800"
      case "warning":
        return "bg-yellow-100 text-yellow-800"
      case "inactive":
        return "bg-gray-100 text-gray-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  const getStatusText = (status: string) => {
    switch (status) {
      case "active":
        return "Ativo"
      case "warning":
        return "Atenção"
      case "inactive":
        return "Inativo"
      default:
        return "Desconhecido"
    }
  }

  return (
    <div className="p-8 space-y-8">
      {/* Cabeçalho */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Fábricas</h1>
          <p className="text-gray-600">Gerencie suas fábricas e monitore seu status</p>
        </div>
        <Button>
          <Plus className="w-4 h-4 mr-2" />
          Nova Fábrica
        </Button>
      </div>

      {/* Filtros e Busca */}
      <div className="flex gap-4">
        <div className="flex-1">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <Input
              placeholder="Buscar fábricas..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>
        </div>
        <Select value={statusFilter} onValueChange={setStatusFilter}>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Status" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">Todos</SelectItem>
            <SelectItem value="active">Ativos</SelectItem>
            <SelectItem value="warning">Atenção</SelectItem>
            <SelectItem value="inactive">Inativos</SelectItem>
          </SelectContent>
        </Select>
        <Button variant="outline">
          <Filter className="w-4 h-4 mr-2" />
          Mais Filtros
        </Button>
      </div>

      {/* Lista de Fábricas */}
      <div className="grid gap-6">
        {filteredFactories.map((factory) => (
          <Card key={factory.id}>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                    <Building2 className="w-6 h-6 text-blue-600" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-lg">{factory.name}</h3>
                    <p className="text-sm text-gray-500">{factory.location}</p>
                  </div>
                </div>
                <div className="flex items-center space-x-4">
                  <div className="text-right">
                    <p className="text-sm text-gray-500">Última Inspeção</p>
                    <p className="font-medium">{new Date(factory.lastInspection).toLocaleDateString()}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-sm text-gray-500">Conformidade</p>
                    <p className="font-medium">{factory.compliance}%</p>
                  </div>
                  <div className="text-right">
                    <p className="text-sm text-gray-500">Alertas</p>
                    <p className="font-medium flex items-center">
                      {factory.alerts > 0 ? (
                        <AlertTriangle className="w-4 h-4 text-yellow-500 mr-1" />
                      ) : (
                        <CheckCircle2 className="w-4 h-4 text-green-500 mr-1" />
                      )}
                      {factory.alerts}
                    </p>
                  </div>
                  <span className={`px-3 py-1 rounded-full text-sm ${getStatusColor(factory.status)}`}>
                    {getStatusText(factory.status)}
                  </span>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" size="icon">
                        <MoreVertical className="w-4 h-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuItem>Ver Detalhes</DropdownMenuItem>
                      <DropdownMenuItem>Editar</DropdownMenuItem>
                      <DropdownMenuItem>Histórico de Inspeções</DropdownMenuItem>
                      <DropdownMenuItem className="text-red-600">Desativar</DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Paginação */}
      <div className="flex justify-between items-center">
        <p className="text-sm text-gray-500">
          Mostrando {filteredFactories.length} de {factories.length} fábricas
        </p>
        <div className="flex gap-2">
          <Button variant="outline" disabled>
            Anterior
          </Button>
          <Button variant="outline" disabled>
            Próxima
          </Button>
        </div>
      </div>
    </div>
  )
} 