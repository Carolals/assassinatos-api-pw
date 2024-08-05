const { getUsuariosDB, addUsuarioDB, updateUsuarioDB, 
      deleteUsuarioDB, getUsuarioPorEmailDB } 
      = require('../usecases/UsuariosUseCases');

const getUsuarios = async (request, response) => {
    await getUsuariosDB()
          .then(data => response.status(200).json(data))
          .catch(err => response.status(400).json({
            status : 'error',
            message : 'Erro ao consultar os usuários: ' + err
          }))
}

const addUsuario = async (request, response) => {
    await addUsuarioDB(request.body)
          .then(data => response.status(200).json({
                status : "success", message : "Usuário adicionado",
                objeto : data
          }))
          .catch(err => response.status(400).json({
            status : 'error',
            message : err
          }))
}

const updateUsuario = async (request, response) => {
    await updateUsuarioDB(request.body)
          .then(data => response.status(200).json({
                status : "success", message : "Registro de usuário alterado",
                objeto : data
          }))
          .catch(err => response.status(400).json({
            status : 'error',
            message : err
          }))
}

const deleteUsuario = async (request, response) => {
    await deleteUsuarioDB(request.params.email)
          .then(data => response.status(200).json({
                status : "success", message : data
          }))
          .catch(err => response.status(400).json({
            status : 'error',
            message : err
          }))
}

const getUsuarioPorEmail = async (request, response) => {
    await getUsuarioPorEmailDB(request.params.email)
          .then(data => response.status(200).json(data))
          .catch(err => response.status(400).json({
            status : 'error',
            message : err
          }))
}

module.exports = {
    getUsuarios, addUsuario, updateUsuario, deleteUsuario, getUsuarioPorEmail
}
