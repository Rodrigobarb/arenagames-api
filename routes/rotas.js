const { Router } = require('express');

const { rotasJogos } = require('./rotasJogos');
const { rotasEquipes } = require('./rotasEquipes');
const { rotasJogadores } = require('./rotasJogadores');

const rotas = new Router();

rotas.use(rotasJogos);
rotas.use(rotasEquipes);
rotas.use(rotasJogadores);

module.exports = rotas;
