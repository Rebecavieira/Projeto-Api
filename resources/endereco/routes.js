const express = require("express");
const app = express.Router();
const controller = require("./controller");
const urlEndereco = "/enderecos";
const database = require("../../connection/database");



app.get(`${urlEndereco}`, async (req, res) => {
  res.send(await controller.listAll());
})

app.get(`${urlEndereco}/:id`, async (req, res) => {
  res.send(await controller.listOne(req.params.id));
})

app.post(`${urlEndereco}`, async (req, res) => {
  res.send(await controller.create(req.body));
})

app.delete(`${urlEndereco}/:id`, async (req, res) => {
  res.send(await controller.deletar(req.params.id));
})

app.patch(`${urlEndereco}/:id`, async (req, res) => {
  let {cep, logradouro, numero, bairro, cidade, estado} = req.body;
  let id = req.params.id;
  
  let jaExiste = await database.execute(`
      SELECT * FROM tb_endereco WHERE id=${req.params.id}
  `);

  if (!jaExiste[0]) {
    res.sendStatus(404);
    return;
  }

  let sql = await database.execute(`
    UPDATE tb_endereco SET 
      cep='${cep || jaExiste[0].cep}',
      logradouro='${logradouro || jaExiste[0].logradouro}', 
      numero='${numero || jaExiste[0].numero}', 
      bairro='${bairro || jaExiste[0].bairro}', 
      cidade='${cidade || jaExiste[0].cidade}', 
      estado='${estado || jaExiste[0].estado}',
      updated_at = NOW()
    WHERE id=${id}
  `);

  let [enderecoAtualizado] = await database.execute(`
    SELECT * FROM tb_endereco WHERE id=${id}
  `);

  res.send(enderecoAtualizado);

});


module.exports = app;