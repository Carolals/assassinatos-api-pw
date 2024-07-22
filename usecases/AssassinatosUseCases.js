const { pool } = require('../config');
const Assassinato = require('../entities/Assassinatos');

const getAssassinatosDB = async () => {
    try {
        const query = `
            SELECT 
                a.id, 
                TO_CHAR(a.data, 'YYYY-MM-DD') as data, 
                a.descricao, 
                v.nome AS vitima, 
                s.nome AS suspeito
            FROM 
                assassinatos a
            LEFT JOIN 
                vitimas v ON v.assassinatoid = a.id
            LEFT JOIN 
                suspeitos s ON s.assassinatoid = a.id
            ORDER BY 
                a.data
        `;
        const { rows } = await pool.query(query);
        return rows.map(row => new Assassinato(row.id, row.data, row.descricao, row.vitima, row.suspeito));
    } catch (err) {
        throw "Erro ao buscar assassinatos: " + err;
    }
}

const addAssassinatoDB = async (body) => {
    try {
        const { data, descricao } = body;
        const query = `
            INSERT INTO assassinatos (data, descricao)
            VALUES ($1, $2)
            RETURNING id, TO_CHAR(data, 'YYYY-MM-DD') as data, descricao
        `;
        const results = await pool.query(query, [data, descricao]);
        
        const assassinato = results.rows[0];
        return new Assassinato(assassinato.id, assassinato.data, assassinato.descricao);
    } catch (err) {
        throw "Erro ao inserir assassinato: " + err;
    }
}

const updateAssassinatoDB = async (body) => {
    try {
        const { id, data, descricao } = body;
        const query = `
            UPDATE assassinatos
            SET data = $2, descricao = $3
            WHERE id = $1
            RETURNING id, TO_CHAR(data, 'YYYY-MM-DD') as data, descricao
        `;
        const results = await pool.query(query, [id, data, descricao]);
        
        if (results.rowCount === 0) {
            throw `Nenhum assassinato encontrado com o id ${id} para ser atualizado`;
        }
        
        const assassinato = results.rows[0];
        return new Assassinato(assassinato.id, assassinato.data, assassinato.descricao);
    } catch (err) {
        throw "Erro ao atualizar assassinato: " + err;
    }
}

const deleteAssassinatoDB = async (id) => {
    const client = await pool.connect();
    try {
        await client.query('BEGIN');

        await client.query('DELETE FROM suspeitos WHERE assassinatoid = $1', [id]);

        await client.query('DELETE FROM vitimas WHERE assassinatoid = $1', [id]);

        const result = await client.query('DELETE FROM assassinatos WHERE id = $1', [id]);

        if (result.rowCount === 0) {
            throw new Error(`Nenhum assassinato encontrado com o id ${id} para ser removido`);
        } else {
            await client.query('COMMIT');
            return `Assassinato de id ${id} removido com sucesso!`;
        }
    } catch (err) {
        await client.query('ROLLBACK'); 
        throw new Error("Erro ao remover assassinato: " + err.message);
    } finally {
        client.release();
    }
};


const getAssassinatoPorIdDB = async (id) => {
    try {
        const query = `
            SELECT 
                a.id, 
                TO_CHAR(a.data, 'YYYY-MM-DD') as data, 
                a.descricao, 
                v.nome AS vitima, 
                s.nome AS suspeito
            FROM 
                assassinatos a
            LEFT JOIN 
                vitimas v ON v.assassinatoid = a.id
            LEFT JOIN 
                suspeitos s ON s.assassinatoid = a.id
            WHERE 
                a.id = $1
        `;
        const results = await pool.query(query, [id]);
        
        if (results.rowCount === 0) {
            throw `Nenhum assassinato encontrado com o id ${id}`;
        }
        
        const assassinato = results.rows[0];
        return new Assassinato(assassinato.id, assassinato.data, assassinato.descricao, assassinato.vitima, assassinato.suspeito);
    } catch (err) {
        throw "Erro ao recuperar assassinato: " + err;
    }
}

module.exports = {
    getAssassinatosDB,
    addAssassinatoDB,
    updateAssassinatoDB,
    deleteAssassinatoDB,
    getAssassinatoPorIdDB
}

