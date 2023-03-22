import express from "express";
import conexao from "../infra/conexao.js";

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
  const sql = "SELECT * FROM selecoes;";
  conexao.query(sql, (erro, resultado) => {
    if (erro) {
      console.log(erro);
      res.status(500).json({ erro: "Erro ao buscar seleções" });
    } else {
      res.status(200).json(resultado);
    }
  });
});

app.get("/selecoes/:id", (req, res) => {
  // res.json(buscarSelecaoPorId(req.params.id));
  const id = req.params.id;
  const sql = "SELECT * FROM selecoes WHERE id=?;";
  conexao.query(sql, id, (erro, resultado) => {
    const linha = resultado[0];
    if (erro) {
      console.log(erro);
      res.status(500).json({ erro: erro });
    } else {
      res.status(200).json(linha);
    }
  });
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
