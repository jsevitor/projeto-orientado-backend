const pool = require("./db");

const getAllEntradas = async () => {
  const result = await pool.query("SELECT * FROM entradas");
  return result.rows;
};

const getEntradaById = async (id) => {
  const result = await pool.query("SELECT * FROM entradas WHERE id = $1", [id]);
  return result.rows[0];
};

const createEntrada = async (entrada) => {
  const {
    produto_id,
    quantidade,
    fornecedor_id,
    data_entrada,
    numero_lote,
    preco_compra,
  } = entrada;
  const result = await pool.query(
    `INSERT INTO entradas (produto_id, quantidade, fornecedor_id, data_entrada, numero_lote, preco_compra)
     VALUES ($1, $2, $3, $4, $5, $6) RETURNING *`,
    [
      produto_id,
      quantidade,
      fornecedor_id,
      data_entrada,
      numero_lote,
      preco_compra,
    ]
  );

  // Atualiza o estoque do produto
  await pool.query(
    "UPDATE produtos SET quantidade = quantidade + $1 WHERE id = $2",
    [quantidade, produto_id]
  );

  return result.rows[0];
};

const updateEntrada = async (id, entrada) => {
  const {
    produto_id,
    quantidade,
    fornecedor_id,
    data_entrada,
    numero_lote,
    preco_compra,
  } = entrada;
  const result = await pool.query(
    `UPDATE entradas SET produto_id = $1, quantidade = $2, fornecedor_id = $3, data_entrada = $4, numero_lote = $5, preco_compra = $6
     WHERE id = $7 RETURNING *`,
    [
      produto_id,
      quantidade,
      fornecedor_id,
      data_entrada,
      numero_lote,
      preco_compra,
      id,
    ]
  );

  return result.rows[0];
};

const deleteEntrada = async (id) => {
  await pool.query("DELETE FROM entradas WHERE id = $1", [id]);
};

module.exports = {
  getAllEntradas,
  getEntradaById,
  createEntrada,
  updateEntrada,
  deleteEntrada,
};
