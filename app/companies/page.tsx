"use client"

import { useState } from "react"
import { LayoutDashboard, Building2, FileText, Settings, LogOut, Search, Filter, Plus, Eye, BarChart3 } from "lucide-react"
import Link from "next/link"
import Image from "next/image"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { CompanyDetailView } from "@/components/company-detail-view"

const companies = [
  {
    id: 1,
    name: "Metalúrgica Nacional",
    cnpj: "CNPJ: 12.345.678/0001-90",
    industry: "Metallurgy",
    location: "São Paulo, SP",
    contactPerson: {
      name: "Carlos Oliveira",
      role: "Manager",
      avatar: "CO",
      email: "carlos@metalurgica.com.br",
      phone: "(11) 3456-7890",
      mobile: "(11) 99876-5432",
    },
    status: "Active",
    lastReport: "May 28, 2023",
    icon: "🏭",
    founded: "1985",
    employees: "450 employees",
    revenue: "R$ 85M",
    address: "Av. Industrial, 1250 - Distrito Industrial\nSão Paulo, SP - CEP: 04571-020",
  },
  {
    id: 2,
    name: "Indústria Química SA",
    cnpj: "CNPJ: 98.765.432/0001-10",
    industry: "Chemical",
    location: "Rio de Janeiro, RJ",
    contactPerson: {
      name: "Ana Pereira",
      role: "Director",
      avatar: "AP",
      email: "ana@quimica.com.br",
      phone: "(21) 3456-7890",
      mobile: "(21) 99876-5432",
    },
    status: "Active",
    lastReport: "May 15, 2023",
    icon: "🧪",
    founded: "1992",
    employees: "320 employees",
    revenue: "R$ 65M",
    address: "Rua das Indústrias, 500 - Zona Industrial\nRio de Janeiro, RJ - CEP: 20000-000",
  },
  {
    id: 3,
    name: "Têxtil Brasileira Ltda",
    cnpj: "CNPJ: 11.222.333/0001-44",
    industry: "Textile",
    location: "Minas Gerais, MG",
    contactPerson: {
      name: "Marcos Santos",
      role: "Supervisor",
      avatar: "MS",
      email: "marcos@textil.com.br",
      phone: "(31) 3456-7890",
      mobile: "(31) 99876-5432",
    },
    status: "Under Review",
    lastReport: "May 10, 2023",
    icon: "🧵",
    founded: "1998",
    employees: "180 employees",
    revenue: "R$ 35M",
    address: "Av. Têxtil, 800 - Distrito Industrial\nMinas Gerais, MG - CEP: 30000-000",
  },
  {
    id: 4,
    name: "Autopeças Brasil",
    cnpj: "CNPJ: 55.666.777/0001-88",
    industry: "Automotive",
    location: "Paraná, PR",
    contactPerson: {
      name: "Roberto Lima",
      role: "CEO",
      avatar: "RL",
      email: "roberto@autopecas.com.br",
      phone: "(41) 3456-7890",
      mobile: "(41) 99876-5432",
    },
    status: "Active",
    lastReport: "May 8, 2023",
    icon: "🚗",
    founded: "2001",
    employees: "275 employees",
    revenue: "R$ 45M",
    address: "Rua Automotiva, 1200 - Setor Industrial\nParaná, PR - CEP: 80000-000",
  },
]

