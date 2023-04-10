CREATE TABLE tb_cupom (
    id INT AUTO_INCREMENT PRIMARY KEY,
    codigo VARCHAR (50),
    desconto VARCHAR (4),
    FOREIGN KEY (cliente_id) REFERENCES tb_cliente(id)
    );


INSERT INTO tb_cupom (codigo, desconto) 
VALUES ("NIKE40", "40%");

INSERT INTO tb_cupom (codigo, desconto) 
VALUES ("PUMA30", "30%");