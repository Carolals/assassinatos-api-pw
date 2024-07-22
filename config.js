const { Pool } = require('pg');

const isProduction = process.env.NODE_ENV === 'production';

let pool = null;

if (isProduction){
    pool = new Pool({
        connectionString : process.env.DATABASE_URL, ssl : {
            rejectUnauthorized : true
        }
    })
} else {
    pool = new Pool({
        user : "db_assassinatos_user",
        password : "AdT2g8ubuvvjI2s2OQmcc426T3NrrVyI",
        host : "dpg-cq9ddi5ds78s739cretg-a.oregon-postgres.render.com",
        database : "db_assassinatos",
        port : 5432,
        ssl : true
    })
}

module.exports = { pool }