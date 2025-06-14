import { NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"

export async function GET() {
  try {
    const alerts = await prisma.alert.findMany({
      where: {
        status: {
          not: "resolved"
        }
      },
      orderBy: {
        createdAt: "desc"
      },
      take: 3,
      include: {
        industry: {
          select: {
            name: true
          }
        },
        actions: true
      }
    })

    const formattedAlerts = alerts.map(alert => ({
      id: alert.id,
      title: alert.title,
      factory: alert.industry?.name || "Fábrica Desconhecida",
      severity: alert.severity,
      createdAt: alert.createdAt,
      description: alert.description || "Sem descrição",
      details: alert.details || {},
      actions: alert.actions.map(action => ({
        id: action.id,
        type: action.type,
        description: action.description,
        date: action.createdAt,
        status: action.status
      }))
    }))

    return NextResponse.json(formattedAlerts)
  } catch (error) {
    console.error("Erro ao buscar alertas recentes:", error)
    return NextResponse.json(
      { error: "Erro ao buscar alertas recentes" },
      { status: 500 }
    )
  }
} 