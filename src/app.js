import express from "express";

const app = express();

// Indicar para o express ler body com json
app.use(express.json());

function buscarSelecaoPorId(id) {
  return selecoes.filter((selecao) => selecao.id == id);
}

function buscarIndexSelecao(id) {
  return selecoes.findIndex((selecao) => selecao.id == id);
}

// ROTAS
app.get("/selecoes", (req, res) => {
  // res.status(200).send(selecoes);
  const sql = "SELECT * FROM selecoes;";
  conexao.query(sql, (erro, res) => {
    if (erro) {
      console.log(erro);
    } else {
      res.status(200).json(resultado);
    }
  });
});

app.get("/selecoes/:id", (req, res) => {
  res.json(buscarSelecaoPorId(req.params.id));
});

app.post("/selecoes", (req, res) => {
  selecoes.push(req.body);
  res.status(201).send("Seleção cadastrada com sucesso!");
});

app.delete("/selecoes/:id", (req, res) => {
  let index = buscarIndexSelecao(req.params.id);
  selecoes.splice(index, 1);
  res.send(`Seleção com o id ${req.params.id} excluida com sucesso`);
});

app.put("/selecoes/:id", (req, res) => {
  let index = buscarIndexSelecao(req.params.id);
  selecoes[index].selecao = req.body.selecao;
  selecoes[index].grupo = req.body.grupo;
  res.json(selecoes);
});

export default app;
