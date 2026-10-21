const { pool } = require('../config');
const Equipe = require('../entities/equipe');
const { traduzErro } = require('./erros');
const { vazioParaNulo } = require('./util');

const campos = `id, nome, sigla, cidade, to_char(data_fundacao,'YYYY-MM-DD') as data_fundacao, ativa`;

const montaEquipe = (e) => new Equipe(e.id, e.nome, e.sigla, e.cidade, e.data_fundacao, e.ativa);

const getEquipesDB = async () => {
    try {
        const { rows } = await pool.query(`SELECT ${campos} FROM equipes ORDER BY nome`);
        return rows.map(montaEquipe);
    } catch (err) {
        throw "Erro : " + traduzErro(err);
    }
}

const addEquipeDB = async (body) => {
    try {
        const { nome, sigla, cidade, data_fundacao, ativa } = body;
        const results = await pool.query(`INSERT INTO equipes (nome, sigla, cidade, data_fundacao, ativa)
            VALUES ($1, upper($2), $3, $4, $5)
            returning ${campos}`,
            [nome, sigla, cidade, vazioParaNulo(data_fundacao), ativa]);
        return montaEquipe(results.rows[0]);
    } catch (err) {
        throw "Erro ao inserir a equipe: " + traduzErro(err);
    }
}

const updateEquipeDB = async (body) => {
    try {
        const { id, nome, sigla, cidade, data_fundacao, ativa } = body;
        const results = await pool.query(`UPDATE equipes SET nome = $2, sigla = upper($3), cidade = $4,
            data_fundacao = $5, ativa = $6 WHERE id = $1
            returning ${campos}`,
            [id, nome, sigla, cidade, vazioParaNulo(data_fundacao), ativa]);
        if (results.rowCount == 0) {
            throw `Nenhum registro encontrado com o id ${id} para ser alterado`;
        }
        return montaEquipe(results.rows[0]);
    } catch (err) {
        throw "Erro ao alterar a equipe: " + traduzErro(err);
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
        throw "Erro ao remover a equipe: " + traduzErro(err);
    }
}

const getEquipePorIdDB = async (id) => {
    try {
        const results = await pool.query(`SELECT ${campos} FROM equipes WHERE id = $1`, [id]);
        if (results.rowCount == 0) {
            throw "Nenhum registro encontrado com o id: " + id;
        } else {
            return montaEquipe(results.rows[0]);
        }
    } catch (err) {
        throw "Erro ao recuperar a equipe: " + traduzErro(err);
    }
}

module.exports = {
    getEquipesDB, addEquipeDB, updateEquipeDB, deleteEquipeDB, getEquipePorIdDB
}
