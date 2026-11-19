document.getElementById('filtro').addEventListener('change', (evento) => {
  const tipo = evento.target.value;
  document.querySelectorAll('.projeto').forEach((projeto) => {
    projeto.style.display = tipo === 'todos' || projeto.dataset.tipo === tipo ? 'block' : 'none';
  });
});

const campoTarefa = document.getElementById('nova-tarefa');
const listaTarefas = document.getElementById('lista-tarefas');
function adicionarTarefa() {
  const texto = campoTarefa.value.trim();
  if (texto === '') {
    alert('Digite uma tarefa primeiro!');
    return;
  }
  const item = document.createElement('li');
  item.textContent = texto;
  item.className = 'tarefa';
  item.title = 'Clique para marcar como concluída';
  item.addEventListener('click', () => item.classList.toggle('feita'));
  listaTarefas.appendChild(item);
  campoTarefa.value = '';
  campoTarefa.focus();
}
document.getElementById('adicionar').addEventListener('click', adicionarTarefa);
campoTarefa.addEventListener('keydown', (evento) => {
  if (evento.key === 'Enter') adicionarTarefa();
});

document.getElementById('calcular').addEventListener('click', () => {
  const campos = [...document.querySelectorAll('.nota')];
  const valores = campos.map(campo => Number(campo.value));
  const resultado = document.getElementById('resultado');
  if (campos.some(campo => campo.value === '') || valores.some(nota => nota < 0 || nota > 10)) {
    resultado.textContent = 'Preencha as três notas entre 0 e 10.';
    return;
  }
  const media = valores.reduce((total, nota) => total + nota, 0) / valores.length;
  resultado.textContent = `Sua média é ${media.toFixed(1)}. ${media >= 7 ? 'Você está aprovado(a)!' : 'Continue estudando!'}`;
});
