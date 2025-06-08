"use client" // For client-side interactions like back button and potential future state management

import type React from "react"

import Link from "next/link"
import Image from "next/image"
import { useRouter } from "next/navigation" // For back button
import {
  LayoutDashboard,
  Building2,
  FileText,
  Settings,
  LogOut,
  Layers,
  ArrowLeft,
  FileJson,
  User,
  CalendarDays,
  AlertOctagon,
  Tags,
  HardDrive,
  Percent,
  Download,
  CheckCircle,
  XCircle,
  MessageSquareWarning,
  Share2,
  Printer,
  UploadCloud,
  Eye,
} from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar"
import { Progress } from "@/components/ui/progress"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

// Mock data for a single report - in a real app, this would come from an API based on params.reportId
const reportDetailData = {
  id: "REP-2023-001",
  title: "Q2 Production Analysis",
  status: "Pending Review",
  company: "Metalúrgica Nacional",
  submittedBy: {
    name: "Carlos Oliveira",
    avatarUrl: "/avatars/avatar-1.png",
  },
  department: "Production Management",
  submissionDate: "May 28, 2023 at 14:30",
  priorityLevel: "High Priority",
  category: "Production Analysis",
  fileSize: "2.4 MB",
  complianceScore: 85,
  summary:
    "This report provides a comprehensive analysis of Q2 production metrics for Metalúrgica Nacional. The analysis includes production volume, quality control measures, equipment efficiency, and environmental compliance indicators. Key findings show a 15% increase in production compared to Q1, with maintained quality standards and improved energy efficiency.",
  attachments: [
    {
      id: "att1",
      name: "production-analysis-q2.pdf",
      size: "1.8 MB",
      icon: FileJson, // Using FileJson for PDF, could be more specific
    },
    {
      id: "att2",
      name: "production-data-q2.xlsx",
      size: "0.6 MB",
      icon: FileText, // Using FileText for XLSX
    },
  ],
  auditTrail: [
    {
      id: "trail1",
      action: "Report Submitted",
      description: "Carlos Oliveira submitted the Q2 Production Analysis report",
      timestamp: "May 28, 2023 at 14:30",
      icon: UploadCloud,
      iconColor: "text-blue-500",
    },
    {
      id: "trail2",
      action: "Under Review",
      description: "Report assigned to Auditor Silva for review",
      timestamp: "May 28, 2023 at 16:45",
      icon: Eye,
      iconColor: "text-yellow-500",
    },
  ],
}

const DetailItem = ({
  label,
  value,
  icon: Icon,
}: { label: string; value: string | React.ReactNode; icon?: React.ElementType }) => (
  <div>
    <p className="text-xs font-medium text-muted-foreground">{label}</p>
    <div className="flex items-center gap-2 mt-1">
      {Icon && <Icon className="h-4 w-4 text-muted-foreground" />}
      {typeof value === "string" ? <p className="text-sm">{value}</p> : value}
    </div>
  </div>
)

