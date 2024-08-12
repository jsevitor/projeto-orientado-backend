const pool = require("./db");

const getAllFornecedores = async () => {
  const result = await pool.query("SELECT * FROM fornecedores ORDER BY id");
  return result.rows;
};

const getFornecedorById = async (id) => {
  const result = await pool.query("SELECT * FROM fornecedores WHERE id = $1", [
    id,
  ]);
  return result.rows[0];
};

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
