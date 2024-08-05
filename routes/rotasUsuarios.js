const { Router } = require('express');
const { getUsuarios, addUsuario, updateUsuario,
     deleteUsuario, getUsuarioPorEmail } = 
    require('../controllers/usuariosController');
const { verificaJWT } = require('../controllers/segurancaController');

const rotasUsuarios = new Router();

rotasUsuarios.route('/usuario')
               .get(getUsuarios)
               .post(verificaJWT, addUsuario)
               .put(updateUsuario);

rotasUsuarios.route('/usuario/:email') 
               .get(verificaJWT, getUsuarioPorEmail)              
               .delete(verificaJWT, deleteUsuario);

module.exports = { rotasUsuarios };