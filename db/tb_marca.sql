CREATE TABLE tb_marca (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nome VARCHAR (30) NOT NULL   
);

INSERT INTO tb_marca 
    (nome)
VALUES
    ('Addidas');

INSERT INTO tb_marca 
    (nome)
VALUES
    ('Calenciaga');

INSERT INTO tb_marca 
    (nome)
VALUES
    ('K-Swiss');

INSERT INTO tb_marca 
    (nome)
VALUES
    ('Nike');

INSERT INTO tb_marca 
    (nome)
VALUES
    ('Puma');


SELECT * FROM tb_marca; 