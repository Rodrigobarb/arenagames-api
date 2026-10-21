// Cria as tabelas (se ainda não existirem) e insere dados de exemplo
// quando o banco está vazio. Assim o banco da Render já fica pronto
// sem precisar rodar o script no pgAdmin.
const fs = require('fs');
const path = require('path');
const { pool } = require('../config');

const inicializaBanco = async () => {
    // Remove as tabelas da primeira versão do trabalho, se ainda existirem
    // (só faz alguma coisa uma vez, no banco que já estava na Render)
    const antiga = await pool.query(`SELECT 1 FROM information_schema.tables WHERE table_name = 'campeonatos'`);
    if (antiga.rowCount > 0) {
        await pool.query('DROP TABLE IF EXISTS inscricoes, campeonatos, equipes, jogos CASCADE');
        console.log('Tabelas antigas removidas.');
    }

    const script = fs.readFileSync(path.join(__dirname, 'script_banco.sql'), 'utf8');
    await pool.query(script);

    const { rows } = await pool.query('SELECT count(*)::int AS total FROM jogos');
    if (rows[0].total === 0) {
        const dados = fs.readFileSync(path.join(__dirname, 'dados_iniciais.sql'), 'utf8');
        await pool.query(dados);
        console.log('Dados iniciais inseridos.');
    }
    console.log('Banco de dados pronto.');
}

module.exports = { inicializaBanco };
