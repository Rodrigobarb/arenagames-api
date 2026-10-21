const { Router } = require('express');

const { getInscricoes, addInscricao, updateInscricao, deleteInscricao, getInscricaoPorId } = require('../controllers/inscricaoController');

const rotasInscricoes = new Router();

rotasInscricoes.route('/inscricao')
    .get(getInscricoes)
    .post(addInscricao)
    .put(updateInscricao)

rotasInscricoes.route('/inscricao/:id')
    .get(getInscricaoPorId)
    .delete(deleteInscricao)

module.exports = { rotasInscricoes };
