const bcrypt = require('bcryptjs');

const senha = 'admin123'; // Você pode mudar esta senha para a que desejar
bcrypt.hash(senha, 10, function(err, hash) {
  if (err) throw err;
  console.log('Senha:', senha);
  console.log('Hash gerado:', hash);
}); 