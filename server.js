import app from "./src/app.js";

import conexao from "./infra/conexao.js";

const PORT = 3000;

// Fazer a conexão
conexao.connect((erro) => {
  if (erro) {
    console.log("Conexão falhou");
  } else {
    console.log("Conexão realizada com sucessso");
    app.listen(PORT, () => {
      console.log(`Servidor rodando no endereço http://localhost:${PORT}`);
    });
  }
});
