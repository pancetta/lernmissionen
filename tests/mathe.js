// Mathe-Inseln: jede Aufgabenart wird aus der angezeigten Aufgabe unabhängig nachgerechnet; dazu Eingaben, Runden, Check, Spiele
const num=s=>+String(s).replace(/[\s .]/g,'');
const cents=s=>{s=s.replace(/\s|€/g,'');const m=s.match(/^(\d+),(\d\d)$/);return m?+m[1]*100+ +m[2]:null};
const MM={mm:1,cm:10,dm:100,m:1000,km:1e6};
const len=s=>{let t=0;for(const m of s.replace(/ /g,'').matchAll(/(\d+) (mm|cm|dm|km|m)\b/g))t+=+m[1]*MM[m[2]];return t};

/* 1) Zahlwörter: bekannte Beispiele und Rückübersetzung mit eigenem Parser */
const KNOWN=[[1079252849,'eine Milliarde neunundsiebzig Millionen zweihundertzweiundfünfzigtausendachthundertneunundvierzig'],[1,'eins'],[21,'einundzwanzig'],[101,'einhunderteins'],[1000,'eintausend'],[1001,'eintausendeins'],
 [16,'sechzehn'],[17,'siebzehn'],[70,'siebzig'],[30,'dreißig'],[1e6,'eine Million'],[2e6,'zwei Millionen'],[1000001,'eine Million eins'],[21e6,'einundzwanzig Millionen'],[101000,'einhunderteintausend'],[1e9,'eine Milliarde'],[3400070,'drei Millionen vierhunderttausendsiebzig'],[999999,'neunhundertneunundneunzigtausendneunhundertneunundneunzig']];
A('Zahlwörter: bekannte Beispiele',KNOWN.every(([n,w])=>{const ok=words(n)===w;if(!ok)P(`words(${n}) = ${words(n)}`);return ok}));
const TOK=/(dreizehn|vierzehn|fünfzehn|sechzehn|siebzehn|achtzehn|neunzehn|zwanzig|dreißig|vierzig|fünfzig|sechzig|siebzig|achtzig|neunzig|zehn|elf|zwölf|eins|ein|zwei|drei|vier|fünf|sechs|sieben|acht|neun|hundert|tausend|und)/g;
const V={eins:1,ein:1,zwei:2,drei:3,vier:4,fünf:5,sechs:6,sieben:7,acht:8,neun:9,zehn:10,elf:11,zwölf:12,dreizehn:13,vierzehn:14,fünfzehn:15,sechzehn:16,siebzehn:17,achtzehn:18,neunzehn:19,zwanzig:20,dreißig:30,vierzig:40,fünfzig:50,sechzig:60,siebzig:70,achtzig:80,neunzig:90};
function low(s){if(s.replace(TOK,'')!=='')return NaN;let tot=0,cur=0;for(const t of s.match(TOK)){if(t==='und')continue;if(t==='hundert')cur=(cur||1)*100;else if(t==='tausend'){tot+=(cur||1)*1000;cur=0}else cur+=V[t]}return tot+cur}
function parseWords(s){let tot=0;const w=s.split(' ');for(let i=0;i<w.length;i++){const nx=w[i+1]||'';const k=/^Milliarde/.test(nx)?1e9:/^Million/.test(nx)?1e6:0;
  if(k){tot+=(w[i]==='eine'?1:low(w[i]))*k;i++}else tot+=low(w[i])}return tot}
let wbad=0;for(let i=0;i<4000;i++){const n=i<2000?bigNum():R(1,999999);if(parseWords(words(n))!==n){wbad++;P(`Rückübersetzung ${n}: ${words(n)}`)}}
A('Zahlwörter: 4000 Zufallszahlen fehlerfrei rückübersetzt',wbad===0);

/* 2) Jede Aufgabe einzeln nachrechnen */
const N=200;
function each(isl,sub,f){for(let i=0;i<N;i++){const q=gen(isl,sub);try{const r=f(q,txt(q.html));if(r!==true)P(`${isl}.${sub}: ${r} | ${txt(q.html)} | ans=${q.ans} correct=${q.correct}`)}catch(e){P(`${isl}.${sub}: Ausnahme ${e.message} | ${txt(q.html)}`)}
  if(q.options&&(new Set(q.options).size!==q.options.length||!q.options.includes(q.correct)))P(`${isl}.${sub}: Optionen ${q.options}`);
  if(['num','money'].includes(q.kind)&&!(Number.isInteger(q.ans)&&q.ans>=0))P(`${isl}.${sub}: ans ${q.ans}`)}}
