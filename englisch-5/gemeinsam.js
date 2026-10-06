/* Gemeinsame Teile der Englisch-5-Missionen: Hilfen, Stimme, Hell/Dunkel, Seekarte, Memory, Tastatur.
   Die Seite selbst legt fest: BRAND, TOPICS, save/persist, home(), und ihre eigenen Fragen. */
// Ränge: der Abstand wächst jedes Mal um 100 Punkte (eine gute Runde bringt etwa 120 bis 165).
// Nach dem letzten Rang geht es endlos weiter, alle LEGEND Punkte eine neue Stufe.
const RANKS=[[0,'Leichtmatrose'],[100,'Matrose'],[300,'Bootsmann/-frau'],[600,'Steuermann/-frau'],[1000,'Navigator/in'],[1500,'Offizier/in'],[2100,'Kapitän/in'],
 [2800,'Flottenkapitän/in'],[3600,'Kommodore'],[4500,'Konteradmiral/in'],[5500,'Vizeadmiral/in'],[6600,'Admiral/in'],[7800,'Großadmiral/in'],[9100,'Legende der sieben Meere']];
const LEGEND=1500;
const ROUND=10, BLITZ=60, PAIRS=6;
const CHEER=['Richtig!','Super!','Genau!','Stark!','Yes!','Perfekt!','Great!'];
const OOPS=['Fast!','Nicht schlimm.','Merk dir das gut.','Beim nächsten Mal klappt es.'];

