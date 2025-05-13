import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function GET() {
  try {
    const [
      total,
      pending,
      inTransit,
      delivered
    ] = await Promise.all([
      prisma.tracking.count(),
      prisma.tracking.count({
        where: {
          status: 'PENDING'
        }
      }),
      prisma.tracking.count({
        where: {
          status: 'IN_TRANSIT'
        }
      }),
      prisma.tracking.count({
        where: {
          status: 'DELIVERED'
        }
      })
    ]);

    return NextResponse.json({
      total,
      pending,
      inTransit,
      delivered
    });
  } catch (error) {
    console.error('Erro ao buscar resumo:', error);
    return NextResponse.json(
      { error: 'Erro ao buscar resumo dos rastreios' },
      { status: 500 }
    );
  }
} 