function geomOk(h){box.innerHTML=h;const svg=box.querySelector('svg.chart'),mx=+svg.dataset.max;return [...svg.querySelectorAll('rect.bar')].every(r=>{const p=+r.dataset.p,v=+r.dataset.v,horiz=r.getAttribute('x')==='74',size=horiz?+r.getAttribute('width'):+r.getAttribute('height');return Math.abs(size-p*v/mx)<0.01})}
const vals=h=>{box.innerHTML=h;return [...box.querySelector('svg.chart').querySelectorAll('rect.bar')].map(r=>+r.dataset.v)};
const shorts=h=>{box.innerHTML=h;const svg=box.querySelector('svg.chart');const t=[...svg.querySelectorAll('text')].map(x=>x.textContent).filter(x=>!/^[\d ]+$/.test(x));return t};
each('diagramm','ablesen',(q,t)=>{if(!geomOk(q.html))return 'Säulenhöhe passt nicht zum Wert';const c=CHARTS.find(c=>c.cats.some(k=>t.includes(c.ask(k))));const k=c.cats.find(k=>t.includes(c.ask(k)));const i=shorts(q.html).indexOf(c.short[c.cats.indexOf(k)]);return vals(q.html)[i]===q.ans||'falscher Wert'});
each('diagramm','unterschied',(q,t)=>{const m=t.match(/bei „(.+?)“ als bei „(.+?)“/),s=shorts(q.html),v=vals(q.html);return v[s.indexOf(m[1])]-v[s.indexOf(m[2])]===q.ans&&q.ans>0||'Differenz'});
each('diagramm','summe',(q,t)=>vals(q.html).reduce((a,b)=>a+b,0)===q.ans||'Summe');
each('diagramm','extrem',(q,t)=>{const v=vals(q.html),s=shorts(q.html),mx=/größten/.test(t),x=mx?Math.max(...v):Math.min(...v);return v.filter(y=>y===x).length===1&&s[v.indexOf(x)]===q.correct||'Extremwert'});
each('diagramm','strich',(q,t)=>{box.innerHTML=q.html;const k=t.match(/Wie oft wurde „(.+?)“/)[1],row=[...box.querySelectorAll('tr')].find(r=>r.cells[0].textContent===k);return row.querySelectorAll('line').length===q.ans||'Striche'});
each('diagramm','passt',(q,t)=>{box.innerHTML=q.html;const tv=[...box.querySelectorAll('.vt td')].map(x=>num(x.textContent));const ok=q.options.filter(o=>{box.innerHTML=o;return [...box.querySelectorAll('rect.bar')].map(r=>+r.dataset.v).join()===tv.join()});return ok.length===1&&ok[0]===q.correct||'nicht genau ein passendes Diagramm'});
each('strahl','pfeil',(q,t)=>{box.innerHTML=q.html;const svg=box.querySelector('svg'),lab=[...svg.querySelectorAll('text')].map(x=>num(x.textContent)),st=(lab[1]-lab[0])/10,ax=+svg.querySelector('.arrowline').getAttribute('x1'),i=Math.round((ax-30)/13);return lab[0]+i*st===q.ans&&lab[2]-lab[1]===lab[1]-lab[0]||'Pfeil'});
each('strahl','nachbar',(q,t)=>{const n=num(t.match(/von ([\d ]+)\?/)[1]);return (/Vorgänger/.test(t)?n-1:n+1)===q.ans||'Nachbar'});
each('strahl','ordnen',(q,t)=>{const up=/kleinsten/.test(q.label),s=q.tiles.slice().sort((a,b)=>up?num(a)-num(b):num(b)-num(a));return s.join(' ')===q.target||'Reihenfolge'});
each('strahl','vergleich',(q,t)=>{const m=t.match(/^([\d ]+) ● ([\d ]+)$/),a=num(m[1]),b=num(m[2]);return (a<b?'<':a>b?'>':'=')===q.correct||'Vergleich'});
each('strahl','mitte',(q,t)=>{const m=t.match(/zwischen ([\d ]+) und ([\d ]+)\?/);return (num(m[1])+num(m[2]))/2===q.ans||'Mitte'});
each('gross','wort2zahl',(q,t)=>parseWords(t)===q.ans||'Zahlwort');
each('gross','zahl2wort',(q,t)=>{const n=num(t);return parseWords(q.correct)===n&&q.options.filter(o=>parseWords(o)===n).length===1||'Wort-Option'});
each('gross','runden',(q,t)=>{const m=t.match(/Runde ([\d ]+) auf (\S+)\./),n=num(m[1]),p=PLACES.find(x=>x[0]===m[2])[1];return Math.floor((n+p/2)/p)*p===q.ans||'Runden'});
each('gross','stelle',(q,t)=>{const m=t.match(/in ([\d ]+) an der (\S+?)stelle/),n=num(m[1]),p=PLACES.find(x=>x[0]===m[2])[1];return Math.floor(n/p)%10===q.ans||'Stelle'});
each('gross','tafel',(q,t)=>{const s=t.split('? ')[1];let n=0;for(const part of s.split(', ')){const [v,...nm]=part.split(' '),name=nm.join(' '),p=name.startsWith('Million')?1e6:PLACES.find(x=>x[0]===name)[1];n+=+v*p}return n===q.ans||'Stellenwerttafel'});
const REAL={'Wie viele Nullen hat eine Million?':'6','Wie viele Nullen hat eine Milliarde?':'9','Wie viele Nullen hat eine Billion?':'12','Wie viele Tausender ergeben eine Million?':'1000','Wie viele Millionen ergeben eine Milliarde?':'1000','Was kommt nach der Million?':'Milliarde'};
each('gross','fakten',(q,t)=>REAL[t]===q.correct||'Fakt');
const calc=(a,op,b)=>({'+':a+b,'−':a-b,'·':a*b,':':a/b})[op];
each('fach','worte',(q,t)=>{let m,r;
  if(m=t.match(/^Bilde die Summe aus (\d+) und (\d+)\.$/))r=+m[1]+ +m[2];else if(m=t.match(/^Addiere (\d+) und (\d+)\.$/))r=+m[1]+ +m[2];
  else if(m=t.match(/^Bilde die Differenz aus (\d+) und (\d+)\.$/))r=m[1]-m[2];else if(m=t.match(/^Subtrahiere (\d+) von (\d+)\.$/))r=m[2]-m[1];
  else if(m=t.match(/^Bilde das Produkt aus (\d+) und (\d+)\.$/))r=m[1]*m[2];else if(m=t.match(/^Multipliziere (\d+) mit (\d+)\.$/))r=m[1]*m[2];
  else if(m=t.match(/^Bilde den Quotienten aus (\d+) und (\d+)\.$/))r=m[1]/m[2];else if(m=t.match(/^Dividiere (\d+) durch (\d+)\.$/))r=m[1]/m[2];else return 'unbekannte Formulierung';
  return r===q.ans&&Number.isInteger(r)&&r>0||'Fachwort-Rechnung'});
