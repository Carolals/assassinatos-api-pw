const { getEstatisticasDB } = require('../usecases/EstatisticasUseCases');

const getEstatisticas = async (request, response) => {
    try {
        const data = await getEstatisticasDB();
        response.status(200).json(data);
    } catch (err) {
        response.status(500).json({
            status: 'error',
            message: 'Erro ao consultar as estatisticas: ' + err.message
        });
    }
}

module.exports = {
    getEstatisticas
}
