import { LayoutDashboard, Building2, FileText, Settings, LogOut, Search, Filter, Layers } from "lucide-react"
import Link from "next/link"
import Image from "next/image"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Card } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination"

interface Report {
  id: string
  reportId: string
  title: string
  company: string
  submittedBy: {
    name: string
    avatarUrl: string
  }
  status: "Pending Review" | "Approved" | "Rejected"
  submissionDate: string
}

const reportsData: Report[] = [
  {
    id: "1",
    reportId: "#REP-2023-001",
    title: "Q2 Production Analysis",
    company: "Metalúrgica Nacional",
    submittedBy: { name: "Carlos Oliveira", avatarUrl: "/avatars/avatar-1.png" },
    status: "Pending Review",
    submissionDate: "May 28, 2023",
  },
  {
    id: "2",
    reportId: "#REP-2023-002",
    title: "Safety Compliance Report",
    company: "Indústria Química SA",
    submittedBy: { name: "Ana Pereira", avatarUrl: "/avatars/avatar-2.png" },
    status: "Approved",
    submissionDate: "May 15, 2023",
  },
  {
    id: "3",
    reportId: "#REP-2023-003",
    title: "Environmental Impact Assessment",
    company: "Têxtil Brasileira Ltda",
    submittedBy: { name: "Marcos Santos", avatarUrl: "/avatars/avatar-3.png" },
    status: "Rejected",
    submissionDate: "May 10, 2023",
  },
  {
    id: "4",
    reportId: "#REP-2023-004",
    title: "Equipment Maintenance Schedule",
    company: "Metalúrgica Nacional",
    submittedBy: { name: "Roberto Lima", avatarUrl: "/avatars/avatar-4.png" },
    status: "Pending Review",
    submissionDate: "May 5, 2023",
  },
  {
    id: "5",
    reportId: "#REP-2023-005",
    title: "Quality Control Analysis",
    company: "Indústria Química SA",
    submittedBy: { name: "Juliana Costa", avatarUrl: "/avatars/avatar-5.png" },
    status: "Approved",
    submissionDate: "April 28, 2023",
  },
]

export default function ReportsPage() {
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
              href="/" // Assuming a general dashboard page exists or will be created
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
              href="/settings" // Assuming a settings page
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
          <div className="relative ml-auto flex-1 md:grow-0">{/* Search input is part of main content */}</div>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon" className="overflow-hidden rounded-full w-8 h-8">
                <Image
                  src="/avatars/user-avatar.png" // Re-use existing user avatar
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
        <main className="grid flex-1 items-start gap-4 p-4 sm:px-6 sm:py-0 md:gap-8">
          <div className="flex items-center justify-between">
            <h1 className="text-2xl font-semibold">Reports</h1>
          </div>
          <div className="flex items-center gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input type="search" placeholder="Search reports..." className="pl-8 w-full sm:w-[300px]" />
            </div>
            <Button variant="outline">
              <Filter className="mr-2 h-4 w-4" /> Filter
            </Button>
            {/* No "Add Report" button in screenshot */}
          </div>

          <Tabs defaultValue="all">
            <TabsList>
              <TabsTrigger value="all">All Reports</TabsTrigger>
              <TabsTrigger value="pending">Pending Review</TabsTrigger>
              <TabsTrigger value="approved">Approved</TabsTrigger>
              <TabsTrigger value="rejected">Rejected</TabsTrigger>
            </TabsList>
            <TabsContent value="all">
              <Card>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Report ID</TableHead>
                      <TableHead className="w-[300px]">Title</TableHead>
                      <TableHead>Company</TableHead>
                      <TableHead>Submitted By</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Submission Date</TableHead>
                      <TableHead className="text-right">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {reportsData.map((report) => (
                      <TableRow key={report.id}>
                        <TableCell className="font-medium">{report.reportId}</TableCell>
                        <TableCell>{report.title}</TableCell>
                        <TableCell>{report.company}</TableCell>
                        <TableCell>
                          <div className="flex items-center gap-2">
                            <Avatar className="h-8 w-8">
                              <AvatarImage
                                src={report.submittedBy.avatarUrl || "/placeholder.svg"}
                                alt={report.submittedBy.name}
                              />
                              <AvatarFallback>{report.submittedBy.name.substring(0, 1)}</AvatarFallback>
                            </Avatar>
                            <span>{report.submittedBy.name}</span>
                          </div>
                        </TableCell>
                        <TableCell>
                          <Badge
                            variant={
                              report.status === "Approved"
                                ? "default"
                                : report.status === "Pending Review"
                                  ? "outline"
                                  : "destructive" // Using destructive for Rejected
                            }
                            className={
                              report.status === "Approved"
                                ? "bg-green-100 text-green-700 border-green-200"
                                : report.status === "Pending Review"
                                  ? "bg-yellow-100 text-yellow-700 border-yellow-200"
                                  : "bg-red-100 text-red-700 border-red-200"
                            }
                          >
                            {report.status}
                          </Badge>
                        </TableCell>
                        <TableCell>{report.submissionDate}</TableCell>
                        <TableCell className="text-right">
                          <Link href={`/reports/${report.reportId.replace("#", "")}`}>
                            <Button variant="link" size="sm" className="text-blue-600">
                              View
                            </Button>
                          </Link>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </Card>
              <div className="flex items-center justify-between mt-4">
                <p className="text-sm text-muted-foreground">Showing 1 to 5 of 28 results</p>
                <Pagination>
                  <PaginationContent>
                    <PaginationItem>
                      <PaginationPrevious href="#" />
                    </PaginationItem>
                    <PaginationItem>
                      <PaginationLink href="#" isActive>
                        1
                      </PaginationLink>
                    </PaginationItem>
                    <PaginationItem>
                      <PaginationLink href="#">2</PaginationLink>
                    </PaginationItem>
                    <PaginationItem>
                      <PaginationLink href="#">3</PaginationLink>
                    </PaginationItem>
                    <PaginationItem>
                      <PaginationLink href="#">4</PaginationLink>
                    </PaginationItem>
                    <PaginationItem>
                      <PaginationLink href="#">5</PaginationLink>
                    </PaginationItem>
                    <PaginationItem>
                      <PaginationEllipsis />
                    </PaginationItem>
                    <PaginationItem>
                      <PaginationNext href="#" />
                    </PaginationItem>
                  </PaginationContent>
                </Pagination>
              </div>
            </TabsContent>
            {/* Add TabsContent for "pending", "approved", "rejected" if needed */}
          </Tabs>
        </main>
      </div>
    </div>
  )
}
