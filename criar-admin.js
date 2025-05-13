const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function criarAdmin() {
  try {
    const admin = await prisma.user.create({
      data: {
        email: 'admin@exemplo.com',
        password: '$2b$10$RB3zgnpeDOWHM/XAWR0h.unqAABNU39FdwcmZPP7apRC7h9v3C4RW',
        name: 'Administrador',
        role: 'ADMIN'
      }
    });
    console.log('Usuário admin criado com sucesso:', admin);
  } catch (error) {
    console.error('Erro ao criar usuário admin:', error);
  } finally {
    await prisma.$disconnect();
  }
}

criarAdmin(); 