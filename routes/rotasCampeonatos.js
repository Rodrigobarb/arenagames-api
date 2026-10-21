const { Router } = require('express');

const { getCampeonatos, addCampeonato, updateCampeonato, deleteCampeonato, getCampeonatoPorId } = require('../controllers/campeonatoController');

const rotasCampeonatos = new Router();

rotasCampeonatos.route('/campeonato')
    .get(getCampeonatos)
    .post(addCampeonato)
    .put(updateCampeonato)

rotasCampeonatos.route('/campeonato/:id')
    .get(getCampeonatoPorId)
    .delete(deleteCampeonato)

module.exports = { rotasCampeonatos };
