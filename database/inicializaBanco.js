// Cria as tabelas (se ainda não existirem) e insere dados de exemplo
// quando o banco está vazio. Assim o banco da Render já fica pronto no
// primeiro deploy, sem precisar rodar o script manualmente no pgAdmin.
const fs = require('fs');
const path = require('path');
const { pool } = require('../config');

const inicializaBanco = async () => {
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
