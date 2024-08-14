const retiradasModel = require("../models/retiradasModel");

/**
 * @description Obtém todas as retiradas do banco de dados.
 * @route GET /retiradas
 * @access Público
 */
const getAllRetiradas = async (req, res) => {
  try {
    const retiradas = await retiradasModel.getAllRetiradas();
    res.status(200).json(retiradas);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

/**
 * @description Obtém uma retirada específica pelo ID.
 * @route GET /retiradas/:id
 * @param {string} id - ID da retirada a ser buscada.
 * @access Público
 */
const getRetiradaById = async (req, res) => {
  const { id } = req.params;
  try {
    const retirada = await retiradasModel.getRetiradaById(id);
    if (!retirada) {
      return res.status(404).json({ error: "Retirada não encontrada" });
    }
    res.status(200).json(retirada);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

/**
 * @description Cria uma nova retirada no banco de dados.
 * @route POST /retiradas
 * @param {Object} req.body - Dados da nova retirada.
 * @access Público
 */
const createRetirada = async (req, res) => {
  try {
    const newRetirada = await retiradasModel.createRetirada(req.body);
    res.status(201).json(newRetirada);
  } catch (error) {
    if (error.message.includes("Estoque insuficiente")) {
      res.status(400).json({ error: error.message });
    } else {
      res.status(500).json({ error: error.message });
    }
  }
};

/**
 * @description Atualiza uma retirada existente pelo ID.
 * @route PUT /retiradas/:id
 * @param {string} id - ID da retirada a ser atualizada.
 * @param {Object} req.body - Dados atualizados da retirada.
 * @access Público
 */
const updateRetirada = async (req, res) => {
  const { id } = req.params;
  try {
    const updatedRetirada = await retiradasModel.updateRetirada(id, req.body);
    if (!updatedRetirada) {
      return res.status(404).json({ error: "Retirada não encontrada" });
    }
    res.status(200).json(updatedRetirada);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

/**
 * @description Exclui uma retirada pelo ID.
 * @route DELETE /retiradas/:id
 * @param {string} id - ID da retirada a ser excluída.
 * @access Público
 */
const deleteRetirada = async (req, res) => {
  const { id } = req.params;
  try {
    await retiradasModel.deleteRetirada(id);
    res.status(204).send();
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = {
  getAllRetiradas,
  getRetiradaById,
  createRetirada,
  updateRetirada,
  deleteRetirada,
};
