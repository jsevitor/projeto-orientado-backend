const pool = require("./db");

/**
 * @description Retorna todas as retiradas com informações do produto associado.
 * @returns {Promise<Array>} Uma lista de retiradas com as seguintes propriedades:
 * - `id`: Identificador único da retirada.
 * - `produto_id`: Identificador do produto retirado.
 * - `produto_nome`: Nome do produto retirado.
 * - `quantidade`: Quantidade do produto retirada.
 * - `tipo_retirada`: Tipo da retirada.
 * - `data_retirada`: Data em que a retirada foi realizada.
 * - `numero_lote`: Número do lote da retirada.
 */
const getAllRetiradas = async () => {
  const result = await pool.query(`
    SELECT 
      retiradas.id,
      retiradas.produto_id,
      produtos.nome AS produto_nome,
      retiradas.quantidade,
      retiradas.tipo_retirada,
      retiradas.data_retirada,
      retiradas.numero_lote
    FROM 
      retiradas
    JOIN 
      produtos ON retiradas.produto_id = produtos.id
    ORDER BY retiradas.id
  `);
  return result.rows;
};

/**
 * @description Retorna uma retirada específica pelo seu ID.
 * @param {number} id - O ID da retirada a ser buscada.
 * @returns {Promise<Object>} A retirada com as seguintes propriedades:
 * - `id`: Identificador único da retirada.
 * - `produto_id`: Identificador do produto retirado.
 * - `produto_nome`: Nome do produto retirado.
 * - `quantidade`: Quantidade do produto retirada.
 * - `tipo_retirada`: Tipo da retirada.
 * - `data_retirada`: Data em que a retirada foi realizada.
 * - `numero_lote`: Número do lote da retirada.
 */
const getRetiradaById = async (id) => {
  const result = await pool.query(
    `
    SELECT 
      retiradas.id,
      retiradas.produto_id,
      produtos.nome AS produto_nome,
      retiradas.quantidade,
      retiradas.tipo_retirada,
      retiradas.data_retirada,
      retiradas.numero_lote
    FROM 
      retiradas
    JOIN 
      produtos ON retiradas.produto_id = produtos.id
    WHERE retiradas.id = $1
  `,
    [id]
  );
  return result.rows[0];
};

/**
 * @description Cria uma nova retirada no banco de dados.
 * @param {Object} retirada - A retirada a ser criada com as seguintes propriedades:
 * - `produto_id`: Identificador do produto retirado.
 * - `quantidade`: Quantidade do produto retirada.
 * - `tipo_retirada`: Tipo da retirada.
 * - `data_retirada`: Data em que a retirada foi realizada.
 * - `numero_lote`: Número do lote da retirada.
 * @returns {Promise<Object>} A retirada criada com as propriedades descritas.
 * @throws {Error} Se o estoque do produto for insuficiente para a retirada.
 */
const createRetirada = async (retirada) => {
  const { produto_id, quantidade, tipo_retirada, data_retirada, numero_lote } =
    retirada;

  // // Verifica se o estoque é suficiente antes de criar a retirada
  // const produto = await pool.query(
  //   "SELECT quantidade FROM produtos WHERE id = $1",
  //   [produto_id]
  // );
  // if (produto.rows.length === 0 || produto.rows[0].quantidade < quantidade) {
  //   throw new Error("Estoque insuficiente para a retirada");
  // }

  const result = await pool.query(
    `INSERT INTO retiradas (produto_id, quantidade, tipo_retirada, data_retirada, numero_lote)
     VALUES ($1, $2, $3, $4, $5) RETURNING *`,
    [produto_id, quantidade, tipo_retirada, data_retirada, numero_lote]
  );

  // Atualiza o estoque do produto
  // await pool.query(
  //   "UPDATE produtos SET quantidade = quantidade - $1 WHERE id = $2",
  //   [quantidade, produto_id]
  // );

  return result.rows[0];
};

/**
 * @description Atualiza uma retirada existente pelo seu ID.
 * @param {number} id - O ID da retirada a ser atualizada.
 * @param {Object} retirada - A retirada atualizada com as seguintes propriedades:
 * - `produto_id`: Identificador do produto retirado.
 * - `quantidade`: Quantidade do produto retirada.
 * - `tipo_retirada`: Tipo da retirada.
 * - `data_retirada`: Data em que a retirada foi realizada.
 * - `numero_lote`: Número do lote da retirada.
 * @returns {Promise<Object>} A retirada atualizada com as propriedades descritas.
 */
const updateRetirada = async (id, retirada) => {
  const { produto_id, quantidade, tipo_retirada, data_retirada, numero_lote } =
    retirada;
  const result = await pool.query(
    `UPDATE retiradas SET produto_id = $1, quantidade = $2, tipo_retirada = $3, data_retirada = $4, numero_lote = $5
     WHERE id = $6 RETURNING *`,
    [produto_id, quantidade, tipo_retirada, data_retirada, numero_lote, id]
  );

  // Atualiza o estoque do produto se a quantidade for alterada
  // await pool.query(
  //   "UPDATE produtos SET quantidade = quantidade - $1 WHERE id = $2",
  //   [quantidade, produto_id]
  // );

  return result.rows[0];
};

/**
 * @description Deleta uma retirada pelo seu ID.
 * @param {number} id - O ID da retirada a ser deletada.
 * @returns {Promise<void>} Nada é retornado.
 */
const deleteRetirada = async (id) => {
  // Recupera a retirada antes de deletar para atualizar o estoque
  const retirada = await getRetiradaById(id);

  // Deleta a retirada
  await pool.query("DELETE FROM retiradas WHERE id = $1", [id]);

  // Atualiza o estoque do produto
  // await pool.query(
  //   "UPDATE produtos SET quantidade = quantidade + $1 WHERE id = $2",
  //   [retirada.quantidade, retirada.produto_id]
  // );
};

module.exports = {
  getAllRetiradas,
  getRetiradaById,
  createRetirada,
  updateRetirada,
  deleteRetirada,
};
