const pool = require("./db");

const getAllProdutos = async () => {
  const result = await pool.query("SELECT * FROM produtos");
  return result.rows;
};

const getProdutoById = async (id) => {
  const result = await pool.query("SELECT * FROM produtos WHERE id = $1", [id]);
  return result.rows[0];
};

const createProduto = async (produto) => {
  const { nome, marca, categoria, fornecedor_id, picture, quantidade } =
    produto;
  const result = await pool.query(
    `INSERT INTO produtos (nome, marca, categoria, fornecedor_id, picture, quantidade)
     VALUES ($1, $2, $3, $4, $5, $6) RETURNING *`,
    [nome, marca, categoria, fornecedor_id, picture, quantidade]
  );
  return result.rows[0];
};

const updateProduto = async (id, produto) => {
  const { nome, marca, categoria, fornecedor_id, picture, quantidade } =
    produto;
  const result = await pool.query(
    `UPDATE produtos SET nome = $1, marca = $2, categoria = $3, fornecedor_id = $4, picture = $5, quantidade = $6
     WHERE id = $7 RETURNING *`,
    [nome, marca, categoria, fornecedor_id, picture, quantidade, id]
  );
  return result.rows[0];
};

const deleteProduto = async (id) => {
  await pool.query("DELETE FROM produtos WHERE id = $1", [id]);
};

module.exports = {
  getAllProdutos,
  getProdutoById,
  createProduto,
  updateProduto,
  deleteProduto,
};
