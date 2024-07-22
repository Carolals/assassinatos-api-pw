const { Router } = require('express');
const { getEstatisticas } = 
   require('../controllers/estatisticasController');

const rotasEstatisticas = new Router();

rotasEstatisticas.route('/estatisticas')
               .get(getEstatisticas);

module.exports =  { rotasEstatisticas };
