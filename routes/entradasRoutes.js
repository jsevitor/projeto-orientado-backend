const express = require("express");
const router = express.Router();
const entradasController = require("../controllers/entradasController");

/**
 * @route GET /entradas
 * @description Obtém todas as entradas.
 * @access Público
 * @returns {Array} Lista de entradas.
 */
router.get("/", entradasController.getAllEntradas);

/**
 * @route GET /entradas/:id
 * @description Obtém uma entrada específica pelo ID.
 * @param {string} id - ID da entrada.
 * @access Público
 * @returns {Object} Detalhes da entrada.
 */
router.get("/:id", entradasController.getEntradaById);

/**
 * @route POST /entradas
 * @description Cria uma nova entrada.
 * @body {Object} Dados da entrada.
 * @access Privado
 * @returns {Object} Entrada criada.
 */
router.post("/", entradasController.createEntrada);

/**
 * @route PUT /entradas/:id
 * @description Atualiza uma entrada existente pelo ID.
 * @param {string} id - ID da entrada.
 * @body {Object} Dados atualizados da entrada.
 * @access Privado
 * @returns {Object} Entrada atualizada.
 */
router.put("/:id", entradasController.updateEntrada);

/**
 * @route DELETE /entradas/:id
 * @description Deleta uma entrada pelo ID.
 * @param {string} id - ID da entrada.
 * @access Privado
 * @returns {void} Confirmação da exclusão.
 */
router.delete("/:id", entradasController.deleteEntrada);

module.exports = router;
