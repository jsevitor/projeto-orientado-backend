const express = require("express");
const router = express.Router();
const retiradasController = require("../controllers/retiradasController");

/**
 * @route GET /retiradas
 * @description Obtém todas as retiradas.
 * @access Público
 * @returns {Array} Lista de retiradas.
 */
router.get("/", retiradasController.getAllRetiradas);

/**
 * @route GET /retiradas/:id
 * @description Obtém uma retirada específica pelo ID.
 * @param {string} id - ID da retirada.
 * @access Público
 * @returns {Object} Detalhes da retirada.
 */
router.get("/:id", retiradasController.getRetiradaById);

/**
 * @route POST /retiradas
 * @description Cria uma nova retirada.
 * @body {Object} Dados da retirada.
 * @access Privado
 * @returns {Object} Retirada criada.
 */
router.post("/", retiradasController.createRetirada);

/**
 * @route PUT /retiradas/:id
 * @description Atualiza uma retirada existente pelo ID.
 * @param {string} id - ID da retirada.
 * @body {Object} Dados atualizados da retirada.
 * @access Privado
 * @returns {Object} Retirada atualizada.
 */
router.put("/:id", retiradasController.updateRetirada);

/**
 * @route DELETE /retiradas/:id
 * @description Deleta uma retirada pelo ID.
 * @param {string} id - ID da retirada.
 * @access Privado
 * @returns {void} Confirmação da exclusão.
 */
router.delete("/:id", retiradasController.deleteRetirada);

module.exports = router;
