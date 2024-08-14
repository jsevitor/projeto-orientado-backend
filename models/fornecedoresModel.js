const pool = require("./db");

/**
 * @description Retorna todos os fornecedores do banco de dados, ordenados por ID.
 * @returns {Promise<Array>} Uma lista de todos os fornecedores.
 */
const getAllFornecedores = async () => {
  const result = await pool.query("SELECT * FROM fornecedores ORDER BY id");
  return result.rows;
};

/**
 * @description Retorna um fornecedor específico com base no ID fornecido.
 * @param {number} id - O ID do fornecedor a ser buscado.
 * @returns {Promise<Object>} O fornecedor correspondente ao ID fornecido, ou `null` se não encontrado.
 */
const getFornecedorById = async (id) => {
  const result = await pool.query("SELECT * FROM fornecedores WHERE id = $1", [
    id,
  ]);
  return result.rows[0];
};

/**
 * @description Cria um novo fornecedor no banco de dados e retorna o fornecedor criado.
 * @param {Object} fornecedor - O objeto contendo as informações do novo fornecedor.
 * @param {string} fornecedor.nome - O nome do fornecedor.
 * @param {string} fornecedor.cnpj - O CNPJ do fornecedor.
 * @param {string} fornecedor.telefone - O telefone do fornecedor.
 * @param {string} fornecedor.celular - O celular do fornecedor.
 * @param {string} fornecedor.email - O e-mail do fornecedor.
 * @param {string} fornecedor.site - O site do fornecedor.
 * @param {string} fornecedor.cep - O CEP do fornecedor.
 * @param {string} fornecedor.endereco - O endereço do fornecedor.
 * @param {string} fornecedor.numero_endereco - O número do endereço do fornecedor.
 * @param {string} fornecedor.cidade - A cidade do fornecedor.
 * @param {string} fornecedor.bairro - O bairro do fornecedor.
 * @param {string} fornecedor.estado - O estado do fornecedor.
 * @param {string} fornecedor.banco - O banco do fornecedor.
 * @param {string} fornecedor.tipo_conta - O tipo de conta do fornecedor.
 * @param {string} fornecedor.conta - O número da conta do fornecedor.
 * @param {string} fornecedor.agencia_bancaria - A agência bancária do fornecedor.
 * @returns {Promise<Object>} O fornecedor recém-criado.
 */
const createFornecedor = async (fornecedor) => {
  const {
    nome,
    cnpj,
    telefone,
    celular,
    email,
    site,
    cep,
    endereco,
    numero_endereco,
    cidade,
    bairro,
    estado,
    banco,
    tipo_conta,
    conta,
    agencia_bancaria,
  } = fornecedor;
  const result = await pool.query(
    `INSERT INTO fornecedores (nome, cnpj, telefone, celular, email, site, cep, endereco, numero_endereco, cidade, bairro, estado, banco, tipo_conta, conta, agencia_bancaria)
     VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15, $16) RETURNING *`,
    [
      nome,
      cnpj,
      telefone,
      celular,
      email,
      site,
      cep,
      endereco,
      numero_endereco,
      cidade,
      bairro,
      estado,
      banco,
      tipo_conta,
      conta,
      agencia_bancaria,
    ]
  );
  return result.rows[0];
};

/**
 * @description Atualiza um fornecedor existente no banco de dados e retorna o fornecedor atualizado.
 * @param {number} id - O ID do fornecedor a ser atualizado.
 * @param {Object} fornecedor - O objeto contendo as novas informações do fornecedor.
 * @param {string} fornecedor.nome - O nome do fornecedor.
 * @param {string} fornecedor.cnpj - O CNPJ do fornecedor.
 * @param {string} fornecedor.telefone - O telefone do fornecedor.
 * @param {string} fornecedor.celular - O celular do fornecedor.
 * @param {string} fornecedor.email - O e-mail do fornecedor.
 * @param {string} fornecedor.site - O site do fornecedor.
 * @param {string} fornecedor.cep - O CEP do fornecedor.
 * @param {string} fornecedor.endereco - O endereço do fornecedor.
 * @param {string} fornecedor.numero_endereco - O número do endereço do fornecedor.
 * @param {string} fornecedor.cidade - A cidade do fornecedor.
 * @param {string} fornecedor.bairro - O bairro do fornecedor.
 * @param {string} fornecedor.estado - O estado do fornecedor.
 * @param {string} fornecedor.banco - O banco do fornecedor.
 * @param {string} fornecedor.tipo_conta - O tipo de conta do fornecedor.
 * @param {string} fornecedor.conta - O número da conta do fornecedor.
 * @param {string} fornecedor.agencia_bancaria - A agência bancária do fornecedor.
 * @returns {Promise<Object>} O fornecedor atualizado.
 */
const updateFornecedor = async (id, fornecedor) => {
  const {
    nome,
    cnpj,
    telefone,
    celular,
    email,
    site,
    cep,
    endereco,
    numero_endereco,
    cidade,
    bairro,
    estado,
    banco,
    tipo_conta,
    conta,
    agencia_bancaria,
  } = fornecedor;
  const result = await pool.query(
    `UPDATE fornecedores SET nome = $1, cnpj = $2, telefone = $3, celular = $4, email = $5, site = $6, cep = $7, endereco = $8, numero_endereco = $9, cidade = $10, bairro = $11, estado = $12, banco = $13, tipo_conta = $14, conta = $15, agencia_bancaria = $16
     WHERE id = $17 RETURNING *`,
    [
      nome,
      cnpj,
      telefone,
      celular,
      email,
      site,
      cep,
      endereco,
      numero_endereco,
      cidade,
      bairro,
      estado,
      banco,
      tipo_conta,
      conta,
      agencia_bancaria,
      id,
    ]
  );
  return result.rows[0];
};

/**
 * @description Deleta um fornecedor do banco de dados com base no ID fornecido.
 * @param {number} id - O ID do fornecedor a ser deletado.
 * @returns {Promise<void>}
 */
const deleteFornecedor = async (id) => {
  await pool.query("DELETE FROM fornecedores WHERE id = $1", [id]);
};

module.exports = {
  getAllFornecedores,
  getFornecedorById,
  createFornecedor,
  updateFornecedor,
  deleteFornecedor,
};
