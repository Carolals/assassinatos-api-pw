const { getAssassinatosDB, addAssassinatoDB, updateAssassinatoDB, deleteAssassinatoDB, getAssassinatoPorIdDB } = require('../usecases/AssassinatosUseCases');

const getAssassinatos = async (request, response) => {
    await getAssassinatosDB()
          .then(data => response.status(200).json(data))
          .catch(err => response.status(400).json({
            status : 'error',
            message : 'Erro ao consultar os assassinatos: ' + err
          }))
}

const addAssassinato = async (request, response) => {
    await addAssassinatoDB(request.body)
          .then(data => response.status(200).json({
                status : "success", message : "registro de assassinato adicionado",
                objeto : data
          }))
          .catch(err => response.status(400).json({
            status : 'error',
            message : err
          }))
}

const updateAssassinato = async (request, response) => {
    await updateAssassinatoDB(request.body)
          .then(data => response.status(200).json({
                status : "success", message : "registro do assassinato alterado",
                objeto : data
          }))
          .catch(err => response.status(400).json({
            status : 'error',
            message : err
          }))
}

const deleteAssassinato = async (request, response) => {
    await deleteAssassinatoDB(request.params.id)
          .then(data => response.status(200).json({
                status : "success", message : data
          }))
          .catch(err => response.status(400).json({
            status : 'error',
            message : err
          }))
}

const getAssassinatoPorId = async (request, response) => {
    await getAssassinatoPorIdDB(request.params.id)
          .then(data => response.status(200).json(data))
          .catch(err => response.status(400).json({
            status : 'error',
            message : err
          }))
}

module.exports = {
      getAssassinatos, addAssassinato, updateAssassinato, deleteAssassinato, getAssassinatoPorId
}