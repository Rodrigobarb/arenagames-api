const { getInscricoesDB, addInscricaoDB, updateInscricaoDB, deleteInscricaoDB, getInscricaoPorIdDB } = require('../usecases/inscricaoUseCases')

const getInscricoes = async (request, response) => {
    await getInscricoesDB()
        .then(data => response.status(200).json(data))
        .catch(err => response.status(400).json({
            status: 'error',
            message: 'Erro ao consultar as inscrições: ' + err
        }));
}

const addInscricao = async (request, response) => {
    await addInscricaoDB(request.body)
        .then(data => response.status(200).json({
            status: "success", message: "Inscrição criada",
            objeto: data
        }))
        .catch(err => response.status(400).json({
            status: 'error',
            message: err
        }));
}

const updateInscricao = async (request, response) => {
    await updateInscricaoDB(request.body)
        .then(data => response.status(200).json({
            status: "success", message: "Inscrição alterada",
            objeto: data
        }))
        .catch(err => response.status(400).json({
            status: 'error',
            message: err
        }));
}

const deleteInscricao = async (request, response) => {
    await deleteInscricaoDB(parseInt(request.params.id))
        .then(data => response.status(200).json({
            status: "success", message: data
        }))
        .catch(err => response.status(400).json({
            status: 'error',
            message: err
        }));
}

const getInscricaoPorId = async (request, response) => {
    await getInscricaoPorIdDB(parseInt(request.params.id))
        .then(data => response.status(200).json(data))
        .catch(err => response.status(400).json({
            status: 'error',
            message: err
        }));
}

module.exports = {
    getInscricoes, addInscricao, updateInscricao, deleteInscricao, getInscricaoPorId
}
