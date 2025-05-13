import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';
import { nanoid } from 'nanoid';

const prisma = new PrismaClient();

// Verifica a conexão com o banco
async function checkDatabaseConnection() {
  try {
    await prisma.$connect();
    return true;
  } catch (error) {
    console.error('Erro ao conectar com o banco:', error);
    return false;
  }
}

export async function POST(request: Request) {
  try {
    // Verifica conexão com o banco
    const isConnected = await checkDatabaseConnection();
    if (!isConnected) {
      throw new Error('Não foi possível conectar ao banco de dados');
    }

    const body = await request.json();
    console.log('Dados recebidos:', body);
    
    const { recipientName, address, city, state, zipCode, phone, email } = body;

    // Validação dos campos obrigatórios
    if (!recipientName || !address || !city || !state || !zipCode || !phone || !email) {
      return NextResponse.json(
        { error: 'Todos os campos são obrigatórios' },
        { status: 400 }
      );
    }

    // Gera um código único de rastreamento
    const code = nanoid(10).toUpperCase();

    // Cria o rastreio e o evento inicial em uma transação
    const tracking = await prisma.$transaction(async (prisma) => {
      const newTracking = await prisma.tracking.create({
        data: {
          code,
          status: 'PENDING',
          recipientName,
          address,
          city,
          state,
          zipCode,
          phone,
          email,
        },
      });

      // Cria o evento inicial
      await prisma.trackingEvent.create({
        data: {
          status: 'PENDING',
          location: 'Centro de Distribuição',
          description: 'Pedido registrado no sistema',
          trackingId: newTracking.id,
        },
      });

      return newTracking;
    });

    return NextResponse.json(tracking);
  } catch (error) {
    console.error('Erro detalhado ao criar rastreio:', error);
    return NextResponse.json(
      { 
        error: 'Erro ao criar rastreio', 
        details: error instanceof Error ? error.message : 'Erro desconhecido'
      },
      { status: 500 }
    );
  } finally {
    await prisma.$disconnect();
  }
}

export async function GET(request: Request) {
  try {
    // Verifica conexão com o banco
    const isConnected = await checkDatabaseConnection();
    if (!isConnected) {
      throw new Error('Não foi possível conectar ao banco de dados');
    }

    const { searchParams } = new URL(request.url);
    const code = searchParams.get('code');

    if (!code) {
      return NextResponse.json(
        { error: 'Código de rastreamento não fornecido' },
        { status: 400 }
      );
    }

    const tracking = await prisma.tracking.findUnique({
      where: { code },
      include: {
        events: {
          orderBy: {
            createdAt: 'desc'
          }
        }
      }
    });

    if (!tracking) {
      return NextResponse.json(
        { error: 'Rastreamento não encontrado' },
        { status: 404 }
      );
    }

    return NextResponse.json(tracking);
  } catch (error) {
    console.error('Erro detalhado ao buscar rastreamento:', error);
    return NextResponse.json(
      { 
        error: 'Erro ao buscar rastreamento', 
        details: error instanceof Error ? error.message : 'Erro desconhecido'
      },
      { status: 500 }
    );
  } finally {
    await prisma.$disconnect();
  }
} 