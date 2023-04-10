const express = require('express');
const app = express.Router();
const database = require("../../connection/database");

const TABLE_NAME = 'tb_cupom';
const URL_NAME = '/cupons';

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
        INSERT INTO ${TABLE_NAME} (codigo, desconto) VALUES ('${req.body.codigo}', '${req.body.desconto}'`);

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
            codigo="${req.body.codigo || jaExiste[0].codigo}",
            desconto="${req.body.desconto || jaExiste[0].desconto}"
        WHERE id='${req.params.id}'
    `);

    dados.id = req.params.id;

    res.send(dados);
});

app.put(`${URL_NAME}/:id`, async (req, res) => {
    let dados = req.body;

    await database.execute(`
    UPDATE ${TABLE_NAME} SET
        codigo="${req.body.codigo}",
        desconto="${req.body.desconto}"
    WHERE id='${req.params.id}'
`);

    dados.id = req.params.id;

    res.send(dados);
});

app.delete(`${URL_NAME}/:id`, async (req, res) => {
    await database.execute(`DELETE FROM ${TABLE_NAME} WHERE id='${req.params.id}'`)

    res.sendStatus(204);
});

module.exports = app;