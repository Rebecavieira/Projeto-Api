const express = require('express');
const categoryRoutes = require("./resources/category/routes");
const produtoRoutes = require("./resources/produto/routes");
const pedidoRoutes = require("./resources/pedido/routes");
const marcaRoutes = require("./resources/marca/routes");
const enderecoRoutes = require("./resources/endereco/routes");
const carrinhoRoutes = require("./resources/carrinho/routes");
const comboRoutes = require("./resources/carrinho/carrinho-produto/routes");
const cartaoRoutes = require("./resources/cartao/routes");
const colecaodesRoutes = require("./resources/colecaodes/routes");
const cupomRoutes = require("./resources/cupom/routes");
const cors = require('cors');
const swagger = require("swagger-ui-express");
const docs = require('./docs.json');
const port = 3000;

const app = express();

// criando rota da documentação
app.use('/documentacao', swagger.serve, swagger.setup(docs));

app.use(cors());
app.use(express.json());
app.use(categoryRoutes);
app.use(produtoRoutes);
app.use(pedidoRoutes);
app.use(marcaRoutes);
app.use(enderecoRoutes);
app.use(carrinhoRoutes);
app.use(comboRoutes);
app.use(cartaoRoutes);
app.use(colecaodesRoutes);
app.use(cupomRoutes);

app.listen(port, () => {
    console.log(`Server listening on port ${port}`)
})