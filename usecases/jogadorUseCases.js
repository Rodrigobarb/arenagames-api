const { pool } = require('../config');
const Jogador = require('../entities/jogador')

const getJogadoresDB = async () => {
    try {
        // JOIN para trazer o nome da equipe (chave estrangeira)
        const { rows } = await pool.query(`SELECT p.id as id, p.nickname as nickname, p.nome as nome,
            p.funcao as funcao, p.equipe as equipe, e.nome as equipe_nome
            FROM jogadores p
            JOIN equipes e ON p.equipe = e.id
            ORDER BY e.nome, p.nickname`);
        return rows.map((jogador) => new Jogador(jogador.id, jogador.nickname, jogador.nome,
            jogador.funcao, jogador.equipe, jogador.equipe_nome));
    } catch (err) {
        throw "Erro : " + err;
    }
}

const addJogadorDB = async (body) => {
    try {
        const { nickname, nome, funcao, equipe } = body;
        const results = await pool.query(`INSERT INTO jogadores (nickname, nome, funcao, equipe)
            VALUES ($1, $2, $3, $4)
            returning id, nickname, nome, funcao, equipe`,
            [nickname, nome, funcao, equipe]);
        const jogador = results.rows[0];
        return new Jogador(jogador.id, jogador.nickname, jogador.nome, jogador.funcao, jogador.equipe, "");
    } catch (err) {
        if (err.code === '23503') {
            throw "A equipe selecionada não existe.";
        }
        throw "Erro ao inserir o jogador: " + err;
    }
}

const updateJogadorDB = async (body) => {
    try {
        const { id, nickname, nome, funcao, equipe } = body;
        const results = await pool.query(`UPDATE jogadores SET nickname = $2, nome = $3, funcao = $4,
            equipe = $5 WHERE id = $1
            returning id, nickname, nome, funcao, equipe`,
            [id, nickname, nome, funcao, equipe]);
        if (results.rowCount == 0) {
            throw `Nenhum registro encontrado com o id ${id} para ser alterado`;
        }
        const jogador = results.rows[0];
        return new Jogador(jogador.id, jogador.nickname, jogador.nome, jogador.funcao, jogador.equipe, "");
    } catch (err) {
        if (err.code === '23503') {
            throw "A equipe selecionada não existe.";
        }
        throw "Erro ao alterar o jogador: " + err;
    }
}

const deleteJogadorDB = async (id) => {
    try {
        const results = await pool.query(`DELETE FROM jogadores WHERE id = $1`, [id]);
        if (results.rowCount == 0) {
            throw `Nenhum registro encontrado com o id ${id} para ser removido`;
        } else {
            return "Jogador removido com sucesso";
        }
    } catch (err) {
        throw "Erro ao remover o jogador: " + err;
    }
}

const getJogadorPorIdDB = async (id) => {
    try {
        const results = await pool.query(`SELECT p.id as id, p.nickname as nickname, p.nome as nome,
            p.funcao as funcao, p.equipe as equipe, e.nome as equipe_nome
            FROM jogadores p
            JOIN equipes e ON p.equipe = e.id
            WHERE p.id = $1`, [id]);
        if (results.rowCount == 0) {
            throw "Nenhum registro encontrado com o id: " + id;
        } else {
            const jogador = results.rows[0];
            return new Jogador(jogador.id, jogador.nickname, jogador.nome, jogador.funcao, jogador.equipe, jogador.equipe_nome);
        }
    } catch (err) {
        throw "Erro ao recuperar o jogador: " + err;
    }
}

module.exports = {
    getJogadoresDB, addJogadorDB, updateJogadorDB, deleteJogadorDB, getJogadorPorIdDB
}
