import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function PATCH(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const body = await request.json();
    const { status, resolvedAt } = body;

    // Primeiro verifica se o alerta existe
    const existingAlert = await prisma.alert.findUnique({
      where: {
        id: params.id
      }
    });

    if (!existingAlert) {
      return NextResponse.json(
        { error: 'Alerta não encontrado' },
        { status: 404 }
      );
    }

    const updatedAlert = await prisma.alert.update({
      where: {
        id: params.id
      },
      data: {
        status,
        resolvedAt: resolvedAt ? new Date(resolvedAt) : null
      },
      include: {
        industry: {
          select: {
            name: true
          }
        },
        actions: true
      }
    });

    return NextResponse.json(updatedAlert);
  } catch (error) {
    console.error('Erro ao atualizar alerta:', error);
    return NextResponse.json(
      { error: 'Erro ao atualizar alerta' },
      { status: 500 }
    );
  }
}

export async function DELETE(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const { id } = params;

    await prisma.alert.delete({
      where: { id }
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Erro ao deletar alerta:", error);
    return NextResponse.json(
      { error: "Erro ao deletar alerta" },
      { status: 500 }
    );
  }
} 