// entradaModel.js
const pool = require("./db");

const getAllEntradas = async () => {
  const result = await pool.query(`
    SELECT 
      entradas.id,
      entradas.produto_id,
      produtos.nome AS produto_nome,
      entradas.quantidade,
      entradas.fornecedor_id,
      fornecedores.nome AS fornecedor_nome,
      entradas.data_entrada,
      entradas.numero_lote,
      entradas.preco_compra
    FROM 
      entradas
    JOIN 
      produtos ON entradas.produto_id = produtos.id
    LEFT JOIN 
      fornecedores ON entradas.fornecedor_id = fornecedores.id
    ORDER BY entradas.id
  `);
  return result.rows;
};

const getEntradaById = async (id) => {
  const result = await pool.query(
    `
    SELECT 
      entradas.id,
      entradas.produto_id,
      produtos.nome AS produto_nome,
      entradas.quantidade,
      entradas.fornecedor_id,
      fornecedores.nome AS fornecedor_nome,
      entradas.data_entrada,
      entradas.numero_lote,
      entradas.preco_compra
    FROM 
      entradas
    JOIN 
      produtos ON entradas.produto_id = produtos.id
    LEFT JOIN 
      fornecedores ON entradas.fornecedor_id = fornecedores.id
    WHERE entradas.id = $1
  `,
    [id]
  );
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

  // // Atualiza o estoque do produto
  // await pool.query(
  //   "UPDATE produtos SET quantidade = quantidade + $1 WHERE id = $2",
  //   [quantidade, produto_id]
  // );

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

  // // Atualiza o estoque do produto
  // await pool.query(
  //   "UPDATE produtos SET quantidade = quantidade + $1 WHERE id = $2",
  //   [quantidade, produto_id]
  // );

  return result.rows[0];
};

const deleteEntrada = async (id) => {
  // Recupera a entrada antes de deletar para atualizar o estoque
  const entrada = await getEntradaById(id);

  // Deleta a entrada
  await pool.query("DELETE FROM entradas WHERE id = $1", [id]);

  // // Atualiza o estoque do produto
  // await pool.query(
  //   "UPDATE produtos SET quantidade = quantidade - $1 WHERE id = $2",
  //   [entrada.quantidade, entrada.produto_id]
  // );
};

module.exports = {
  getAllEntradas,
  getEntradaById,
  createEntrada,
  updateEntrada,
  deleteEntrada,
};
