# Portfólio estudantil — Guilherme Oliveira

Projeto acadêmico desenvolvido com HTML, CSS e JavaScript. O site utiliza tema escuro fixo e não possui alternância para tema claro.

## Como executar

1. Baixe ou clone este repositório.
2. Mantenha `index.html`, `style.css`, `script.js` e a pasta `assets` no mesmo diretório.
3. Abra `index.html` no navegador. Não é necessário instalar dependências.
4. Para publicar, habilite GitHub Pages apontando para a branch principal e a pasta `/ (root)`.

## Funcionalidades

- Navegação por âncoras e menu responsivo com `aria-expanded`.
- Seções de apresentação, formação, conhecimentos, projetos e contato.
- Filtro de projetos por categoria, com quantidade e mensagem quando não há resultados.
- Lista de tarefas e calculadora de médias.
- Formulário com validação de nome, e-mail, motivo, assunto condicional e mensagem.
- Contador de caracteres, erros associados aos campos e foco no primeiro campo inválido.
- Estados de processamento, sucesso simulado e falha simulada, sem múltiplos envios concorrentes.

## Limitação importante do formulário

O formulário é uma demonstração front-end. O seletor de teste permite escolher sucesso ou falha de maneira controlada. Nenhum e-mail é enviado e os dados não são transmitidos para um servidor. Para receber mensagens de visitantes, será necessário integrar um serviço/backend real. A validação no navegador não substitui a validação no servidor.

## Tecnologias

HTML5, CSS3 e JavaScript puro (sem framework ou biblioteca externa). A fonte tipográfica é carregada do Google Fonts; se não houver conexão, fontes alternativas serão utilizadas.
