"use client" // Required for recharts
import Link from "next/link"
import Image from "next/image"
import {
  LayoutDashboard,
  Building2,
  FileText,
  Settings,
  LogOut,
  Layers,
  Download,
  FileSignature,
  Bell,
  PlusCircle,
  ChevronRight,
  FileSearch,
  CheckCircle2,
  AlertTriangle,
  FileWarning,
  TrendingUp,
  TrendingDown,
} from "lucide-react"
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
} from "recharts"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Badge } from "@/components/ui/badge"

const overviewStats = [
  {
    title: "Companies Audited",
    value: "24",
    change: "+12%",
    changeType: "positive" as "positive" | "negative",
    icon: Building2,
    iconColor: "text-blue-500",
    bgColor: "bg-blue-50",
  },
  {
    title: "Pending Reports",
    value: "8",
    change: "+2 today",
    changeType: "positive" as "positive" | "negative",
    icon: FileSearch,
    iconColor: "text-yellow-500",
    bgColor: "bg-yellow-50",
  },
  {
    title: "Approved Reports",
    value: "156",
    change: "+18% this month",
    changeType: "positive" as "positive" | "negative",
    icon: CheckCircle2,
    iconColor: "text-green-500",
    bgColor: "bg-green-50",
  },
  {
    title: "Critical Issues",
    value: "3",
    description: "Requires attention",
    icon: AlertTriangle,
    iconColor: "text-red-500",
    bgColor: "bg-red-50",
  },
]

const reportsOverviewData = [
  { name: "Jan", "Reports Submitted": 12, "Reports Approved": 8 },
  { name: "Feb", "Reports Submitted": 19, "Reports Approved": 15 },
  { name: "Mar", "Reports Submitted": 15, "Reports Approved": 12 },
  { name: "Apr", "Reports Submitted": 25, "Reports Approved": 20 },
  { name: "May", "Reports Submitted": 22, "Reports Approved": 18 },
  { name: "Jun", "Reports Submitted": 30, "Reports Approved": 25 },
]

const complianceStatusData = [
  { name: "Compliant", value: 70, color: "#10B981" }, // green-500
  { name: "Minor Issues", value: 20, color: "#F59E0B" }, // amber-500
  { name: "Major Issues", value: 10, color: "#EF4444" }, // red-500
]

const recentReportsData = [
  {
    id: "1",
    title: "Q2 Production Analysis",
    company: "Metalúrgica Nacional",
    status: "Pending",
    time: "2 hours ago",
    icon: FileSearch,
    iconColor: "text-blue-500",
    bgColor: "bg-blue-50",
  },
  {
    id: "2",
    title: "Safety Compliance Report",
    company: "Indústria Química SA",
    status: "Approved",
    time: "1 day ago",
    icon: CheckCircle2,
    iconColor: "text-green-500",
    bgColor: "bg-green-50",
  },
  {
    id: "3",
    title: "Environmental Impact Assessment",
    company: "Têxtil Brasileira Ltda",
    status: "Rejected",
    time: "3 days ago",
    icon: FileWarning,
    iconColor: "text-red-500",
    bgColor: "bg-red-50",
  },
]

const quickActionsData = [
  { id: "1", title: "New Audit", icon: PlusCircle, href: "/companies/new" }, // Assuming new audit relates to adding a company or similar
  { id: "2", title: "Export Data", icon: Download, href: "#" },
  { id: "3", title: "Schedule Review", icon: FileSignature, href: "#" },
  { id: "4", title: "Notifications", icon: Bell, href: "#", badgeCount: 3 },
]

