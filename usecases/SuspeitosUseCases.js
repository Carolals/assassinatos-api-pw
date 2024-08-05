const { pool } = require('../config');
const Suspeito = require('../entities/Suspeitos');

const getSuspeitosDB = async () => {
    try {
        const { rows } = await pool.query(`SELECT * FROM suspeitos ORDER BY nome`);
        return rows.map((suspeito) => new Suspeito(suspeito.id, suspeito.nome, suspeito.idade, suspeito.genero, suspeito.relacaocomvitima, suspeito.assassinatoid));
    } catch (err) {
        throw "Erro ao buscar suspeitos: " + err;
    }
}

const addSuspeitoDB = async (body) => {
    try {
        const { nome, idade, genero, relacaocomvitima, assassinatoid } = body;
        const results = await pool.query(`INSERT INTO suspeitos (nome, idade, genero, relacaocomvitima, assassinatoid)
        VALUES ($1, $2, $3, $4, $5)
        RETURNING id, nome, idade, genero, relacaocomvitima, assassinatoid`, [nome, idade, genero, relacaocomvitima, assassinatoid]);
        
        const suspeito = results.rows[0];
        return new Suspeito(suspeito.id, suspeito.nome, suspeito.idade, suspeito.genero, suspeito.relacaocomvitima, suspeito.assassinatoid);
    } catch (err) {
        throw "Erro ao inserir suspeito: " + err;
    }
}

const updateSuspeitoDB = async (body) => {
    try {
        const { id, nome, idade, genero, relacaocomvitima, assassinatoid } = body;
        const results = await pool.query(`UPDATE suspeitos
        SET nome = $2, idade = $3, genero = $4, relacaocomvitima = $5, assassinatoid = $6
        WHERE id = $1
        RETURNING id, nome, idade, genero, relacaocomvitima, assassinatoid`, [id, nome, idade, genero, relacaocomvitima, assassinatoid]);
        
        if (results.rowCount === 0) {
            throw `Nenhum suspeito encontrado com o id ${id} para ser atualizado`;
        }
        
        const suspeito = results.rows[0];
        return new Suspeito(suspeito.id, suspeito.nome, suspeito.idade, suspeito.genero, suspeito.relacaocomvitima, suspeito.assassinatoid);
    } catch (err) {
        throw "Erro ao atualizar suspeito: " + err;
    }
}

const deleteSuspeitoDB = async (id) => {
    try {
        const results = await pool.query(`DELETE FROM suspeitos WHERE id = $1`, [id]);
        
        if (results.rowCount === 0) {
            throw `Nenhum suspeito encontrado com o id ${id} para ser removido`;
        } else {
            return `Suspeito de id ${id} removido com sucesso!`;
        }
    } catch (err) {
        throw "Erro ao remover suspeito: " + err;
    }
}

const getSuspeitoPorIdDB = async (id) => {
    try {
        const results = await pool.query(`SELECT * FROM suspeitos WHERE id = $1`, [id]);
        
        if (results.rowCount === 0) {
            throw `Nenhum suspeito encontrado com o id ${id}`;
        }
        
        const suspeito = results.rows[0];
        return new Suspeito(suspeito.id, suspeito.nome, suspeito.idade, suspeito.genero, suspeito.relacaocomvitima, suspeito.assassinatoid);
    } catch (err) {
        throw "Erro ao recuperar suspeito: " + err;
    }
}

module.exports = {
    getSuspeitosDB,
    addSuspeitoDB,
    updateSuspeitoDB,
    deleteSuspeitoDB,
    getSuspeitoPorIdDB
}


