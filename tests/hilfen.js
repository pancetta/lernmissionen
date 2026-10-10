// Gemeinsame Hilfen für alle Tests. tests/lauf.py setzt diese Datei vor die Tests einer Seite.
// Mehrere Tests laufen nacheinander in derselben Seite; CUR ist der Name des gerade laufenden Tests.
let CUR='';const R_={},probs=[];probs.n=0;
const A=(name,ok)=>{R_[CUR+' › '+name]=ok?'ok':'FEHLER'};          // Prüfung festhalten
const P=t=>{probs.n++;if(probs.length<30)probs.push(CUR+' › '+t)};  // Einzelfund (erste 30 werden angezeigt)
const done=()=>{};                                                   // Ende eines Tests (Bericht schreibt __bericht)
const __bericht=()=>{document.title='R:'+JSON.stringify({err:ERR,R:R_,probs,np:probs.n})};
const $$=s=>[...document.querySelectorAll(s)];
const box=document.createElement('div');
const txt=h=>{box.innerHTML=h;return box.textContent.replace(/ /g,'').replace(/\s+/g,' ').trim()};
const taste=(el,k)=>el.dispatchEvent(new KeyboardEvent('keydown',{key:k,bubbles:true,cancelable:true}));
const ptr=(el,type,x,y)=>el.dispatchEvent(new PointerEvent(type,{clientX:x,clientY:y,pointerId:1,bubbles:true,cancelable:true}));
const client=(svg,x,y)=>{const r=svg.getBoundingClientRect(),vb=svg.viewBox.baseVal;return [r.left+x*r.width/vb.width,r.top+y*r.height/vb.height]};
// Headless-Chrome hat keine Stimme: eine vortäuschen, damit auch Hör-Fragen vorkommen (Mathe liest nie vor)
if(typeof VOICE!=='undefined'&&typeof SUB==='undefined'){VOICE={name:'Test',lang:'en-GB',localService:true};save.sound=true}
const kindOfQ=q=>q.kind||(q.type?'type':'mc');                        // alte Vokabel-Runden kennen nur type/mc
function solve(q){ // aktuelle Frage richtig beantworten, egal welche Mission und Frageart
  const k=kindOfQ(q);
  if(k==='widget'){q.w==='bars'?q.vals.forEach((v,i)=>WS.set(i,v)):WS.put(q.i);return answer(null,null)}
  if(k==='alle')return answer(null,q.hits.join(','));
  if(k==='num')return answer(null,String(q.ans));
  if(k==='money')return answer(null,euro(q.ans));
  if(k==='type')return answer(null,q.accept?q.accept[0]:enShow(q.e));
  if(k==='build')return answer(null,q.target||toks(enShow(q.e)).join(' '));
  return answer(q.options.indexOf(q.correct));
}
function solveWrong(q){ // aktuelle Frage falsch beantworten
  const k=kindOfQ(q);
  if(k==='widget'){q.w==='bars'?WS.set(0,q.vals[0]===q.step?2*q.step:q.step):WS.put(q.i===1?2:1);return answer(null,null)}
  if(k==='alle')return answer(null,q.hits.slice(1).join(','));
  if(k==='num')return answer(null,String(q.ans+1));
  if(k==='money')return answer(null,euro(q.ans+1));
  if(k==='type')return answer(null,'zzz');
  if(k==='build')return answer(null,'falsch');
  return answer((q.options.indexOf(q.correct)+1)%q.options.length);
}
function perfect(topic,queue){ // eine Runde fehlerfrei spielen; liefert Sterne und vorgekommene Fragearten
  save.best={};start(topic);if(queue){G.queue=queue;G.total=queue.length;show()}
  const kinds=new Set();let g=0;
  while(G&&$('.qcard')&&!$('.end')&&g++<150){const q=G.queue[0];kinds.add(kindOfQ(q));solve(q);$('#nx').click()}
  return {stars:save.best[topic]||0,kinds:[...kinds]};
}
