const pool = require("./db");

/**
 * @description Retorna todas as movimentações de produtos, incluindo entradas e retiradas, e calcula a quantidade em estoque.
 * @returns {Promise<Array>} Uma lista de movimentações com as seguintes propriedades:
 * - `nome`: Nome do produto.
 * - `data_entrada`: Data da entrada do produto.
 * - `data_retirada`: Data da retirada do produto.
 * - `quantidade_total_entrada`: Quantidade total de entradas do produto.
 * - `quantidade_total_saida`: Quantidade total de retiradas do produto.
 * - `quantidade_em_estoque`: Quantidade em estoque (entradas - retiradas).
 */
const getAllMovimentacoes = async () => {
  const result = await pool.query(`
     SELECT 
        p.nome,
        e.data_entrada,
        r.data_retirada,
        COALESCE(SUM(e.quantidade), 0) AS quantidade_total_entrada,
        COALESCE(SUM(r.quantidade), 0) AS quantidade_total_saida,
        (COALESCE(SUM(e.quantidade), 0) - COALESCE(SUM(r.quantidade), 0)) AS quantidade_em_estoque
     FROM 
        produtos AS p
     LEFT JOIN 
        entradas AS e ON p.id = e.produto_id
     LEFT JOIN 
        retiradas AS r ON p.id = r.produto_id
     GROUP BY 
        p.nome, e.data_entrada, r.data_retirada
     ORDER BY 
        p.nome;
    `);
  return result.rows;
};

module.exports = {
  getAllMovimentacoes,
};