export default function CompaniesPage() {
  const [activeTab, setActiveTab] = useState("all")
  const [currentView, setCurrentView] = useState<"list" | "detail">("list")
  const [selectedCompany, setSelectedCompany] = useState<any>(null)

  return (
    <div className="flex min-h-screen w-full bg-muted/40">
      <aside className="fixed inset-y-0 left-0 z-10 hidden w-64 flex-col border-r bg-background sm:flex">
        <div className="flex h-16 items-center border-b px-6">
          <Link href="/" className="flex items-center gap-2 font-semibold">
            <BarChart3 className="h-6 w-6 text-blue-600" />
            <span>GovMonitor</span>
          </Link>
        </div>
        <nav className="flex-1 overflow-auto py-4">
          <div className="grid items-start px-4 text-sm font-medium">
            <Link
              href="/"
              className="flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary"
            >
              <LayoutDashboard className="h-4 w-4" />
              Dashboard
            </Link>
            <Link
              href="/companies"
              className="flex items-center gap-3 rounded-lg bg-muted px-3 py-2 text-primary transition-all hover:text-primary"
            >
              <Building2 className="h-4 w-4" />
              Companies
            </Link>
            <Link
              href="/reports"
              className="flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary"
            >
              <FileText className="h-4 w-4" />
              Reports
            </Link>
            <Link
              href="/settings"
              className="flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary"
            >
              <Settings className="h-4 w-4" />
              Settings
            </Link>
          </div>
        </nav>
        <div className="mt-auto p-4 border-t">
          <Button variant="ghost" className="w-full justify-start text-red-600 hover:text-red-700 hover:bg-red-50">
            <LogOut className="mr-2 h-4 w-4" />
            Logout
          </Button>
        </div>
      </aside>

      <div className="flex flex-col sm:gap-4 sm:py-4 sm:pl-72 flex-1">
        <header className="sticky top-0 z-30 flex h-16 items-center gap-4 border-b bg-background px-4 sm:static sm:h-auto sm:border-0 sm:bg-transparent sm:px-6">
          <nav className="hidden font-medium md:flex md:flex-row md:items-center md:gap-5 md:text-sm lg:gap-6">
            <Link href="/" className="text-muted-foreground transition-colors hover:text-foreground">
              Dashboard
            </Link>
            <Link href="/reports" className="text-muted-foreground transition-colors hover:text-foreground">
              Reports
            </Link>
            <Link
              href="/companies"
              className="font-bold text-foreground transition-colors hover:text-foreground border-b-2 border-primary pb-1"
            >
              Companies
            </Link>
          </nav>
          <div className="relative ml-auto flex-1 md:grow-0">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon" className="overflow-hidden rounded-full w-8 h-8">
                  <Image
                    src="/avatars/user-avatar.png"
                    width={36}
                    height={36}
                    alt="Auditor Silva"
                    className="rounded-full"
                  />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuLabel>Auditor Silva</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem>Profile</DropdownMenuItem>
                <DropdownMenuItem>Settings</DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem>Logout</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </header>

        {currentView === "list" ? (
          <main className="grid flex-1 items-start gap-4 p-4 sm:px-6 sm:py-0 md:gap-8">
            {/* Header Section */}
            <div className="flex items-center justify-between">
              <h1 className="text-2xl font-semibold">Companies</h1>
              <div className="flex items-center space-x-4">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                  <Input placeholder="Search companies..." className="pl-10 w-64" />
                </div>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="outline">
                      <Filter className="h-4 w-4 mr-2" />
                      Filter
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent>
                    <DropdownMenuItem>All Companies</DropdownMenuItem>
                    <DropdownMenuItem>Active</DropdownMenuItem>
                    <DropdownMenuItem>Under Review</DropdownMenuItem>
                    <DropdownMenuItem>Archived</DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
                <Button className="bg-blue-600 hover:bg-blue-700">
                  <Plus className="h-4 w-4 mr-2" />
                  Add Company
                </Button>
              </div>
            </div>

            {/* Stats Cards */}
            <div className="grid grid-cols-4 gap-6 mb-6">
              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center">
                    <div className="p-2 bg-blue-100 rounded-lg">
                      <Building2 className="h-6 w-6 text-blue-600" />
                    </div>
                    <div className="ml-4">
                      <p className="text-sm font-medium text-gray-600">Total Companies</p>
                      <p className="text-2xl font-bold text-gray-900">24</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center">
                    <div className="p-2 bg-green-100 rounded-lg">
                      <div className="h-6 w-6 bg-green-500 rounded-full flex items-center justify-center">
                        <div className="h-2 w-2 bg-white rounded-full"></div>
                      </div>
                    </div>
                    <div className="ml-4">
                      <p className="text-sm font-medium text-gray-600">Active</p>
                      <p className="text-2xl font-bold text-gray-900">19</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center">
                    <div className="p-2 bg-yellow-100 rounded-lg">
                      <div className="h-6 w-6 bg-yellow-500 rounded-full flex items-center justify-center text-white text-xs">
                        !
                      </div>
                    </div>
                    <div className="ml-4">
                      <p className="text-sm font-medium text-gray-600">Under Review</p>
                      <p className="text-2xl font-bold text-gray-900">3</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center">
                    <div className="p-2 bg-gray-100 rounded-lg">
                      <div className="h-6 w-6 bg-gray-500 rounded-lg"></div>
                    </div>
                    <div className="ml-4">
                      <p className="text-sm font-medium text-gray-600">Archived</p>
                      <p className="text-2xl font-bold text-gray-900">2</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Tabs and Table */}
            <Card>
              <CardContent className="p-0">
                <Tabs value={activeTab} onValueChange={setActiveTab}>
                  <div className="border-b border-gray-200">
                    <TabsList className="h-auto p-0 bg-transparent">
                      <TabsTrigger
                        value="all"
                        className="border-b-2 border-transparent data-[state=active]:border-blue-600 data-[state=active]:bg-transparent rounded-none px-6 py-4"
                      >
                        All Companies
                      </TabsTrigger>
                      <TabsTrigger
                        value="active"
                        className="border-b-2 border-transparent data-[state=active]:border-blue-600 data-[state=active]:bg-transparent rounded-none px-6 py-4"
                      >
                        Active
                      </TabsTrigger>
                      <TabsTrigger
                        value="review"
                        className="border-b-2 border-transparent data-[state=active]:border-blue-600 data-[state=active]:bg-transparent rounded-none px-6 py-4"
                      >
                        Under Review
                      </TabsTrigger>
                      <TabsTrigger
                        value="archived"
                        className="border-b-2 border-transparent data-[state=active]:border-blue-600 data-[state=active]:bg-transparent rounded-none px-6 py-4"
                      >
                        Archived
                      </TabsTrigger>
                    </TabsList>
                  </div>
                  <TabsContent value={activeTab} className="m-0">
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead className="font-semibold text-gray-600 uppercase text-xs">Company</TableHead>
                          <TableHead className="font-semibold text-gray-600 uppercase text-xs">Industry</TableHead>
                          <TableHead className="font-semibold text-gray-600 uppercase text-xs">Location</TableHead>
                          <TableHead className="font-semibold text-gray-600 uppercase text-xs">Contact Person</TableHead>
                          <TableHead className="font-semibold text-gray-600 uppercase text-xs">Status</TableHead>
                          <TableHead className="font-semibold text-gray-600 uppercase text-xs">Last Report</TableHead>
                          <TableHead className="font-semibold text-gray-600 uppercase text-xs">Actions</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {companies.map((company) => (
                          <TableRow key={company.id} className="hover:bg-gray-50">
                            <TableCell>
                              <div className="flex items-center space-x-3">
                                <div className="text-2xl">{company.icon}</div>
                                <div>
                                  <div className="font-medium text-gray-900">{company.name}</div>
                                  <div className="text-sm text-gray-500">{company.cnpj}</div>
                                </div>
                              </div>
                            </TableCell>
                            <TableCell className="text-gray-600">{company.industry}</TableCell>
                            <TableCell className="text-gray-600">{company.location}</TableCell>
                            <TableCell>
                              <div className="flex items-center space-x-3">
                                <Avatar className="h-8 w-8">
                                  <AvatarFallback className="bg-gray-200 text-gray-600 text-xs">
                                    {company.contactPerson.avatar}
                                  </AvatarFallback>
                                </Avatar>
                                <div>
                                  <div className="font-medium text-gray-900">{company.contactPerson.name}</div>
                                  <div className="text-sm text-gray-500">{company.contactPerson.role}</div>
                                </div>
                              </div>
                            </TableCell>
                            <TableCell>
                              <Badge
                                variant={company.status === "Active" ? "default" : "secondary"}
                                className={
                                  company.status === "Active"
                                    ? "bg-green-100 text-green-800 hover:bg-green-100"
                                    : "bg-yellow-100 text-yellow-800 hover:bg-yellow-100"
                                }
                              >
                                {company.status}
                              </Badge>
                            </TableCell>
                            <TableCell className="text-gray-600">{company.lastReport}</TableCell>
                            <TableCell>
                              <Button
                                variant="ghost"
                                size="sm"
                                className="text-blue-600 hover:text-blue-800 hover:bg-blue-50"
                                onClick={() => {
                                  setSelectedCompany(company)
                                  setCurrentView("detail")
                                }}
                              >
                                <Eye className="h-4 w-4 mr-1" />
                                View
                              </Button>
                            </TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </TabsContent>
                </Tabs>
              </CardContent>
            </Card>
          </main>
        ) : (
          <CompanyDetailView 
            company={selectedCompany} 
            onBack={() => setCurrentView("list")} 
          />
        )}
      </div>
    </div>
  )
}
