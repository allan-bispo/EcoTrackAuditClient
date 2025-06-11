"use client"

import { useState } from "react"
import { 
  AlertTriangle, 
  Search, 
  Filter,
  CheckCircle2,
  XCircle,
  Clock,
  MoreVertical,
  Building2,
  Check,
  X,
  MessageSquare,
  FileText
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import {
  Card,
  CardContent,
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
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"

// Dados de exemplo
const alerts = [
  {
    id: 1,
    title: "Alta temperatura no forno",
    factory: "Fábrica Norte",
    severity: "high",
    status: "pending",
    createdAt: "2024-03-10T10:30:00",
    description: "Temperatura do forno excedeu o limite de segurança",
    details: {
      temperature: "850°C",
      limit: "800°C",
      location: "Setor de Produção - Forno Principal",
      responsible: "João Silva",
      lastMaintenance: "2024-02-15",
      actions: [
        {
          type: "maintenance",
          description: "Verificação do sistema de refrigeração",
          date: "2024-03-10T10:35:00",
          status: "completed"
        },
        {
          type: "inspection",
          description: "Inspeção visual do forno",
          date: "2024-03-10T10:40:00",
          status: "completed"
        }
      ]
    }
  },
  {
    id: 2,
    title: "Vazamento de gás detectado",
    factory: "Fábrica Sul",
    severity: "critical",
    status: "resolved",
    createdAt: "2024-03-10T09:15:00",
    resolvedAt: "2024-03-10T09:45:00",
    description: "Sistema detectou vazamento de gás na área de produção",
    details: {
      gasType: "Gás Natural",
      concentration: "2.5%",
      limit: "1.0%",
      location: "Setor de Produção - Área 3",
      responsible: "Maria Santos",
      lastInspection: "2024-03-01",
      actions: [
        {
          type: "emergency",
          description: "Evacuação da área",
          date: "2024-03-10T09:16:00",
          status: "completed"
        },
        {
          type: "maintenance",
          description: "Reparo na válvula de gás",
          date: "2024-03-10T09:30:00",
          status: "completed"
        }
      ]
    }
  },
  {
    id: 3,
    title: "Falha no sistema de ventilação",
    factory: "Fábrica Leste",
    severity: "medium",
    status: "in_progress",
    createdAt: "2024-03-10T08:00:00",
    description: "Sistema de ventilação apresentando falhas intermitentes",
    details: {
      system: "Ventilação Central",
      status: "Operação Intermitente",
      location: "Setor Administrativo",
      responsible: "Pedro Oliveira",
      lastMaintenance: "2024-02-20",
      actions: [
        {
          type: "inspection",
          description: "Verificação dos motores",
          date: "2024-03-10T08:15:00",
          status: "completed"
        },
        {
          type: "maintenance",
          description: "Substituição dos filtros",
          date: "2024-03-10T08:45:00",
          status: "in_progress"
        }
      ]
    }
  },
  {
    id: 4,
    title: "Nível de ruído acima do permitido",
    factory: "Fábrica Oeste",
    severity: "low",
    status: "pending",
    createdAt: "2024-03-10T07:30:00",
    description: "Medições indicam níveis de ruído acima do permitido",
    details: {
      noiseLevel: "85 dB",
      limit: "80 dB",
      location: "Setor de Montagem",
      responsible: "Ana Costa",
      lastMeasurement: "2024-03-05",
      actions: [
        {
          type: "measurement",
          description: "Nova medição de ruído",
          date: "2024-03-10T07:45:00",
          status: "completed"
        },
        {
          type: "inspection",
          description: "Verificação das máquinas",
          date: "2024-03-10T08:00:00",
          status: "pending"
        }
      ]
    }
  },
]

export default function AlertsPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [statusFilter, setStatusFilter] = useState("all")
  const [severityFilter, setSeverityFilter] = useState("all")
  const [selectedAlert, setSelectedAlert] = useState<typeof alerts[0] | null>(null)
  const [isDetailsOpen, setIsDetailsOpen] = useState(false)

  const filteredAlerts = alerts.filter(alert => {
    const matchesSearch = alert.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         alert.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         alert.factory.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesStatus = statusFilter === "all" || alert.status === statusFilter
    const matchesSeverity = severityFilter === "all" || alert.severity === severityFilter
    return matchesSearch && matchesStatus && matchesSeverity
  })

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case "critical":
        return "bg-red-100 text-red-800"
      case "high":
        return "bg-orange-100 text-orange-800"
      case "medium":
        return "bg-yellow-100 text-yellow-800"
      case "low":
        return "bg-blue-100 text-blue-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  const getSeverityText = (severity: string) => {
    switch (severity) {
      case "critical":
        return "Crítico"
      case "high":
        return "Alto"
      case "medium":
        return "Médio"
      case "low":
        return "Baixo"
      default:
        return "Desconhecido"
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "resolved":
        return "bg-green-100 text-green-800"
      case "in_progress":
        return "bg-blue-100 text-blue-800"
      case "pending":
        return "bg-yellow-100 text-yellow-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  const getStatusText = (status: string) => {
    switch (status) {
      case "resolved":
        return "Resolvido"
      case "in_progress":
        return "Em Andamento"
      case "pending":
        return "Pendente"
      default:
        return "Desconhecido"
    }
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "resolved":
        return <CheckCircle2 className="w-4 h-4" />
      case "in_progress":
        return <Clock className="w-4 h-4" />
      case "pending":
        return <AlertTriangle className="w-4 h-4" />
      default:
        return <XCircle className="w-4 h-4" />
    }
  }

  const handleViewDetails = (alert: typeof alerts[0]) => {
    setSelectedAlert(alert)
    setIsDetailsOpen(true)
  }

  const handleAuditorAction = (action: 'approve' | 'reject' | 'request_info') => {
    if (!selectedAlert) return

    // Aqui você implementaria a lógica para salvar a ação do auditor
    console.log(`Ação do auditor: ${action} para o alerta ${selectedAlert.id}`)
    
    // Exemplo de feedback visual
    switch (action) {
      case 'approve':
        alert('Alerta aprovado com sucesso!')
        break
      case 'reject':
        alert('Alerta rejeitado!')
        break
      case 'request_info':
        alert('Solicitação de mais informações enviada!')
        break
    }

    setIsDetailsOpen(false)
  }

  return (
    <div className="p-8 space-y-8">
      {/* Cabeçalho */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Alertas</h1>
          <p className="text-gray-600">Monitore e gerencie os alertas das fábricas</p>
        </div>
      </div>

      {/* Filtros e Busca */}
      <div className="flex gap-4">
        <div className="flex-1">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <Input
              placeholder="Buscar alertas..."
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
            <SelectItem value="pending">Pendentes</SelectItem>
            <SelectItem value="in_progress">Em Andamento</SelectItem>
            <SelectItem value="resolved">Resolvidos</SelectItem>
          </SelectContent>
        </Select>
        <Select value={severityFilter} onValueChange={setSeverityFilter}>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Severidade" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">Todas</SelectItem>
            <SelectItem value="critical">Crítica</SelectItem>
            <SelectItem value="high">Alta</SelectItem>
            <SelectItem value="medium">Média</SelectItem>
            <SelectItem value="low">Baixa</SelectItem>
          </SelectContent>
        </Select>
        <Button variant="outline">
          <Filter className="w-4 h-4 mr-2" />
          Mais Filtros
        </Button>
      </div>

      {/* Lista de Alertas */}
      <div className="grid gap-6">
        {filteredAlerts.map((alert) => (
          <Card key={alert.id}>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4">
                  <div className={`w-12 h-12 rounded-lg flex items-center justify-center ${getSeverityColor(alert.severity)}`}>
                    <AlertTriangle className="w-6 h-6" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-lg">{alert.title}</h3>
                    <div className="flex items-center space-x-2 text-sm text-gray-500">
                      <Building2 className="w-4 h-4" />
                      <span>{alert.factory}</span>
                    </div>
                    <p className="text-sm text-gray-600 mt-1">{alert.description}</p>
                  </div>
                </div>
                <div className="flex items-center space-x-4">
                  <div className="text-right">
                    <p className="text-sm text-gray-500">Criado em</p>
                    <p className="font-medium">{new Date(alert.createdAt).toLocaleString()}</p>
                  </div>
                  {alert.resolvedAt && (
                    <div className="text-right">
                      <p className="text-sm text-gray-500">Resolvido em</p>
                      <p className="font-medium">{new Date(alert.resolvedAt).toLocaleString()}</p>
                    </div>
                  )}
                  <div className="flex flex-col items-end space-y-2">
                    <span className={`px-3 py-1 rounded-full text-sm ${getSeverityColor(alert.severity)}`}>
                      {getSeverityText(alert.severity)}
                    </span>
                    <span className={`px-3 py-1 rounded-full text-sm ${getStatusColor(alert.status)} flex items-center space-x-1`}>
                      {getStatusIcon(alert.status)}
                      <span>{getStatusText(alert.status)}</span>
                    </span>
                  </div>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" size="icon">
                        <MoreVertical className="w-4 h-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuItem onClick={() => handleViewDetails(alert)}>
                        Ver Detalhes
                      </DropdownMenuItem>
                      <DropdownMenuItem>Marcar como Em Andamento</DropdownMenuItem>
                      <DropdownMenuItem>Marcar como Resolvido</DropdownMenuItem>
                      <DropdownMenuItem className="text-red-600">Arquivar</DropdownMenuItem>
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
          Mostrando {filteredAlerts.length} de {alerts.length} alertas
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

      {/* Diálogo de Detalhes */}
      <Dialog open={isDetailsOpen} onOpenChange={setIsDetailsOpen}>
        <DialogContent className="max-w-3xl">
          {selectedAlert && (
            <>
              <DialogHeader>
                <DialogTitle className="flex items-center gap-2">
                  <AlertTriangle className={`w-5 h-5 ${getSeverityColor(selectedAlert.severity)}`} />
                  {selectedAlert.title}
                </DialogTitle>
                <DialogDescription>
                  {selectedAlert.description}
                </DialogDescription>
              </DialogHeader>

              <div className="grid gap-6 py-4">
                {/* Informações Básicas */}
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <h4 className="font-semibold mb-2">Informações do Alerta</h4>
                    <div className="space-y-2">
                      <p className="text-sm">
                        <span className="font-medium">Fábrica:</span> {selectedAlert.factory}
                      </p>
                      <p className="text-sm">
                        <span className="font-medium">Severidade:</span>{" "}
                        <span className={getSeverityColor(selectedAlert.severity)}>
                          {getSeverityText(selectedAlert.severity)}
                        </span>
                      </p>
                      <p className="text-sm">
                        <span className="font-medium">Status:</span>{" "}
                        <span className={getStatusColor(selectedAlert.status)}>
                          {getStatusText(selectedAlert.status)}
                        </span>
                      </p>
                      <p className="text-sm">
                        <span className="font-medium">Criado em:</span>{" "}
                        {new Date(selectedAlert.createdAt).toLocaleString()}
                      </p>
                    </div>
                  </div>

                  <div>
                    <h4 className="font-semibold mb-2">Detalhes Técnicos</h4>
                    <div className="space-y-2">
                      {Object.entries(selectedAlert.details)
                        .filter(([key]) => !['actions'].includes(key))
                        .map(([key, value]) => (
                          <p key={key} className="text-sm">
                            <span className="font-medium">
                              {key.charAt(0).toUpperCase() + key.slice(1)}:
                            </span>{" "}
                            {value}
                          </p>
                        ))}
                    </div>
                  </div>
                </div>

                {/* Ações Realizadas */}
                <div>
                  <h4 className="font-semibold mb-2">Ações Realizadas</h4>
                  <div className="space-y-2">
                    {selectedAlert.details.actions.map((action, index) => (
                      <div
                        key={index}
                        className="flex items-center justify-between p-2 bg-gray-50 rounded-md"
                      >
                        <div>
                          <p className="font-medium">{action.description}</p>
                          <p className="text-sm text-gray-500">
                            {new Date(action.date).toLocaleString()}
                          </p>
                        </div>
                        <span className={`px-2 py-1 rounded-full text-xs ${getStatusColor(action.status)}`}>
                          {getStatusText(action.status)}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              <DialogFooter className="flex-col sm:flex-row gap-2">
                <Button
                  variant="outline"
                  onClick={() => handleAuditorAction('request_info')}
                  className="flex-1"
                >
                  <MessageSquare className="w-4 h-4 mr-2" />
                  Solicitar Mais Informações
                </Button>
                <Button
                  variant="destructive"
                  onClick={() => handleAuditorAction('reject')}
                  className="flex-1"
                >
                  <X className="w-4 h-4 mr-2" />
                  Rejeitar
                </Button>
                <Button
                  onClick={() => handleAuditorAction('approve')}
                  className="flex-1"
                >
                  <Check className="w-4 h-4 mr-2" />
                  Aprovar
                </Button>
              </DialogFooter>
            </>
          )}
        </DialogContent>
      </Dialog>
    </div>
  )
} 