const app = require('express').Router();
const database = require('../../connection/database');

const TABLE_NAME = 'tb_forma de pagamento';
const BASE_URL = '/forma_de_pagamento';


app.get('/forma_de_pagamento', async (req, res) => {
    let dados = await
    database.execute(`SELECT * FROM tb_forma de pagamento WHERE='${req.params.id}'`);

    res.send(dados[0]);
});

app.get('/forma_de_pagamento/:id', async (req, res) => {
    let dados = await
    database.execute(`SELECTE * FROM tb_forma de pagamento WHERE id='${req.params.id}'`);

    res.send(dados[0]);
});

app.post('/forma_de_pagamento', async (req, res) => {
    let dados = await
    database.execute(`SELECT * FROM tb_forma de pagamento WHERE='${req.params.id}'`);

    res.send(dados[0]);
});

app.put('/forma_de_pagamento/:id', async (req, res) => {
    let dados = await
    database.execute(`SELECT * FROM tb_forma de pagamento WHERE id='${req.params.id}'`);

    res.send(dados[0]);
});

app.patch('/forma_de_pagamento/:id', async (req, res) => {
    let dados = await
    database.execute(`SELECT * FROM tb_forma de pagamento WHERE id='${req.params.id}'`);

    res.send(dados[0]);
});

app.delete('/forma_de_pagamento/:id', async (req, res) => {
    let dados = await
    database.execute(`SELECT * FROM tb_forma de pagamento WHERE id='${req.params.id}'`);

    res.send(dados[0]);
});




module.exports = app;