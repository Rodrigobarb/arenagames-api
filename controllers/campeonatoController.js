const { getCampeonatosDB, addCampeonatoDB, updateCampeonatoDB, deleteCampeonatoDB, getCampeonatoPorIdDB } = require('../usecases/campeonatoUseCases')

const getCampeonatos = async (request, response) => {
    await getCampeonatosDB()
        .then(data => response.status(200).json(data))
        .catch(err => response.status(400).json({
            status: 'error',
            message: 'Erro ao consultar os campeonatos: ' + err
        }));
}

const addCampeonato = async (request, response) => {
    await addCampeonatoDB(request.body)
        .then(data => response.status(200).json({
            status: "success", message: "Campeonato criado",
            objeto: data
        }))
        .catch(err => response.status(400).json({
            status: 'error',
            message: err
        }));
}

const updateCampeonato = async (request, response) => {
    await updateCampeonatoDB(request.body)
        .then(data => response.status(200).json({
            status: "success", message: "Campeonato alterado",
            objeto: data
        }))
        .catch(err => response.status(400).json({
            status: 'error',
            message: err
        }));
}

const deleteCampeonato = async (request, response) => {
    await deleteCampeonatoDB(parseInt(request.params.id))
        .then(data => response.status(200).json({
            status: "success", message: data
        }))
        .catch(err => response.status(400).json({
            status: 'error',
            message: err
        }));
}

const getCampeonatoPorId = async (request, response) => {
    await getCampeonatoPorIdDB(parseInt(request.params.id))
        .then(data => response.status(200).json(data))
        .catch(err => response.status(400).json({
            status: 'error',
            message: err
        }));
}

module.exports = {
    getCampeonatos, addCampeonato, updateCampeonato, deleteCampeonato, getCampeonatoPorId
}
