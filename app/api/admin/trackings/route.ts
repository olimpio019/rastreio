import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function GET() {
  try {
    console.log('Iniciando busca de rastreios...');
    
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

    console.log(`Encontrados ${trackings.length} rastreios`);
    console.log('Rastreios:', trackings);

    return new NextResponse(JSON.stringify(trackings), {
      headers: {
        'Content-Type': 'application/json',
        'Cache-Control': 'no-store, no-cache, must-revalidate, proxy-revalidate',
        'Pragma': 'no-cache',
        'Expires': '0'
      }
    });
  } catch (error) {
    console.error('Erro detalhado ao buscar rastreios:', error);
    return NextResponse.json(
      { 
        error: 'Erro ao buscar rastreios',
        details: error instanceof Error ? error.message : 'Erro desconhecido'
      },
      { 
        status: 500,
        headers: {
          'Cache-Control': 'no-store, no-cache, must-revalidate, proxy-revalidate',
          'Pragma': 'no-cache',
          'Expires': '0'
        }
      }
    );
  } finally {
    await prisma.$disconnect();
  }
} 