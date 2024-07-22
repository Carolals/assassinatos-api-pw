const { Router } = require('express');

const { rotasAssassinatos} = require('./rotasAssassinatos');
const { rotasSuspeitos} = require('./rotasSuspeitos');
const { rotasVitimas} = require('./rotasVitimas');
const { rotasEstatisticas } = require('./rotasEstatisticas');

const rotas = new Router();

rotas.use(rotasAssassinatos);
rotas.use(rotasSuspeitos);
rotas.use(rotasVitimas);
rotas.use(rotasEstatisticas);

module.exports = rotas;