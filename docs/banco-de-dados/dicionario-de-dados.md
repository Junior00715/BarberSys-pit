# 🗄️ Dicionário de Dados - BarberSys

### Tabela `usuario`
| Campo | Tipo | Chave | Regra / Descrição |
| :--- | :--- | :--- | :--- |
| `id` | INT | PK (Auto Increment) | Identificador único do usuário |
| `nome` | VARCHAR(100) | - | Nome completo (Obrigatório) |
| `email` | VARCHAR(100) | Unique | E-mail de login (Único e Obrigatório) |
| `telefone` | VARCHAR(20) | - | Telefone de contato com DDD |
| `senha` | VARCHAR(255) | - | Senha criptografada |
| `perfil` | ENUM | - | 'CLIENTE' ou 'BARBEIRO' (Padrão: CLIENTE) |

### Tabela `servico`
| Campo | Tipo | Chave | Regra / Descrição |
| :--- | :--- | :--- | :--- |
| `id` | INT | PK (Auto Increment) | Identificador único do serviço |
| `nome_servico` | VARCHAR(100) | - | Descrição do serviço (ex: Corte Tesoura) |
| `preco` | DECIMAL(10,2) | - | Valor em reais (R$) |
| `duracao_minutos`| INT | - | Tempo estimado em minutos |

### Tabela `agendamento`
| Campo | Tipo | Chave | Regra / Descrição |
| :--- | :--- | :--- | :--- |
| `id` | INT | PK (Auto Increment) | Identificador do agendamento |
| `cliente_id` | INT | FK (`usuario.id`) | Identificador do cliente |
| `servico_id` | INT | FK (`servico.id`) | Identificador do serviço agendado |
| `data_hora` | DATETIME | - | Data e horário escolhidos |
| `status` | ENUM | - | 'PENDENTE', 'CONFIRMADO', 'CANCELADO', 'CONCLUIDO' |