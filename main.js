const express = require('express');
const cors = require('cors');
const port = 3000;
const BD = require('./database/bd').conexao;
const app = express();

const rotaExt = require('./routes/Externa');
const rotaInt = require('./routes/Interna');

app.use(cors());
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

app.use('/intern', rotaInt);
app.use('/extern', rotaExt);


app.listen(port, console.log('Server rodando.....'));



