const { Router } = require('express');

const { rotasJogos } = require('./rotasJogos');
const { rotasEquipes } = require('./rotasEquipes');
const { rotasCampeonatos } = require('./rotasCampeonatos');
const { rotasInscricoes } = require('./rotasInscricoes');

const rotas = new Router();

rotas.use(rotasJogos);
rotas.use(rotasEquipes);
rotas.use(rotasCampeonatos);
rotas.use(rotasInscricoes);

module.exports = rotas;
