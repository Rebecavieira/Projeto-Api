const app = require('express').Router();
const database = require('../../connection/database');

const TABLE_NAME = 'tb_produto';
const BASE_URL = '/produtos';

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
        INSERT INTO ${TABLE_NAME} (nome_modelo,
        descricao,
        desconto,
        tipo,
        genero,
        valor_original,
        valor_desconto,
        avaliacao,
        referencia,
        tamanho,
        cor,
        quantidade,
        id_marca,
        id_categoria,
        estado,
        imagem) VALUES ('${corpo.nome_modelo}', '${corpo.descricao}', '${corpo.desconto}', '${corpo.tipo}', '${corpo.genero}', '${corpo.valor_original}', '${corpo.valor_desconto}', '${corpo.avaliacao}', '${corpo.referencia}', '${corpo.tamanho}', '${corpo.cor}', '${corpo.quantidade}', '${corpo.id_marca}', '${corpo.id_categoria}', '${corpo.estado}', '${corpo.imagem}')
    `);

    corpo.id = sql.insertId;

    res.send(corpo);
});

app.patch(`${BASE_URL}/:id`, async (req, res) => {
    let dados = req.body;

    let jaExiste = await database.execute(`
        SELECT * FROM ${TABLE_NAME} WHERE id='${req.params.id}'
    `);

    //testando se realmente se existe algum produto com aquele id
    if (undefined === jaExiste[0]) {
        res.sendStatus(404);
        return;
    }

    await database.execute(`
        UPDATE ${TABLE_NAME} SET
             nome_modelo = '${req.body.nome_modelo || jaExiste[0].nome_modelo}',
             descricao = '${req.body.descricao || jaExiste[0].descricao}',
             desconto = '${req.body.desconto || jaExiste[0].desconto}',
             tipo = '${req.body.tipo || jaExiste[0].tipo}',
             genero = '${req.body.genero || jaExiste[0].genero}',
             valor_original = '${req.body.valor_original || jaExiste[0].valor_original}',
             valor_desconto = '${req.body.desconto || jaExiste[0].desconto}',
             avaliacao = '${req.body.avaliacao || jaExiste[0].avaliacao}',
             referencia = '${req.body.referencia || jaExiste[0].referencia}',
             tamanho = '${req.body.tamanho || jaExiste[0].tamanho}',
             cor = '${req.body.cor || jaExiste[0].cor}',
             quantidade = '${req.body.quantidade || jaExiste[0].quantidade}',
             id_marca = '${req.body.id_marca || jaExiste[0].id_marca}',
             id_categoria = '${req.body.id_categoria || jaExiste[0].id_categoria}',
             estado = '${req.body.estado || jaExiste[0].estado}',
             imagem = '${req.body.imagem || jaExiste[0].imagem}'
         WHERE id='${req.params.id}'
    `);

    dados.id = req.params.id;

    res.send(dados);
});


app.delete(`${BASE_URL}/:id`, async (req, res) => {
    let pedido = await database.execute(`
        SELECT * FROM tb_pedido WHERE id_produto='${req.params.id}'
    `);

    if (undefined != pedido[0]) {
        res.status(400).send('Não é possível deletar o produto pois o mesmo possui pedidos vinculados.');
        return;
    }

    await database.execute(`DELETE FROM ${TABLE_NAME} WHERE id='${req.params.id}'`)

    res.sendStatus(204);
});


module.exports = app;




