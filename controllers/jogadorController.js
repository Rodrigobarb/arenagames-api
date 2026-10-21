const { getJogadoresDB, addJogadorDB, updateJogadorDB, deleteJogadorDB, getJogadorPorIdDB } = require('../usecases/jogadorUseCases')

const getJogadores = async (request, response) => {
    await getJogadoresDB()
        .then(data => response.status(200).json(data))
        .catch(err => response.status(400).json({
            status: 'error',
            message: 'Erro ao consultar: ' + err
        }));
}

const addJogador = async (request, response) => {
    await addJogadorDB(request.body)
        .then(data => response.status(200).json({
            status: "success", message: "Jogador criado",
            objeto: data
        }))
        .catch(err => response.status(400).json({
            status: 'error',
            message: err
        }));
}

const updateJogador = async (request, response) => {
    await updateJogadorDB(request.body)
        .then(data => response.status(200).json({
            status: "success", message: "Jogador alterado",
            objeto: data
        }))
        .catch(err => response.status(400).json({
            status: 'error',
            message: err
        }));
}

const deleteJogador = async (request, response) => {
    await deleteJogadorDB(parseInt(request.params.id))
        .then(data => response.status(200).json({
            status: "success", message: data
        }))
        .catch(err => response.status(400).json({
            status: 'error',
            message: err
        }));
}

const getJogadorPorId = async (request, response) => {
    await getJogadorPorIdDB(parseInt(request.params.id))
        .then(data => response.status(200).json(data))
        .catch(err => response.status(400).json({
            status: 'error',
            message: err
        }));
}

module.exports = {
    getJogadores, addJogador, updateJogador, deleteJogador, getJogadorPorId
}
