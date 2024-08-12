const fornecedoresModel = require("../models/fornecedoresModel");

const getAllFornecedores = async (req, res) => {
  try {
    const fornecedores = await fornecedoresModel.getAllFornecedores();
    res.status(200).json(fornecedores);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

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

const createFornecedor = async (req, res) => {
  try {
    const newFornecedor = await fornecedoresModel.createFornecedor(req.body);
    res.status(201).json(newFornecedor);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

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
