CREATE TABLE tb_pedido (
    id INT AUTO_INCREMENT PRIMARY KEY,
    id_cliente INT,
    FOREIGN KEY (id_cliente) REFERENCES tb_cliente (id),
    id_produto INT,
    FOREIGN KEY (id_produto) REFERENCES tb_produto (id),
    status_pedido VARCHAR (255) NOT NULL,
    numero_pedido INT
);
 -- a tabela de cliente já tem que estar criada, por exemplo:
CREATE TABLE tb_cliente (
    id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    nome VARCHAR (30)
);

INSERT INTO tb_cliente (nome) VALUES ('Rebeca');

-- inserindo valores ao pedido
INSERT INTO tb_pedido (id_cliente, id_produto, status_pedido, numero_pedido) 
VALUES (1, 1, "aguardando pagamento", "345");

SELECT * FROM tb_pedido;  

SELECT tb_cliente.id, tb_cliente.nome, tb_pedido.numero_pedido FROM
tb_cliente INNER JOIN tb_pedido
ON tb_pedido.id_cliente = tb_cliente.id;
 