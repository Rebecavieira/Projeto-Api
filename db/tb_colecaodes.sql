CREATE TABLE tb_colecaodes (
    id INT AUTO_INCREMENT PRIMARY KEY,
    img VARCHAR (255),
    titulo VARCHAR (255) NOT NULL,
    desconto VARCHAR (4),
    categoria_id INT,
    FOREIGN KEY (categoria_id) REFERENCES tb_category(id) 
    );

INSERT INTO tb_colecaodes (img, titulo, desconto) 
VALUES ("https://encurtador.com.br/kmsvM", "Sapato Nike", "40%");

INSERT INTO tb_colecaodes (img, titulo, desconto) 
VALUES ("https://encurtador.com.br/npAOQ", "Sapato Puma", "30%");