export default function ReportDetailsPage({ params }: { params: { reportId: string } }) {
  const router = useRouter()
  // In a real app, fetch report data using params.reportId
  const report = reportDetailData // Using mock data for now

  return (
    <div className="flex min-h-screen w-full bg-muted/40">
      <aside className="fixed inset-y-0 left-0 z-10 hidden w-64 flex-col border-r bg-background sm:flex">
        <div className="flex h-16 items-center border-b px-6">
          <Link href="/" className="flex items-center gap-2 font-semibold">
            <Layers className="h-6 w-6 text-blue-600" />
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
              className="flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary"
            >
              <Building2 className="h-4 w-4" />
              Companies
            </Link>
            <Link
              href="/reports"
              className="flex items-center gap-3 rounded-lg bg-muted px-3 py-2 text-primary transition-all hover:text-primary"
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
            <Link
              href="/reports"
              className="font-bold text-foreground transition-colors hover:text-foreground border-b-2 border-primary pb-1"
            >
              Reports
            </Link>
            <Link href="/companies" className="text-muted-foreground transition-colors hover:text-foreground">
              Companies
            </Link>
          </nav>
          <div className="relative ml-auto flex-1 md:grow-0"></div>
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
        </header>

        <main className="grid flex-1 items-start gap-6 p-4 sm:px-6 sm:py-0 md:gap-8">
          <div className="flex items-center gap-4 mb-4">
            <Button variant="outline" size="icon" onClick={() => router.back()}>
              <ArrowLeft className="h-4 w-4" />
            </Button>
            <h1 className="text-2xl font-semibold">Report Details</h1>
          </div>

          <Card className="shadow-sm">
            <CardHeader className="flex flex-row items-start justify-between gap-4">
              <div>
                <div className="flex items-center gap-3">
                  <FileText className="h-7 w-7 text-blue-600" />
                  <div>
                    <CardTitle className="text-xl">{report.title}</CardTitle>
                    <CardDescription>{report.id}</CardDescription>
                  </div>
                </div>
              </div>
              <Badge
                className={
                  report.status === "Pending Review"
                    ? "bg-yellow-100 text-yellow-700 border-yellow-200"
                    : report.status === "Approved"
                      ? "bg-green-100 text-green-700 border-green-200"
                      : "bg-red-100 text-red-700 border-red-200"
                }
              >
                {report.status}
              </Badge>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid md:grid-cols-2 gap-x-8 gap-y-4 pt-2">
                <DetailItem label="Company" value={report.company} icon={Building2} />
                <DetailItem
                  label="Priority Level"
                  value={
                    <Badge
                      variant="outline"
                      className="border-orange-400 bg-orange-50 text-orange-600 flex items-center gap-1"
                    >
                      <AlertOctagon className="h-3 w-3" /> {report.priorityLevel}
                    </Badge>
                  }
                />
                <DetailItem
                  label="Submitted by"
                  icon={User}
                  value={
                    <div className="flex items-center gap-2">
                      <Avatar className="h-6 w-6">
                        <AvatarImage
                          src={report.submittedBy.avatarUrl || "/placeholder.svg"}
                          alt={report.submittedBy.name}
                        />
                        <AvatarFallback>{report.submittedBy.name.charAt(0)}</AvatarFallback>
                      </Avatar>
                      <span>{report.submittedBy.name}</span>
                    </div>
                  }
                />
                <DetailItem label="Category" value={report.category} icon={Tags} />
                <DetailItem label="Department" value={report.department} />
                <DetailItem label="File Size" value={report.fileSize} icon={HardDrive} />
                <DetailItem label="Submission Date" value={report.submissionDate} icon={CalendarDays} />
                <DetailItem
                  label="Compliance Score"
                  icon={Percent}
                  value={
                    <div className="flex items-center gap-2 w-full">
                      <Progress value={report.complianceScore} className="w-3/4 h-2" />
                      <span className="text-sm font-medium">{report.complianceScore}%</span>
                    </div>
                  }
                />
              </div>

              <div>
                <h3 className="text-sm font-medium text-muted-foreground mb-1">Summary</h3>
                <p className="text-sm bg-muted/50 p-3 rounded-md">{report.summary}</p>
              </div>

              <div>
                <h3 className="text-sm font-medium text-muted-foreground mb-2">Attachments</h3>
                <div className="space-y-2">
                  {report.attachments.map((att) => (
                    <div
                      key={att.id}
                      className="flex items-center justify-between p-3 border rounded-md hover:bg-muted/50"
                    >
                      <div className="flex items-center gap-3">
                        <att.icon className="h-6 w-6 text-gray-500" />
                        <div>
                          <p className="text-sm font-medium">{att.name}</p>
                          <p className="text-xs text-muted-foreground">{att.size}</p>
                        </div>
                      </div>
                      <Button variant="ghost" size="sm" className="text-blue-600 hover:text-blue-700">
                        <Download className="mr-2 h-4 w-4" />
                        Download
                      </Button>
                    </div>
                  ))}
                </div>
              </div>

              <div className="flex flex-wrap items-center justify-between gap-2 pt-4 border-t mt-6">
                <div className="flex gap-2">
                  <Button className="bg-green-600 hover:bg-green-700 text-white">
                    <CheckCircle className="mr-2 h-4 w-4" /> Approve
                  </Button>
                  <Button variant="destructive">
                    <XCircle className="mr-2 h-4 w-4" /> Reject
                  </Button>
                  <Button variant="outline" className="border-orange-400 text-orange-600 hover:bg-orange-50">
                    <MessageSquareWarning className="mr-2 h-4 w-4" /> Request Changes
                  </Button>
                </div>
                <div className="flex gap-2">
                  <Button variant="outline">
                    <Share2 className="mr-2 h-4 w-4" /> Share
                  </Button>
                  <Button variant="outline">
                    <Printer className="mr-2 h-4 w-4" /> Print
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="shadow-sm">
            <CardHeader>
              <CardTitle>Audit Trail</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {report.auditTrail.map((item) => (
                <div key={item.id} className="flex items-start gap-3">
                  <div className={`p-2 rounded-full bg-muted ${item.iconColor}`}>
                    <item.icon className="h-4 w-4" />
                  </div>
                  <div className="flex-1">
                    <p className="text-sm font-medium">{item.action}</p>
                    <p className="text-xs text-muted-foreground">{item.description}</p>
                  </div>
                  <p className="text-xs text-muted-foreground whitespace-nowrap">{item.timestamp}</p>
                </div>
              ))}
            </CardContent>
          </Card>
        </main>
      </div>
    </div>
  )
}
