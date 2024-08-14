const express = require("express");
const router = express.Router();
const movimentacoesController = require("../controllers/movimentacoesController");

/**
 * @route GET /movimentacoes
 * @description Obtém todas as movimentações de estoque.
 * @access Público
 * @returns {Array} Lista de movimentações.
 */
router.get("/", movimentacoesController.getAllMovimentacoes);

module.exports = router;
