const express = require("express");
const app = express.Router();
const controller = require("./controller");
const urlCarrinho = "/carrinhos";
const database = require("../../connection/database");



app.get(`${urlCarrinho}`, async (req, res) => {
  res.send(await controller.listAll());
})

app.get(`${urlCarrinho}/:id`, async (req, res) => {
  res.send(await controller.listOne(req.params.id));
})

app.post(`${urlCarrinho}`, async (req, res) => {
  res.send(await controller.create(req.body));
})

app.delete(`${urlCarrinho}/:id`, async (req, res) => {
  res.send(await controller.deletar(req.params.id));
})

app.patch(`${urlCarrinho}/:id`, async (req, res) => {
  let {updated_at, cliente_id, cupom_id, frete} = req.body;
  let id = req.params.id;
  
  let jaExiste = await database.execute(`
      SELECT * FROM tb_carrinho WHERE id=${req.params.id}
  `);

  if (!jaExiste[0]) {
    res.sendStatus(404);
    return;
  }

  let sql = await database.execute(`
    UPDATE tb_carrinho SET
      updated_at = NOW(),
      cliente_id='${cliente_id || jaExiste[0].cliente_id}',
      cupom_id='${cupom_id || jaExiste[0].cupom_id}',
      frete='${frete || jaExiste[0].frete}'
    WHERE id=${id}
  `);

  let [carrinhoAtualizado] = await database.execute(`
    SELECT * FROM tb_carrinho WHERE id=${id}
  `);

  res.send(carrinhoAtualizado);

});


module.exports = app;