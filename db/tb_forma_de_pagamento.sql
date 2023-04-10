CREATE TABLE tb_forma de pagamento (
    id INT AUTO_INCREMENT PRIMARY KEY,
    id_cliente VARCHAR (100) NOT NULL,
    tipo VARCHAR (50) NOT NULL,
    id_cartao VARCHAR (255) NOT NULL,
    parcelamento VARCHAR (100) NOT NULL,
    FOREIGN KEY (id_cliente) REFERENCES tb_cliente (id),
    FOREIGN KEY (id_cartao) REFERENCES tb_cartao (id)
);