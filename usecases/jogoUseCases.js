const { pool } = require('../config');
const Jogo = require('../entities/jogo');
const { traduzErro } = require('./erros');

const getJogosDB = async () => {
    try {
        const { rows } = await pool.query('SELECT * FROM jogos ORDER BY titulo');
        return rows.map((jogo) => new Jogo(jogo.id, jogo.titulo, jogo.genero, jogo.desenvolvedora, jogo.jogadores_por_time));
    } catch (err) {
        throw "Erro : " + traduzErro(err);
    }
}

const addJogoDB = async (body) => {
    try {
        const { titulo, genero, desenvolvedora, jogadores_por_time } = body;
        const results = await pool.query(`INSERT INTO jogos (titulo, genero, desenvolvedora, jogadores_por_time)
            VALUES ($1, $2, $3, $4)
            returning id, titulo, genero, desenvolvedora, jogadores_por_time`,
            [titulo, genero, desenvolvedora, jogadores_por_time]);
        const jogo = results.rows[0];
        return new Jogo(jogo.id, jogo.titulo, jogo.genero, jogo.desenvolvedora, jogo.jogadores_por_time);
    } catch (err) {
        throw "Erro ao inserir o jogo: " + traduzErro(err);
    }
}

const updateJogoDB = async (body) => {
    try {
        const { id, titulo, genero, desenvolvedora, jogadores_por_time } = body;
        const results = await pool.query(`UPDATE jogos SET titulo = $2, genero = $3, desenvolvedora = $4,
            jogadores_por_time = $5 WHERE id = $1
            returning id, titulo, genero, desenvolvedora, jogadores_por_time`,
            [id, titulo, genero, desenvolvedora, jogadores_por_time]);
        if (results.rowCount == 0) {
            throw `Nenhum registro encontrado com o id ${id} para ser alterado`;
        }
        const jogo = results.rows[0];
        return new Jogo(jogo.id, jogo.titulo, jogo.genero, jogo.desenvolvedora, jogo.jogadores_por_time);
    } catch (err) {
        throw "Erro ao alterar o jogo: " + traduzErro(err);
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
        throw "Erro ao remover o jogo: " + traduzErro(err);
    }
}

const getJogoPorIdDB = async (id) => {
    try {
        const results = await pool.query(`SELECT * FROM jogos WHERE id = $1`, [id]);
        if (results.rowCount == 0) {
            throw "Nenhum registro encontrado com o id: " + id;
        } else {
            const jogo = results.rows[0];
            return new Jogo(jogo.id, jogo.titulo, jogo.genero, jogo.desenvolvedora, jogo.jogadores_por_time);
        }
    } catch (err) {
        throw "Erro ao recuperar o jogo: " + traduzErro(err);
    }
}

module.exports = {
    getJogosDB, addJogoDB, updateJogoDB, deleteJogoDB, getJogoPorIdDB
}
