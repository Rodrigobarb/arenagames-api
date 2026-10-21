const { Router } = require('express');

const { getJogos, addJogo, updateJogo, deleteJogo, getJogoPorId } = require('../controllers/jogoController');

const rotasJogos = new Router();

rotasJogos.route('/jogo')
    .get(getJogos)
    .post(addJogo)
    .put(updateJogo)

rotasJogos.route('/jogo/:id')
    .get(getJogoPorId)
    .delete(deleteJogo)

module.exports = { rotasJogos };
