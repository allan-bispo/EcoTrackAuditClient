import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { Prisma } from "@prisma/client";

export async function GET() {
  try {
    const industries = await prisma.industry.findMany({
      include: {
        _count: {
          select: {
            alerts: true
          }
        }
      }
    });

    // Calcular conformidade baseada nos alertas
    const industriesWithCompliance = industries.map(industry => {
      const totalAlerts = industry._count.alerts;
      const compliance = industry.maxCO2Emission > 0
        ? Math.round((industry.currentCO2Emission / industry.maxCO2Emission) * 100)
        : 0;
      
      return {
        id: industry.id,
        name: industry.name,
        location: industry.location,
        status: industry.status,
        type: industry.type,
        capacity: industry.capacity,
        description: industry.description,
        alerts: totalAlerts,
        compliance: compliance,
        lastInspection: industry.updatedAt.toISOString().split('T')[0],
        maxCO2Emission: industry.maxCO2Emission,
        currentCO2Emission: industry.currentCO2Emission
      };
    });

    return NextResponse.json(industriesWithCompliance);
  } catch (error) {
    console.error("Erro ao buscar indústrias:", error);
    return NextResponse.json(
      { error: "Erro ao buscar indústrias" },
      { status: 500 }
    );
  }
}

export async function POST(request: Request) {
  try {
    const data = await request.json();

    const industry = await prisma.industry.create({
      data
    });

    return NextResponse.json(industry);
  } catch (error) {
    console.error("Erro ao criar indústria:", error);
    return NextResponse.json(
      { error: "Erro ao criar indústria" },
      { status: 500 }
    );
  }
} 