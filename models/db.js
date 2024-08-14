require("dotenv").config();
const { Pool } = require("pg");

/**
 * @description Cria uma instância de Pool para conexão com o banco de dados PostgreSQL
 * utilizando as variáveis de ambiente configuradas no arquivo .env.
 *
 * As variáveis de ambiente esperadas são:
 * - DB_USER: Usuário do banco de dados
 * - DB_HOST: Host onde o banco de dados está localizado
 * - DB_NAME: Nome do banco de dados
 * - DB_PASSWORD: Senha do banco de dados
 * - DB_PORT: Porta na qual o banco de dados está escutando
 *
 * @note A configuração SSL está habilitada e a opção `rejectUnauthorized` está
 * definida como `false`, o que desativa a verificação do certificado. Isso deve ser usado
 * com cuidado em ambientes de produção.
 */
const pool = new Pool({
  user: process.env.DB_USER,
  host: process.env.DB_HOST,
  database: process.env.DB_NAME,
  password: process.env.DB_PASSWORD,
  port: process.env.DB_PORT,
  ssl: {
    rejectUnauthorized: false, // Opcional: desativa a verificação do certificado (use com cuidado)
  },
});

module.exports = pool;
