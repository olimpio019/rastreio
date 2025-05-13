import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function GET(
  request: Request,
  { params }: { params: { code: string } }
) {
  try {
    const tracking = await prisma.tracking.findUnique({
      where: {
        code: params.code,
      },
      include: {
        events: {
          orderBy: {
            createdAt: 'desc',
          },
        },
      },
    });

    if (!tracking) {
      return NextResponse.json(
        { error: 'Rastreio não encontrado' },
        { status: 404 }
      );
    }

    return NextResponse.json(tracking);
  } catch (error) {
    console.error('Erro ao buscar rastreio:', error);
    return NextResponse.json(
      { error: 'Erro ao buscar rastreio' },
      { status: 500 }
    );
  }
}

export async function PUT(
  request: Request,
  { params }: { params: { code: string } }
) {
  try {
    const body = await request.json();
    const { status, location, description } = body;

    const tracking = await prisma.tracking.findUnique({
      where: {
        code: params.code,
      },
    });

    if (!tracking) {
      return NextResponse.json(
        { error: 'Rastreio não encontrado' },
        { status: 404 }
      );
    }

    const [updatedTracking, newEvent] = await prisma.$transaction([
      prisma.tracking.update({
        where: {
          code: params.code,
        },
        data: {
          status,
        },
      }),
      prisma.trackingEvent.create({
        data: {
          status,
          location,
          description,
          trackingId: tracking.id,
        },
      }),
    ]);

    const updatedTrackingWithEvents = await prisma.tracking.findUnique({
      where: {
        id: updatedTracking.id,
      },
      include: {
        events: {
          orderBy: {
            createdAt: 'desc',
          },
        },
      },
    });

    return NextResponse.json(updatedTrackingWithEvents);
  } catch (error) {
    console.error('Erro ao atualizar rastreio:', error);
    return NextResponse.json(
      { error: 'Erro ao atualizar rastreio' },
      { status: 500 }
    );
  }
} 