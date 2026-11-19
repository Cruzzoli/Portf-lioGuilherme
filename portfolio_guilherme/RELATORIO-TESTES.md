# Registro técnico e matriz de testes

Documento inicial de apoio à atividade de Programação Front-End. Os testes abaixo são roteiros para execução manual no navegador; preencha a coluna “Resultado obtido” e “Situação” depois de executar cada cenário no seu computador. Não declare como executado um teste que ainda não foi realizado.

## Diagnóstico de problemas e correções implementadas

| Problema | Local / como reproduzir | Impacto esperado | Correção implementada | Prioridade |
|---|---|---|---|---|
| Formulário não tinha validação completa | Tentar enviar campos vazios ou com dados inválidos | Visitante não recebe orientação adequada | Validação de cada campo, resumo e foco no primeiro erro | Alta |
| Não havia regra condicional de assunto | Selecionar “Outro” e depois trocar o motivo | Campo oculto poderia continuar bloqueando o envio | Campo é exibido e obrigatório somente em “Outro”; ao ocultar, é desabilitado, limpo e removido dos dados | Alta |
| Não havia estados de envio/falha | Enviar formulário sem resposta de processamento | Visitante não sabe se houve sucesso ou falha | Processamento assíncrono demonstrativo com sucesso/falha controlados e preservação dos dados na falha | Alta |
| Filtro de projetos sem estado completo | Alternar categorias e verificar o resultado | Visitante não sabe quantos itens encontrou | Botões com `aria-pressed`, contador e mensagem de estado vazio | Média |
| Menu e layout móvel precisavam de revisão | Abrir em tela estreita e navegar pelo menu | Navegação pode ficar difícil em celular | Menu móvel com `aria-expanded`, fechamento após escolha e grades responsivas | Média |
| Feedback visual e acessibilidade de campos | Navegar com Tab e provocar erro | Erros podem não ser percebidos por teclado/leitor de tela | `label`, `aria-describedby`, `aria-invalid`, regiões de status e foco visível | Alta |

## Matriz de testes

| ID | Entrada ou ação | Resultado esperado | Resultado obtido | Situação |
|---|---|---|---|---|
| T01 | Enviar o formulário vazio | Mostrar erros, resumo e foco no primeiro campo inválido | A preencher | Pendente |
| T02 | Nome com espaços; depois nome com acento e hífen | Rejeitar espaços; aceitar nome válido de 3 a 80 caracteres | A preencher | Pendente |
| T03 | E-mail sem `@`; depois formato válido | Mostrar erro e removê-lo após correção | A preencher | Pendente |
| T04 | Nome com 2, 3, 80 e 81 caracteres úteis | Aplicar limites mínimo e máximo | A preencher | Pendente |
| T05 | Mensagem com 29, 30, 1000 e 1001 caracteres úteis | Contador e validação coerentes com os limites | A preencher | Pendente |
| T06 | Motivo “Outro” com assunto vazio, 4 e 5 caracteres | Exigir assunto de 5 a 100 caracteres | A preencher | Pendente |
| T07 | Gerar erro no assunto e trocar para “Projeto freelance” | Campo some, fica desabilitado e não bloqueia envio | A preencher | Pendente |
| T08 | Clicar repetidamente durante processamento | Apenas uma operação fica ativa | A preencher | Pendente |
| T09 | Selecionar falha, enviar e tentar novamente | Dados permanecem preenchidos e nova tentativa é possível | A preencher | Pendente |
| T10 | Selecionar sucesso e depois editar campo | Exibir sucesso apenas após processamento e limpar status ao editar | A preencher | Pendente |
| T11 | Usar teclado, tela de 360 px, 768 px, 1280 px e zoom de 200% | Conteúdo acessível, sem rolagem horizontal indevida | A preencher | Pendente |
| T12 | Filtrar “Desenvolvimento web”, “Lógica” e “Todos” | Atualizar cards, botão ativo e quantidade sem duplicação | A preencher | Pendente |
| T13 | Testar categoria sem correspondência (temporariamente alterando `data-categoria`) | Exibir mensagem de nenhum resultado | A preencher | Pendente |

## Refatoração e decisões técnicas

- O código separa a atualização do menu, o filtro de projetos, as demonstrações e o formulário em blocos com responsabilidades diferentes.
- No formulário, `contarCaracteres()` é usado tanto no contador quanto nas regras de tamanho. A função usa `Array.from()` para contar pontos de código Unicode, evitando contar pares substitutos como dois caracteres.
- `lerDados()` normaliza com `trim()` os campos textuais processados. O assunto adicional só é incluído quando o motivo é “Outro”.
- O conteúdo digitado na lista de tarefas é inserido por `textContent`, sem interpretar o texto como HTML.
- A falha simulada preserva os dados; o estado de processamento desabilita os controles e impede envios concorrentes.

## Evidências antes/depois

Adicionar ao repositório capturas de tela próprias mostrando: (1) formulário inválido e mensagens; (2) campo de assunto ao escolher “Outro” e sua remoção ao trocar o motivo; (3) falha simulada com os dados preservados e sucesso simulado.

## Revisão por colega

Preencher após um colega executar pelo menos três cenários, incluindo falha:

- Cenários executados: a preencher.
- Achado 1 e resposta (corrigido / não reproduzido / pendente): a preencher.
- Achado 2 e resposta (corrigido / não reproduzido / pendente): a preencher.

## Limitações conhecidas

- Sucesso e falha são simulados no navegador; não há envio real de e-mail.
- Links externos de projetos e perfis pessoais não foram inventados. Os links dos cards levam às demonstrações internas correspondentes.
- O carregamento de Google Fonts depende de conexão; há fontes de fallback.
