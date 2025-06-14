"use client"

import { useSession } from "next-auth/react"
import { useRouter } from "next/navigation"
import { useEffect, useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { 
  Activity, 
  AlertTriangle, 
  BarChart3, 
  Building2, 
  Clock, 
  Factory, 
  Shield, 
  Users,
  Check,
  X,
  MessageSquare
} from "lucide-react"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { toast } from "sonner"

type RecentAlert = {
  id: string
  title: string
  factory: string
  severity: string
  status: string
  createdAt: string
  description: string
  details: Record<string, any>
  actions: {
    id: string
    type: string
    description: string
    date: string
    status: string
  }[]
}

type Factory = {
  name: string
  status: string
  lastUpdate: string
  description?: string
  details?: Record<string, any>
  maxCO2Emission?: number
}

export default function DashboardPage() {
  const { data: session, status } = useSession()
  const router = useRouter()
  const [recentAlerts, setRecentAlerts] = useState<RecentAlert[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [lastUpdate, setLastUpdate] = useState(new Date())
  const [selectedAlert, setSelectedAlert] = useState<RecentAlert | null>(null)
  const [selectedFactory, setSelectedFactory] = useState<Factory | null>(null)
  const [isAlertDetailsOpen, setIsAlertDetailsOpen] = useState(false)
  const [isFactoryDetailsOpen, setIsFactoryDetailsOpen] = useState(false)
  const [dashboardData, setDashboardData] = useState({
    totalFactories: 0,
    activeAlerts: 0,
    irregularFactories: 0,
    totalInspections: 0
  })

  useEffect(() => {
    if (status === "unauthenticated") {
      router.push("/login")
    }
  }, [status, router])

  const fetchRecentAlerts = async () => {
    try {
      setIsLoading(true)
      const response = await fetch('/api/alerts/recent')
      const data = await response.json()
      
      // Garantir que todos os campos necessários estejam presentes
      const formattedAlerts = data.map((alert: any) => ({
        id: alert.id,
        title: alert.title,
        factory: alert.industry?.name || "Fábrica Desconhecida",
        severity: alert.severity,
        status: alert.status,
        createdAt: alert.createdAt,
        description: alert.description || "Sem descrição",
        details: alert.details || {},
        actions: alert.actions || []
      }))
      
      setRecentAlerts(formattedAlerts)
      setLastUpdate(new Date())
    } catch (error) {
      console.error('Erro ao buscar alertas recentes:', error)
    } finally {
      setIsLoading(false)
    }
  }

  const fetchDashboardData = async () => {
    try {
      const response = await fetch('/api/industries')
      const data = await response.json()
      
      const irregularFactories = data.filter((factory: any) => 
        (factory.currentCO2Emission / factory.maxCO2Emission) * 100 > 100
      ).length

      const activeAlerts = recentAlerts.filter(alert => alert.status === 'in_progress').length

      setDashboardData({
        totalFactories: data.length,
        activeAlerts,
        irregularFactories,
        totalInspections: data.reduce((acc: number, factory: any) => acc + (factory.inspections?.length || 0), 0)
      })
    } catch (error) {
      console.error('Erro ao buscar dados do dashboard:', error)
    }
  }

  useEffect(() => {
    fetchRecentAlerts()
    fetchDashboardData()
  }, [])

  const getTimeAgo = (date: string) => {
    const now = new Date()
    const alertDate = new Date(date)
    const diffInHours = Math.floor((now.getTime() - alertDate.getTime()) / (1000 * 60 * 60))
    
    if (diffInHours < 1) {
      const diffInMinutes = Math.floor((now.getTime() - alertDate.getTime()) / (1000 * 60))
      return `${diffInMinutes} minutos atrás`
    }
    return `${diffInHours} horas atrás`
  }

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case "critical":
        return "text-red-500"
      case "high":
        return "text-orange-500"
      case "medium":
        return "text-yellow-500"
      case "low":
        return "text-green-500"
      default:
        return "text-gray-500"
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
      case "notified":
        return "bg-yellow-100 text-yellow-800"
      case "in_progress":
        return "bg-blue-100 text-blue-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  const getStatusText = (status: string) => {
    switch (status) {
      case "resolved":
        return "Resolvido"
      case "notified":
        return "Notificado"
      case "in_progress":
        return "Em Progresso"
      default:
        return "Desconhecido"
    }
  }

  const handleViewAlertDetails = (alert: RecentAlert) => {
    setSelectedAlert(alert)
    setIsAlertDetailsOpen(true)
  }

  const handleViewFactoryDetails = (factory: Factory) => {
    setSelectedFactory(factory)
    setIsFactoryDetailsOpen(true)
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
      fetchRecentAlerts()
      
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

      setIsAlertDetailsOpen(false)
    } catch (error) {
      console.error('Erro ao processar ação:', error)
      toast.error('Erro ao processar ação. Tente novamente.')
    }
  }

  if (status === "loading") {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <p>Carregando...</p>
      </div>
    )
  }

  return (
    <div className="p-8 space-y-8">
      {/* Cabeçalho */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Dashboard</h1>
          <p className="text-gray-600">Bem-vindo, {session?.user?.name || session?.user?.email}</p>
        </div>
        <div className="flex gap-4">
          <Button variant="outline">
            <Clock className="w-4 h-4 mr-2" />
            Última atualização: {lastUpdate.toLocaleTimeString()}
          </Button>
          <Button onClick={fetchRecentAlerts} disabled={isLoading}>
            <Activity className="w-4 h-4 mr-2" />
            {isLoading ? "Atualizando..." : "Atualizar Dados"}
          </Button>
        </div>
      </div>

      {/* Cards de Resumo */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Total de Fábricas</CardTitle>
            <Factory className="h-4 w-4 text-gray-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{dashboardData.totalFactories}</div>
            <p className="text-xs text-gray-500">Fábricas monitoradas</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Alertas Ativos</CardTitle>
            <AlertTriangle className="h-4 w-4 text-red-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{dashboardData.activeAlerts}</div>
            <p className="text-xs text-gray-500">Alertas não resolvidos</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Fábricas Irregulares</CardTitle>
            <AlertTriangle className="h-4 w-4 text-red-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{dashboardData.irregularFactories}</div>
            <p className="text-xs text-gray-500">Emissão acima do limite</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Total de Inspeções</CardTitle>
            <BarChart3 className="h-4 w-4 text-green-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{dashboardData.totalInspections}</div>
            <p className="text-xs text-gray-500">Inspeções realizadas</p>
          </CardContent>
        </Card>
      </div>

      {/* Seção de Alertas Recentes */}
      <Card>
        <CardHeader>
          <CardTitle>Alertas Recentes</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {isLoading ? (
              <div className="text-center py-4">Carregando alertas...</div>
            ) : recentAlerts.length === 0 ? (
              <div className="text-center py-4 text-gray-500">Nenhum alerta recente</div>
            ) : (
              recentAlerts.map((alert) => (
                <div
                  key={alert.id}
                  className="flex items-center justify-between p-4 border rounded-lg cursor-pointer hover:bg-gray-50"
                  onClick={() => handleViewAlertDetails(alert)}
                >
                  <div className="flex items-center space-x-4">
                    <AlertTriangle className={`h-5 w-5 ${getSeverityColor(alert.severity)}`} />
                    <div>
                      <h3 className="font-medium">{alert.title}</h3>
                      <p className="text-sm text-gray-500">{alert.factory}</p>
                    </div>
                  </div>
                  <div className="text-sm text-gray-500">{getTimeAgo(alert.createdAt)}</div>
                </div>
              ))
            )}
          </div>
        </CardContent>
      </Card>

      {/* Seção de Fábricas */}
      <Card>
        <CardHeader>
          <CardTitle>Fábricas Monitoradas</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {[
              { 
                name: "Fábrica Norte", 
                status: "Normal", 
                lastUpdate: "5 min atrás",
                description: "Fábrica especializada em produção de alimentos",
                maxCO2Emission: 500.0,
                details: {
                  "Capacidade": "10.000 unidades/dia",
                  "Funcionários": "150",
                  "Setores": "Produção, Embalagem, Qualidade"
                }
              },
              { 
                name: "Fábrica Sul", 
                status: "Alerta", 
                lastUpdate: "10 min atrás",
                description: "Fábrica de produtos químicos",
                maxCO2Emission: 2000.0,
                details: {
                  "Capacidade": "5.000 toneladas/mês",
                  "Funcionários": "80",
                  "Setores": "Produção, Laboratório, Segurança"
                }
              },
              { 
                name: "Fábrica Leste", 
                status: "Normal", 
                lastUpdate: "15 min atrás",
                description: "Fábrica de componentes automotivos",
                maxCO2Emission: 1500.0,
                details: {
                  "Capacidade": "8.000 peças/dia",
                  "Funcionários": "120",
                  "Setores": "Montagem, Controle, Logística"
                }
              },
              { 
                name: "Fábrica Oeste", 
                status: "Normal", 
                lastUpdate: "20 min atrás",
                description: "Fábrica de eletrônicos",
                maxCO2Emission: 800.0,
                details: {
                  "Capacidade": "15.000 unidades/dia",
                  "Funcionários": "200",
                  "Setores": "Montagem, Testes, Qualidade"
                }
              }
            ].map((factory, index) => (
              <div
                key={index}
                className="flex items-center justify-between p-4 border rounded-lg cursor-pointer hover:bg-gray-50"
                onClick={() => handleViewFactoryDetails(factory)}
              >
                <div className="flex items-center space-x-4">
                  <Building2 className="h-5 w-5 text-gray-500" />
                  <div>
                    <h3 className="font-medium">{factory.name}</h3>
                    <p className="text-sm text-gray-500">Última atualização: {factory.lastUpdate}</p>
                  </div>
                </div>
                <span className={`px-2 py-1 rounded-full text-xs ${
                  factory.status === "Normal" ? "bg-green-100 text-green-800" :
                  "bg-red-100 text-red-800"
                }`}>
                  {factory.status}
                </span>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Modal de Detalhes do Alerta */}
      <Dialog open={isAlertDetailsOpen} onOpenChange={setIsAlertDetailsOpen}>
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

      {/* Modal de Detalhes da Fábrica */}
      <Dialog open={isFactoryDetailsOpen} onOpenChange={setIsFactoryDetailsOpen}>
        <DialogContent className="max-w-3xl">
          {selectedFactory && (
            <>
              <DialogHeader>
                <DialogTitle className="flex items-center gap-2">
                  <Building2 className="w-5 h-5 text-gray-500" />
                  {selectedFactory.name}
                </DialogTitle>
                <DialogDescription>
                  {selectedFactory.description}
                </DialogDescription>
              </DialogHeader>

              <div className="grid gap-6 py-4">
                {/* Informações Básicas */}
                <div>
                  <h4 className="font-semibold mb-2">Informações da Fábrica</h4>
                  <div className="space-y-2">
                    <p className="text-sm">
                      <span className="font-medium">Status:</span>{" "}
                      <span className={`px-2 py-1 rounded-full text-xs ${
                        selectedFactory.status === "Normal" ? "bg-green-100 text-green-800" :
                        "bg-red-100 text-red-800"
                      }`}>
                        {selectedFactory.status}
                      </span>
                    </p>
                    <p className="text-sm">
                      <span className="font-medium">Última atualização:</span>{" "}
                      {selectedFactory.lastUpdate}
                    </p>
                    <p className="text-sm">
                      <span className="font-medium">Emissão Máxima de CO2:</span>{" "}
                      {selectedFactory.maxCO2Emission} ton/mês
                    </p>
                  </div>
                </div>

                {/* Detalhes Técnicos */}
                <div>
                  <h4 className="font-semibold mb-2">Detalhes Técnicos</h4>
                  <div className="space-y-2">
                    {selectedFactory.details && Object.entries(selectedFactory.details).map(([key, value]) => (
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

              <DialogFooter>
                <Button
                  variant="outline"
                  onClick={() => setIsFactoryDetailsOpen(false)}
                >
                  Fechar
                </Button>
              </DialogFooter>
            </>
          )}
        </DialogContent>
      </Dialog>
    </div>
  )
} 