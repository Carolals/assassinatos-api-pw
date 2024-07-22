const { Router } = require('express');
const { getSuspeitos, addSuspeito, updateSuspeito,
     deleteSuspeito, getSuspeitoPorId } = 
    require('../controllers/suspeitosController');

const rotasSuspeitos = new Router();

rotasSuspeitos.route('/suspeito')
               .get(getSuspeitos)
               .post(addSuspeito)
               .put(updateSuspeito);

rotasSuspeitos.route('/suspeito/:id') 
               .get(getSuspeitoPorId)              
               .delete(deleteSuspeito);

module.exports = { rotasSuspeitos };