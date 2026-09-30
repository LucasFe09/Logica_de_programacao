/**
 * FORMAÇÃO CODE & CODEVIBE — CADERNO DE PRÁTICA
 * Edite somente o corpo das funções. Rode: node avaliar.cjs treino
 * Valores especiais de teste ajudam a detectar respostas decoradas.
 * Estes exemplos são fictícios e não acessam nenhum serviço externo.
 */

// 1. Terminal e caminhos: retornar a última pasta de um caminho Windows ou Unix.
// Ex.: ultimaPasta("C:\\projetos\\ticketlab") -> "ticketlab"
function ultimaPasta(caminho) {
  // Dica: substitua barras invertidas por "/", divida e ignore segmentos vazios.
}

// 2. HTTP: 200 -> "sucesso", 400–499 -> "erro do cliente",
// 500–599 -> "erro do servidor", outros -> "outro".
function classeHttp(status) {
}

// 3. HTML: escapar &, <, >, " e ' para exibir texto como texto.
// Não use esta função para construir SQL ou proteger URLs.
function escaparHtml(texto) {
}

// 4. JavaScript: receber lista de tickets e retornar apenas os abertos de alta prioridade.
// Não altere o array de entrada.
function ticketsUrgentes(tickets) {
}

// 5. Git: retornar o nome da branch recebido se não estiver vazio;
// se vazio ou só espaços, retornar "main".
function branchAtual(nome) {
}

// 6. Node: transformar uma lista de números em total;
// entradas que não são número finito devem ser ignoradas.
function somarValidos(valores) {
}

// 7. API: converter uma string JSON de ticket em objeto {id, title};
// se JSON inválido ou id não for inteiro ou title vazio, retornar null.
function lerTicketJson(corpo) {
}

// 8. Dados: contar tickets por status e retornar {open: N, closed: N};
// outros status não entram na contagem.
function contarPorStatus(tickets) {
}

// 9. Testes: retornar true quando valor for um email básico plausível
// com um @, texto antes e depois e ponto após o @; senão false.
// É validação de exercício, não verificação completa de emails reais.
function emailBasico(valor) {
}

// 10. IA: criar prompt que contenha a tarefa, o contexto e a exigência
// "Não invente dados". Retorne uma string; não use serviço externo.
function montarPrompt(tarefa, contexto) {
}

/* PROVA PRÁTICA: responda depois de estudar os dez capítulos. */

// P1. Recebe {id, title, status, priority}.
// Retorne NOVO objeto {id, title, status, priority} se id for inteiro positivo,
// title não vazio e status em ["open","closed"]. Senão null.
function validarTicket(ticket) {
}

// P2. Receba uma lista e retorne NOVO array dos tickets com status "open",
// ordenados por id crescente, sem alterar a lista original.
function ordenarAbertos(tickets) {
}

// P3. Receba (lista, id, status). Atualize somente o ticket daquele id,
// retornando uma NOVA lista e NOVO objeto para o item atualizado;
// se não houver id, retorne lista nova com os objetos preservados.
function atualizarStatus(tickets, id, status) {
}

// P4. Receba Promise que resolve para {status, body}.
// Retorne o corpo se status estiver entre 200 e 299;
// se vier outro status, lance Error com "HTTP" e o status na mensagem.
async function extrairResposta(promiseResposta) {
}

// P5. Receba um array de tickets. Retorne um resumo
// {total: N, abertos: N, altaPrioridade: N}; prioridade alta é "high".
function resumoTickets(tickets) {
}

module.exports = {
  ultimaPasta, classeHttp, escaparHtml, ticketsUrgentes, branchAtual,
  somarValidos, lerTicketJson, contarPorStatus, emailBasico, montarPrompt,
  validarTicket, ordenarAbertos, atualizarStatus, extrairResposta, resumoTickets
};
