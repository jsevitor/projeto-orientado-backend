const pool = require("./db");

/**
 * @description Retorna todas as entradas do banco de dados, incluindo informações relacionadas ao produto e fornecedor.
 * @returns {Promise<Array>} Uma lista de todas as entradas com os detalhes de produto e fornecedor.
 */
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

/**
 * @description Retorna uma única entrada baseada no ID fornecido.
 * @param {number} id - O ID da entrada a ser buscada.
 * @returns {Promise<Object>} A entrada correspondente ao ID fornecido, ou `null` se não encontrada.
 */
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

/**
 * @description Cria uma nova entrada no banco de dados e retorna a entrada criada.
 * @param {Object} entrada - O objeto contendo as informações da nova entrada.
 * @param {number} entrada.produto_id - O ID do produto.
 * @param {number} entrada.quantidade - A quantidade da entrada.
 * @param {number} [entrada.fornecedor_id] - O ID do fornecedor (opcional).
 * @param {string} entrada.data_entrada - A data da entrada.
 * @param {string} entrada.numero_lote - O número do lote da entrada.
 * @param {number} entrada.preco_compra - O preço de compra da entrada.
 * @returns {Promise<Object>} A entrada recém-criada.
 */
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

  // Descomente para atualizar o estoque do produto ao criar uma entrada.
  // await pool.query(
  //   "UPDATE produtos SET quantidade = quantidade + $1 WHERE id = $2",
  //   [quantidade, produto_id]
  // );

  return result.rows[0];
};

/**
 * @description Atualiza uma entrada existente no banco de dados e retorna a entrada atualizada.
 * @param {number} id - O ID da entrada a ser atualizada.
 * @param {Object} entrada - O objeto contendo as novas informações da entrada.
 * @returns {Promise<Object>} A entrada atualizada.
 */
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

  // Descomente para atualizar o estoque do produto ao atualizar uma entrada.
  // await pool.query(
  //   "UPDATE produtos SET quantidade = quantidade + $1 WHERE id = $2",
  //   [quantidade, produto_id]
  // );

  return result.rows[0];
};

/**
 * @description Deleta uma entrada do banco de dados com base no ID fornecido e atualiza o estoque do produto.
 * @param {number} id - O ID da entrada a ser deletada.
 * @returns {Promise<void>}
 */
const deleteEntrada = async (id) => {
  // Recupera a entrada antes de deletar para atualizar o estoque.
  const entrada = await getEntradaById(id);

  // Deleta a entrada.
  await pool.query("DELETE FROM entradas WHERE id = $1", [id]);

  // Descomente para atualizar o estoque do produto ao deletar uma entrada.
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
