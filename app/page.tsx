"use client"

import type React from "react"

import { useState } from "react"
import Link from "next/link"
import { Eye, EyeOff, Shield, Factory, Mail, Lock } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Checkbox } from "@/components/ui/checkbox"
import { Card, CardContent } from "@/components/ui/card"

export default function LoginPage() {
  const [userType, setUserType] = useState<"auditoria" | "fabrica">("auditoria")
  const [showPassword, setShowPassword] = useState(false)
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [rememberMe, setRememberMe] = useState(false)

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault()
    // Aqui você implementaria a lógica de login
    console.log({ userType, email, password, rememberMe })
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-blue-100 flex items-center justify-center p-4">
      <Card className="w-full max-w-md bg-white shadow-xl">
        <CardContent className="p-8">
          {/* Logo e Título */}
          <div className="text-center mb-8">
            <div className="w-16 h-16 bg-blue-600 rounded-full flex items-center justify-center mx-auto mb-4">
              <span className="text-white font-bold text-xl">GM</span>
            </div>
            <h1 className="text-2xl font-bold text-gray-900 mb-1">GovMonitor</h1>
            <p className="text-sm text-gray-600">Sistema de Monitoramento Industrial</p>
          </div>

          <form onSubmit={handleLogin} className="space-y-6">
            {/* Tipo de Usuário */}
            <div>
              <Label className="text-sm font-medium text-gray-700 mb-3 block">Tipo de Usuário</Label>
              <div className="grid grid-cols-2 gap-3">
                <button
                  type="button"
                  onClick={() => setUserType("auditoria")}
                  className={`p-4 rounded-lg border-2 transition-all ${
                    userType === "auditoria" ? "border-blue-500 bg-blue-50" : "border-gray-200 hover:border-gray-300"
                  }`}
                >
                  <Shield className="w-6 h-6 mx-auto mb-2 text-blue-600" />
                  <span className="text-sm font-medium">Auditoria</span>
                </button>
                <button
                  type="button"
                  onClick={() => setUserType("fabrica")}
                  className={`p-4 rounded-lg border-2 transition-all ${
                    userType === "fabrica" ? "border-blue-500 bg-blue-50" : "border-gray-200 hover:border-gray-300"
                  }`}
                >
                  <Factory className="w-6 h-6 mx-auto mb-2 text-gray-600" />
                  <span className="text-sm font-medium">Fábrica</span>
                </button>
              </div>
            </div>

            {/* Email */}
            <div>
              <Label htmlFor="email" className="text-sm font-medium text-gray-700 mb-2 block">
                Email
              </Label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <Input
                  id="email"
                  type="email"
                  placeholder="Digite seu email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="pl-10 h-12"
                  required
                />
              </div>
            </div>

            {/* Senha */}
            <div>
              <Label htmlFor="password" className="text-sm font-medium text-gray-700 mb-2 block">
                Senha
              </Label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <Input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  placeholder="Digite sua senha"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="pl-10 pr-10 h-12"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                >
                  {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                </button>
              </div>
            </div>

            {/* Lembrar-me e Esqueceu a senha */}
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <Checkbox
                  id="remember"
                  checked={rememberMe}
                  onCheckedChange={(checked) => setRememberMe(checked as boolean)}
                />
                <Label htmlFor="remember" className="text-sm text-gray-600">
                  Lembrar-me
                </Label>
              </div>
              <Link href="/forgot-password" className="text-sm text-blue-600 hover:text-blue-800">
                Esqueceu a senha?
              </Link>
            </div>

            {/* Botão Entrar */}
            <Button type="submit" className="w-full h-12 bg-blue-600 hover:bg-blue-700">
              Entrar
            </Button>

            {/* Termos de Uso */}
            <p className="text-xs text-gray-500 text-center">
              Ao fazer login, você concorda com nossos{" "}
              <Link href="/terms" className="text-blue-600 hover:text-blue-800">
                Termos de Uso
              </Link>
            </p>
          </form>
        </CardContent>
      </Card>

      {/* Ajuda */}
      <div className="absolute bottom-8 text-center">
        <p className="text-sm text-gray-600">
          Precisa de ajuda?{" "}
          <Link href="/contact" className="text-blue-600 hover:text-blue-800">
            Entre em contato
          </Link>
        </p>
      </div>
    </div>
  )
}
