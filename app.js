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
/**
 * @route GET /fornecedores
 * @description Obtém todos os fornecedores.
 * @access Público
 * @returns {Array} Lista de fornecedores.
 */
app.get("/fornecedores", fornecedoresController.getAllFornecedores);

/**
 * @route GET /fornecedores/:id
 * @description Obtém um fornecedor específico pelo ID.
 * @param {string} id - ID do fornecedor.
 * @access Público
 * @returns {Object} Detalhes do fornecedor.
 */
app.get("/fornecedores/:id", fornecedoresController.getFornecedorById);

/**
 * @route POST /fornecedores
 * @description Cria um novo fornecedor.
 * @body {Object} Dados do fornecedor.
 * @access Privado
 * @returns {Object} Fornecedor criado.
 */
app.post("/fornecedores", fornecedoresController.createFornecedor);

/**
 * @route PUT /fornecedores/:id
 * @description Atualiza um fornecedor existente pelo ID.
 * @param {string} id - ID do fornecedor.
 * @body {Object} Dados atualizados do fornecedor.
 * @access Privado
 * @returns {Object} Fornecedor atualizado.
 */
app.put("/fornecedores/:id", fornecedoresController.updateFornecedor);

/**
 * @route DELETE /fornecedores/:id
 * @description Deleta um fornecedor pelo ID.
 * @param {string} id - ID do fornecedor.
 * @access Privado
 * @returns {void} Confirmação da exclusão.
 */
app.delete("/fornecedores/:id", fornecedoresController.deleteFornecedor);

// Rotas para produtos
/**
 * @route GET /produtos
 * @description Obtém todos os produtos.
 * @access Público
 * @returns {Array} Lista de produtos.
 */
app.get("/produtos", produtosController.getAllProdutos);

/**
 * @route GET /produtos/:id
 * @description Obtém um produto específico pelo ID.
 * @param {string} id - ID do produto.
 * @access Público
 * @returns {Object} Detalhes do produto.
 */
app.get("/produtos/:id", produtosController.getProdutoById);

/**
 * @route POST /produtos
 * @description Cria um novo produto.
 * @body {Object} Dados do produto.
 * @access Privado
 * @returns {Object} Produto criado.
 */
app.post("/produtos", produtosController.createProduto);

/**
 * @route PUT /produtos/:id
 * @description Atualiza um produto existente pelo ID.
 * @param {string} id - ID do produto.
 * @body {Object} Dados atualizados do produto.
 * @access Privado
 * @returns {Object} Produto atualizado.
 */
app.put("/produtos/:id", produtosController.updateProduto);

/**
 * @route DELETE /produtos/:id
 * @description Deleta um produto pelo ID.
 * @param {string} id - ID do produto.
 * @access Privado
 * @returns {void} Confirmação da exclusão.
 */
app.delete("/produtos/:id", produtosController.deleteProduto);

// Rotas para entradas
/**
 * @route GET /entradas
 * @description Obtém todas as entradas.
 * @access Público
 * @returns {Array} Lista de entradas.
 */
app.get("/entradas", entradasController.getAllEntradas);

/**
 * @route GET /entradas/:id
 * @description Obtém uma entrada específica pelo ID.
 * @param {string} id - ID da entrada.
 * @access Público
 * @returns {Object} Detalhes da entrada.
 */
app.get("/entradas/:id", entradasController.getEntradaById);

/**
 * @route POST /entradas
 * @description Cria uma nova entrada.
 * @body {Object} Dados da entrada.
 * @access Privado
 * @returns {Object} Entrada criada.
 */
app.post("/entradas", entradasController.createEntrada);

/**
 * @route PUT /entradas/:id
 * @description Atualiza uma entrada existente pelo ID.
 * @param {string} id - ID da entrada.
 * @body {Object} Dados atualizados da entrada.
 * @access Privado
 * @returns {Object} Entrada atualizada.
 */
app.put("/entradas/:id", entradasController.updateEntrada);

/**
 * @route DELETE /entradas/:id
 * @description Deleta uma entrada pelo ID.
 * @param {string} id - ID da entrada.
 * @access Privado
 * @returns {void} Confirmação da exclusão.
 */
app.delete("/entradas/:id", entradasController.deleteEntrada);

// Rotas para retiradas
/**
 * @route GET /retiradas
 * @description Obtém todas as retiradas.
 * @access Público
 * @returns {Array} Lista de retiradas.
 */
app.get("/retiradas", retiradasController.getAllRetiradas);

/**
 * @route GET /retiradas/:id
 * @description Obtém uma retirada específica pelo ID.
 * @param {string} id - ID da retirada.
 * @access Público
 * @returns {Object} Detalhes da retirada.
 */
app.get("/retiradas/:id", retiradasController.getRetiradaById);

/**
 * @route POST /retiradas
 * @description Cria uma nova retirada.
 * @body {Object} Dados da retirada.
 * @access Privado
 * @returns {Object} Retirada criada.
 */
app.post("/retiradas", retiradasController.createRetirada);

/**
 * @route PUT /retiradas/:id
 * @description Atualiza uma retirada existente pelo ID.
 * @param {string} id - ID da retirada.
 * @body {Object} Dados atualizados da retirada.
 * @access Privado
 * @returns {Object} Retirada atualizada.
 */
app.put("/retiradas/:id", retiradasController.updateRetirada);

/**
 * @route DELETE /retiradas/:id
 * @description Deleta uma retirada pelo ID.
 * @param {string} id - ID da retirada.
 * @access Privado
 * @returns {void} Confirmação da exclusão.
 */
app.delete("/retiradas/:id", retiradasController.deleteRetirada);

// Rotas para movimentações
/**
 * @route GET /movimentacoes
 * @description Obtém todas as movimentações.
 * @access Público
 * @returns {Array} Lista de movimentações.
 */
app.get("/movimentacoes", movimentacoesController.getAllMovimentacoes);

// Inicia o servidor
app.listen(port, () => {
  console.log(`Servidor rodando na porta ${port}`);
  console.log(`Acesse em http://localhost:${port}/`);
});
