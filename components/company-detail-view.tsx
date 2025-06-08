"use client"

import { Edit, Archive, Phone, Mail, ChevronRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"

interface CompanyDetailViewProps {
  company: any
  onBack: () => void
}

export function CompanyDetailView({ company, onBack }: CompanyDetailViewProps) {
  if (!company) return null

  const complianceStatuses = [
    {
      title: "Environmental",
      status: "Compliant",
      icon: "🌱",
      color: "green",
      bgColor: "bg-green-50",
      borderColor: "border-green-200",
      textColor: "text-green-600",
      iconBg: "bg-green-100"
    },
    {
      title: "Safety",
      status: "Compliant",
      icon: "🛡️",
      color: "green",
      bgColor: "bg-green-50",
      borderColor: "border-green-200",
      textColor: "text-green-600",
      iconBg: "bg-green-100"
    },
    {
      title: "Labor",
      status: "Under Review",
      icon: "👥",
      color: "yellow",
      bgColor: "bg-yellow-50",
      borderColor: "border-yellow-200",
      textColor: "text-yellow-600",
      iconBg: "bg-yellow-100"
    },
    {
      title: "Tax",
      status: "Compliant",
      icon: "💰",
      color: "green",
      bgColor: "bg-green-50",
      borderColor: "border-green-200",
      textColor: "text-green-600",
      iconBg: "bg-green-100"
    },
  ]

  const recentReports = [
    {
      title: "Environmental Impact Report",
      date: "May 28, 2023",
      status: "Approved",
      icon: "🌱",
      bgColor: "bg-green-50",
      iconBg: "bg-green-100",
    },
    {
      title: "Safety Inspection Report",
      date: "May 24, 2023",
      status: "Approved",
      icon: "🛡️",
      bgColor: "bg-blue-50",
      iconBg: "bg-blue-100",
    },
    {
      title: "Labor Compliance Report",
      date: "May 15, 2023",
      status: "Pending",
      icon: "👥",
      bgColor: "bg-yellow-50",
      iconBg: "bg-yellow-100",
    },
  ]

  const certifications = [
    {
      name: "ISO 14001",
      status: "Valid until Dec 2024",
      color: "green",
      dotColor: "bg-green-500",
    },
    {
      name: "ISO 45001",
      status: "Valid until Mar 2024",
      color: "green",
      dotColor: "bg-green-500",
    },
    {
      name: "ISO 9001",
      status: "Expires in 30 days",
      color: "orange",
      dotColor: "bg-orange-500",
    },
  ]

  return (
    <main className="flex-1 p-6">
      {/* Breadcrumb */}
      <div className="flex items-center space-x-2 text-sm text-gray-500 mb-6">
        <button onClick={onBack} className="text-blue-600 hover:text-blue-800 hover:underline">
          Companies
        </button>
        <ChevronRight className="h-4 w-4" />
        <span className="text-gray-900">{company.name}</span>
      </div>

      {/* Company Header */}
      <Card className="mb-6">
        <CardContent className="p-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className="text-4xl">{company.icon}</div>
              <div>
                <h1 className="text-2xl font-bold text-gray-900">{company.name}</h1>
                <p className="text-gray-600">{company.cnpj}</p>
                <div className="flex items-center space-x-4 mt-2">
                  <Badge className="bg-green-100 text-green-800 hover:bg-green-100">{company.status}</Badge>
                  <span className="text-sm text-gray-500">Last updated: {company.lastReport}</span>
                </div>
              </div>
            </div>
            <div className="flex space-x-2">
              <Button className="bg-blue-600 hover:bg-blue-700">
                <Edit className="h-4 w-4 mr-2" />
                Edit Company
              </Button>
              <Button variant="outline">
                <Archive className="h-4 w-4 mr-2" />
                Archive
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="grid grid-cols-12 gap-6">
        {/* Left Column - Company Overview & Compliance */}
        <div className="col-span-4 space-y-6">
          {/* Company Overview */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg font-semibold">Company Overview</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-sm font-medium text-gray-600 mb-1">Industry</p>
                  <p className="text-gray-900">{company.industry}</p>
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-600 mb-1">Founded</p>
                  <p className="text-gray-900">{company.founded}</p>
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-600 mb-1">Employees</p>
                  <p className="text-gray-900">{company.employees}</p>
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-600 mb-1">Annual Revenue</p>
                  <p className="text-gray-900">{company.revenue}</p>
                </div>
              </div>
              <div>
                <p className="text-sm font-medium text-gray-600 mb-1">Address</p>
                <p className="text-gray-900 whitespace-pre-line">{company.address}</p>
              </div>
            </CardContent>
          </Card>

          {/* Compliance Status */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg font-semibold">Compliance Status</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 gap-4">
                {complianceStatuses.map((item, index) => (
                  <div key={index} className={`p-4 rounded-lg border ${item.bgColor} ${item.borderColor}`}>
                    <div className="flex items-center space-x-3">
                      <div className={`p-2 rounded-lg ${item.iconBg || "bg-white"}`}>
                        <span className="text-lg">{item.icon}</span>
                      </div>
                      <div>
                        <p className="font-medium text-gray-900">{item.title}</p>
                        <p className={`text-sm ${item.textColor}`}>{item.status}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Middle Column - Recent Reports */}
        <div className="col-span-4">
          <Card className="h-fit">
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle className="text-lg font-semibold">Recent Reports</CardTitle>
              <Button variant="ghost" className="text-blue-600 hover:text-blue-800 p-0 h-auto">
                View All
              </Button>
            </CardHeader>
            <CardContent className="space-y-4">
              {recentReports.map((report, index) => (
                <div key={index} className="flex items-center justify-between p-4 border rounded-lg hover:bg-gray-50">
                  <div className="flex items-center space-x-3">
                    <div className={`p-2 rounded-lg ${report.iconBg}`}>
                      <span className="text-lg">{report.icon}</span>
                    </div>
                    <div>
                      <p className="font-medium text-gray-900">{report.title}</p>
                      <p className="text-sm text-gray-500">{report.date}</p>
                    </div>
                  </div>
                  <Badge
                    variant={report.status === "Approved" ? "default" : "secondary"}
                    className={
                      report.status === "Approved"
                        ? "bg-green-100 text-green-800 hover:bg-green-100"
                        : "bg-yellow-100 text-yellow-800 hover:bg-yellow-100"
                    }
                  >
                    {report.status}
                  </Badge>
                </div>
              ))}
            </CardContent>
          </Card>
        </div>

        {/* Right Column - Contact, Stats & Certifications */}
        <div className="col-span-4 space-y-6">
          {/* Contact Information */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg font-semibold">Contact Information</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center space-x-3 mb-4">
                <Avatar className="h-12 w-12">
                  <AvatarFallback className="bg-blue-100 text-blue-600 font-medium">
                    {company.contactPerson.avatar}
                  </AvatarFallback>
                </Avatar>
                <div>
                  <p className="font-medium text-gray-900">{company.contactPerson.name}</p>
                  <p className="text-sm text-gray-500">{company.contactPerson.role}</p>
                </div>
              </div>
              <div className="space-y-3">
                <div className="flex items-center space-x-3 text-sm">
                  <Mail className="h-4 w-4 text-gray-400" />
                  <span className="text-blue-600 hover:underline cursor-pointer">{company.contactPerson.email}</span>
                </div>
                <div className="flex items-center space-x-3 text-sm">
                  <Phone className="h-4 w-4 text-gray-400" />
                  <span className="text-gray-600">{company.contactPerson.phone}</span>
                </div>
                <div className="flex items-center space-x-3 text-sm">
                  <Phone className="h-4 w-4 text-gray-400" />
                  <span className="text-gray-600">{company.contactPerson.mobile}</span>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Quick Stats */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg font-semibold">Quick Stats</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex justify-between items-center">
                <span className="text-gray-600">Total Reports</span>
                <span className="font-semibold text-gray-900">24</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-600">Pending Reviews</span>
                <span className="font-semibold text-gray-900">2</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-600">Compliance Score</span>
                <span className="font-semibold text-green-600">92%</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-600">Next Inspection</span>
                <span className="font-semibold text-gray-900">Jun 15, 2023</span>
              </div>
            </CardContent>
          </Card>

          {/* Certifications */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg font-semibold">Certifications</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {certifications.map((cert, index) => (
                <div key={index} className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <div className={`h-2 w-2 rounded-full ${cert.dotColor}`}></div>
                    <span className="font-medium text-gray-900">{cert.name}</span>
                  </div>
                  <span className={`text-sm ${cert.color === "green" ? "text-green-600" : "text-orange-600"}`}>
                    {cert.status}
                  </span>
                </div>
              ))}
            </CardContent>
          </Card>
        </div>
      </div>
    </main>
  )
}
