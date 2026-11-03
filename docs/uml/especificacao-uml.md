# 📐 Modelagem UML - BarberSys

## 1. Casos de Uso (Use Cases)
- **UC01 - Cadastrar/Autenticar Cliente:** Permite a criação de conta e login na plataforma.
- **UC02 - Visualizar Serviços:** Exibe catálogo de cortes, barba e tratamentos com preços e durações.
- **UC03 - Agendar Horário:** O cliente seleciona o serviço, data e horário disponível.
- **UC04 - Gerenciar Agendamentos (Admin/Barbeiro):** Visualização e alteração de status (Pendente, Confirmado, Concluído, Cancelado).

## 2. Diagrama de Classes
- **Classe `Usuario`**: `id` (int), `nome` (string), `email` (string), `senha` (string), `perfil` (enum).  
  *Métodos:* `cadastrar()`, `autenticar()`.
- **Classe `Servico`**: `id` (int), `nome_servico` (string), `preco` (decimal), `duracao_minutos` (int).  
  *Métodos:* `listar()`, `atualizar()`.
- **Classe `Agendamento`**: `id` (int), `cliente_id` (int), `servico_id` (int), `data_hora` (datetime), `status` (enum).  
  *Métodos:* `criar()`, `cancelar()`, `alterarStatus()`.