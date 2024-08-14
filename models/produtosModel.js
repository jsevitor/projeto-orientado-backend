const pool = require("./db");

/**
 * @description Retorna todos os produtos com informações do fornecedor.
 * @returns {Promise<Array>} Uma lista de produtos com as seguintes propriedades:
 * - `id`: Identificador único do produto.
 * - `nome`: Nome do produto.
 * - `marca`: Marca do produto.
 * - `categoria`: Categoria do produto.
 * - `fornecedor_id`: Identificador do fornecedor.
 * - `picture`: URL da imagem do produto.
 * - `fornecedor_nome`: Nome do fornecedor associado ao produto.
 */
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

/**
 * @description Retorna um produto específico pelo seu ID.
 * @param {number} id - O ID do produto a ser buscado.
 * @returns {Promise<Object>} O produto com as seguintes propriedades:
 * - `id`: Identificador único do produto.
 * - `nome`: Nome do produto.
 * - `marca`: Marca do produto.
 * - `categoria`: Categoria do produto.
 * - `fornecedor_id`: Identificador do fornecedor.
 * - `picture`: URL da imagem do produto.
 */
const getProdutoById = async (id) => {
  const result = await pool.query("SELECT * FROM produtos WHERE id = $1", [id]);
  return result.rows[0];
};

/**
 * @description Cria um novo produto no banco de dados.
 * @param {Object} produto - O produto a ser criado com as seguintes propriedades:
 * - `nome`: Nome do produto.
 * - `marca`: Marca do produto.
 * - `categoria`: Categoria do produto.
 * - `fornecedor_id`: Identificador do fornecedor.
 * - `picture`: URL da imagem do produto.
 * @returns {Promise<Object>} O produto criado com as propriedades descritas.
 */
const createProduto = async (produto) => {
  const { nome, marca, categoria, fornecedor_id, picture } = produto;
  const result = await pool.query(
    `INSERT INTO produtos (nome, marca, categoria, fornecedor_id, picture)
     VALUES ($1, $2, $3, $4, $5) RETURNING *`,
    [nome, marca, categoria, fornecedor_id, picture]
  );
  return result.rows[0];
};

/**
 * @description Atualiza um produto existente pelo seu ID.
 * @param {number} id - O ID do produto a ser atualizado.
 * @param {Object} produto - O produto atualizado com as seguintes propriedades:
 * - `nome`: Nome do produto.
 * - `marca`: Marca do produto.
 * - `categoria`: Categoria do produto.
 * - `fornecedor_id`: Identificador do fornecedor.
 * - `picture`: URL da imagem do produto.
 * @returns {Promise<Object>} O produto atualizado com as propriedades descritas.
 */
const updateProduto = async (id, produto) => {
  const { nome, marca, categoria, fornecedor_id, picture } = produto;
  const result = await pool.query(
    `UPDATE produtos SET nome = $1, marca = $2, categoria = $3, fornecedor_id = $4, picture = $5
     WHERE id = $6 RETURNING *`,
    [nome, marca, categoria, fornecedor_id, picture, id]
  );
  return result.rows[0];
};

/**
 * @description Deleta um produto pelo seu ID.
 * @param {number} id - O ID do produto a ser deletado.
 * @returns {Promise<void>} Nada é retornado.
 */
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
