const { pool } = require('../config');
const Usuario = require('../entities/Usuario');

const getUsuariosDB = async () => {
    try {
        const { rows } = await pool.query(`SELECT * FROM usuarios ORDER BY nome`);
        return rows.map((usuario) => new Usuario(usuario.email, usuario.senha, usuario.tipo, usuario.telefone, usuario.nome));
    } catch (err) {
        throw "Erro ao buscar usuarios: " + err;
    }
}

const addUsuarioDB = async (body) => {
    try {
        const { email, senha, tipo, telefone, nome } = body;
        const results = await pool.query(`INSERT INTO usuarios (email, senha, tipo, telefone, nome)
        VALUES ($1, $2, $3, $4, $5)
        RETURNING email, senha, tipo, telefone, nome`, [email, senha, tipo, telefone, nome]);
        
        const usuario = results.rows[0];
        return new Usuario(usuario.email, usuario.senha, usuario.tipo, usuario.telefone, usuario.nome);
    } catch (err) {
        throw "Erro ao inserir usuario: " + err;
    }
}

const updateUsuarioDB = async (body) => {
    try {
        const { email, senha, tipo, telefone, nome } = body;
        const results = await pool.query(`UPDATE usuarios
        SET senha = $2, tipo = $3, telefone = $4, nome = $5
        WHERE email = $1
        RETURNING email, senha, tipo, telefone, nome`, [email, senha, tipo, telefone, nome]);
        
        if (results.rowCount === 0) {
            throw `Nenhum usuário encontrado com o email ${email} para ser atualizado`;
        }
        
        const usuario = results.rows[0];
        return new Usuario(usuario.email, usuario.senha, usuario.tipo, usuario.telefone, usuario.nome);
    } catch (err) {
        throw "Erro ao atualizar usuario: " + err;
    }
}

const deleteUsuarioDB = async (email) => {
    try {
        const results = await pool.query(`DELETE FROM usuarios WHERE email = $1`, [email]);
        
        if (results.rowCount === 0) {
            throw `Nenhum usuário encontrado com o email ${email} para ser removido`;
        } else {
            return `Usuario de email ${email} removido com sucesso!`;
        }
    } catch (err) {
        throw "Erro ao remover usuário: " + err;
    }
}

const getUsuarioPorEmailDB = async (email) => {
    try {
        const results = await pool.query(`SELECT * FROM usuarios WHERE email = $1`, [email]);
        
        if (results.rowCount === 0) {
            throw `Nenhum suspeito encontrado com o email ${email}`;
        }
        
        const usuario = results.rows[0];
        return new Usuario(usuario.email, usuario.senha, usuario.tipo, usuario.telefone, usuario.nome);
    } catch (err) {
        throw "Erro ao recuperar usuario: " + err;
    }
}

module.exports = {
    getUsuariosDB,
    addUsuarioDB,
    updateUsuarioDB,
    deleteUsuarioDB,
    getUsuarioPorEmailDB
}


