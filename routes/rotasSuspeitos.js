const { Router } = require('express');
const { getSuspeitos, addSuspeito, updateSuspeito,
     deleteSuspeito, getSuspeitoPorId } = 
    require('../controllers/suspeitosController');
const { verificaJWT } = require('../controllers/segurancaController');

const rotasSuspeitos = new Router();

rotasSuspeitos.route('/suspeito')
               .get(getSuspeitos)
               .post(verificaJWT, addSuspeito)
               .put(updateSuspeito);

rotasSuspeitos.route('/suspeito/:id') 
               .get(verificaJWT, getSuspeitoPorId)              
               .delete(verificaJWT, deleteSuspeito);

module.exports = { rotasSuspeitos };