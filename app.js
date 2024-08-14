const express = require("express");
const cors = require("cors"); // Para permitir requisições de outros domínios
const fornecedoresController = require("./controllers/fornecedoresController");
const produtosController = require("./controllers/produtosController");
const entradasController = require("./controllers/entradasController");
const retiradasController = require("./controllers/retiradasController");
const movimentacoesController = require("./controllers/movimentacoesController");

const app = express();
const port = process.env.PORT || 3001;

app.use(express.json());
app.use(cors());

// Rotas para fornecedores
app.get("/fornecedores", fornecedoresController.getAllFornecedores);
app.get("/fornecedores/:id", fornecedoresController.getFornecedorById);
app.post("/fornecedores", fornecedoresController.createFornecedor);
app.put("/fornecedores/:id", fornecedoresController.updateFornecedor);
app.delete("/fornecedores/:id", fornecedoresController.deleteFornecedor);

// Rotas para fornecedores
app.get("/produtos", produtosController.getAllProdutos);
app.get("/produtos/:id", produtosController.getProdutoById);
app.post("/produtos", produtosController.createProduto);
app.put("/produtos/:id", produtosController.updateProduto);
app.delete("/produtos/:id", produtosController.deleteProduto);

// Rotas para entradas
app.get("/entradas", entradasController.getAllEntradas);
app.get("/entradas/:id", entradasController.getEntradaById);
app.post("/entradas", entradasController.createEntrada);
app.put("/entradas/:id", entradasController.updateEntrada);
app.delete("/entradas/:id", entradasController.deleteEntrada);

// Rotas para retiradas
app.get("/retiradas", retiradasController.getAllRetiradas);
app.get("/retiradas/:id", retiradasController.getRetiradaById);
app.post("/retiradas", retiradasController.createRetirada);
app.put("/retiradas/:id", retiradasController.updateRetirada);
app.delete("/retiradas/:id", retiradasController.deleteRetirada);

// Rotas para Movimentações
app.get("/movimentacoes", movimentacoesController.getAllMovimentacoes);

// Inicia o servidor
app.listen(port, () => {
  console.log(`Servidor rodando...`);
  console.log(`http://localhost:${port}/`);
});
