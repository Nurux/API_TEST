const express = require('express');
const rota = express.Router();
const BD = require('../database/bd').conexao;


rota.get('/solicitar', (req, res) => {
    BD.getConnection((error, cnx) => {
        if(error){
            res.status(500).send({erro: error})
        }

        cnx.query(
            'SELECT * from SOLICITANTES WHERE CADASTRADO != "S"',

            (err, result) => {
                cnx.release();

                if(err){res.status(500).send({erro: err})};

                const response = {
                    mensagem: 'Lista de Solicitações',
                    quantidade: result.length,
                    list: result.map(post => {
                        return {
                            codigo: post.CODIGO,
                            nome: post.NOME,
                            grupo: post.GRUPO,
                            cadastro: post.CADASTRADO
                        }
                    })
                }

                res.status(200).send(response);
            }
        )
    })
})

rota.put('/att', (req, res) => {
    BD.getConnection((error, cnx) => {
        if(error){
            res.status(500).send({erro: error})
        }

        cnx.query(
            'UPDATE SOLICITANTES SET CADASTRADO = "S" WHERE CODIGO = ?',
            [req.body.id],

            (err, result) => {
                cnx.release();

                if(err){res.status(500).send({erro: err})};

                const response = {
                    mensagem: 'Usuario Atualizado'
                }

                res.status(200).send(response);
            }
        )
    })
})

rota.post('/gravar',  (req, res) => {
    BD.getConnection((erro, cnx) => {
        if(erro){res.status(500).send({erro: erro})}

        cnx.query(
            'DELETE * FROM USUARIOS',

            (err, result) => {
                cnx.release();

                if(err){res.status(500).send({erro: err, msg: 'Erro ao deletar dados'})};
            }
        )

        cnx.query(
            'Insert into USUARIOS(CODIGO, NOME, GRUPO, EMPRESA, VENDEDOR) values(?,?,?,?,?)',
            [req.body.cod, req.body.name, req.body.grup, req.body.emp, req.body.vend],

            (err, result) =>{
                cnx.release();

                if(err){res.status(500).send({erro: err})}

                const response = {
                    msg: 'Usuarios enviados com sucesso!'
                }

                res.status(200).send(response);

            }
        )
    })
})


module.exports = rota;