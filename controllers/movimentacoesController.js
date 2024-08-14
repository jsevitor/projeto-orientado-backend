const movimentacoesModel = require("../models/movimentacoesModel");

/**
 * @description Obtém todas as movimentações do banco de dados.
 * @route GET /movimentacoes
 * @access Público
 */
const getAllMovimentacoes = async (req, res) => {
  try {
    const entradas = await movimentacoesModel.getAllMovimentacoes();
    res.status(200).json(entradas);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = {
  getAllMovimentacoes,
};
