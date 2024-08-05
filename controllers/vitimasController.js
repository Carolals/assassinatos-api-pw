const { getVitimasDB, addVitimaDB, updateVitimaDB, 
      deleteVitimaDB, getVitimaPorIdDB } 
      = require('../usecases/VitimasUseCases');

const getVitimas = async (request, response) => {
    await getVitimasDB()
          .then(data => response.status(200).json(data))
          .catch(err => response.status(400).json({
            status : 'error',
            message : 'Erro ao consultar os cadastros das vítimas: ' + err
          }))
}

const addVitima = async (request, response) => {
    await addVitimaDB(request.body)
          .then(data => response.status(200).json({
                status : "success", message : "Cadastro de vítima criado",
                objeto : data
          }))
          .catch(err => response.status(400).json({
            status : 'error',
            message : err
          }))
}

const updateVitima = async (request, response) => {
    await updateVitimaDB(request.body)
          .then(data => response.status(200).json({
                status : "success", message : "Cadastro da vítima alterado",
                objeto : data
          }))
          .catch(err => response.status(400).json({
            status : 'error',
            message : err
          }))
}

const deleteVitima = async (request, response) => {
    await deleteVitimaDB(request.params.id)
          .then(data => response.status(200).json({
                status : "success", message : data
          }))
          .catch(err => response.status(400).json({
            status : 'error',
            message : err
          }))
}

const getVitimaPorId = async (request, response) => {
    await getVitimaPorIdDB(request.params.id)
          .then(data => response.status(200).json(data))
          .catch(err => response.status(400).json({
            status : 'error',
            message : err
          }))
}

module.exports = {
    getVitimas, addVitima, updateVitima, deleteVitima, getVitimaPorId
}
