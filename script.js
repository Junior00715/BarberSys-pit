// Dados iniciais dos Serviços da Barbearia
const servicos = [
  { id: 1, nome: "Corte de Cabelo (Tesoura/Máquina)", preco: 45.00, duracao: "30 min" },
  { id: 2, nome: "Barba Completa com Toalha Quente", preco: 35.00, duracao: "30 min" },
  { id: 3, nome: "Combo Cabelo + Barba", preco: 70.00, duracao: "60 min" },
  { id: 4, nome: "Sobrancelha / Acabamento", preco: 20.00, duracao: "15 min" }
];

// Carregar agendamentos salvos ou criar lista vazia
let agendamentos = JSON.parse(localStorage.getItem('barberSys_agendamentos')) || [];

document.addEventListener('DOMContentLoaded', () => {
  renderizarServicos();
  renderizarTabela();
  configurarDataMinima();
  document.getElementById('form-agendamento').addEventListener('submit', salvarAgendamento);
});

// Exibe os cards de serviços e popula o SELECT
function renderizarServicos() {
  const container = document.getElementById('lista-servicos');
  const select = document.getElementById('select-servico');
  
  if (!container || !select) return;

  container.innerHTML = '';
  select.innerHTML = '<option value="">-- Escolha um serviço --</option>';

  servicos.forEach(s => {
    container.innerHTML += `
      <div class="item-servico">
        <h3>${s.nome}</h3>
        <p>Duração: ${s.duracao}</p>
        <p class="preco">R$ ${s.preco.toFixed(2).replace('.', ',')}</p>
      </div>
    `;
    
    select.innerHTML += `<option value="${s.id}">${s.nome} - R$ ${s.preco.toFixed(2).replace('.', ',')}</option>`;
  });
}

// Impede seleção de datas passadas
function configurarDataMinima() {
  const inputData = document.getElementById('data-agendamento');
  if (!inputData) return;
  const hoje = new Date().toISOString().split('T')[0];
  inputData.setAttribute('min', hoje);
}

// Salva um novo agendamento com validação IHC
function salvarAgendamento(event) {
  event.preventDefault();

  const nome = document.getElementById('nome-cliente').value.trim();
  const telefone = document.getElementById('telefone-cliente').value.trim();
  const servicoId = document.getElementById('select-servico').value;
  const data = document.getElementById('data-agendamento').value;
  const hora = document.getElementById('hora-agendamento').value;

  const servicoObj = servicos.find(s => s.id == servicoId);
  if (!servicoObj) return;

  // Validação de conflito de horário simples
  const conflito = agendamentos.some(a => a.data === data && a.hora === hora && a.status !== 'CANCELADO');
  if (conflito) {
    exibirFeedback("⚠️ Este horário já está reservado por outro cliente. Escolha outro horário!", "erro");
    return;
  }

  const novoAgendamento = {
    id: Date.now(),
    cliente: nome,
    telefone: telefone,
    servico: servicoObj.nome,
    preco: servicoObj.preco,
    data: data,
    hora: hora,
    status: 'PENDENTE'
  };

  agendamentos.push(novoAgendamento);
  localStorage.setItem('barberSys_agendamentos', JSON.stringify(agendamentos));

  exibirFeedback("✅ Agendamento realizado com sucesso!", "sucesso");
  document.getElementById('form-agendamento').reset();
  renderizarTabela();
}

// Renderiza a tabela de agendamentos
function renderizarTabela() {
  const tbody = document.getElementById('tabela-agendamentos');
  if (!tbody) return;

  tbody.innerHTML = '';

  if (agendamentos.length === 0) {
    tbody.innerHTML = `<tr><td colspan="6" style="text-align: center;">Nenhum agendamento cadastrado.</td></tr>`;
    return;
  }

  agendamentos.forEach(a => {
    const dataFormatada = a.data.split('-').reverse().join('/');
    tbody.innerHTML += `
      <tr>
        <td>${a.cliente}</td>
        <td>${a.telefone}</td>
        <td>${a.servico}</td>
        <td>${dataFormatada} às ${a.hora}</td>
        <td><span class="status-badge status-${a.status}">${a.status}</span></td>
        <td>
          ${a.status === 'PENDENTE' ? `
            <button class="btn-acao btn-concluir" onclick="alterarStatus(${a.id}, 'CONCLUIDO')">Concluir</button>
            <button class="btn-acao btn-cancelar" onclick="alterarStatus(${a.id}, 'CANCELADO')">Cancelar</button>
          ` : '-'}
        </td>
      </tr>
    `;
  });
}

// Altera status (Concluído/Cancelado)
function alterarStatus(id, novoStatus) {
  agendamentos = agendamentos.map(a => a.id === id ? { ...a, status: novoStatus } : a);
  localStorage.setItem('barberSys_agendamentos', JSON.stringify(agendamentos));
  renderizarTabela();
  exibirFeedback(`Status do agendamento atualizado para ${novoStatus}.`, "sucesso");
}

// Exibe mensagens de feedback (IHC)
function exibirFeedback(mensagem, tipo) {
  const div = document.getElementById('mensagem-feedback');
  if (!div) return;

  div.className = `feedback ${tipo}`;
  div.innerText = mensagem;
  div.classList.remove('oculto');

  setTimeout(() => {
    div.classList.add('oculto');
  }, 4000);
}