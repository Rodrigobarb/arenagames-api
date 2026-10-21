const { Router } = require('express');

const { getJogadores, addJogador, updateJogador, deleteJogador, getJogadorPorId } = require('../controllers/jogadorController');

const rotasJogadores = new Router();

rotasJogadores.route('/jogador')
    .get(getJogadores)
    .post(addJogador)
    .put(updateJogador)

rotasJogadores.route('/jogador/:id')
    .get(getJogadorPorId)
    .delete(deleteJogador)

module.exports = { rotasJogadores };
