const express = require("express");
const app = express.Router();
const controller = require("./controller");
const urlMarca = "/marcas";
const database = require("../../connection/database");



app.get(`${urlMarca}`, async (req, res) => {
  res.send(await controller.listAll());
})

app.get(`${urlMarca}/:id`, async (req, res) => {
  res.send(await controller.listOne(req.params.id));
})

app.post(`${urlMarca}`, async (req, res) => {
  res.send(await controller.create(req.body));
})

app.delete(`${urlMarca}/:id`, async (req, res) => {
  res.send(await controller.deletar(req.params.id));
})

app.put(`${urlMarca}/:id`, async (req, res) => {
  res.send(await controller.edit(req.params.id, req.body));
})

app.patch(`${urlMarca}/:id`, async (req, res) => {
  let dados = req.body;

  let jaExiste = await database.execute(`
      SELECT * FROM tb_marca WHERE id=${req.params.id}
  `);

  if (undefined === jaExiste[0]) {
    res.sendStatus(404);
    return;
  }

  let sql = await database.execute(`
    UPDATE tb_marca SET 
      nome='${req.body.nome || jaExiste[0].nome}'
    WHERE id=${req.params.id}
  `);

  dados.id = req.params.id;

  res.send(dados);
});


module.exports = app;