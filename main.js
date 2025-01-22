const express = require('express');
const cors = require('cors');
const port = 3000;
const BD = require('./database/bd').conexao;
const app = express();

const rotaExt = require('./routes/Externa');
const rotaInt = require('./routes/Interna');
const rotaUse = require('./routes/User');

app.use(cors());
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

app.use('/intern', rotaInt);
app.use('/extern', rotaExt);
app.use('/user', rotaUse);


app.listen(port, console.log('Server rodando.....'));



