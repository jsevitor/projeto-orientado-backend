const fornecedoresModel = require("../models/fornecedoresModel");

/**
 * @description Obtém todos os fornecedores do banco de dados.
 * @route GET /fornecedores
 * @access Público
 */
const getAllFornecedores = async (req, res) => {
  try {
    const fornecedores = await fornecedoresModel.getAllFornecedores();
    res.status(200).json(fornecedores);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

/**
 * @description Obtém um fornecedor específico pelo ID.
 * @route GET /fornecedores/:id
 * @param {string} id - ID do fornecedor a ser buscado.
 * @access Público
 */
const getFornecedorById = async (req, res) => {
  const { id } = req.params;
  try {
    const fornecedor = await fornecedoresModel.getFornecedorById(id);
    if (!fornecedor) {
      return res.status(404).json({ error: "Fornecedor não encontrado" });
    }
    res.status(200).json(fornecedor);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

/**
 * @description Cria um novo fornecedor no banco de dados.
 * @route POST /fornecedores
 * @param {Object} req.body - Dados do novo fornecedor.
 * @access Público
 */
const createFornecedor = async (req, res) => {
  try {
    const newFornecedor = await fornecedoresModel.createFornecedor(req.body);
    res.status(201).json(newFornecedor);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

/**
 * @description Atualiza um fornecedor existente pelo ID.
 * @route PUT /fornecedores/:id
 * @param {string} id - ID do fornecedor a ser atualizado.
 * @param {Object} req.body - Dados atualizados do fornecedor.
 * @access Público
 */
const updateFornecedor = async (req, res) => {
  const { id } = req.params;
  try {
    const updatedFornecedor = await fornecedoresModel.updateFornecedor(
      id,
      req.body
    );
    if (!updatedFornecedor) {
      return res.status(404).json({ error: "Fornecedor não encontrado" });
    }
    res.status(200).json(updatedFornecedor);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

/**
 * @description Exclui um fornecedor pelo ID.
 * @route DELETE /fornecedores/:id
 * @param {string} id - ID do fornecedor a ser excluído.
 * @access Público
 */
const deleteFornecedor = async (req, res) => {
  const { id } = req.params;
  try {
    await fornecedoresModel.deleteFornecedor(id);
    res.status(204).send();
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = {
  getAllFornecedores,
  getFornecedorById,
  createFornecedor,
  updateFornecedor,
  deleteFornecedor,
};
