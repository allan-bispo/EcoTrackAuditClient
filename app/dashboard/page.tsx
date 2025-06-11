"use client"

import { useSession } from "next-auth/react"
import { useRouter } from "next/navigation"
import { useEffect } from "react"
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
  Users 
} from "lucide-react"

export default function DashboardPage() {
  const { data: session, status } = useSession()
  const router = useRouter()

  useEffect(() => {
    if (status === "unauthenticated") {
      router.push("/login")
    }
  }, [status, router])

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
            Última atualização: {new Date().toLocaleTimeString()}
          </Button>
          <Button>
            <Activity className="w-4 h-4 mr-2" />
            Atualizar Dados
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
            <div className="text-2xl font-bold">24</div>
            <p className="text-xs text-gray-500">+2 desde o último mês</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Alertas Ativos</CardTitle>
            <AlertTriangle className="h-4 w-4 text-red-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">5</div>
            <p className="text-xs text-gray-500">-3 desde ontem</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Auditores Ativos</CardTitle>
            <Shield className="h-4 w-4 text-blue-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">12</div>
            <p className="text-xs text-gray-500">+1 esta semana</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Total de Inspeções</CardTitle>
            <BarChart3 className="h-4 w-4 text-green-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">156</div>
            <p className="text-xs text-gray-500">+23 este mês</p>
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
            {[
              {
                id: 1,
                title: "Alta emissão de CO2",
                factory: "Fábrica Norte",
                severity: "Alto",
                time: "2 horas atrás"
              },
              {
                id: 2,
                title: "Temperatura acima do normal",
                factory: "Fábrica Sul",
                severity: "Médio",
                time: "4 horas atrás"
              },
              {
                id: 3,
                title: "Consumo de água elevado",
                factory: "Fábrica Leste",
                severity: "Baixo",
                time: "6 horas atrás"
              }
            ].map((alert) => (
              <div
                key={alert.id}
                className="flex items-center justify-between p-4 border rounded-lg"
              >
                <div className="flex items-center space-x-4">
                  <AlertTriangle className={`h-5 w-5 ${
                    alert.severity === "Alto" ? "text-red-500" :
                    alert.severity === "Médio" ? "text-yellow-500" :
                    "text-green-500"
                  }`} />
                  <div>
                    <h3 className="font-medium">{alert.title}</h3>
                    <p className="text-sm text-gray-500">{alert.factory}</p>
                  </div>
                </div>
                <div className="text-sm text-gray-500">{alert.time}</div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Seção de Fábricas */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Fábricas Monitoradas</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {[
                { name: "Fábrica Norte", status: "Normal", lastUpdate: "5 min atrás" },
                { name: "Fábrica Sul", status: "Alerta", lastUpdate: "10 min atrás" },
                { name: "Fábrica Leste", status: "Normal", lastUpdate: "15 min atrás" },
                { name: "Fábrica Oeste", status: "Normal", lastUpdate: "20 min atrás" }
              ].map((factory, index) => (
                <div
                  key={index}
                  className="flex items-center justify-between p-4 border rounded-lg"
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

        <Card>
          <CardHeader>
            <CardTitle>Equipe de Auditoria</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {[
                { name: "João Silva", role: "Auditor Sênior", status: "Online" },
                { name: "Maria Santos", role: "Auditora", status: "Em campo" },
                { name: "Pedro Costa", role: "Auditor", status: "Online" },
                { name: "Ana Oliveira", role: "Auditora", status: "Ausente" }
              ].map((auditor, index) => (
                <div
                  key={index}
                  className="flex items-center justify-between p-4 border rounded-lg"
                >
                  <div className="flex items-center space-x-4">
                    <Users className="h-5 w-5 text-gray-500" />
                    <div>
                      <h3 className="font-medium">{auditor.name}</h3>
                      <p className="text-sm text-gray-500">{auditor.role}</p>
                    </div>
                  </div>
                  <span className={`px-2 py-1 rounded-full text-xs ${
                    auditor.status === "Online" ? "bg-green-100 text-green-800" :
                    auditor.status === "Em campo" ? "bg-blue-100 text-blue-800" :
                    "bg-gray-100 text-gray-800"
                  }`}>
                    {auditor.status}
                  </span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
} 