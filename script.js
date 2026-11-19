// Menu responsivo com estado acessível.
const menuToggle = document.querySelector('#menu-toggle');
const menuLinks = document.querySelector('#menu-links');
menuToggle.addEventListener('click', () => {
  const aberto = menuToggle.getAttribute('aria-expanded') === 'true';
  menuToggle.setAttribute('aria-expanded', String(!aberto));
  menuToggle.setAttribute('aria-label', aberto ? 'Abrir menu' : 'Fechar menu');
  menuLinks.classList.toggle('aberto', !aberto);
});
menuLinks.querySelectorAll('a').forEach((link) => link.addEventListener('click', () => {
  menuToggle.setAttribute('aria-expanded', 'false');
  menuToggle.setAttribute('aria-label', 'Abrir menu');
  menuLinks.classList.remove('aberto');
}));

// Filtro de projetos: dados ficam nos atributos data-categoria.
const botoesFiltro = [...document.querySelectorAll('.filtro')];
const cardsProjeto = [...document.querySelectorAll('.projeto')];
const contadorProjetos = document.querySelector('#contador-projetos');
const avisoSemResultados = document.querySelector('#sem-resultados');
function filtrarProjetos(categoria) {
  let quantidade = 0;
  cardsProjeto.forEach((card) => {
    const corresponde = categoria === 'todos' || card.dataset.categoria === categoria;
    card.hidden = !corresponde;
    if (corresponde) quantidade += 1;
  });
  botoesFiltro.forEach((botao) => {
    const ativo = botao.dataset.filtro === categoria;
    botao.classList.toggle('ativo', ativo);
    botao.setAttribute('aria-pressed', String(ativo));
  });
  contadorProjetos.textContent = `${quantidade} ${quantidade === 1 ? 'projeto encontrado' : 'projetos encontrados'}`;
  avisoSemResultados.hidden = quantidade !== 0;
}
botoesFiltro.forEach((botao) => botao.addEventListener('click', () => filtrarProjetos(botao.dataset.filtro)));

// Demonstração 1: lista de tarefas. O texto do usuário é inserido com textContent.
const formTarefa = document.querySelector('#form-tarefa');
const campoTarefa = document.querySelector('#nova-tarefa');
const listaTarefas = document.querySelector('#lista-tarefas');
formTarefa.addEventListener('submit', (evento) => {
  evento.preventDefault();
  const texto = campoTarefa.value.trim();
  if (!texto) { campoTarefa.focus(); return; }
  const item = document.createElement('li');
  const label = document.createElement('label');
  const checkbox = document.createElement('input');
  const descricao = document.createElement('span');
  const remover = document.createElement('button');
  checkbox.type = 'checkbox';
  checkbox.addEventListener('change', () => item.classList.toggle('concluida', checkbox.checked));
  descricao.textContent = texto;
  remover.type = 'button';
  remover.textContent = 'Remover';
  remover.setAttribute('aria-label', `Remover tarefa: ${texto}`);
  remover.addEventListener('click', () => item.remove());
  label.append(checkbox, descricao);
  item.append(label, remover);
  listaTarefas.append(item);
  campoTarefa.value = '';
  campoTarefa.focus();
});

// Demonstração 2: calculadora com verificação dos limites.
document.querySelector('#calcular').addEventListener('click', () => {
  const campos = [...document.querySelectorAll('.nota')];
  const notas = campos.map((campo) => Number(campo.value));
  const resultado = document.querySelector('#resultado');
  const invalida = campos.some((campo) => campo.value.trim() === '') || notas.some((nota) => !Number.isFinite(nota) || nota < 0 || nota > 10);
  if (invalida) { resultado.textContent = 'Preencha as três notas com valores entre 0 e 10.'; return; }
  const media = notas.reduce((soma, nota) => soma + nota, 0) / notas.length;
  resultado.textContent = `Média: ${media.toFixed(1).replace('.', ',')} — ${media >= 7 ? 'resultado igual ou acima de 7.' : 'continue praticando!'}`;
});

