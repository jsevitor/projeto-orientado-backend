const entradasModel = require("../models/entradasModel");

/**
 * @description Obtém todas as entradas do banco de dados.
 * @route GET /entradas
 * @access Público
 */
const getAllEntradas = async (req, res) => {
  try {
    const entradas = await entradasModel.getAllEntradas();
    res.status(200).json(entradas);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

/**
 * @description Obtém uma entrada específica pelo ID.
 * @route GET /entradas/:id
 * @param {string} id - ID da entrada a ser buscada.
 * @access Público
 */
const getEntradaById = async (req, res) => {
  const { id } = req.params;
  try {
    const entrada = await entradasModel.getEntradaById(id);
    if (!entrada) {
      return res.status(404).json({ error: "Entrada não encontrada" });
    }
    res.status(200).json(entrada);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

/**
 * @description Cria uma nova entrada no banco de dados.
 * @route POST /entradas
 * @param {Object} req.body - Dados da nova entrada.
 * @access Público
 */
const createEntrada = async (req, res) => {
  try {
    const entrada = await entradasModel.createEntrada(req.body);
    res.status(201).json(entrada);
  } catch (error) {
    console.error("Erro ao criar entrada:", error);
    res.status(500).json({ message: "Erro ao criar entrada." });
  }
};

/**
 * @description Atualiza uma entrada existente pelo ID.
 * @route PUT /entradas/:id
 * @param {string} id - ID da entrada a ser atualizada.
 * @param {Object} req.body - Dados atualizados da entrada.
 * @access Público
 */
const updateEntrada = async (req, res) => {
  const { id } = req.params;
  try {
    const updatedEntrada = await entradasModel.updateEntrada(id, req.body);
    if (!updatedEntrada) {
      return res.status(404).json({ error: "Entrada não encontrada" });
    }
    res.status(200).json(updatedEntrada);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

/**
 * @description Exclui uma entrada pelo ID.
 * @route DELETE /entradas/:id
 * @param {string} id - ID da entrada a ser excluída.
 * @access Público
 */
const deleteEntrada = async (req, res) => {
  const { id } = req.params;
  try {
    await entradasModel.deleteEntrada(id);
    res.status(204).send();
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = {
  getAllEntradas,
  getEntradaById,
  createEntrada,
  updateEntrada,
  deleteEntrada,
};
