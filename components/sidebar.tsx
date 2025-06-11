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
  ChevronRight
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
  },
  {
    title: "Auditores",
    href: "/dashboard/auditors",
    icon: Users
  },
  {
    title: "Configurações",
    href: "/dashboard/settings",
    icon: Settings
  }
]

export function Sidebar() {
  const pathname = usePathname()
  const { data: session } = useSession()
  const [collapsed, setCollapsed] = useState(false)

  return (
    <div className={cn(
      "h-screen bg-white border-r flex flex-col transition-all duration-300",
      collapsed ? "w-20" : "w-64"
    )}>
      {/* Logo e Toggle */}
      <div className="p-4 border-b flex items-center justify-between">
        {!collapsed && (
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center">
              <span className="text-white font-bold text-sm">GM</span>
            </div>
            <span className="font-semibold">GovMonitor</span>
          </div>
        )}
        <Button
          variant="ghost"
          size="icon"
          onClick={() => setCollapsed(!collapsed)}
          className="ml-auto"
        >
          {collapsed ? <ChevronRight className="h-4 w-4" /> : <ChevronLeft className="h-4 w-4" />}
        </Button>
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

      {/* Perfil do Usuário */}
      <div className="p-4 border-t">
        {!collapsed ? (
          <div className="flex items-center space-x-3">
            <div className="w-8 h-8 bg-gray-200 rounded-full flex items-center justify-center">
              <span className="text-gray-600 font-medium text-sm">
                {session?.user?.name?.[0] || session?.user?.email?.[0] || "U"}
              </span>
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-gray-900 truncate">
                {session?.user?.name || session?.user?.email}
              </p>
              <p className="text-xs text-gray-500 truncate">
                {session?.user?.email?.split('@')[0] || "Usuário"}
              </p>
            </div>
            <Button
              variant="ghost"
              size="icon"
              onClick={() => signOut()}
              className="text-gray-500 hover:text-red-500"
            >
              <LogOut className="h-4 w-4" />
            </Button>
          </div>
        ) : (
          <div className="flex flex-col items-center space-y-2">
            <div className="w-8 h-8 bg-gray-200 rounded-full flex items-center justify-center">
              <span className="text-gray-600 font-medium text-sm">
                {session?.user?.name?.[0] || session?.user?.email?.[0] || "U"}
              </span>
            </div>
            <Button
              variant="ghost"
              size="icon"
              onClick={() => signOut()}
              className="text-gray-500 hover:text-red-500"
            >
              <LogOut className="h-4 w-4" />
            </Button>
          </div>
        )}
      </div>
    </div>
  )
} 