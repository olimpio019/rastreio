INSERT INTO "User" (id, email, password, name, role, "createdAt", "updatedAt")
VALUES (
  gen_random_uuid(),
  'admin@exemplo.com',
  '$2b$10$RB3zgnpeDOWHM/XAWR0h.unqAABNU39FdwcmZPP7apRC7h9v3C4RW',
  'Administrador',
  'admin',
  CURRENT_TIMESTAMP,
  CURRENT_TIMESTAMP
); 