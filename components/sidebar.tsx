"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { signOut, useSession } from "next-auth/react"
import { 
  LayoutDashboard, 
  Building2, 
  AlertTriangle, 
  Users, 
  Settings, 
  LogOut,
  ChevronLeft,
  ChevronRight,
  FileText,
  Shield,
  User
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { useState } from "react"
import { cn } from "@/lib/utils"

const menuItems = [
  {
    title: "Dashboard",
    href: "/dashboard",
    icon: LayoutDashboard
  },
  {
    title: "Fábricas",
    href: "/dashboard/factories",
    icon: Building2
  },
  {
    title: "Alertas",
    href: "/dashboard/alerts",
    icon: AlertTriangle
  }
]

export function Sidebar() {
  const pathname = usePathname()
  const { data: session } = useSession()
  const [collapsed, setCollapsed] = useState(false)

  return (
    <div className={cn("flex h-screen flex-col border-r bg-white dark:bg-gray-900", collapsed ? "w-20" : "w-64")}>
      {/* Logo */}
      <div className="flex h-14 items-center border-b px-4">
        <Link href="/dashboard" className="flex items-center gap-2 font-semibold">
          <Shield className="h-6 w-6" />
          <span className={cn("text-lg", collapsed && "hidden")}>EcoTrack</span>
        </Link>
      </div>

      {/* Menu */}
      <nav className="flex-1 p-4 space-y-1">
        {menuItems.map((item) => {
          const isActive = pathname === item.href
          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "flex items-center space-x-3 px-3 py-2 rounded-lg transition-colors",
                isActive
                  ? "bg-blue-50 text-blue-600"
                  : "text-gray-600 hover:bg-gray-50"
              )}
            >
              <item.icon className="h-5 w-5" />
              {!collapsed && <span>{item.title}</span>}
            </Link>
          )
        })}
      </nav>

      {/* User Section - Fixed at bottom */}
      <div className="border-t p-4">
        <div className="flex items-center gap-3">
          <div className="flex h-9 w-9 items-center justify-center rounded-full bg-gray-100">
            <User className="h-5 w-5 text-gray-600" />
          </div>
          {!collapsed && (
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-gray-900 truncate">
                {session?.user?.name || "Usuário"}
              </p>
              <p className="text-xs text-gray-500 truncate">
                {session?.user?.email || "usuario@exemplo.com"}
              </p>
            </div>
          )}
          <Button
            variant="ghost"
            size="icon"
            onClick={() => signOut()}
            className="h-9 w-9"
          >
            <LogOut className="h-5 w-5" />
          </Button>
        </div>
      </div>
    </div>
  )
} 