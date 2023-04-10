CREATE TABLE tb_produto (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nome_modelo VARCHAR (50) NOT NULL,
    descricao VARCHAR (255) NOT NULL,
    desconto INT,
    tipo VARCHAR (50),
    genero VARCHAR (30) NOT NULL,
    valor_original INT NOT NULL,
    valor_desconto INT,
    avaliacao VARCHAR (50),
    referencia  VARCHAR (50) NOT NULL,
    tamanho INT NOT NULL,
    cor VARCHAR (50) NOT NULL,
    quantidade INT NOT NULL,
    id_marca INT,
    FOREIGN KEY (id_marca) REFERENCES tb_marca (id),
    id_categoria INT,
    FOREIGN KEY (id_categoria) REFERENCES tb_category (id),
    estado VARCHAR (50),
    imagem VARCHAR (255) NOT NULL
);


INSERT INTO tb_produto (nome_modelo, descricao, genero, valor_original, referencia, tamanho, cor, quantidade, id_marca, id_categoria, imagem) 
VALUES ("tenis", "para corrida", "masculino", "100", "1234", "40", "verde", "2", 1, 2, "alguma imagem");

SELECT * FROM tb_produto;  

SELECT tb_marca.id, tb_marca.nome, tb_produto.nome_modelo FROM
tb_marca INNER JOIN tb_produto
ON tb_produto.id_marca = tb_marca.id;