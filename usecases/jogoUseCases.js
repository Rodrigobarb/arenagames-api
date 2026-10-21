const { pool } = require('../config');
const Jogo = require('../entities/jogo')

const getJogosDB = async () => {
    try {
        const { rows } = await pool.query('SELECT * FROM jogos ORDER BY nome');
        return rows.map((jogo) => new Jogo(jogo.id, jogo.nome, jogo.genero));
    } catch (err) {
        throw "Erro : " + err;
    }
}

const addJogoDB = async (body) => {
    try {
        const { nome, genero } = body;
        const results = await pool.query(`INSERT INTO jogos (nome, genero)
            VALUES ($1, $2)
            returning id, nome, genero`,
            [nome, genero]);
        const jogo = results.rows[0];
        return new Jogo(jogo.id, jogo.nome, jogo.genero);
    } catch (err) {
        throw "Erro ao inserir o jogo: " + err;
    }
}

const updateJogoDB = async (body) => {
    try {
        const { id, nome, genero } = body;
        const results = await pool.query(`UPDATE jogos SET nome = $2, genero = $3 WHERE id = $1
            returning id, nome, genero`,
            [id, nome, genero]);
        if (results.rowCount == 0) {
            throw `Nenhum registro encontrado com o id ${id} para ser alterado`;
        }
        const jogo = results.rows[0];
        return new Jogo(jogo.id, jogo.nome, jogo.genero);
    } catch (err) {
        throw "Erro ao alterar o jogo: " + err;
    }
}

const deleteJogoDB = async (id) => {
    try {
        const results = await pool.query(`DELETE FROM jogos WHERE id = $1`, [id]);
        if (results.rowCount == 0) {
            throw `Nenhum registro encontrado com o id ${id} para ser removido`;
        } else {
            return "Jogo removido com sucesso";
        }
    } catch (err) {
        throw "Erro ao remover o jogo: " + err;
    }
}

const getJogoPorIdDB = async (id) => {
    try {
        const results = await pool.query(`SELECT * FROM jogos WHERE id = $1`, [id]);
        if (results.rowCount == 0) {
            throw "Nenhum registro encontrado com o id: " + id;
        } else {
            const jogo = results.rows[0];
            return new Jogo(jogo.id, jogo.nome, jogo.genero);
        }
    } catch (err) {
        throw "Erro ao recuperar o jogo: " + err;
    }
}

module.exports = {
    getJogosDB, addJogoDB, updateJogoDB, deleteJogoDB, getJogoPorIdDB
}
