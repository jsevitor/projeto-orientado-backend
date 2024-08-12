require("dotenv").config(); // Carrega variáveis do .env

const { Pool } = require("pg");

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
