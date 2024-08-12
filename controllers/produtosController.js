const produtoModel = require("../models/produtosModel");

const getAllProdutos = async (req, res) => {
  try {
    const produtos = await produtoModel.getAllProdutos();
    res.json(produtos);
  } catch (error) {
    res.status(500).json({ error: "Erro ao buscar produtos" });
  }
};

const getProdutoById = async (req, res) => {
  const { id } = req.params;
  try {
    const produto = await produtoModel.getProdutoById(id);
    if (produto) {
      res.json(produto);
    } else {
      res.status(404).json({ error: "Produto não encontrado" });
    }
  } catch (error) {
    res.status(500).json({ error: "Erro ao buscar produto" });
  }
};

const createProduto = async (req, res) => {
  const produto = req.body;
  try {
    const newProduto = await produtoModel.createProduto(produto);
    res.status(201).json(newProduto);
  } catch (error) {
    res.status(500).json({ error: "Erro ao criar produto" });
  }
};

const updateProduto = async (req, res) => {
  const { id } = req.params;
  const produto = req.body;
  try {
    const updatedProduto = await produtoModel.updateProduto(id, produto);
    res.json(updatedProduto);
  } catch (error) {
    res.status(500).json({ error: "Erro ao atualizar produto" });
  }
};

const deleteProduto = async (req, res) => {
  const { id } = req.params;
  try {
    await produtoModel.deleteProduto(id);
    res.status(204).send();
  } catch (error) {
    res.status(500).json({ error: "Erro ao deletar produto" });
  }
};

module.exports = {
  getAllProdutos,
  getProdutoById,
  createProduto,
  updateProduto,
  deleteProduto,
};
