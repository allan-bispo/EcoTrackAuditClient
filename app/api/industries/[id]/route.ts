import { NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"

export async function PUT(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const body = await request.json()
    const { name, location, status, type, capacity, description, maxCO2Emission } = body

    // Primeiro verifica se a indústria existe
    const existingIndustry = await prisma.industry.findUnique({
      where: {
        id: params.id
      }
    })

    if (!existingIndustry) {
      return NextResponse.json(
        { error: 'Indústria não encontrada' },
        { status: 404 }
      )
    }

    const updatedIndustry = await prisma.industry.update({
      where: {
        id: params.id
      },
      data: {
        name,
        location,
        status,
        type,
        capacity,
        description,
        maxCO2Emission
      },
      include: {
        alerts: true
      }
    })

    // Formata os dados para retornar
    const formattedIndustry = {
      ...updatedIndustry,
      alerts: updatedIndustry.alerts.length,
      compliance: 95, // Valor mockado por enquanto
      lastInspection: updatedIndustry.updatedAt,
      maxCO2Emission: updatedIndustry.maxCO2Emission
    }

    return NextResponse.json(formattedIndustry)
  } catch (error) {
    console.error('Erro ao atualizar indústria:', error)
    return NextResponse.json(
      { error: 'Erro ao atualizar indústria' },
      { status: 500 }
    )
  }
} 