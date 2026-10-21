const { getEquipesDB, addEquipeDB, updateEquipeDB, deleteEquipeDB, getEquipePorIdDB } = require('../usecases/equipeUseCases')

const getEquipes = async (request, response) => {
    await getEquipesDB()
        .then(data => response.status(200).json(data))
        .catch(err => response.status(400).json({
            status: 'error',
            message: 'Erro ao consultar: ' + err
        }));
}

const addEquipe = async (request, response) => {
    await addEquipeDB(request.body)
        .then(data => response.status(200).json({
            status: "success", message: "Equipe criada",
            objeto: data
        }))
        .catch(err => response.status(400).json({
            status: 'error',
            message: err
        }));
}

const updateEquipe = async (request, response) => {
    await updateEquipeDB(request.body)
        .then(data => response.status(200).json({
            status: "success", message: "Equipe alterada",
            objeto: data
        }))
        .catch(err => response.status(400).json({
            status: 'error',
            message: err
        }));
}

const deleteEquipe = async (request, response) => {
    await deleteEquipeDB(parseInt(request.params.id))
        .then(data => response.status(200).json({
            status: "success", message: data
        }))
        .catch(err => response.status(400).json({
            status: 'error',
            message: err
        }));
}

const getEquipePorId = async (request, response) => {
    await getEquipePorIdDB(parseInt(request.params.id))
        .then(data => response.status(200).json(data))
        .catch(err => response.status(400).json({
            status: 'error',
            message: err
        }));
}

module.exports = {
    getEquipes, addEquipe, updateEquipe, deleteEquipe, getEquipePorId
}
