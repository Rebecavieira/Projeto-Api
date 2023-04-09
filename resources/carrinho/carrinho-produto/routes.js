const express = require("express");
const app = express.Router();
const controller = require("./controller");
const urlCombo = "/carrinhos_produtos";
const database = require("../../../connection/database");



app.get(`${urlCombo}`, async (req, res) => {
  res.send(await controller.listAll());
})

app.get(`${urlCombo}/:id`, async (req, res) => {
  res.send(await controller.listOne(req.params.id));
})

app.post(`${urlCombo}`, async (req, res) => {
  res.send(await controller.create(req.body));
})

app.delete(`${urlCombo}/:id`, async (req, res) => {
  res.send(await controller.deletar(req.params.id));
})

app.patch(`${urlCombo}/:id`, async (req, res) => {
  let {carrinho_id, produto_id, quantidade} = req.body;
  let id = req.params.id;
  
  let jaExiste = await database.execute(`
      SELECT * FROM tb_carrinho_produto WHERE id=${req.params.id}
  `);

  if (!jaExiste[0]) {
    res.sendStatus(404);
    return;
  }

  let sql = await database.execute(`
    UPDATE tb_carrinho_produto SET
      carrinho_id='${carrinho_id || jaExiste[0].carrinho_id}',
      produto_id='${produto_id || jaExiste[0].produto_id}',
      quantidade='${quantidade || jaExiste[0].quantidade}'
    WHERE id=${id}
  `);

  let [comboAtualizado] = await database.execute(`
    SELECT * FROM tb_carrinho_produto WHERE id=${id}
  `);

  res.send(comboAtualizado);

});


module.exports = app;