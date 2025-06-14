"use client"

import { useState, useEffect } from "react"
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
import { toast } from "sonner"

type Alert = {
  id: string
  title: string
  industry: {
    name: string
  }
  severity: string
  status: string
  description: string
  createdAt: string
  resolvedAt?: string
  details: Record<string, any>
  actions: {
    id: string
    type: string
    description: string
    date: string
    status: string
  }[]
}

export default function AlertsPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [statusFilter, setStatusFilter] = useState("all")
  const [severityFilter, setSeverityFilter] = useState("all")
  const [selectedAlert, setSelectedAlert] = useState<Alert | null>(null)
  const [isDetailsOpen, setIsDetailsOpen] = useState(false)
  const [alerts, setAlerts] = useState<Alert[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [currentPage, setCurrentPage] = useState(1)
  const itemsPerPage = 3

  useEffect(() => {
    fetchAlerts()
  }, [searchTerm, statusFilter, severityFilter])

  // Resetar para a primeira página quando os filtros mudarem
  useEffect(() => {
    setCurrentPage(1)
  }, [searchTerm, statusFilter, severityFilter])

  const filteredAlerts = alerts.filter(alert => {
    const searchTermLower = searchTerm.toLowerCase()
    const matchesSearch = 
      alert.title.toLowerCase().includes(searchTermLower) ||
      alert.industry.name.toLowerCase().includes(searchTermLower) ||
      alert.description.toLowerCase().includes(searchTermLower)

    const matchesStatus = statusFilter === "all" || alert.status === statusFilter
    const matchesSeverity = severityFilter === "all" || alert.severity === severityFilter

    return matchesSearch && matchesStatus && matchesSeverity
  })

  const totalPages = Math.ceil(filteredAlerts.length / itemsPerPage)
  const paginatedAlerts = filteredAlerts.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  )

  const fetchAlerts = async () => {
    try {
      setIsLoading(true)
      const params = new URLSearchParams()
      if (searchTerm) params.append("search", searchTerm)
      if (statusFilter !== "all") params.append("status", statusFilter)
      if (severityFilter !== "all") params.append("severity", severityFilter)

      const response = await fetch(`/api/alerts?${params.toString()}`)
      if (!response.ok) throw new Error("Erro ao buscar alertas")
      
      const data = await response.json()
      setAlerts(data)
    } catch (error) {
      console.error("Erro ao buscar alertas:", error)
    } finally {
      setIsLoading(false)
    }
  }

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

  const getStatusText = (status: string) => {
    switch (status) {
      case "resolved":
        return "Resolvido"
      case "in_progress":
        return "Em Andamento"
      case "pending":
        return "Pendente"
      case "notified":
        return "Notificado"
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
      case "notified":
        return "bg-red-100 text-red-800"
      default:
        return "bg-gray-100 text-gray-800"
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

  const handleViewDetails = (alert: Alert) => {
    setSelectedAlert(alert)
    setIsDetailsOpen(true)
  }

  const handleAuditorAction = async (action: 'approve' | 'reject' | 'request_info') => {
    if (!selectedAlert) return

    try {
      const response = await fetch(`/api/alerts/${selectedAlert.id}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          status: action === 'approve' ? 'resolved' : 
                 action === 'reject' ? 'notified' : 'in_progress'
        }),
      })

      if (!response.ok) throw new Error('Erro ao atualizar alerta')

      // Atualizar a lista de alertas
      fetchAlerts()
      
      // Feedback visual
      switch (action) {
        case 'approve':
          toast.success('Alerta aprovado com sucesso!')
          break
        case 'reject':
          toast.success('Alerta notificado com sucesso!')
          break
        case 'request_info':
          toast.success('Solicitação de mais informações enviada!')
          break
      }

      setIsDetailsOpen(false)
    } catch (error) {
      console.error('Erro ao processar ação:', error)
      toast.error('Erro ao processar ação. Tente novamente.')
    }
  }

  const handleUpdateStatus = async (alert: Alert, newStatus: string) => {
    try {
      const response = await fetch(`/api/alerts/${alert.id}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          status: newStatus,
          resolvedAt: newStatus === 'resolved' ? new Date().toISOString() : null
        }),
      })

      if (!response.ok) throw new Error('Erro ao atualizar status do alerta')

      // Atualizar a lista de alertas
      fetchAlerts()
      
      // Feedback visual
      toast.success(`Alerta ${newStatus === 'in_progress' ? 'marcado como em andamento' : 'marcado como resolvido'}!`)
    } catch (error) {
      console.error('Erro ao atualizar status:', error)
      toast.error('Erro ao atualizar status do alerta')
    }
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
            <SelectItem value="notified">Notificado</SelectItem>
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
      </div>

      {/* Lista de Alertas */}
      <div className="grid gap-6">
        {isLoading ? (
          <div className="text-center py-8">Carregando alertas...</div>
        ) : filteredAlerts.length === 0 ? (
          <div className="text-center py-8 text-gray-500">Nenhum alerta encontrado</div>
        ) : (
          paginatedAlerts.map((alert) => (
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
                        <span>{alert.industry.name}</span>
                      </div>
                      <p className="text-sm text-gray-600 mt-1">{alert.description}</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-4">
                    <div className="text-right">
                      <p className="text-sm text-gray-500 mb-1.5">Criticidade</p>
                      <p className={`text-sm font-medium px-2.5 py-0.5 rounded-full text-center ${getSeverityColor(alert.severity)}`}>
                        {getSeverityText(alert.severity)}
                      </p>
                    </div>
                    <div className="text-right">
                      <p className="text-sm text-gray-500 mb-1.5">Status</p>
                      <p className={`text-sm font-medium px-2.5 py-0.5 rounded-full text-center ${getStatusColor(alert.status)}`}>
                        {getStatusText(alert.status)}
                      </p>
                    </div>
                    <div className="text-right">
                      <p className="text-sm text-gray-500 mb-1.5">Criado em</p>
                      <p className="font-medium">{new Date(alert.createdAt).toLocaleString()}</p>
                    </div>
                    {alert.resolvedAt && (
                      <div className="text-right">
                        <p className="text-sm text-gray-500 mb-1.5">Resolvido em</p>
                        <p className="font-medium">{new Date(alert.resolvedAt).toLocaleString()}</p>
                      </div>
                    )}
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
                        <DropdownMenuItem 
                          onClick={() => handleUpdateStatus(alert, 'in_progress')}
                          disabled={alert.status === 'in_progress' || alert.status === 'resolved'}
                        >
                          Marcar como Em Andamento
                        </DropdownMenuItem>
                        <DropdownMenuItem 
                          onClick={() => handleUpdateStatus(alert, 'resolved')}
                          disabled={alert.status === 'resolved'}
                        >
                          Marcar como Resolvido
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))
        )}
      </div>

      {/* Paginação */}
      <div className="flex justify-between items-center">
        <p className="text-sm text-gray-500">
          Mostrando {paginatedAlerts.length} de {filteredAlerts.length} alertas
        </p>
        <div className="flex gap-2">
          <Button 
            variant="outline" 
            onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
            disabled={currentPage === 1}
          >
            Anterior
          </Button>
          <Button 
            variant="outline" 
            onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
            disabled={currentPage === totalPages}
          >
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
                        <span className="font-medium">Fábrica:</span> {selectedAlert.industry.name}
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
                    {selectedAlert.actions.map((action) => (
                      <div
                        key={action.id}
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
                  Notificar
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