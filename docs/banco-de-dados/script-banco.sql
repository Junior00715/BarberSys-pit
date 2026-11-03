CREATE TABLE usuario (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nome VARCHAR(100) NOT NULL,
    email VARCHAR(100) UNIQUE NOT NULL,
    telefone VARCHAR(20),
    senha VARCHAR(255) NOT NULL,
    perfil ENUM('CLIENTE', 'BARBEIRO') DEFAULT 'CLIENTE'
);

CREATE TABLE servico (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nome_servico VARCHAR(100) NOT NULL,
    preco DECIMAL(10,2) NOT NULL,
    duracao_minutos INT NOT NULL
);

CREATE TABLE agendamento (
    id INT AUTO_INCREMENT PRIMARY KEY,
    cliente_id INT NOT NULL,
    servico_id INT NOT NULL,
    data_hora DATETIME NOT NULL,
    status ENUM('PENDENTE', 'CONFIRMADO', 'CANCELADO', 'CONCLUIDO') DEFAULT 'PENDENTE',
    FOREIGN KEY (cliente_id) REFERENCES usuario(id),
    FOREIGN KEY (servico_id) REFERENCES servico(id)
);