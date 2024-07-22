const { pool } = require('../config');

const getEstatisticasDB = async () => {
    try {
        const totalAssassinatosResult = await pool.query(`SELECT COUNT(*) FROM assassinatos`);
        const vitimasMulheresResult = await pool.query(`SELECT COUNT(*) FROM vitimas WHERE genero = 'Feminino'`);
        const vitimasHomensResult = await pool.query(`SELECT COUNT(*) FROM vitimas WHERE genero = 'Masculino'`);
        const suspeitosMulheresResult = await pool.query(`SELECT COUNT(*) FROM suspeitos WHERE genero = 'Feminino'`);
        const suspeitosHomensResult = await pool.query(`SELECT COUNT(*) FROM suspeitos WHERE genero = 'Masculino'`);

        return {
            totalAssassinatos: totalAssassinatosResult.rows[0].count,
            vitimasMulheres: vitimasMulheresResult.rows[0].count,
            vitimasHomens: vitimasHomensResult.rows[0].count,
            suspeitosMulheres: suspeitosMulheresResult.rows[0].count,
            suspeitosHomens: suspeitosHomensResult.rows[0].count,
        };
    } catch (error) {
        throw new Error('Erro ao buscar dados do banco de dados');
    }
}

module.exports = {
    getEstatisticasDB,
}