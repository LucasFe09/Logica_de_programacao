'use strict';
/* Execute neste diretório: node avaliar.cjs treino | node avaliar.cjs prova */
const fs = require('node:fs');
const path = require('node:path');
const { isDeepStrictEqual } = require('node:util');
let E;
try { E = require('./exercicios.js'); }
catch (err) { console.error('Não foi possível carregar exercicios.js:', err.message); process.exitCode = 1; return; }
const mode = process.argv[2];
const equal = isDeepStrictEqual;
async function task(name, cases) {
  let problems = [];
  for (const [label, test] of cases) {
    try { if (!await test()) problems.push(label); }
    catch (err) { problems.push(label + ' (' + err.message + ')'); }
  }
  console.log((problems.length ? '✗ ' : '✓ ') + name + (problems.length ? ': ' + problems.join('; ') : ': passou'));
  return problems.length === 0;
}
const ticket = (id,status,priority='low') => ({id,status,priority});
async function treino(){
  console.log('\nTREINO — 10 funções, com casos comuns e limites\n');
  let results = [];
  results.push(await task('1 ultimaPasta',[
    ['caminho Windows',()=>E.ultimaPasta('C:\\projetos\\ticketlab')==='ticketlab'],
    ['barra final',()=>E.ultimaPasta('/home/aluno/docs/')==='docs']]));
  results.push(await task('2 classeHttp',[
    ['200',()=>E.classeHttp(200)==='sucesso'],
    ['404 e 500',()=>E.classeHttp(404)==='erro do cliente'&&E.classeHttp(500)==='erro do servidor'],
    ['outro',()=>E.classeHttp(301)==='outro']]));
  results.push(await task('3 escaparHtml',[
    ['texto perigoso',()=>E.escaparHtml('<b title="x">Tom & Jerry\'s</b>')==='&lt;b title=&quot;x&quot;&gt;Tom &amp; Jerry&#39;s&lt;/b&gt;'],
    ['ampersand único',()=>E.escaparHtml('&')==='&amp;']]));
  results.push(await task('4 ticketsUrgentes',[
    ['filtrar por dois critérios',()=>equal(E.ticketsUrgentes([ticket(1,'open','high'),ticket(2,'closed','high'),ticket(3,'open')]),[ticket(1,'open','high')])],
    ['sem resultados',()=>equal(E.ticketsUrgentes([]),[])]]));
  results.push(await task('5 branchAtual',[
    ['nome fornecido',()=>E.branchAtual('feature/a')==='feature/a'],
    ['espaços',()=>E.branchAtual('   ')==='main']]));
  results.push(await task('6 somarValidos',[
    ['mistura',()=>E.somarValidos([1,2,'3',NaN,Infinity,-4])===-1],
    ['lista vazia',()=>E.somarValidos([])===0]]));
  results.push(await task('7 lerTicketJson',[
    ['objeto válido',()=>equal(E.lerTicketJson('{"id":3,"title":"Relatório","extra":1}'),{id:3,title:'Relatório'})],
    ['JSON inválido',()=>E.lerTicketJson('{')===null],
    ['title vazio',()=>E.lerTicketJson('{"id":2,"title":"  "}')===null]]));
  results.push(await task('8 contarPorStatus',[
    ['status',()=>equal(E.contarPorStatus([ticket(1,'open'),ticket(2,'closed'),ticket(3,'other'),ticket(4,'open')]),{open:2,closed:1})],
    ['vazio',()=>equal(E.contarPorStatus([]),{open:0,closed:0})]]));
  results.push(await task('9 emailBasico',[
    ['válido',()=>E.emailBasico('ana@exemplo.com')===true],
    ['inválidos',()=>E.emailBasico('a@@b.com')===false&&E.emailBasico(' a@b.com ')===false&&E.emailBasico(42)===false]]));
  results.push(await task('10 montarPrompt',[
    ['contexto e limite',()=>{const p=E.montarPrompt('resumir','ticket 123');return typeof p==='string'&&p.includes('resumir')&&p.includes('ticket 123')&&p.includes('Não invente dados')}]]));
  const n=results.filter(Boolean).length;console.log('\nTreino: '+n+'/10 funções completas. Continue no index.html e corrija os itens marcados com ✗.');
}
const source = [
  {id:8,title:'B',status:'closed',priority:'high'},
  {id:3,title:'A',status:'open',priority:'low'},
  {id:5,title:'C',status:'open',priority:'high'}
];
async function praticaFinal(){
  const scores=[];
  scores.push(await task('P1 validarTicket',[
    ['válido e objeto novo',()=>{const x={id:3,title:'  Ajuda  ',status:'open',priority:'high'};const y=E.validarTicket(x);return y!==x&&equal(y,x)}],
    ['id inválido',()=>E.validarTicket({id:0,title:'X',status:'open',priority:'high'})===null],
    ['status inválido',()=>E.validarTicket({id:2,title:'X',status:'pending',priority:'high'})===null],
    ['title vazio',()=>E.validarTicket({id:2,title:' ',status:'open',priority:'high'})===null]]));
  scores.push(await task('P2 ordenarAbertos',[
    ['ordem e sem mutação',()=>{const x=structuredClone(source),before=structuredClone(x),out=E.ordenarAbertos(x);return equal(out.map(t=>t.id),[3,5])&&equal(x,before)&&out!==x}],
    ['lista vazia',()=>equal(E.ordenarAbertos([]),[])]]));
  scores.push(await task('P3 atualizarStatus',[
    ['atualização imutável',()=>{const x=structuredClone(source),before=structuredClone(x),out=E.atualizarStatus(x,3,'closed');return Array.isArray(out)&&out!==x&&out[1]!==x[1]&&out[1].status==='closed'&&out[0]===x[0]&&equal(x,before)}],
    ['id ausente',()=>{const x=structuredClone(source),out=E.atualizarStatus(x,99,'closed');return out!==x&&equal(out,x)}]]));
  scores.push(await task('P4 extrairResposta',[
    ['sucesso 201',async()=>equal(await E.extrairResposta(Promise.resolve({status:201,body:{ok:true}})),{ok:true})],
    ['erro 404',async()=>{try{await E.extrairResposta(Promise.resolve({status:404,body:null}));return false}catch(err){return err instanceof Error&&/HTTP/.test(err.message)&&/404/.test(err.message)}}]]));
  scores.push(await task('P5 resumoTickets',[
    ['três medidas',()=>equal(E.resumoTickets(source),{total:3,abertos:2,altaPrioridade:2})],
    ['vazio',()=>equal(E.resumoTickets([]),{total:0,abertos:0,altaPrioridade:0})]]));
  return scores.filter(Boolean).length;
}
function escapeHtml(s){return String(s).replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]))}
function certificate(name,theory,practice){
 const date=new Intl.DateTimeFormat('pt-BR',{dateStyle:'long',timeZone:'America/Sao_Paulo'}).format(new Date());
 return '<!doctype html><html lang="pt-BR"><meta charset="utf-8"><title>Certificado de conclusão</title><style>body{font:18px/1.7 Georgia,serif;background:#eee;padding:40px;color:#292139}.paper{max-width:850px;margin:auto;background:white;border:9px double #6745a3;padding:75px 55px;text-align:center}h1{font-size:44px;color:#6745a3}.small{font-size:14px;color:#555}@media print{body{background:white;padding:0}.paper{border:8px double #6745a3;min-height:680px}}</style><div class="paper"><p>FORMAÇÃO CODE & CODEVIBE</p><h1>Certificado de conclusão</h1><p>Certificamos que</p><h2>'+escapeHtml(name)+'</h2><p>concluiu a formação autodirigida de fundamentos de programação, web, Git, dados, testes e IA aplicada, com avaliação local de '+theory+'/10 questões teóricas e '+practice+'/5 desafios práticos.</p><p>'+escapeHtml(date)+'</p><p class="small">Documento gerado automaticamente no computador do estudante. Sem validação independente de identidade ou credenciamento institucional.</p></div></html>';
}
async function prova(){
 let data;
 try{data=require('./prova.js')}catch(err){console.error('Erro ao abrir prova.js:',err.message);process.exitCode=1;return}
 const correct=['B','C','A','B','A','B','A','B','A','A'];
 const answers=Array.isArray(data.respostas)?data.respostas:[];
 let theory=0; console.log('\nPROVA OBJETIVA\n');
 correct.forEach((key,i)=>{const a=String(answers[i]??'').trim().toUpperCase();const ok=a===key;theory+=Number(ok);console.log((ok?'✓':'✗')+' Questão '+(i+1)+(a?' (marcou '+a+')':' (sem resposta)'))});
 console.log('\nPROVA PRÁTICA\n');
 const practice=await praticaFinal();
 console.log('\nResultado: teoria '+theory+'/10; prática '+practice+'/5.');
 if(theory>=8&&practice>=4){
  const name=typeof data.nome==='string'?data.nome.trim():'';
  if(!name||name==='Seu nome aqui'){console.log('Aprovado! Preencha seu nome em prova.js e rode novamente para emitir o certificado.');return}
  const file=path.join(__dirname,'certificado.html');
  fs.writeFileSync(file,certificate(name,theory,practice),'utf8');
  console.log('Aprovado! Certificado criado: '+file+'\nAbra no navegador e use Imprimir → Salvar como PDF.');
 }else{console.log('Para concluir: pelo menos 8/10 na teoria e 4/5 na prática. Revise e tente de novo.')}
}
(async()=>{if(mode==='treino')await treino();else if(mode==='prova')await prova();else console.log('Use: node avaliar.cjs treino   ou   node avaliar.cjs prova')})().catch(err=>{console.error('Falha na avaliação:',err);process.exitCode=1});
