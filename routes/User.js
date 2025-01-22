const express = require('express');
const rota = express.Router();
const BD = require('../database/bd').conexao;

rota.get('', (req, res) => {
    BD.getConnection((erro, cnx) => {
        if(erro){res.status(500).send({error: erro})}

        cnx.query(
            'Select count(*) from USERS where NOME = ? and SENHA = ?',
            [req.body.user, req.body.password],

            (err, result) =>{
                if(err){res.status(500).send({error: err})}

                let response = {};

                if(result > 0 ){
                    response = {
                        code: 1
                    }
                }else{
                    response = {
                        code: 0
                    }
                }

                res.status(200).send(response);
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
                res.status(201).send(response);
            }
        )
    })
})


module.exports = rota;