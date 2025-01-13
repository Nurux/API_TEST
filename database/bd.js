const mysql = require('mysql2');

const conexao = mysql.createPool({
    host: 'db4free.net',
    database: process.env.DATABASE,
    user: process.env.USER,
    password: process.env.PASSWORD,
    connectionLimit: 10,
    multipleStatements: true
})

exports.conexao = conexao