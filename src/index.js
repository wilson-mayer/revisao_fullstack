import express from "express";
import cors from "cors";

const app = express();
const produtos = [];
app.use(cors());

app.use(express.json());

app.get("/", (req, res) => {
  return res.json("OK");
});

app.listen(8080, () => console.log("Servidor rodando na porta 8080"));

//-------------------------criar produto-------------------------------

app.post("/criar-produto", (req, res) => {
  const data = req.body;
  const nomeProduto = data.nomeProduto;
  const precoProduto = data.precoProduto;

  if (!nomeProduto) {
    return res
      .status(400)
      .json({ message: "Erro! preencha as informações do nome." });
  }
  if (!precoProduto) {
    return res
      .status(400)
      .json({ message: "Erro! preencha as informações de preço." });
  }

  produtos.push({
    nomeProduto: data.nomeProduto,
    precoProduto: data.precoProduto,
  });

  return res
    .status(201)
    .json({ message: `Produto cadastrado`, data: produtos });
});
//-------------------------ler produto------------------------------------

app.get("/produtos", (req, res) => {
  if (produtos.length > 0) {
    return res.status(200).json({
      message: "Lista de usuários retornada com sucesso",
      data: produtos,
    });
  } else {
    return res
      .status(404)
      .json({ message: "Não existem usuários cadastrados!" });
  }
});

//-------------------------atualizar produto------------------------------

app.put("/produtos/:nomeProdutoAtualizar", (req, res) => {
  const nomeProdutoAtualizar = req.params.nomeProdutoAtualizar;
  const data = req.body;
  const nomeProduto = data.nomeProduto;
  const precoProduto = data.precoProduto;

  const produtoIndex = produtos.findIndex(
    (produto) => produto.nomeProduto === nomeProdutoAtualizar
  );

  if (produtoIndex !== -1) {
    const produto = produtos[produtoIndex];
    produto.nomeProduto = nomeProduto;
    produto.precoProduto = precoProduto;

    res
      .status(200)
      .json({ message: "Produto atualizado com sucesso", data: produto });
  } else {
    return res.status(400).json({ message: "Produto não encontrado!" });
  }
});

//----------------------------deletar produto --------------------------------------

app.delete("/produtos/:nomeProdutoDeletar", (req, res) => {
  const nomeProdutoDeletar = req.params.nomeProdutoDeletar;

  const produtoIndex = produtos.findIndex(
    (produto) => produto.nomeProduto === nomeProdutoDeletar
  );

  if (produtoIndex !== 1) {
    const produto = produtos[produtoIndex];
    const deletarProduto = produtos.splice(produtoIndex, 1);

    res
      .status(200)
      .json({ message: "Produto deletado com sucesso", deletarProduto });
  } else {
    return res.status(404).json({ message: "Produto não encontrado" });
  }
});
