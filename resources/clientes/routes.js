const app = require('express').Router();
const database = require('../../connection/database');

const TABLE_NAME = 'tb_cliente';
const BASE_URL = '/cliente';


app.get('/cliente', async (req, res) => {
    let dados = await
    database.execute(`SELECT * FROM tb_cliente`);

    res.send(dados);
});

app.get('/cliente/:id', async (req, res) => {
    let dados = await
    database.execute(`SELECT * FROM tb_cliente WHERE id='${req.params.id}'`);

    res.send(dados[0]);
});

app.post('/cliente', async (req, res) => {
    let corpo = req.body;

    let sql = await database.execute(`
        INSERT INTO tb_cliente (nome, cpf, email, celular, id_endereco, senha) VALUES ('${corpo.nome}', '${corpo.cpf}', '${corpo.email}', '${corpo.celular}', '${corpo.id_endereco}', '${corpo.senha}')
    `);

    corpo.id = sql.insertId;

    res.send(corpo);
});

app.patch('/cliente/:id', async (req, res) => {
    let dados = req.body;

    let jaExiste = await database.execute(`
        SELECT * FROM tb_cliente WHERE id='${req.params.id}'
    `);
    
    if (undefined === jaExiste[0]) {
        res.sendStatus(404);
        return;
    }

    await database.execute(`
        UPDATE ${TABLE_NAME} SET
            nome='${req.body.nome || jaExiste[0].nome}',
            cpf='${req.body.cpf || jaExiste[0].cpf}',
            email='${req.body.email || jaExiste[0].email}',
            celular='${req.body.celular || jaExiste[0].celular}',
            id_endereco='${req.body.id_endereco || jaExiste[0].id_endereco}',
            senha='${req.body.senha || jaExiste[0].senha}'
        WHERE id='${req.params.id}'
    `);

    dados.id = req.params.id;

    res.send(dados);
});

app.delete('/cliente/:id', async (req, res) => {
    await database.execute(`DELETE FROM tb_cliente WHERE id='${req.params.id}'`)

    res.sendStatus(204);
});


 

module.exports = app;