/* ---------- Hilfen ---------- */
const $=s=>document.querySelector(s);
const esc=t=>String(t).replace(/[&<>"]/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;'}[c]));
const shuffle=a=>{a=a.slice();for(let i=a.length-1;i>0;i--){const j=Math.floor(Math.random()*(i+1));[a[i],a[j]]=[a[j],a[i]]}return a};
const norm=t=>t.replace(/[‘’´`]/g,"'").replace(/[.!?]+$/,'').replace(/\s+/g,' ').trim();
const pick=a=>a[Math.floor(Math.random()*a.length)];
const LAST=RANKS.length-1;
function level(xp=save.xp){if(xp>=RANKS[LAST][0])return LAST+Math.floor((xp-RANKS[LAST][0])/LEGEND);let i=0;RANKS.forEach((r,k)=>{if(xp>=r[0])i=k});return i}
const levelName=L=>L<=LAST?RANKS[L][1]:`${RANKS[LAST][1]} · Stufe ${L-LAST+1}`;
const levelStart=L=>L<=LAST?RANKS[L][0]:RANKS[LAST][0]+(L-LAST)*LEGEND;
const lvl=()=>Math.max(level(),save.rk||0); // save.rk: höchster je erreichter Rang, niemand wird herabgestuft
function rank(){return levelName(lvl())}
function rankBar(){const L=lvl(),a=levelStart(L),b=levelStart(L+1),p=Math.max(0,Math.min(100,(save.xp-a)/(b-a)*100));
  return `<div class="rbar" role="progressbar" aria-label="Fortschritt zum nächsten Rang" aria-valuenow="${Math.round(p)}" aria-valuemax="100"><i style="width:${p}%"></i></div><p class="rnext">Noch ${Math.max(0,b-save.xp)} Punkte bis ${esc(levelName(L+1))}</p>`}
function rankUp(){const L=level();if(L>(save.rk||0)){save.rk=L;persist();return `<p class="treasure pop">⚓ Neuer Rang: ${esc(levelName(L))}!</p>`}return ''}
// Einmalig beim Laden: Wer nach der alten, kürzeren Rangliste schon weiter war, behält seinen Rang.
function initRank(){if(save.rk!==undefined)return;const old=[0,100,300,600,1000],map=[0,1,3,6,11];let i=0;old.forEach((t,k)=>{if(save.xp>=t)i=k});save.rk=map[i]}
function starsHtml(n){return '<span class="stars">'+[1,2,3].map(i=>i<=n?'<b>★</b>':'★').join('')+'</span>'}
const boat='<svg viewBox="0 0 34 30" aria-hidden="true"><path d="M17 2v18" stroke="currentColor" stroke-width="2"/><path d="M18 3l11 15H18z" fill="#ffc93c"/><path d="M3 21h28l-5 7H8z" fill="#ff5a4e"/></svg>';
const hero='<svg viewBox="0 0 130 90" aria-hidden="true"><path d="M0 62q16-14 32 0t32 0 32 0 34 0v28H0z" fill="#ffffff" opacity=".28"/><path d="M0 74q16-14 32 0t32 0 32 0 34 0v16H0z" fill="#ffffff" opacity=".4"/><path d="M62 10v34" stroke="#fff" stroke-width="3"/><path d="M65 12l30 30H65z" fill="#ffc93c"/><path d="M40 48h70l-12 16H52z" fill="#ff5a4e"/></svg>';
const chest=(x,y)=>`<g transform="translate(${x} ${y})" aria-hidden="true"><rect y="5" width="18" height="11" rx="2" fill="#a0522d"/><path d="M0 7Q9-2 18 7z" fill="#7a3b17"/><rect x="7.5" y="7" width="3" height="5" fill="#ffc93c"/></g>`;
const flag=(x,y)=>`<g transform="translate(${x} ${y})" aria-hidden="true"><path d="M0 0v17" class="pole"/><path d="M1 1h11l-3 4 3 4H1z" fill="#ff5a4e"/></g>`;
// Wörter für Satzbaukasten: Satzzeichen und "..." als eigene Kärtchen
const toks=s=>s.match(/\.\.\.|[\wÀ-ÿ'’\/]+|[?!.,]/g)||[];
function scramble(t){let s=t;for(let i=0;i<10&&s.join(' ')===t.join(' ');i++)s=shuffle(t);return s}

/* ---------- Stimme ---------- */
// Nur Stimmen, die auf dem Gerät selbst laufen (localService). Online-Stimmen (z. B. "Google ..." in Chrome) würden den Text an fremde Server schicken.
let VOICE=null;
// Apple liefert auch Spaß-Stimmen mit (singend, flüsternd, Roboter), die fürs Lernen nicht taugen.
const ODD=/^(Albert|Bad News|Bahh|Bells|Boing|Bubbles|Cellos|Deranged|Good News|Hysterical|Jester|Junior|Organ|Pipe Organ|Ralph|Fred|Kathy|Superstar|Trinoids|Whisper|Wobble|Zarvox)\b/i;
function pickVoice(){
  try{
    const score=v=>(/^en[-_]GB/i.test(v.lang)?4:/^en[-_](US|IE|AU)/i.test(v.lang)?2:0)+(/Enhanced|Premium|verbessert/i.test(v.name)?3:0)+(v.default?1:0);
    const vs=speechSynthesis.getVoices().filter(v=>v.localService&&/^en[-_]/i.test(v.lang)&&!ODD.test(v.name));
    VOICE=vs.sort((a,b)=>score(b)-score(a))[0]||null;
  }catch(e){VOICE=null}
}
if('speechSynthesis' in window){pickVoice();speechSynthesis.onvoiceschanged=()=>{const had=!!VOICE;pickVoice();if(!had&&VOICE&&$('#nm')&&document.activeElement.id!=='nm')home()}}
const canSpeak=()=>!!VOICE&&save.sound;
function say(t,slow){
  if(!canSpeak())return;
  try{if(speechSynthesis.speaking)speechSynthesis.cancel();const u=new SpeechSynthesisUtterance(t.replace(/\.\.\./g,' ').replace(/\//g,', '));u.voice=VOICE;u.lang=VOICE.lang;u.rate=slow?.55:.9;speechSynthesis.speak(u)}catch(e){}
}

/* ---------- Ansichten ---------- */
let G=null, B=null, M=null; // laufende Runde, Blitzrunde, Memory
// ponytail: Export mit Lösungen nur über den Eltern-Link (#eltern), schützt vor Neugier, nicht vor Quelltext-Lesern. Bewusst nicht gespeichert, damit es auf dem Kindergerät nicht hängen bleibt.
const PARENT=location.hash==='#eltern';
function themeBtn(){return '<button class="theme" id="tg" aria-label="Hell oder dunkel wechseln">hell / dunkel</button>'}
function bindTheme(){const b=$('#tg');if(!b)return;b.onclick=()=>{const r=document.documentElement;const dark=r.dataset.theme?r.dataset.theme==='dark':matchMedia('(prefers-color-scheme: dark)').matches;r.dataset.theme=dark?'light':'dark'}}
const topBar=()=>`<div class="top"><span class="brand">${BRAND}</span>${themeBtn()}</div>`;
function seaMap(P,h=222){ // P: Inselpositionen in der Reihenfolge von TOPICS
  // Inseln im Zickzack entlang einer Route. Drei Sterne = Schatztruhe, ein oder zwei = Fähnchen. Das Boot wartet an der ersten Insel ohne Schatz.
  const next=TOPICS.findIndex(t=>(save.best[t.id]||0)<3);
  const isl=TOPICS.map((t,i)=>{const [x,y]=P[i],n=save.best[t.id]||0;
    return `<g class="isl" data-t="${t.id}" tabindex="0" role="button" aria-label="${t.name}, ${n} von 3 Sternen">
     <ellipse class="sand" cx="${x}" cy="${y}" rx="25" ry="11"/><ellipse class="green" cx="${x-5}" cy="${y-3}" rx="12" ry="5"/>
     ${n>=3?chest(x-14,y-20):n>0?flag(x-12,y-22):''}<text x="${x}" y="${y+23}">${esc(t.map)}</text></g>`}).join('');
  // Markierung links auf der Insel, Boot rechts daneben (an einer Insel mit Schatz steht nie das Boot)
  const b=next>=0?boat.replace('<svg',`<svg x="${P[next][0]+2}" y="${P[next][1]-26}" width="26" height="23" class="mapboat"`):'';
  return `<svg class="map" viewBox="0 0 340 ${h}" role="group" aria-label="Seekarte"><rect class="sea" width="340" height="${h}" rx="18"/>
   <path class="route" d="M${P.map(p=>p.join(' ')).join(' L')}"/>${isl}${b}</svg>`;
}
/* ---------- Memory: Paare {a,b}; a ist Englisch und wird beim Aufdecken vorgelesen. again() startet ein neues Spiel. ---------- */
function memoryGame(pairs,again,intro){
  G=null;if(B){clearTimeout(B.timer);B=null}
  M={again,tries:0,open:[],found:0,pairs:pairs.length,lock:false,cards:shuffle(pairs.flatMap(e=>[{e,t:e.a,en:true},{e,t:e.b,en:false}]))};
  $('#app').innerHTML=`<div class="q-head"><button class="back" id="bk" aria-label="Memory beenden">Ende</button><span class="brand" style="flex:1;text-align:center">Memory</span><span class="pill" id="mt">0 Züge</span></div>
   <p class="tip" style="margin:0 0 12px">${esc(intro)}</p>
   <div class="memo" role="group" aria-label="Karten, mit Pfeiltasten wählen">${M.cards.map((c,i)=>`<button class="card nav" data-i="${i}" aria-label="Verdeckte Karte">?</button>`).join('')}</div>`;
  $('#bk').onclick=home;
  document.querySelectorAll('.card').forEach(b=>b.onclick=()=>flip(b));
}
function flip(b){
  const c=M&&M.cards[+b.dataset.i];
  if(!c||M.lock||c.found||M.open.includes(b))return;
  b.textContent=c.t;b.classList.add('up');b.setAttribute('aria-label',c.t);if(c.en)say(c.t);
  M.open.push(b);if(M.open.length<2)return;
  M.tries++;$('#mt').textContent=M.tries+(M.tries===1?' Zug':' Züge');
  const [x,y]=M.open.map(o=>M.cards[+o.dataset.i]);
  if(x.e===y.e){x.found=y.found=true;M.open.forEach(o=>{o.classList.add('found');o.disabled=true});M.open=[];if(++M.found===M.pairs)setTimeout(memoEnd,700)}
  else{M.lock=true;setTimeout(()=>{if(!M)return;M.open.forEach(o=>{o.textContent='?';o.classList.remove('up');o.setAttribute('aria-label','Verdeckte Karte')});M.open=[];M.lock=false},1100)}
}
function memoEnd(){
  if(!M)return;const r=M;M=null;
  const gain=10+r.pairs*2,rec=!save.memo||r.tries<save.memo;if(rec)save.memo=r.tries;save.xp+=gain;persist();
  $('#app').innerHTML=`${topBar()}
  <div class="qcard end"><h2>${rec?'Neuer Rekord!':'Alle Paare gefunden!'}</h2>
   <div class="bignum pop">${r.tries}</div><p>Züge für ${r.pairs} Paare</p>${rankUp()}
   <div class="stats"><span class="pill">Rekord: ${save.memo} Züge</span><span class="pill sun">+${gain} Punkte</span></div>
   <div class="mist"><h3>Deine Paare</h3><ul>${[...new Set(r.cards.map(c=>c.e))].map(e=>`<li><b>${esc(e.a)}</b> = ${esc(e.b)}</li>`).join('')}</ul></div>
   <div class="actions"><button class="btn" id="again">Nochmal</button><button class="btn ghost" id="hm">Zur Seekarte</button></div></div>`;
  bindTheme();$('#again').onclick=r.again;$('#hm').onclick=home;$('#again').focus();
}
/* ---------- Tastatur ---------- */
document.addEventListener('keydown',ev=>{
  // Pfeiltasten wandern durch Antworten, Satzwörter und Memory-Karten (rundherum); Enter/Leertaste wählt wie bei jedem Knopf
  const os=[...document.querySelectorAll('.nav:not(:disabled)')];
  if(os.length&&/^Arrow(Up|Down|Left|Right)$/.test(ev.key)&&document.activeElement.tagName!=='INPUT'){
    const i=os.indexOf(document.activeElement),d=/Up|Left/.test(ev.key)?-1:1;
    ev.preventDefault();os[i<0?(d>0?0:os.length-1):(i+d+os.length)%os.length].focus();return;
  }
  if(!G||!G.answered)return;
  if(ev.key==='Enter'){const b=$('#nx');if(b&&document.activeElement!==b&&document.activeElement.id!=='say'){ev.preventDefault();b.click()}}
});
