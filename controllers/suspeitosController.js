const { getSuspeitosDB, addSuspeitoDB, updateSuspeitoDB, 
      deleteSuspeitoDB, getSuspeitoPorIdDB } 
      = require('../usecases/SuspeitosUseCases');

const getSuspeitos = async (request, response) => {
    await getSuspeitosDB()
          .then(data => response.status(200).json(data))
          .catch(err => response.status(400).json({
            status : 'error',
            message : 'Erro ao consultar os suspeitos: ' + err
          }))
}

const addSuspeito = async (request, response) => {
    await addSuspeitoDB(request.body)
          .then(data => response.status(200).json({
                status : "success", message : "Suspeito adicionado",
                objeto : data
          }))
          .catch(err => response.status(400).json({
            status : 'error',
            message : err
          }))
}

const updateSuspeito = async (request, response) => {
    await updateSuspeitoDB(request.body)
          .then(data => response.status(200).json({
                status : "success", message : "Registro de suspeito alterado",
                objeto : data
          }))
          .catch(err => response.status(400).json({
            status : 'error',
            message : err
          }))
}

const deleteSuspeito = async (request, response) => {
    await deleteSuspeitoDB(request.params.id)
          .then(data => response.status(200).json({
                status : "success", message : data
          }))
          .catch(err => response.status(400).json({
            status : 'error',
            message : err
          }))
}

const getSuspeitoPorId = async (request, response) => {
    await getSuspeitoPorIdDB(request.params.id)
          .then(data => response.status(200).json(data))
          .catch(err => response.status(400).json({
            status : 'error',
            message : err
          }))
}

module.exports = {
    getSuspeitos, addSuspeito, updateSuspeito, deleteSuspeito, getSuspeitoPorId
}
