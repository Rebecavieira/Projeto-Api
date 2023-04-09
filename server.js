const express = require('express');
const produtoRoutes = require("./resources/produto/routes");
const pedidoRoutes = require("./resources/pedido/routes");
const cors = require('cors');

const app = express();


app.use(cors());
app.use(express.json());
app.use(produtoRoutes);
app.use(pedidoRoutes);

 