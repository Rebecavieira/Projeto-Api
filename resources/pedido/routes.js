const app = require('express').Router();
const database = require('../../connection/database');
 
const TABLE_NAME = 'tb_pedido';
const BASE_URL = '/pedidos';

app.get(BASE_URL, async (req, res) => {
    let dados = await database.execute(`SELECT * FROM ${TABLE_NAME}`);

    res.send(dados);
});
 
app.get(`${BASE_URL}/:id`, async (req, res) => {
    let dados = await database.execute(`SELECT * FROM ${TABLE_NAME} WHERE id='${req.params.id}'`);

    res.send(dados[0]);
}); 

app.post(BASE_URL, async (req, res) => {
    let corpo = req.body;

    let sql = await database.execute(`
        INSERT INTO ${TABLE_NAME} (id_cliente, id_produto, status_pedido, numero_pedido) VALUES ('${corpo.id_cliente}', '${corpo.id_produto}', '${corpo.status_pedido}', '${corpo.numero_pedido}')
    `);

    corpo.id = sql.insertId;

    res.send(corpo);
});

app.patch(`${BASE_URL}/:id`, async (req, res) => {
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
            id_cliente='${req.body.id_cliente || jaExiste[0].id_cliente}',
            id_produto='${req.body.id_produto || jaExiste[0].id_produto}',
            status_pedido='${req.body.status_pedido || jaExiste[0].status_pedido}',
            numero_pedido='${req.body.numero_pedido || jaExiste[0].numero_pedido}'
        WHERE id='${req.params.id}'
    `);

    dados.id = req.params.id;

    res.send(dados);
});


app.delete(`${BASE_URL}/:id`, async (req, res) => {
    await database.execute(`DELETE FROM ${TABLE_NAME} WHERE id='${req.params.id}'`)

    res.sendStatus(204);
});


module.exports = app;