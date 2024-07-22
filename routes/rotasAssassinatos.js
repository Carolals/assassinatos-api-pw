const { Router } = require('express');
const { getAssassinatos, addAssassinato, updateAssassinato, getAssassinatoPorId, 
    deleteAssassinato} = 
    require('../controllers/assassinatosController');

const rotasAssassinatos = new Router();

rotasAssassinatos.route('/assassinato')
               .get(getAssassinatos)
               .post(addAssassinato)
               .put(updateAssassinato);

rotasAssassinatos.route('/assassinato/:id') 
               .get(getAssassinatoPorId)              
               .delete(deleteAssassinato);

module.exports = { rotasAssassinatos };