const ROLE={'+':['Summand','Summand','Summe'],'−':['Minuend','Subtrahend','Differenz'],'·':['Faktor','Faktor','Produkt'],':':['Dividend','Divisor','Quotient']};
const eq=t=>{const m=t.match(/(\d+) ([+−·:]) (\d+) = (\d+)/);return m&&{a:+m[1],op:m[2],b:+m[3],c:+m[4]}};
each('fach','begriff',(q,t)=>{const e=eq(t),x=+t.match(/die Zahl (\d+) in/)[1];if(calc(e.a,e.op,e.b)!==e.c)return 'Rechnung falsch';const names=[];if(x===e.a)names.push(ROLE[e.op][0]);if(x===e.b)names.push(ROLE[e.op][1]);if(x===e.c)names.push(ROLE[e.op][2]);
  return names.length===1&&names[0]===q.correct&&q.options.filter(o=>o===names[0]).length===1||'Begriff'});
each('fach','ergebnis',(q,t)=>({'Addition':'Summe','Subtraktion':'Differenz','Multiplikation':'Produkt','Division':'Quotient'})[t.match(/einer (\S+)\?/)[1]]===q.correct||'Ergebnisname');
each('fach','fehler',(q,t)=>{const e=eq(t);if(calc(e.a,e.op,e.b)!==e.c)return 'Rechnung falsch';let truth,m;
  if(m=t.match(/(Die|Das|Der) (Summe|Differenz|Produkt|Quotient) der Zahlen (\d+) und (\d+) ist (\d+)\./))truth=ROLE[e.op][2]===m[2];
  else if(m=t.match(/(Der|Ein) (\S+) dieser Aufgabe ist (\d+)\./)){const x=+m[3];truth=(x===e.a&&ROLE[e.op][0]===m[2])||(x===e.b&&ROLE[e.op][1]===m[2])}else return 'unbekannte Aussage';
  return (truth?'Stimmt':'Stimmt nicht')===q.correct||'Wahrheitswert'});
