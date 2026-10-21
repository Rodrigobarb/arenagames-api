const { pool } = require('../config');
const Campeonato = require('../entities/campeonato');
const { traduzErro } = require('./erros');
const { vazioParaNulo } = require('./util');

// Consulta com JOIN para trazer o título do jogo (chave estrangeira)
// e um subselect com o total de equipes inscritas
const consulta = `SELECT c.id as id, c.nome as nome, c.descricao as descricao, c.premiacao as premiacao,
        to_char(c.data_inicio,'YYYY-MM-DD') as data_inicio, to_char(c.data_fim,'YYYY-MM-DD') as data_fim,
        c.situacao as situacao, c.max_equipes as max_equipes, c.jogo as jogo, j.titulo as jogo_titulo,
        (SELECT count(*) FROM inscricoes i WHERE i.campeonato = c.id)::int as total_inscritos
    FROM campeonatos c
    JOIN jogos j ON c.jogo = j.id`;

const retorno = `id, nome, descricao, premiacao, to_char(data_inicio,'YYYY-MM-DD') as data_inicio,
    to_char(data_fim,'YYYY-MM-DD') as data_fim, situacao, max_equipes, jogo`;

const montaCampeonato = (c) => new Campeonato(c.id, c.nome, c.descricao, c.premiacao, c.data_inicio,
    c.data_fim, c.situacao, c.max_equipes, c.jogo, c.jogo_titulo || "", c.total_inscritos || 0);

const getCampeonatosDB = async () => {
    try {
        const { rows } = await pool.query(`${consulta} ORDER BY c.data_inicio DESC`);
        return rows.map(montaCampeonato);
    } catch (err) {
        throw "Erro : " + traduzErro(err);
    }
}

const addCampeonatoDB = async (body) => {
    try {
        const { nome, descricao, premiacao, data_inicio, data_fim, situacao, max_equipes, jogo } = body;
        const results = await pool.query(`INSERT INTO campeonatos (nome, descricao, premiacao, data_inicio, data_fim, situacao, max_equipes, jogo)
            VALUES ($1, $2, $3, $4, $5, $6, $7, $8)
            returning ${retorno}`,
            [nome, descricao, premiacao, data_inicio, vazioParaNulo(data_fim), situacao, max_equipes, jogo]);
        return montaCampeonato(results.rows[0]);
    } catch (err) {
        throw "Erro ao inserir o campeonato: " + traduzErro(err);
    }
}

const updateCampeonatoDB = async (body) => {
    try {
        const { id, nome, descricao, premiacao, data_inicio, data_fim, situacao, max_equipes, jogo } = body;
        const results = await pool.query(`UPDATE campeonatos SET nome = $2, descricao = $3, premiacao = $4,
            data_inicio = $5, data_fim = $6, situacao = $7, max_equipes = $8, jogo = $9 WHERE id = $1
            returning ${retorno}`,
            [id, nome, descricao, premiacao, data_inicio, vazioParaNulo(data_fim), situacao, max_equipes, jogo]);
        if (results.rowCount == 0) {
            throw `Nenhum registro encontrado com o id ${id} para ser alterado`;
        }
        return montaCampeonato(results.rows[0]);
    } catch (err) {
        throw "Erro ao alterar o campeonato: " + traduzErro(err);
    }
}

const deleteCampeonatoDB = async (id) => {
    try {
        const results = await pool.query(`DELETE FROM campeonatos WHERE id = $1`, [id]);
        if (results.rowCount == 0) {
            throw `Nenhum registro encontrado com o id ${id} para ser removido`;
        } else {
            return "Campeonato removido com sucesso";
        }
    } catch (err) {
        throw "Erro ao remover o campeonato: " + traduzErro(err);
    }
}

const getCampeonatoPorIdDB = async (id) => {
    try {
        const results = await pool.query(`${consulta} WHERE c.id = $1`, [id]);
        if (results.rowCount == 0) {
            throw "Nenhum registro encontrado com o id: " + id;
        } else {
            return montaCampeonato(results.rows[0]);
        }
    } catch (err) {
        throw "Erro ao recuperar o campeonato: " + traduzErro(err);
    }
}

module.exports = {
    getCampeonatosDB, addCampeonatoDB, updateCampeonatoDB, deleteCampeonatoDB, getCampeonatoPorIdDB
}
