const { Router } = require('express');
const { login } = require('../controllers/segurancaController');
const { rotasAssassinatos} = require('./rotasAssassinatos');
const { rotasSuspeitos} = require('./rotasSuspeitos');
const { rotasVitimas} = require('./rotasVitimas');
const { rotasEstatisticas } = require('./rotasEstatisticas');
const { rotasUsuarios } = require('./rotasUsuarios');

const rotas = new Router();

rotas.route('/login')
    .post(login)
    
rotas.use(rotasAssassinatos);
rotas.use(rotasSuspeitos);
rotas.use(rotasVitimas);
rotas.use(rotasEstatisticas);
rotas.use(rotasUsuarios);

module.exports = rotas;