CREATE TABLE tb_carrinho (
    id INT AUTO_INCREMENT PRIMARY KEY,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at DATETIME NULL,
    cliente_id INT,
    cupom_id INT, 
    frete DECIMAL (4,2),
    FOREIGN KEY (cliente_id) REFERENCES tb_cliente(id)
);

--é preciso já exitir a tabela cliente com algum dado--
INSERT INTO tb_carrinho (created_at, updated_at, cliente_id, cupom_id, frete) 
VALUES (NOW(), NULL, 1, NULL, 12.50);

-- nessa segunda tabela garantimos que o carrinho de 1 cliente tenha varios produtos: --
CREATE TABLE tb_carrinho_produto (
    id INT AUTO_INCREMENT PRIMARY KEY,
    carrinho_id INT,
    produto_id INT,
    quantidade INT,
    FOREIGN KEY (carrinho_id) REFERENCES tb_carrinho(id),
    FOREIGN KEY (produto_id) REFERENCES tb_produto(id)
);

-- e dessa forma adicionamos os multiplos produtos: OBS:é necessario ja existir produtos cadastrados na tb_produto --
INSERT INTO tb_carrinho_produto (carrinho_id, produto_id, quantidade)
VALUES (1, 2, 3), (1, 4, 1), (1, 5, 2);