each('fach','inworte',(q,t)=>{const m=t.match(/^(\d+) ([+−·:]) (\d+)$/),n={'+':'Summe','−':'Differenz','·':'Produkt',':':'Quotient'}[m[2]];return q.correct.includes(n)&&q.correct.includes(`aus ${m[1]} und ${m[3]}`)||'in Worten'});
function solveKlecks(t){const m=t.match(/^(●|\d+) ([+−·:]) (●|\d+) = (\d+)$/);const a=m[1],op=m[2],b=m[3],c=+m[4];
  if(a==='●')return {'+':c-b,'−':c+ +b,'·':c/b,':':c*b}[op];return {'+':c-a,'−':a-c,'·':c/a,':':a/c}[op]}
each('klecks','klecks',(q,t)=>{const x=solveKlecks(t);return x===q.ans&&Number.isInteger(x)&&x>0||'Klecks'});
each('klecks','umkehr',(q,t)=>{const x=solveKlecks(t);return ev(q.correct)===x&&q.options.filter(o=>ev(o)===x).length===1||'Umkehraufgabe nicht eindeutig'});
each('klecks','mauer',(q,t)=>{box.innerHTML=q.html;const rows=[...box.querySelectorAll('.mrow')].map(r=>[...r.children].map(b=>b.textContent==='?'?null:num(b.textContent)));const mult=/Produkt/.test(t),f=mult?(x,y)=>x*y:(x,y)=>x+y;
  const fill=(v)=>{const r=rows.map(x=>x.slice());for(const[i,j]of [[0,0],[1,0],[1,1],[2,0],[2,1],[2,2]])if(r[i][j]===null)r[i][j]=v;return r};const r=fill(q.ans);
  return r[1][0]===f(r[2][0],r[2][1])&&r[1][1]===f(r[2][1],r[2][2])&&r[0][0]===f(r[1][0],r[1][1])||'Mauer'});
