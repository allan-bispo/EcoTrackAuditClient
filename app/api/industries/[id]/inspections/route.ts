import { NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"

export async function GET(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const inspections = await prisma.alert.findMany({
      where: {
        industryId: params.id,
        status: {
          in: ['notified', 'resolved']
        }
      },
      orderBy: {
        createdAt: 'desc'
      },
      include: {
        actions: true
      }
    })

    return NextResponse.json(inspections)
  } catch (error) {
    console.error('Erro ao buscar inspeções:', error)
    return NextResponse.json(
      { error: 'Erro ao buscar inspeções' },
      { status: 500 }
    )
  }
} 