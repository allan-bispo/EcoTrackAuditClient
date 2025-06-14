"use client"

import { useState, useEffect, ChangeEvent } from "react"
import { 
  Building2, 
  Search, 
  Plus, 
  AlertTriangle, 
  CheckCircle2, 
  XCircle,
  MoreVertical,
  Filter,
  X,
  MapPin,
  Factory as FactoryIcon,
  Users,
  FileText,
  Calendar,
  Save,
  Loader2
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog"
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
import { toast } from "sonner"

interface Industry {
  id: string
  name: string
  location: string
  status: string
  type: string
  capacity: number
  description: string | null
  alerts: number
  compliance: number
  lastInspection: string
  maxCO2Emission: number
  currentCO2Emission: number
}

interface EditIndustryForm {
  name: string
  location: string
  status: string
  type: string
  capacity: number
  description: string
  maxCO2Emission: number
}

interface Inspection {
  id: string
  title: string
  status: string
  createdAt: string
  resolvedAt?: string
  description: string
  actions: {
    id: string
    type: string
    description: string
    date: string
    status: string
  }[]
}

export default function FactoriesPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [statusFilter, setStatusFilter] = useState("all")
  const [industries, setIndustries] = useState<Industry[]>([])
  const [loading, setLoading] = useState(true)
  const [selectedFactory, setSelectedFactory] = useState<Industry | null>(null)
  const [isEditing, setIsEditing] = useState(false)
  const [currentPage, setCurrentPage] = useState(1)
  const itemsPerPage = 4
  const [editForm, setEditForm] = useState<EditIndustryForm>({
    name: "",
    location: "",
    status: "active",
    type: "",
    capacity: 0,
    description: "",
    maxCO2Emission: 0
  })
  const [isSaving, setIsSaving] = useState(false)
  const [isInspectionsOpen, setIsInspectionsOpen] = useState(false)
  const [inspections, setInspections] = useState<Inspection[]>([])
  const [isLoadingInspections, setIsLoadingInspections] = useState(false)

  useEffect(() => {
    const fetchIndustries = async () => {
      try {
        const response = await fetch('/api/industries')
        const data = await response.json()
        setIndustries(data)
      } catch (error) {
        console.error('Erro ao buscar indústrias:', error)
      } finally {
        setLoading(false)
      }
    }

    fetchIndustries()
  }, [])

  const handleEditClick = (factory: Industry) => {
    setSelectedFactory(factory)
    setEditForm({
      name: factory.name || "",
      location: factory.location || "",
      status: factory.status || "active",
      type: factory.type || "",
      capacity: Number(factory.capacity) || 0,
      description: factory.description || "",
      maxCO2Emission: Number(factory.maxCO2Emission) || 0
    })
    setIsEditing(true)
  }

  const handleSave = async () => {
    if (!selectedFactory) return

    setIsSaving(true)
    try {
      const response = await fetch(`/api/industries/${selectedFactory.id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(editForm),
      })

      if (!response.ok) {
        throw new Error('Erro ao salvar alterações')
      }

      const updatedFactory = await response.json()
      
      // Atualiza a lista de indústrias
      setIndustries(prev => prev.map(factory => 
        factory.id === updatedFactory.id ? updatedFactory : factory
      ))

      // Atualiza a fábrica selecionada
      setSelectedFactory(updatedFactory)
      
      toast.success('Fábrica atualizada com sucesso!')
      setIsEditing(false)
    } catch (error) {
      console.error('Erro ao salvar:', error)
      toast.error('Erro ao salvar alterações')
    } finally {
      setIsSaving(false)
    }
  }

  const handleDeactivate = async (factory: Industry) => {
    try {
      const response = await fetch(`/api/industries/${factory.id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...factory,
          status: 'inactive'
        }),
      })

      if (!response.ok) {
        throw new Error('Erro ao desativar fábrica')
      }

      const updatedFactory = await response.json()
      
      // Atualiza a lista de indústrias
      setIndustries(prev => prev.map(f => 
        f.id === updatedFactory.id ? updatedFactory : f
      ))

      // Se a fábrica estiver selecionada, atualiza ela também
      if (selectedFactory?.id === updatedFactory.id) {
        setSelectedFactory(updatedFactory)
      }
      
      toast.success('Fábrica desativada com sucesso!')
    } catch (error) {
      console.error('Erro ao desativar:', error)
      toast.error('Erro ao desativar fábrica')
    }
  }

  const handleViewInspections = async (factory: Industry) => {
    setIsLoadingInspections(true)
    try {
      const response = await fetch(`/api/industries/${factory.id}/inspections`)
      if (!response.ok) throw new Error('Erro ao buscar inspeções')
      
      const data = await response.json()
      setInspections(data)
      setSelectedFactory(factory)
      setIsInspectionsOpen(true)
    } catch (error) {
      console.error('Erro ao buscar inspeções:', error)
      toast.error('Erro ao buscar histórico de inspeções')
    } finally {
      setIsLoadingInspections(false)
    }
  }

  const filteredFactories = industries.filter(factory => {
    const searchTermLower = searchTerm.toLowerCase()
    const matchesSearch = 
      factory.name.toLowerCase().includes(searchTermLower) ||
      factory.location.toLowerCase().includes(searchTermLower) ||
      factory.type.toLowerCase().includes(searchTermLower) ||
      (factory.description?.toLowerCase().includes(searchTermLower) ?? false) ||
      factory.status.toLowerCase().includes(searchTermLower) ||
      factory.capacity.toString().includes(searchTermLower) ||
      factory.compliance.toString().includes(searchTermLower)

    const matchesStatus = statusFilter === "all" || factory.status === statusFilter
    return matchesSearch && matchesStatus
  })

  const totalPages = Math.ceil(filteredFactories.length / itemsPerPage)
  const paginatedFactories = filteredFactories.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  )

  // Resetar para a primeira página quando os filtros mudarem
  useEffect(() => {
    setCurrentPage(1)
  }, [searchTerm, statusFilter])

  const getStatusColor = (status: string) => {
    switch (status) {
      case "resolved":
        return "bg-green-100 text-green-800"
      case "notified":
        return "bg-purple-100 text-purple-800"
      case "active":
        return "bg-green-100 text-green-800"
      case "inactive":
        return "bg-gray-100 text-gray-800"
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
      case "active":
        return "Ativo"
      case "inactive":
        return "Inativo"
      default:
        return "Desconhecido"
    }
  }

  const getComplianceColor = (compliance: number) => {
    if (compliance < 75) return "bg-green-100 text-green-800";
    if (compliance <= 100) return "bg-yellow-100 text-yellow-800";
    return "bg-red-100 text-red-800";
  };

  if (loading) {
    return (
      <div className="p-8 flex items-center justify-center">
        <p>Carregando...</p>
      </div>
    )
  }

  return (
    <div className="p-8 space-y-8">
      {/* Cabeçalho */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Fábricas</h1>
          <p className="text-gray-600">Gerencie suas fábricas e monitore seu status</p>
        </div>
      </div>

      {/* Filtros e Busca */}
      <div className="flex gap-4">
        <div className="flex-1">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <Input
              placeholder="Buscar por nome, localização, tipo, status..."
              value={searchTerm}
              onChange={(e: ChangeEvent<HTMLInputElement>) => setSearchTerm(e.target.value)}
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
            <SelectItem value="inactive">Inativos</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Lista de Fábricas */}
      <div className="grid gap-6">
        {filteredFactories.length === 0 ? (
          <div className="text-center py-8 text-gray-500">
            Nenhuma fábrica encontrada com os filtros selecionados
          </div>
        ) : (
          paginatedFactories.map((factory) => (
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
                  <div className="flex items-center space-x-8">
                    <div className="text-right">
                      <p className="text-sm text-gray-500 mb-1.5">Última Inspeção</p>
                      <p className="font-medium">{new Date(factory.lastInspection).toLocaleDateString()}</p>
                    </div>
                    <div className="text-right">
                      <p className="text-sm text-gray-500 mb-1.5">Conformidade</p>
                      <span className={`px-3 py-1 rounded-full text-sm ${getComplianceColor(factory.compliance)}`}>{factory.compliance}%</span>
                    </div>
                    <div className="text-right">
                      <p className="text-sm text-gray-500 mb-1.5">Alertas</p>
                      <p className="font-medium flex items-center">
                        {factory.alerts > 0 ? (
                          <AlertTriangle className="w-4 h-4 text-yellow-500 mr-1" />
                        ) : (
                          <CheckCircle2 className="w-4 h-4 text-green-500 mr-1" />
                        )}
                        {factory.alerts}
                      </p>
                    </div>
                    <div className="text-right">
                      <p className="text-sm text-gray-500 mb-1.5">Status</p>
                      <span className={`px-3 py-1 rounded-full text-sm ${getStatusColor(factory.status)}`}>
                        {getStatusText(factory.status)}
                      </span>
                    </div>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="icon">
                          <MoreVertical className="w-4 h-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem onClick={() => setSelectedFactory(factory)}>
                          Ver Detalhes
                        </DropdownMenuItem>
                        <DropdownMenuItem onClick={() => handleEditClick(factory)}>
                          Editar
                        </DropdownMenuItem>
                        <DropdownMenuItem onClick={() => handleViewInspections(factory)}>
                          Histórico de Inspeções
                        </DropdownMenuItem>
                        <DropdownMenuItem 
                          className="text-red-600"
                          onClick={() => handleDeactivate(factory)}
                          disabled={factory.status === 'inactive'}
                        >
                          {factory.status === 'inactive' ? 'Fábrica Desativada' : 'Desativar'}
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
          Mostrando {paginatedFactories.length} de {filteredFactories.length} fábricas
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

      {/* Modal de Detalhes/Edição */}
      <Dialog open={!!selectedFactory} onOpenChange={() => {
        setSelectedFactory(null)
        setIsEditing(false)
      }}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle className="text-2xl font-bold flex items-center gap-2">
              <Building2 className="w-6 h-6 text-blue-600" />
              {isEditing ? "Editar Fábrica" : selectedFactory?.name}
            </DialogTitle>
            <DialogDescription>
              {isEditing ? "Edite os dados da fábrica" : "Detalhes completos da fábrica"}
            </DialogDescription>
          </DialogHeader>

          {isEditing ? (
            <div className="space-y-4 mt-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className="text-sm font-medium">Nome</label>
                  <Input
                    value={editForm.name}
                    onChange={(e: ChangeEvent<HTMLInputElement>) => setEditForm(prev => ({ ...prev, name: e.target.value }))}
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium">Localização</label>
                  <Input
                    value={editForm.location}
                    onChange={(e: ChangeEvent<HTMLInputElement>) => setEditForm(prev => ({ ...prev, location: e.target.value }))}
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className="text-sm font-medium">Tipo</label>
                  <Input
                    value={editForm.type}
                    onChange={(e: ChangeEvent<HTMLInputElement>) => setEditForm(prev => ({ ...prev, type: e.target.value }))}
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium">Capacidade</label>
                  <Input
                    type="number"
                    value={editForm.capacity || ""}
                    onChange={(e: ChangeEvent<HTMLInputElement>) => setEditForm(prev => ({ 
                      ...prev, 
                      capacity: e.target.value ? Number(e.target.value) : 0 
                    }))}
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className="text-sm font-medium">Emissão Máxima de CO2 (ton/mês)</label>
                  <Input
                    type="number"
                    value={editForm.maxCO2Emission || ""}
                    onChange={(e: ChangeEvent<HTMLInputElement>) => setEditForm(prev => ({ 
                      ...prev, 
                      maxCO2Emission: e.target.value ? Number(e.target.value) : 0 
                    }))}
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium">Status</label>
                <Select
                  value={editForm.status}
                  onValueChange={(value) => setEditForm(prev => ({ ...prev, status: value }))}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Selecione o status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="active">Ativo</SelectItem>
                    <SelectItem value="inactive">Inativo</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium">Descrição</label>
                <Textarea
                  value={editForm.description}
                  onChange={(e: ChangeEvent<HTMLTextAreaElement>) => setEditForm(prev => ({ ...prev, description: e.target.value }))}
                  rows={4}
                />
              </div>
            </div>
          ) : (
            <div className="grid grid-cols-2 gap-6 mt-4">
              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <MapPin className="w-5 h-5 text-gray-500 mt-1" />
                  <div>
                    <h4 className="font-medium">Localização</h4>
                    <p className="text-gray-600">{selectedFactory?.location}</p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <FactoryIcon className="w-5 h-5 text-gray-500 mt-1" />
                  <div>
                    <h4 className="font-medium">Tipo de Indústria</h4>
                    <p className="text-gray-600">{selectedFactory?.type}</p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <Users className="w-5 h-5 text-gray-500 mt-1" />
                  <div>
                    <h4 className="font-medium">Capacidade</h4>
                    <p className="text-gray-600">{selectedFactory?.capacity} funcionários</p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <Calendar className="w-5 h-5 text-gray-500 mt-1" />
                  <div>
                    <h4 className="font-medium">Última Inspeção</h4>
                    <p className="text-gray-600">
                      {selectedFactory?.lastInspection ? 
                        new Date(selectedFactory.lastInspection).toLocaleDateString() : 
                        "Nunca inspecionada"}
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="w-5 h-5 text-gray-500 mt-1" />
                  <div>
                    <h4 className="font-medium">Emissão Máxima de CO2</h4>
                    <p className="text-gray-600">{selectedFactory?.maxCO2Emission} ton/mês</p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="w-5 h-5 text-gray-500 mt-1" />
                  <div>
                    <h4 className="font-medium">Emissão Atual de CO2</h4>
                    <p className="text-gray-600">{selectedFactory?.currentCO2Emission} ton/mês</p>
                  </div>
                </div>
              </div>

              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <FileText className="w-5 h-5 text-gray-500 mt-1" />
                  <div>
                    <h4 className="font-medium">Descrição</h4>
                    <p className="text-gray-600">
                      {selectedFactory?.description || "Sem descrição disponível"}
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <CheckCircle2 className="w-5 h-5 text-gray-500 mt-1" />
                  <div>
                    <h4 className="font-medium">Conformidade</h4>
                    <span className={`px-3 py-1 rounded-full text-sm ${getComplianceColor(selectedFactory?.compliance || 0)}`}>{selectedFactory?.compliance}%</span>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <AlertTriangle className="w-5 h-5 text-gray-500 mt-1" />
                  <div>
                    <h4 className="font-medium">Alertas Ativos</h4>
                    <p className="text-gray-600">{selectedFactory?.alerts}</p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="w-5 h-5 text-gray-500 mt-1" />
                  <div>
                    <h4 className="font-medium">Status</h4>
                    <span className={`px-2 py-1 rounded-full text-sm ${getStatusColor(selectedFactory?.status || "")}`}>
                      {getStatusText(selectedFactory?.status || "")}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          )}

          <div className="flex justify-end gap-3 mt-6">
            <Button 
              variant="outline" 
              onClick={() => {
                setSelectedFactory(null)
                setIsEditing(false)
              }}
            >
              {isEditing ? "Cancelar" : "Fechar"}
            </Button>
            {isEditing ? (
              <Button onClick={handleSave} disabled={isSaving}>
                {isSaving ? (
                  <>
                    <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                    Salvando...
                  </>
                ) : (
                  <>
                    <Save className="w-4 h-4 mr-2" />
                    Salvar Alterações
                  </>
                )}
              </Button>
            ) : (
              <Button onClick={() => handleEditClick(selectedFactory!)}>
                Editar Fábrica
              </Button>
            )}
          </div>
        </DialogContent>
      </Dialog>

      {/* Modal de Histórico de Inspeções */}
      <Dialog open={isInspectionsOpen} onOpenChange={setIsInspectionsOpen}>
        <DialogContent className="max-w-4xl">
          <DialogHeader>
            <DialogTitle className="text-2xl font-bold flex items-center gap-2">
              <Building2 className="w-6 h-6 text-blue-600" />
              Histórico de Inspeções - {selectedFactory?.name}
            </DialogTitle>
            <DialogDescription>
              Lista de todas as inspeções realizadas nesta fábrica
            </DialogDescription>
          </DialogHeader>

          <div className="mt-4 space-y-4">
            {isLoadingInspections ? (
              <div className="text-center py-8">Carregando inspeções...</div>
            ) : inspections.length === 0 ? (
              <div className="text-center py-8 text-gray-500">
                Nenhuma inspeção encontrada
              </div>
            ) : (
              inspections.map((inspection) => (
                <Card key={inspection.id}>
                  <CardContent className="p-4">
                    <div className="flex items-start justify-between">
                      <div className="space-y-1">
                        <h4 className="font-semibold">{inspection.title}</h4>
                        <p className="text-sm text-gray-600">{inspection.description}</p>
                        <div className="flex items-center gap-2 text-sm text-gray-500">
                          <span>Criado em: {new Date(inspection.createdAt).toLocaleString()}</span>
                          {inspection.resolvedAt && (
                            <span>• Resolvido em: {new Date(inspection.resolvedAt).toLocaleString()}</span>
                          )}
                        </div>
                      </div>
                      <div className="flex flex-col items-end gap-2">
                        <span className={`px-3 py-1 rounded-full text-sm ${getStatusColor(inspection.status)}`}>
                          {getStatusText(inspection.status)}
                        </span>
                        {inspection.actions.length > 0 && (
                          <span className="text-sm text-gray-500">
                            {inspection.actions.length} ação(ões) realizada(s)
                          </span>
                        )}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))
            )}
          </div>
        </DialogContent>
      </Dialog>
    </div>
  )
} 