const { Router } = require('express');

const { getEquipes, addEquipe, updateEquipe, deleteEquipe, getEquipePorId } = require('../controllers/equipeController');

const rotasEquipes = new Router();

rotasEquipes.route('/equipe')
    .get(getEquipes)
    .post(addEquipe)
    .put(updateEquipe)

rotasEquipes.route('/equipe/:id')
    .get(getEquipePorId)
    .delete(deleteEquipe)

module.exports = { rotasEquipes };
