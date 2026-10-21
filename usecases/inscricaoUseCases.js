const { pool } = require('../config');
const Inscricao = require('../entities/inscricao');
const { traduzErro } = require('./erros');
const { vazioParaNulo } = require('./util');

// JOIN com campeonatos e equipes para mostrar os nomes no lugar dos ids
const consulta = `SELECT i.id as id, i.campeonato as campeonato, i.equipe as equipe,
        to_char(i.data_inscricao,'YYYY-MM-DD') as data_inscricao, i.pontos as pontos, i.colocacao as colocacao,
        c.nome as campeonato_nome, e.nome as equipe_nome, e.sigla as equipe_sigla
    FROM inscricoes i
    JOIN campeonatos c ON i.campeonato = c.id
    JOIN equipes e ON i.equipe = e.id`;

const retorno = `id, campeonato, equipe, to_char(data_inscricao,'YYYY-MM-DD') as data_inscricao, pontos, colocacao`;

const montaInscricao = (i) => new Inscricao(i.id, i.campeonato, i.equipe, i.data_inscricao, i.pontos,
    i.colocacao, i.campeonato_nome || "", i.equipe_nome || "", i.equipe_sigla || "");

// Regra de negócio: não deixar inscrever mais equipes que o limite do campeonato
const verificaVagas = async (campeonato, idIgnorar) => {
    const { rows } = await pool.query(`SELECT c.max_equipes,
            (SELECT count(*) FROM inscricoes i WHERE i.campeonato = c.id AND i.id <> $2)::int as inscritos
        FROM campeonatos c WHERE c.id = $1`, [campeonato, idIgnorar || 0]);
    if (rows.length > 0 && rows[0].inscritos >= rows[0].max_equipes) {
        throw `o campeonato já atingiu o limite de ${rows[0].max_equipes} equipes.`;
    }
}

const getInscricoesDB = async () => {
    try {
        const { rows } = await pool.query(`${consulta} ORDER BY c.nome, i.pontos DESC, e.nome`);
        return rows.map(montaInscricao);
    } catch (err) {
        throw "Erro : " + traduzErro(err);
    }
}

const addInscricaoDB = async (body) => {
    try {
        const { campeonato, equipe, data_inscricao, pontos, colocacao } = body;
        await verificaVagas(campeonato);
        const results = await pool.query(`INSERT INTO inscricoes (campeonato, equipe, data_inscricao, pontos, colocacao)
            VALUES ($1, $2, $3, $4, $5)
            returning ${retorno}`,
            [campeonato, equipe, data_inscricao, vazioParaNulo(pontos) || 0, vazioParaNulo(colocacao)]);
        return montaInscricao(results.rows[0]);
    } catch (err) {
        throw "Erro ao inserir a inscrição: " + traduzErro(err);
    }
}

const updateInscricaoDB = async (body) => {
    try {
        const { id, campeonato, equipe, data_inscricao, pontos, colocacao } = body;
        await verificaVagas(campeonato, id);
        const results = await pool.query(`UPDATE inscricoes SET campeonato = $2, equipe = $3, data_inscricao = $4,
            pontos = $5, colocacao = $6 WHERE id = $1
            returning ${retorno}`,
            [id, campeonato, equipe, data_inscricao, vazioParaNulo(pontos) || 0, vazioParaNulo(colocacao)]);
        if (results.rowCount == 0) {
            throw `Nenhum registro encontrado com o id ${id} para ser alterado`;
        }
        return montaInscricao(results.rows[0]);
    } catch (err) {
        throw "Erro ao alterar a inscrição: " + traduzErro(err);
    }
}

const deleteInscricaoDB = async (id) => {
    try {
        const results = await pool.query(`DELETE FROM inscricoes WHERE id = $1`, [id]);
        if (results.rowCount == 0) {
            throw `Nenhum registro encontrado com o id ${id} para ser removido`;
        } else {
            return "Inscrição removida com sucesso";
        }
    } catch (err) {
        throw "Erro ao remover a inscrição: " + traduzErro(err);
    }
}

const getInscricaoPorIdDB = async (id) => {
    try {
        const results = await pool.query(`${consulta} WHERE i.id = $1`, [id]);
        if (results.rowCount == 0) {
            throw "Nenhum registro encontrado com o id: " + id;
        } else {
            return montaInscricao(results.rows[0]);
        }
    } catch (err) {
        throw "Erro ao recuperar a inscrição: " + traduzErro(err);
    }
}

module.exports = {
    getInscricoesDB, addInscricaoDB, updateInscricaoDB, deleteInscricaoDB, getInscricaoPorIdDB
}
