// Schmale Bildschirme: BREITE kommt vom Testlauf (288 px = iPhone SE, 320 px Bildschirm ohne 2 × 16 px Rand; was hier passt, passt auch breiter)
document.head.insertAdjacentHTML('beforeend',`<style>#app{width:${BREITE}px!important;max-width:${BREITE}px!important}</style>`);
const over=[],seen=new Set();
function scan(where){const app=$('#app').getBoundingClientRect();
  for(const el of document.querySelectorAll('#app *')){const r=el.getBoundingClientRect();if(!r.width||getComputedStyle(el).visibility==='hidden'||el.closest('.hero'))continue; // Kopfbereich schneidet absichtlich ab
    if(r.right>app.right+1||r.left<app.left-1){const k=where+' | '+(el.id?'#'+el.id:el.className.baseVal!==undefined?el.tagName:(el.tagName.toLowerCase()+'.'+el.className));if(!seen.has(k)){seen.add(k);over.push(k+' | '+(el.textContent||'').slice(0,70))}}}}
const kinds=[];
function play(gen,n,label){for(let r=0;r<n;r++){const q=gen();if(!q)continue;start(q.isl||G?.topic||'mix');G.queue=[q,Object.assign({},q)];G.total=2;show();scan(label+' Frage '+(q.sub||q.kind));
  const k=q.kind;
  if(k==='num'||k==='money'||k==='type'){$('#ti').value='x';$('#tf').requestSubmit?$('#tf').requestSubmit():$('#tf').onsubmit({preventDefault(){}});scan(label+' Eingabefehler '+(q.sub||k));
    $('#ti').value=k==='money'?'999999,99':k==='num'?'999999999':'zzz';answer(null,$('#ti').value)}
  else if(k==='build'){answer(null,'falsch')}
  else solveWrong(q);
  scan(label+' falsch beantwortet '+(q.sub||k));}}
if(typeof AUFG!=='undefined'){ // Deutsch
  for(const [isl,o] of Object.entries(AUFG))for(const sub of Object.keys(o))play(()=>gen(isl,sub),4,'Deutsch '+isl);
  start('check');let g=0;while(!$('.end')&&g++<80){solveWrong(G.queue[0]);$('#nx').click()}
  scan('Deutsch Ende Ich-kann-Check');
  home();$('#gh').click();scan('Häfen');hafenA(null);scan('Häfen Fehler');
  home();$('#gd').click();scan('Detektiv');$$('.dgap').forEach(b=>{b.click();b.click()});scan('Detektiv alle ?');$('#bp').click();scan('Detektiv geprüft');
  home();$('#gl').click();for(let k=0;k<LEITER_N-1;k++){leiterA(0);leiterWeiter();X.lives=3}scan('Leiter lang');
  home();$('#gm').click();scan('Memory-Auswahl');memoStart('silben',10);$$('.card').forEach((b,i)=>b.textContent=M.cards[i].t);scan('Memory Silben aufgedeckt');home();
}else if(typeof SUB!=='undefined'){ // Mathe
  for(const [isl,o] of Object.entries(SUB))for(const sub of Object.keys(o))play(()=>gen(isl,sub),sub==='wort2zahl'||sub==='zahl2wort'||sub==='runden'?15:3,'Mathe '+isl); // lange Zahlwörter öfter
  start('check');let g=0;while(!$('.end')&&g++<80){const q=G.queue[0];if(q.kind==='mc')answer((q.options.indexOf(q.correct)+1)%q.options.length);else if(q.kind==='widget'){if(q.w==='bars')WS.set(0,q.step);else WS.put(q.i===1?2:1);answer(null,null)}else answer(null,q.kind==='build'?'x':'999999999');$('#nx').click()}
  scan('Mathe Ende Ich-kann-Check');
}else if(typeof qGap!=='undefined'){ // Pronomen
  for(const t of TOPICS)play(()=>makeQ(t.id),15,'Pronomen '+t.id);
  start('mix');let g=0;while(!$('.end')&&g++<60){const q=G.queue[0];if(q.kind==='type')answer(null,'zzz');else if(q.kind==='build')answer(null,'x');else answer((q.options.indexOf(q.correct)+1)%q.options.length);$('#nx').click()}scan('Pronomen Ende');
}else{ // Vokabeln (eigener Ablauf)
  for(const t of TOPICS){for(let r=0;r<12;r++){start(t.id);const q=G.queue[0];scan('Vokabeln Frage '+t.id);
    if(kindOf(q)==='type')answer(null,'zzz');else if(kindOf(q)==='build')answer(null,'x');else answer((q.options.indexOf(q.correct)+1)%q.options.length);scan('Vokabeln falsch '+t.id)}}
}
home();scan('Startseite');
over.forEach(P);A(`nichts läuft über den Rand (${BREITE} px)`,over.length===0);done();
