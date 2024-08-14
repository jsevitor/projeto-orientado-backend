const express = require("express");
const router = express.Router();
const fornecedoresController = require("../controllers/fornecedoresController");

/**
 * @route GET /fornecedores
 * @description Obtém todos os fornecedores.
 * @access Público
 * @returns {Array} Lista de fornecedores.
 */
router.get("/", fornecedoresController.getAllFornecedores);

/**
 * @route GET /fornecedores/:id
 * @description Obtém um fornecedor específico pelo ID.
 * @param {number} id - ID do fornecedor.
 * @access Público
 * @returns {Object} Dados do fornecedor.
 */
router.get("/:id", fornecedoresController.getFornecedorById);

/**
 * @route POST /fornecedores
 * @description Cria um novo fornecedor.
 * @param {Object} fornecedor - Dados do fornecedor a ser criado.
 * @access Público
 * @returns {Object} Dados do fornecedor criado.
 */
router.post("/", fornecedoresController.createFornecedor);

/**
 * @route PUT /fornecedores/:id
 * @description Atualiza um fornecedor existente pelo ID.
 * @param {number} id - ID do fornecedor.
 * @param {Object} fornecedor - Dados atualizados do fornecedor.
 * @access Público
 * @returns {Object} Dados do fornecedor atualizado.
 */
router.put("/:id", fornecedoresController.updateFornecedor);

/**
 * @route DELETE /fornecedores/:id
 * @description Deleta um fornecedor pelo ID.
 * @param {number} id - ID do fornecedor.
 * @access Público
 * @returns {void} Nenhum conteúdo.
 */
router.delete("/:id", fornecedoresController.deleteFornecedor);

module.exports = router;
