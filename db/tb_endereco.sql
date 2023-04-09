CREATE TABLE tb_endereco (
    id INT AUTO_INCREMENT PRIMARY KEY,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at DATETIME NULL,
    cliente_id INT
    cep INT(8) NOT NULL,
    logradouro VARCHAR (255) NOT NULL,
    numero INT(5) NOT NULL,
    complemento VARCHAR(50),
    bairro VARCHAR(50) NOT NULL,
    cidade VARCHAR(50) NOT NULL,
    estado VARCHAR(2) NOT NULL,
);

INSERT INTO tb_endereco 
    (cep, logradouro, numero, bairro, cidade, estado )
VALUES
    ('60150161', 'Av. Santos Dumont', '1510', 'Aldeota', 'Fortaleza', 'CE' );

