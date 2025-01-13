const express = require('express');
const rota = express.Router();
const BD = require('../database/bd').conexao;

rota.get('', (req, res) => {
    BD.getConnection((erro, cnx) => {
        if(erro){res.send({erro: erro})}

        cnx.query(
            'Select * from USUARIOS',
            
            (err, resultado) => {
                cnx.release()

                if(err){res.send({erro: err})}

                let response ={
                    usuarios: resultado
                }

                res.send(response)
            }
        )
    })
})

rota.post('/cadastro', (req, res) => {
    BD.getConnection((erro, cnx) => {
        if(erro){res.send({erro: erro})}

        cnx.query(
            'Insert into SOLICITANTES(NOME, GRUPO) values(?,?)',
            [req.body.nome, req.body.grupo],
            
            (err, resultado) => {
                cnx.release()

                if(err){res.send({erro: err})}

                const response ={
                    msg: 'Usuario cadastro com sucesso!',
                    usuario: req.body.nome
                }

                res.send(response)
            }
        )
    })
})

module.exports = rota;