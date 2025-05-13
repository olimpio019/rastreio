import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function GET() {
  try {
    const trackings = await prisma.tracking.findMany({
      orderBy: {
        createdAt: 'desc'
      },
      select: {
        id: true,
        code: true,
        status: true,
        recipientName: true,
        address: true,
        city: true,
        state: true,
        zipCode: true,
        phone: true,
        email: true,
        description: true,
        createdAt: true,
        updatedAt: true
      }
    });

    return NextResponse.json(trackings);
  } catch (error) {
    console.error('Erro ao buscar rastreios:', error);
    return NextResponse.json(
      { error: 'Erro ao buscar rastreios' },
      { status: 500 }
    );
  }
} 