CREATE TABLE tb_cupom (
    id INT AUTO_INCREMENT PRIMARY KEY,
    codigo VARCHAR (50),
    desconto VARCHAR (4)
    );


INSERT INTO tb_cupom (codigo, desconto) 
VALUES ("NIKE40", "40%");

INSERT INTO tb_cupom (codigo, desconto) 
VALUES ("PUMA30", "30%");