export default function DashboardPage() {
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
              className="flex items-center gap-3 rounded-lg bg-muted px-3 py-2 text-primary transition-all hover:text-primary"
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
            <Link
              href="/"
              className="font-bold text-foreground transition-colors hover:text-foreground border-b-2 border-primary pb-1"
            >
              Dashboard
            </Link>
            <Link href="/reports" className="text-muted-foreground transition-colors hover:text-foreground">
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
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2">
            <div>
              <h1 className="text-2xl font-semibold">Dashboard</h1>
              <p className="text-muted-foreground">
                Welcome back, Auditor Silva. Here's what's happening in your audits.
              </p>
            </div>
            <Button className="bg-blue-600 hover:bg-blue-700 text-white">
              <Download className="mr-2 h-4 w-4" />
              Export Report
            </Button>
          </div>

          {/* Overview Stats */}
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            {overviewStats.map((stat) => (
              <Card key={stat.title} className="shadow-sm">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium text-muted-foreground">{stat.title}</CardTitle>
                  <div className={`p-1.5 rounded-md ${stat.bgColor}`}>
                    <stat.icon className={`h-5 w-5 ${stat.iconColor}`} />
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="text-3xl font-bold">{stat.value}</div>
                  {stat.change && (
                    <p
                      className={`text-xs ${stat.changeType === "positive" ? "text-green-600" : "text-red-600"} flex items-center`}
                    >
                      {stat.changeType === "positive" ? (
                        <TrendingUp className="h-3 w-3 mr-1" />
                      ) : (
                        <TrendingDown className="h-3 w-3 mr-1" />
                      )}
                      {stat.change}
                    </p>
                  )}
                  {stat.description && <p className="text-xs text-red-600">{stat.description}</p>}
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Charts */}
          <div className="grid gap-6 md:grid-cols-2">
            <Card className="shadow-sm">
              <CardHeader>
                <CardTitle>Reports Overview</CardTitle>
              </CardHeader>
              <CardContent className="h-[300px] pr-6">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={reportsOverviewData}>
                    <CartesianGrid strokeDasharray="3 3" vertical={false} />
                    <XAxis dataKey="name" fontSize={12} tickLine={false} axisLine={false} />
                    <YAxis fontSize={12} tickLine={false} axisLine={false} allowDecimals={false} />
                    <Tooltip
                      contentStyle={{
                        backgroundColor: "white",
                        borderRadius: "0.5rem",
                        boxShadow: "0 2px 10px rgba(0,0,0,0.1)",
                      }}
                      labelStyle={{ fontWeight: "bold" }}
                    />
                    <Legend verticalAlign="top" height={36} iconSize={10} wrapperStyle={{ paddingBottom: "10px" }} />
                    <Line
                      type="monotone"
                      dataKey="Reports Submitted"
                      stroke="#3B82F6"
                      strokeWidth={2}
                      dot={{ r: 4 }}
                      activeDot={{ r: 6 }}
                    />
                    <Line
                      type="monotone"
                      dataKey="Reports Approved"
                      stroke="#10B981"
                      strokeWidth={2}
                      dot={{ r: 4 }}
                      activeDot={{ r: 6 }}
                    />
                  </LineChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
            <Card className="shadow-sm">
              <CardHeader>
                <CardTitle>Compliance Status</CardTitle>
              </CardHeader>
              <CardContent className="h-[300px] flex items-center justify-center">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={complianceStatusData}
                      cx="50%"
                      cy="50%"
                      innerRadius="60%"
                      outerRadius="80%"
                      paddingAngle={2}
                      dataKey="value"
                    >
                      {complianceStatusData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} stroke={entry.color} />
                      ))}
                    </Pie>
                    <Tooltip
                      contentStyle={{
                        backgroundColor: "white",
                        borderRadius: "0.5rem",
                        boxShadow: "0 2px 10px rgba(0,0,0,0.1)",
                      }}
                    />
                    <Legend
                      layout="horizontal"
                      verticalAlign="bottom"
                      align="center"
                      iconSize={10}
                      wrapperStyle={{ paddingTop: "10px" }}
                    />
                  </PieChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </div>

          {/* Recent Reports and Quick Actions */}
          <div className="grid gap-6 md:grid-cols-3">
            <Card className="md:col-span-2 shadow-sm">
              <CardHeader>
                <CardTitle>Recent Reports</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {recentReportsData.map((report) => (
                  <div
                    key={report.id}
                    className="flex items-center gap-3 p-3 hover:bg-muted/50 rounded-md transition-colors"
                  >
                    <div className={`p-2 rounded-md ${report.bgColor}`}>
                      <report.icon className={`h-5 w-5 ${report.iconColor}`} />
                    </div>
                    <div className="flex-1">
                      <p className="font-medium text-sm">{report.title}</p>
                      <p className="text-xs text-muted-foreground">{report.company}</p>
                    </div>
                    <div className="text-right">
                      <Badge
                        variant={
                          report.status === "Approved"
                            ? "default"
                            : report.status === "Pending"
                              ? "outline"
                              : "destructive"
                        }
                        className={
                          report.status === "Approved"
                            ? "bg-green-100 text-green-700 border-green-200 text-xs"
                            : report.status === "Pending"
                              ? "bg-yellow-100 text-yellow-700 border-yellow-200 text-xs"
                              : "bg-red-100 text-red-700 border-red-200 text-xs"
                        }
                      >
                        {report.status}
                      </Badge>
                      <p className="text-xs text-muted-foreground mt-0.5">{report.time}</p>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>
            <Card className="shadow-sm">
              <CardHeader>
                <CardTitle>Quick Actions</CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                {quickActionsData.map((action) => (
                  <Link href={action.href} key={action.id}>
                    <Button variant="ghost" className="w-full justify-between h-12 px-3 hover:bg-muted/80">
                      <div className="flex items-center gap-3">
                        <action.icon className="h-5 w-5 text-muted-foreground" />
                        <span className="text-sm font-medium">{action.title}</span>
                      </div>
                      {action.badgeCount && (
                        <Badge className="bg-red-500 text-white text-xs px-1.5 py-0.5">{action.badgeCount}</Badge>
                      )}
                      {!action.badgeCount && <ChevronRight className="h-4 w-4 text-muted-foreground" />}
                    </Button>
                  </Link>
                ))}
              </CardContent>
            </Card>
          </div>
        </main>
      </div>
    </div>
  )
}