each('geld','inCent',(q,t)=>{const s=t.replace(' = ?','');const m=s.match(/^(\d+) € (\d+) ct$/);return (m?+m[1]*100+ +m[2]:cents(s))===q.ans||'in Cent'});
each('geld','inEuro',(q,t)=>+t.match(/^(\d+) ct/)[1]===q.ans||'in Euro');
each('geld','ordnen',(q,t)=>{const v=x=>{let m;return (m=x.match(/^(\d+) € (\d+) ct$/))?+m[1]*100+ +m[2]:(m=x.match(/^(\d+) ct$/))?+m[1]:cents(x)};return q.tiles.slice().sort((a,b)=>v(a)-v(b)).join(' ')===q.target||'Geld ordnen'});
each('geld','wechsel',(q,t)=>{const m=t.match(/kostet ([\d,]+ €)\. Bezahlt wird mit einem (\d+)-€-Schein/);const c=cents(m[1]);return +m[2]*100-c===q.ans&&q.ans>0&&+m[2]*100-c<+m[2]*100||'Wechselgeld'});
each('geld','kasse',(q,t)=>{box.innerHTML=q.html;const s=[...box.querySelectorAll('tr:not(.sum) td:last-child')].map(x=>cents(x.textContent)).reduce((a,b)=>a+b,0);return s===q.ans||'Kassenzettel'});
each('geld','reicht',(q,t)=>{box.innerHTML=q.html;const s=[...box.querySelectorAll('td:last-child')].map(x=>cents(x.textContent)).reduce((a,b)=>a+b,0),b=+t.match(/hast (\d+) €/)[1]*100;return (s<=b?'Ja, das reicht.':'Nein, das reicht nicht.')===q.correct&&Math.abs(s-b)>=150||'Reicht'});
each('geld','wieviele',(q,t)=>{const m=t.match(/kostet (\d+) ct.*für (\d+) €/);return Math.floor(m[2]*100/m[1])===q.ans||'Wie viele'});
const lenQ=(q,t)=>{const m=t.match(/^(.+?) = \?$/)||t.match(/^(.+?) \(in (\w+)\)$/),u=m[2]||q.unit;return len(m[1])===q.ans*MM[u]||'Länge umrechnen'};
each('laenge','kleiner',lenQ);each('laenge','groesser',lenQ);each('laenge','klammer',lenQ);
each('laenge','vergleich',(q,t)=>{const [l,r]=t.split(' ● ');const a=len(l),b=len(r);return (a<b?'<':a>b?'>':'=')===q.correct&&a>0||'Längen-Vergleich'});
each('laenge','gemischt',(q,t)=>{if(q.kind==='num')return lenQ(q,t);const v=len(t.replace(' = ?',''));return len(q.correct)===v&&q.options.filter(o=>len(o)===v).length===1||'gemischt nicht eindeutig'});
each('laenge','rechnen',(q,t)=>{const m=t.match(/^(.+?) ([+−]) (.+?) = \?$/),r=m[2]==='+'?len(m[1])+len(m[3]):len(m[1])-len(m[3]);return r===q.ans*MM[q.unit]&&r>0||'Längen rechnen'});
each('laenge','ordnen',(q,t)=>q.tiles.slice().sort((a,b)=>len(a)-len(b)).join(' ')===q.target&&new Set(q.tiles.map(len)).size===q.tiles.length||'Längen ordnen');
const covered=new Set(Object.entries(SUB).flatMap(([i,o])=>Object.keys(o).map(k=>i+'.'+k)));
A('alle Aufgabenarten nachgerechnet: keine Fehler',(probs.n||0)===0);

/* 3) Eingaben, Runden, Spiele, Blätter */
A('Eingabe Zahl: 3 400 / 3.400 / 3400',parseNum('3 400')===3400&&parseNum('3.400')===3400&&parseNum('3400')===3400&&parseNum('3,4')===null&&parseNum('abc')===null);
A('Eingabe Geld: 7,22 / 7,22 € / 7.22 / 7 / 0,5',parseMoney('7,22')===722&&parseMoney('7,22 €')===722&&parseMoney('7.22')===722&&parseMoney('7')===700&&parseMoney('0,5')===50&&parseMoney('7,225')===null);
const runs={};for(const t of [...TOPICS.map(t=>t.id),'mix','check'])runs[t]=perfect(t).stars===3;
A('fehlerfreie Runde = 3 Sterne (alle Inseln, Rundfahrt, Check)',Object.values(runs).every(Boolean));
start('check');A('Check hat 14 Aufgaben aus allen 7 Themen',G.total===14&&new Set(G.queue.map(q=>q.isl)).size===7);
let g=0;while(!$('.end')&&g++<100){const q=G.queue[0];g<=2?solveWrong(q):solve(q);$('#nx').click()}
const rows=[...document.querySelectorAll('.cancheck tr')].slice(1).map(r=>r.querySelector('.face').textContent);
A('Check-Tabelle: erstes Thema mit Fehlern 🙁 und Üben-Knopf, Rest 😀',rows.length===7&&rows[0]==='🙁'&&rows.slice(1).every(f=>f==='😀')&&!!document.querySelector('[data-go="diagramm"]'));
start('klecks');let q=G.queue[0];G.queue=[q];G.total=1;show();solveWrong(q);
A('nach Fehler: neue Aufgabe derselben Art',G.queue.length===2&&G.queue[1].sub===q.sub&&G.queue[1].redo===true);
let qq=true;for(let i=0;i<500;i++){const x=quickQ();if(x.kind!=='mc'||new Set(x.options).size!==x.options.length||!x.options.includes(x.correct)||x.options.length<2)qq=false}
A('Blitzrunde: 500 Fragen nur mit eindeutigen Antworten',qq);
home();$('#gb').click();A('Blitz läuft',!!B);blitzEnd();
home();$('#gm').click();const ct=M.cards.map(c=>c.t);A('Memory: 12 eindeutige Karten',ct.length===12&&new Set(ct).size===12);
done();