// Formulário de contato: validação, regra condicional e estados simulados.
const formContato = document.querySelector('#form-contato');
const campos = {
  nome: document.querySelector('#nome'),
  email: document.querySelector('#email'),
  motivo: document.querySelector('#motivo'),
  assunto: document.querySelector('#assunto'),
  mensagem: document.querySelector('#mensagem')
};
const grupoAssunto = document.querySelector('#grupo-assunto');
const contadorMensagem = document.querySelector('#contador-mensagem');
const resumoErros = document.querySelector('#resumo-erros');
const statusForm = document.querySelector('#status-form');
const botaoEnviar = document.querySelector('#botao-enviar');
let processando = false;
let formularioEnviado = false;
const nomesCampos = { nome: 'Nome', email: 'E-mail', motivo: 'Motivo do contato', assunto: 'Assunto adicional', mensagem: 'Mensagem' };

// Array.from conta pontos de código Unicode e é usado no contador e na validação.
function contarCaracteres(valor) { return Array.from(valor).length; }
function valorNormalizado(campo) { return campo.value.trim(); }
function atualizarContador() {
  contadorMensagem.textContent = `${contarCaracteres(valorNormalizado(campos.mensagem))} / 1000`;
}
function limparErro(chave) {
  const campo = campos[chave];
  campo.removeAttribute('aria-invalid');
  document.querySelector(`#erro-${chave}`).textContent = '';
}
function mostrarErro(chave, mensagem) {
  const campo = campos[chave];
  campo.setAttribute('aria-invalid', 'true');
  document.querySelector(`#erro-${chave}`).textContent = mensagem;
}
function limparStatus() {
  statusForm.textContent = 'Preencha os campos obrigatórios para testar o formulário.';
  statusForm.className = 'status-form';
  formularioEnviado = false;
}
function atualizarCampoAssunto() {
  const exigeAssunto = campos.motivo.value === 'Outro';
  grupoAssunto.hidden = !exigeAssunto;
  campos.assunto.disabled = !exigeAssunto;
  campos.assunto.required = exigeAssunto;
  if (!exigeAssunto) {
    campos.assunto.value = '';
    limparErro('assunto');
  }
}
function validarCampo(chave) {
  const campo = campos[chave];
  const valor = valorNormalizado(campo);
  let erro = '';
  if (chave === 'nome') {
    const tamanho = contarCaracteres(valor);
    if (!valor) erro = 'Informe seu nome.';
    else if (tamanho < 3 || tamanho > 80) erro = 'O nome deve ter de 3 a 80 caracteres.';
  }
  if (chave === 'email') {
    if (!valor) erro = 'Informe seu e-mail.';
    else if (!campo.validity.valid) erro = 'Informe um endereço de e-mail em formato válido.';
  }
  if (chave === 'motivo' && !valor) erro = 'Selecione o motivo do contato.';
  if (chave === 'assunto' && campos.motivo.value === 'Outro') {
    const tamanho = contarCaracteres(valor);
    if (!valor) erro = 'Informe o assunto adicional.';
    else if (tamanho < 5 || tamanho > 100) erro = 'O assunto deve ter de 5 a 100 caracteres.';
  }
  if (chave === 'mensagem') {
    const tamanho = contarCaracteres(valor);
    if (!valor) erro = 'Escreva sua mensagem.';
    else if (tamanho < 30 || tamanho > 1000) erro = 'A mensagem deve ter de 30 a 1000 caracteres.';
  }
  if (erro) mostrarErro(chave, erro); else limparErro(chave);
  return erro;
}
function validarFormulario() {
  const ordem = ['nome', 'email', 'motivo'];
  if (campos.motivo.value === 'Outro') ordem.push('assunto');
  ordem.push('mensagem');
  const erros = [];
  ordem.forEach((chave) => {
    const erro = validarCampo(chave);
    if (erro) erros.push({ chave, erro });
  });
  resumoErros.hidden = erros.length === 0;
  if (erros.length) {
    resumoErros.replaceChildren();
    const titulo = document.createElement('strong');
    titulo.textContent = `Revise ${erros.length} ${erros.length === 1 ? 'campo' : 'campos'} antes de enviar:`;
    const lista = document.createElement('ul');
    erros.forEach(({ chave, erro }) => {
      const item = document.createElement('li');
      item.textContent = `${nomesCampos[chave]}: ${erro}`;
      lista.append(item);
    });
    resumoErros.append(titulo, lista);
    campos[erros[0].chave].focus();
    return false;
  }
  return true;
}
function lerDados() {
  const dados = {
    nome: valorNormalizado(campos.nome),
    email: valorNormalizado(campos.email),
    motivo: campos.motivo.value,
    mensagem: valorNormalizado(campos.mensagem)
  };
  if (campos.motivo.value === 'Outro') dados.assunto = valorNormalizado(campos.assunto);
  return dados;
}
function simularEnvio(resultadoEscolhido) {
  return new Promise((resolve, reject) => {
    window.setTimeout(() => {
      if (resultadoEscolhido === 'sucesso') resolve({ ok: true });
      else reject(new Error('Falha simulada para demonstrar a recuperação do formulário.'));
    }, 1100);
  });
}
function definirProcessamento(ativo) {
  processando = ativo;
  botaoEnviar.disabled = ativo;
  botaoEnviar.innerHTML = ativo ? '<span aria-hidden="true">◌</span> Processando...' : '<span aria-hidden="true">➤</span> Enviar mensagem';
  formContato.querySelectorAll('input, select, textarea').forEach((campo) => { campo.disabled = ativo || (campo === campos.assunto && campos.motivo.value !== 'Outro'); });
}

