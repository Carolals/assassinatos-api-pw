const { Router } = require('express');
const { getAssassinatos, addAssassinato, updateAssassinato, getAssassinatoPorId, 
    deleteAssassinato} = 
    require('../controllers/assassinatosController');
const { verificaJWT } = require('../controllers/segurancaController');

const rotasAssassinatos = new Router();

rotasAssassinatos.route('/assassinato')
               .get(getAssassinatos)
               .post(verificaJWT, addAssassinato)
               .put(verificaJWT, updateAssassinato);

rotasAssassinatos.route('/assassinato/:id') 
               .get(verificaJWT, getAssassinatoPorId)              
               .delete(verificaJWT, deleteAssassinato);

module.exports = { rotasAssassinatos };