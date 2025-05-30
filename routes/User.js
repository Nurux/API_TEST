const express = require('express');
const rota = express.Router();
const BD = require('../database/bd').conexao;

rota.get('', (req, res) => {
    BD.getConnection((erro, cnx) => {
        if(erro){res.status(500).send({error: erro})}

        cnx.query(
            'Select count(*) as ok from USERS where NOME = ? and SENHA = ?',
            [req.body.user, req.body.password],

            (err, result) =>{
                if(err){res.status(500).send({error: err})}

                res.status(200).send(result);
            }
        )
    })
})

rota.post('/logar', (req, res) => {
    BD.getConnection((erro, cnx) => {
        if(erro){res.status(500).send({error: erro})}

        cnx.query(
            'Select count(*) as ok from USERS where NOME = ? and SENHA = ?',
            [req.body.user, req.body.password],

            (err, result) =>{
                if(err){res.status(500).send({error: err})}

                res.status(200).send(result);
            }
        )
    })
})

rota.post('/cadastrar', (req, res) => {
    BD.getConnection((erro, cnx) => {
        if(erro){res.status(500).send({error: erro})}

        cnx.query(
            'Insert into USERS(NOME, SENHA) values(?,?)',
            [req.body.nome, req.body.senha],

            (err, result) =>{
                if(err){res.status(500).send({error: err})}

                if(result > 0 ){
                    p = 1;
                }

                let response = {
                    code: 1
                }
                res.send(response);
            }
        )
    })
})


module.exports = rota;