campos.motivo.addEventListener('change', () => {
  atualizarCampoAssunto();
  limparErro('motivo');
  resumoErros.hidden = true;
  limparStatus();
});
campos.mensagem.addEventListener('input', () => { atualizarContador(); if (campos.mensagem.getAttribute('aria-invalid') === 'true') validarCampo('mensagem'); limparStatus(); });
Object.entries(campos).forEach(([chave, campo]) => {
  if (chave === 'mensagem' || chave === 'motivo') return;
  campo.addEventListener('input', () => {
    if (campo.getAttribute('aria-invalid') === 'true') validarCampo(chave);
    limparStatus();
  });
});
formContato.querySelectorAll('input[name="resultado-teste"]').forEach((radio) => radio.addEventListener('change', limparStatus));

formContato.addEventListener('submit', async (evento) => {
  evento.preventDefault();
  if (processando) return;
  resumoErros.hidden = true;
  if (!validarFormulario()) return;
  const dados = lerDados();
  const resultadoEscolhido = formContato.querySelector('input[name="resultado-teste"]:checked').value;
  definirProcessamento(true);
  statusForm.className = 'status-form processando';
  statusForm.textContent = 'Processando sua mensagem de demonstração...';
  try {
    await simularEnvio(resultadoEscolhido);
    statusForm.className = 'status-form sucesso';
    statusForm.textContent = `Sucesso simulado! Os dados de ${dados.nome} foram processados apenas nesta demonstração. Nenhum e-mail foi enviado.`;
    formContato.reset();
    atualizarCampoAssunto();
    atualizarContador();
    Object.keys(campos).forEach(limparErro);
    formularioEnviado = true;
  } catch (erro) {
    statusForm.className = 'status-form falha';
    statusForm.textContent = 'Não foi possível concluir o envio (falha simulada). Seus dados foram preservados. Você pode tentar novamente.';
  } finally {
    definirProcessamento(false);
  }
});

atualizarCampoAssunto();
atualizarContador();
