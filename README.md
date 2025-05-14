# LogExpress - Sistema de Rastreamento de Pedidos

Um sistema profissional para rastreamento de pedidos, desenvolvido com Next.js, TypeScript, Tailwind CSS e PostgreSQL.

## Funcionalidades

- Interface administrativa protegida por autenticação
- Geração automática de códigos de rastreamento
- Dashboard com estatísticas de pedidos
- Histórico detalhado de eventos
- Interface responsiva e moderna
- API RESTful para integração

## Tecnologias Utilizadas

- Next.js 14
- TypeScript
- Tailwind CSS
- PostgreSQL (Neon)
- Prisma ORM
- JWT para autenticação

## Pré-requisitos

- Node.js 18 ou superior
- PostgreSQL (ou conta no Neon)
- NPM ou Yarn

## Instalação

1. Clone o repositório:
```bash
git clone https://github.com/seu-usuario/rastreio.git
cd rastreio
```

2. Instale as dependências:
```bash
npm install
```

3. Configure as variáveis de ambiente:
Crie um arquivo `.env` na raiz do projeto com as seguintes variáveis:
```env
DATABASE_URL="sua_url_do_postgresql"
JWT_SECRET="seu_segredo_jwt"
```

4. Execute as migrações do banco de dados:
```bash
npx prisma generate
npx prisma db push
```

5. Inicie o servidor de desenvolvimento:
```bash
npm run dev
```

O sistema estará disponível em `http://localhost:3000`

## Estrutura do Projeto

```
rastreio/
├── app/
│   ├── admin/           # Painel administrativo
│   ├── api/             # Rotas da API
│   ├── rastreio/        # Páginas de rastreamento
│   ├── globals.css      # Estilos globais
│   └── layout.tsx       # Layout principal
├── prisma/
│   └── schema.prisma    # Schema do banco de dados
├── public/             # Arquivos estáticos
└── components/         # Componentes reutilizáveis
```

## Uso

1. Acesse o painel administrativo em `/admin`
2. Faça login com suas credenciais
3. Crie um novo rastreio preenchendo os dados do destinatário
4. O sistema gerará um código de rastreamento único
5. Compartilhe o código com o cliente
6. O cliente pode rastrear o pedido na página inicial

## API

### Endpoints

- `POST /api/auth` - Autenticação
- `GET /api/admin/summary` - Resumo de rastreios
- `GET /api/admin/trackings` - Lista de rastreios
- `POST /api/tracking` - Criar rastreio
- `GET /api/tracking/:code` - Buscar rastreio
- `PUT /api/tracking/:code` - Atualizar status

## Contribuição

1. Faça um fork do projeto
2. Crie uma branch para sua feature (`git checkout -b feature/nova-feature`)
3. Commit suas mudanças (`git commit -m 'Adiciona nova feature'`)
4. Push para a branch (`git push origin feature/nova-feature`)
5. Abra um Pull Request

## Licença

Este projeto está licenciado sob a licença MIT - veja o arquivo [LICENSE](LICENSE) para detalhes.
