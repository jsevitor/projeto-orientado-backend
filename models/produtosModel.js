const pool = require("./db");

const getAllProdutos = async () => {
  const result = await pool.query(`
    SELECT 
      produtos.id,
      produtos.nome,
      produtos.marca,
      produtos.categoria,
      produtos.fornecedor_id,
      produtos.picture,
      fornecedores.nome AS fornecedor_nome
    FROM 
      produtos
    JOIN 
      fornecedores ON produtos.fornecedor_id = fornecedores.id
    ORDER BY id
  `);
  return result.rows;
};

const getProdutoById = async (id) => {
  const result = await pool.query("SELECT * FROM produtos WHERE id = $1", [id]);
  return result.rows[0];
};

const createProduto = async (produto) => {
  const { nome, marca, categoria, fornecedor_id, picture } = produto;
  const result = await pool.query(
    `INSERT INTO produtos (nome, marca, categoria, fornecedor_id, picture)
     VALUES ($1, $2, $3, $4, $5) RETURNING *`,
    [nome, marca, categoria, fornecedor_id, picture]
  );
  return result.rows[0];
};

const updateProduto = async (id, produto) => {
  const { nome, marca, categoria, fornecedor_id, picture } = produto;
  const result = await pool.query(
    `UPDATE produtos SET nome = $1, marca = $2, categoria = $3, fornecedor_id = $4, picture = $5
     WHERE id = $6 RETURNING *`,
    [nome, marca, categoria, fornecedor_id, picture, id]
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
