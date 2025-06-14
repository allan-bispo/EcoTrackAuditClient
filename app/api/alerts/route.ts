import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const status = searchParams.get("status");
    const severity = searchParams.get("severity");
    const search = searchParams.get("search");

    const alerts = await prisma.alert.findMany({
      where: {
        ...(status && status !== "all" ? { status } : {}),
        ...(severity && severity !== "all" ? { severity } : {}),
        ...(search ? {
          OR: [
            { title: { contains: search, mode: 'insensitive' } },
            { description: { contains: search, mode: 'insensitive' } }
          ]
        } : {})
      },
      include: {
        industry: true,
        actions: true
      },
      orderBy: {
        createdAt: 'desc'
      }
    });

    return NextResponse.json(alerts);
  } catch (error) {
    console.error("Erro ao buscar alertas:", error);
    return NextResponse.json(
      { error: "Erro ao buscar alertas" },
      { status: 500 }
    );
  }
}

export async function POST(request: Request) {
  try {
    const data = await request.json();
    const { actions, ...alertData } = data;

    const alert = await prisma.alert.create({
      data: {
        ...alertData,
        actions: {
          create: actions
        }
      },
      include: {
        actions: true
      }
    });

    return NextResponse.json(alert);
  } catch (error) {
    console.error("Erro ao criar alerta:", error);
    return NextResponse.json(
      { error: "Erro ao criar alerta" },
      { status: 500 }
    );
  }
} 