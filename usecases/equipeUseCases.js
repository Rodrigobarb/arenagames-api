const { pool } = require('../config');
const Equipe = require('../entities/equipe')

const getEquipesDB = async () => {
    try {
        // JOIN para trazer o nome do jogo (chave estrangeira)
        const { rows } = await pool.query(`SELECT e.id as id, e.nome as nome, e.sigla as sigla,
            e.cidade as cidade, e.jogo as jogo, j.nome as jogo_nome
            FROM equipes e
            JOIN jogos j ON e.jogo = j.id
            ORDER BY e.nome`);
        return rows.map((equipe) => new Equipe(equipe.id, equipe.nome, equipe.sigla,
            equipe.cidade, equipe.jogo, equipe.jogo_nome));
    } catch (err) {
        throw "Erro : " + err;
    }
}

const addEquipeDB = async (body) => {
    try {
        const { nome, sigla, cidade, jogo } = body;
        const results = await pool.query(`INSERT INTO equipes (nome, sigla, cidade, jogo)
            VALUES ($1, $2, $3, $4)
            returning id, nome, sigla, cidade, jogo`,
            [nome, sigla, cidade, jogo]);
        const equipe = results.rows[0];
        return new Equipe(equipe.id, equipe.nome, equipe.sigla, equipe.cidade, equipe.jogo, "");
    } catch (err) {
        throw "Erro ao inserir a equipe: " + err;
    }
}

const updateEquipeDB = async (body) => {
    try {
        const { id, nome, sigla, cidade, jogo } = body;
        const results = await pool.query(`UPDATE equipes SET nome = $2, sigla = $3, cidade = $4,
            jogo = $5 WHERE id = $1
            returning id, nome, sigla, cidade, jogo`,
            [id, nome, sigla, cidade, jogo]);
        if (results.rowCount == 0) {
            throw `Nenhum registro encontrado com o id ${id} para ser alterado`;
        }
        const equipe = results.rows[0];
        return new Equipe(equipe.id, equipe.nome, equipe.sigla, equipe.cidade, equipe.jogo, "");
    } catch (err) {
        throw "Erro ao alterar a equipe: " + err;
    }
}

const deleteEquipeDB = async (id) => {
    try {
        const results = await pool.query(`DELETE FROM equipes WHERE id = $1`, [id]);
        if (results.rowCount == 0) {
            throw `Nenhum registro encontrado com o id ${id} para ser removido`;
        } else {
            return "Equipe removida com sucesso";
        }
    } catch (err) {
        throw "Erro ao remover a equipe: " + err;
    }
}

const getEquipePorIdDB = async (id) => {
    try {
        const results = await pool.query(`SELECT e.id as id, e.nome as nome, e.sigla as sigla,
            e.cidade as cidade, e.jogo as jogo, j.nome as jogo_nome
            FROM equipes e
            JOIN jogos j ON e.jogo = j.id
            WHERE e.id = $1`, [id]);
        if (results.rowCount == 0) {
            throw "Nenhum registro encontrado com o id: " + id;
        } else {
            const equipe = results.rows[0];
            return new Equipe(equipe.id, equipe.nome, equipe.sigla, equipe.cidade, equipe.jogo, equipe.jogo_nome);
        }
    } catch (err) {
        throw "Erro ao recuperar a equipe: " + err;
    }
}

module.exports = {
    getEquipesDB, addEquipeDB, updateEquipeDB, deleteEquipeDB, getEquipePorIdDB
}
