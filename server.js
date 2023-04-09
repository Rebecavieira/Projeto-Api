const express = require('express');
const produtoRoutes = require("./resources/produto/routes");
const pedidoRoutes = require("./resources/pedido/routes");
const marcaRoutes = require("./resources/marca/routes");
const enderecoRoutes = require("./resources/endereco/routes");
const carrinhoRoutes = require("./resources/carrinho/routes");
const comboRoutes = require("./resources/carrinho/carrinho-produto/routes");
const cors = require('cors');

const app = express();


app.use(cors());
app.use(express.json());
app.use(produtoRoutes);
app.use(pedidoRoutes);
app.use(marcaRoutes);
app.use(enderecoRoutes); 
app.use(carrinhoRoutes);
app.use(comboRoutes);

 