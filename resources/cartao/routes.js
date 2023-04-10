const express = require('express');
const app = express.Router();
const database = require("../../connection/database");

const TABLE_NAME = 'tb_cartao';
const URL_NAME = '/cartoes';

app.get(`${URL_NAME}`, async (req, res) => {
    let dados = await database.execute(`SELECT * FROM ${TABLE_NAME}`);

    res.send(dados);
});

app.get(`${URL_NAME}/:id`, async (req, res) => {
    let dados = await database.execute(`
        SELECT * FROM ${TABLE_NAME} WHERE id='${req.params.id}'
    `);

    res.send(dados[0]);
});

app.post(`${URL_NAME}`, async (req, res) => {
    let dados = req.body;

    let sql = await database.execute(`
        INSERT INTO ${TABLE_NAME} (titular, numero_do_cartao, validade, cvv) VALUES ('${req.body.titular}', '${req.body.numero_do_cartao}', '${req.body.validade}', '${req.body.cvv}');
    `);

    dados.id = sql.insertId;
    
    res.send(dados);
});

app.patch(`${URL_NAME}/:id`, async (req, res) => {
    let dados = req.body;

    let jaExiste = await database.execute(`
        SELECT * FROM ${TABLE_NAME} WHERE id='${req.params.id}'
    `);

    if (undefined === jaExiste[0]) {
        res.sendStatus(404);
        return;
    }

    await database.execute(`
        UPDATE ${TABLE_NAME} SET
            titular="${req.body.titular || jaExiste[0].titular}",
            numero_do_cartao="${req.body.numero_do_cartao || jaExiste[0].numero_do_cartao}",
            validade="${req.body.validade || jaExiste[0].validade}",
            cvv="${req.body.cvv || jaExiste[0].cvv}"
        WHERE id='${req.params.id}'
    `);

    dados.id = req.params.id;

    res.send(dados);
});

app.put(`${URL_NAME}/:id`, async (req, res) => {
    let dados = req.body;

    await database.execute(`
        UPDATE ${TABLE_NAME} SET  
        titular = '${dados.titular}', 
        numero_do_cartao = '${dados.numero_do_cartao}',
        validade = '${dados.validade}', 
        cvv = '${dados.cvv}'
        WHERE id = '${req.params.id}'
    `);

    dados.id = req.params.id;

    res.send(dados);
});

app.delete(`${URL_NAME}/:id`, async (req, res) => {
    await database.execute(`DELETE FROM ${TABLE_NAME} WHERE id='${req.params.id}'`)

    res.sendStatus(204);
});

module.exports = app;