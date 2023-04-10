CREATE TABLE tb_cliente (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nome VARCHAR (100) NOT NULL,
    cpf VARCHAR (14) NOT NULL,
    email VARCHAR (100) NOT NULL,
    celular VARCHAR (20) NOT NULL,
    id_endereco VARCHAR (50) NOT NULL,
    senha VARCHAR (50) NOT NULL,
    FOREIGN KEY (id_endereco) REFERENCES tb_endereco (id)
);










