const { Router } = require('express');
const { getVitimas, addVitima, updateVitima, getVitimaPorId, 
    deleteVitima} = 
    require('../controllers/vitimasController');
const { verificaJWT } = require('../controllers/segurancaController');

const rotasVitimas = new Router();

rotasVitimas.route('/vitima')
               .get(getVitimas)
               .post(verificaJWT, addVitima)
               .put(verificaJWT, updateVitima);

rotasVitimas.route('/vitima/:id') 
               .get(verificaJWT, getVitimaPorId)              
               .delete(verificaJWT, deleteVitima);

module.exports = { rotasVitimas };