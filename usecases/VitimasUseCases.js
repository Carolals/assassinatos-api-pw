const { pool } = require('../config');
const Vitima = require('../entities/Vitimas');

const getVitimasDB = async () => {
    try {
        const { rows } = await pool.query(`SELECT * FROM vitimas ORDER BY nome`);
        return rows.map((vitima) => new Vitima(vitima.id, vitima.nome, vitima.idade, vitima.genero, vitima.assassinatoid));
    } catch (err) {
        throw "Erro ao buscar vítimas: " + err;
    }
}

const addVitimaDB = async (body) => {
    try {
        const { nome, idade, genero, assassinatoid } = body;
        const results = await pool.query(`INSERT INTO vitimas (nome, idade, genero, assassinatoid)
        VALUES ($1, $2, $3, $4)
        RETURNING id, nome, idade, genero, assassinatoid`, [nome, idade, genero, assassinatoid]);
        
        const vitima = results.rows[0];
        return new Vitima(vitima.id, vitima.nome, vitima.idade, vitima.genero, vitima.assassinatoid);
    } catch (err) {
        throw "Erro ao inserir vítima: " + err;
    }
}

const updateVitimaDB = async (body) => {
    try {
        const { id, nome, idade, genero, assassinatoid } = body;
        const results = await pool.query(`UPDATE vitimas
        SET nome = $2, idade = $3, genero = $4, assassinatoid = $5
        WHERE id = $1
        RETURNING id, nome, idade, genero, assassinatoid`, [id, nome, idade, genero, assassinatoid]);
        
        if (results.rowCount === 0) {
            throw `Nenhuma vítima encontrada com o id ${id} para ser atualizada`;
        }
        
        const vitima = results.rows[0];
        return new Vitima(vitima.id, vitima.nome, vitima.idade, vitima.genero, vitima.assassinatoid);
    } catch (err) {
        throw "Erro ao atualizar vítima: " + err;
    }
}

const deleteVitimaDB = async (id) => {
    try {
        const results = await pool.query(`DELETE FROM vitimas WHERE id = $1`, [id]);
        
        if (results.rowCount === 0) {
            throw `Nenhuma vítima encontrada com o id ${id} para ser removida`;
        } else {
            return `Vítima de id ${id} removida com sucesso!`;
        }
    } catch (err) {
        throw "Erro ao remover vítima: " + err;
    }
}

const getVitimaPorIdDB = async (id) => {
    try {
        const results = await pool.query(`SELECT * FROM vitimas WHERE id = $1`, [id]);
        
        if (results.rowCount === 0) {
            throw `Nenhuma vítima encontrada com o id ${id}`;
        }
        
        const vitima = results.rows[0];
        return new Vitima(vitima.id, vitima.nome, vitima.idade, vitima.genero, vitima.assassinatoid);
    } catch (err) {
        throw "Erro ao recuperar vítima: " + err;
    }
}

module.exports = {
    getVitimasDB,
    addVitimaDB,
    updateVitimaDB,
    deleteVitimaDB,
    getVitimaPorIdDB
}

