const express = require("express");
const router = express.Router();
const produtosController = require("../controllers/produtosController");

/**
 * @route GET /produtos
 * @description Obtém todos os produtos.
 * @access Público
 * @returns {Array} Lista de produtos.
 */
router.get("/", produtosController.getAllProdutos);

/**
 * @route GET /produtos/:id
 * @description Obtém um produto específico pelo ID.
 * @param {string} id - ID do produto.
 * @access Público
 * @returns {Object} Detalhes do produto.
 */
router.get("/:id", produtosController.getProdutoById);

/**
 * @route POST /produtos
 * @description Cria um novo produto.
 * @body {Object} Dados do produto.
 * @access Privado
 * @returns {Object} Produto criado.
 */
router.post("/", produtosController.createProduto);

/**
 * @route PUT /produtos/:id
 * @description Atualiza um produto existente pelo ID.
 * @param {string} id - ID do produto.
 * @body {Object} Dados atualizados do produto.
 * @access Privado
 * @returns {Object} Produto atualizado.
 */
router.put("/:id", produtosController.updateProduto);

/**
 * @route DELETE /produtos/:id
 * @description Deleta um produto pelo ID.
 * @param {string} id - ID do produto.
 * @access Privado
 * @returns {void} Confirmação da exclusão.
 */
router.delete("/:id", produtosController.deleteProduto);

module.exports = router;
