const { Router } = require('express');
const { getVitimas, addVitima, updateVitima, getVitimaPorId, 
    deleteVitima} = 
    require('../controllers/vitimasController');

const rotasVitimas = new Router();

rotasVitimas.route('/vitima')
               .get(getVitimas)
               .post(addVitima)
               .put(updateVitima);

rotasVitimas.route('/vitima/:id') 
               .get(getVitimaPorId)              
               .delete(deleteVitima);

module.exports = { rotasVitimas };