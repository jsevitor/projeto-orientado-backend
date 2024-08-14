const produtoModel = require("../models/produtosModel");

/**
 * @description Obtém todos os produtos do banco de dados.
 * @route GET /produtos
 * @access Público
 */
const getAllProdutos = async (req, res) => {
  try {
    const produtos = await produtoModel.getAllProdutos();
    res.json(produtos);
  } catch (error) {
    res.status(500).json({ error: "Erro ao buscar produtos" });
  }
};

/**
 * @description Obtém um produto específico pelo ID.
 * @route GET /produtos/:id
 * @param {string} id - ID do produto a ser buscado.
 * @access Público
 */
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

/**
 * @description Cria um novo produto no banco de dados.
 * @route POST /produtos
 * @param {Object} req.body - Dados do novo produto.
 * @access Público
 */
const createProduto = async (req, res) => {
  const produto = req.body;
  try {
    const newProduto = await produtoModel.createProduto(produto);
    res.status(201).json(newProduto);
  } catch (error) {
    res.status(500).json({ error: "Erro ao criar produto" });
  }
};

/**
 * @description Atualiza um produto existente pelo ID.
 * @route PUT /produtos/:id
 * @param {string} id - ID do produto a ser atualizado.
 * @param {Object} req.body - Dados atualizados do produto.
 * @access Público
 */
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

/**
 * @description Exclui um produto pelo ID.
 * @route DELETE /produtos/:id
 * @param {string} id - ID do produto a ser excluído.
 * @access Público
 */
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
