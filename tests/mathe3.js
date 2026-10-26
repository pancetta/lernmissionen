// Rechen-Inseln (Mathe 3): jede Aufgabe aus der Anzeige unabhängig nachrechnen; Runden, Check, Spiele
const N=250;
const calc=s=>{const t=s.replace(/·/g,'*').replace(/:/g,'/').replace(/−/g,'-');if(!/^[\d+\-*/() ]+$/.test(t))throw Error('kein Term: '+s);
  const v=Function('return '+t)();if(!Number.isInteger(v))throw Error('nicht ganzzahlig: '+s);return v}; // JavaScript rechnet selbst Punkt vor Strich
const big=h=>{box.innerHTML=h;return box.querySelector('.big').textContent.trim()};
const carry=(a,b,m)=>{const A=String(a).split('').reverse(),C=String(b).split('').reverse();let c=0,n=0; // schriftlich, Stelle für Stelle
  for(let i=0;i<Math.max(A.length,C.length);i++){const x=+(A[i]||0),y=+(C[i]||0)+c;if(m?x<y:x+y>=10){n++;c=1}else c=0}return n};
function each(isl,sub,f){for(let i=0;i<N;i++){const q=gen(isl,sub);try{const r=f(q);if(r!==true)P(`${isl}.${sub}: ${r} | ${q.html.replace(/<[^>]+>/g,' ')} | ${q.correct||q.ans}`)}catch(e){P(`${isl}.${sub}: ${e.message}`)}
  if(q.kind==='mc'&&(new Set(q.options).size!==q.options.length||!q.options.includes(q.correct)||q.options.length<2))P(`${isl}.${sub}: Optionen ${q.options}`)}}
// Rechenaufgaben „… = ?“ und Lücken „… ● … = …“: Lösung einsetzen und nachrechnen, Zahlen bis 1000
const passt=q=>{const t=big(q.html);if(/= \?$/.test(t))return calc(t.replace(/ = \?$/,''))===q.ans||'falsch gerechnet';const [l,r]=t.replace('●',q.ans).split(' = ');return calc(l)===calc(r)||'Lücke falsch'};
for(const [isl,subs] of [['mal',['mal','luecke']],['geteilt',['durch','luecke']],['punkt',['rechnen','klammer']],['plus',['ohne','mit','glatt','luecke']],['minus',['ohne','mit','glatt','luecke']]])
  for(const s of subs)each(isl,s,q=>{const r=passt(q);if(r!==true)return r;return big(q.html).match(/\d+/g).map(Number).concat(q.ans).every(n=>n>=0&&n<=1000)||'Zahlenraum'});
each('mal','mal',q=>big(q.html).match(/\d+/g).slice(0,2).every(n=>n>=2&&n<=10)||'kein kleines Einmaleins');
each('mal','tausch',q=>{const p=calc(big(q.html));return q.options.filter(o=>calc(o)===p).length===1&&q.correct!==big(q.html)||'Tauschaufgabe'});
each('mal','reihe',q=>{box.innerHTML=q.html;const r=+box.textContent.match(/zur (\d+)er.Reihe/)[1];return q.options.filter(o=>o%r!==0).length===1&&q.correct%r!==0&&q.options.every(o=>o%r!==0||o/r<=10)||'Reihe'});
each('geteilt','umkehr',q=>{const [c,b]=big(q.html).match(/\d+/g).map(Number);return q.options.filter(o=>calc(o)===c).length===1&&calc(q.correct)===c&&q.correct.endsWith(' '+b)||'Umkehraufgabe'});
// Rest: c : b = q Rest r stimmt, wenn q · b + r = c und 0 < r < b
const restOk=(c,b,q,r)=>q*b+r===c&&r>0&&r<b,zahlen=t=>t.match(/\d+/g).map(Number);
each('rest','auswahl',q=>{const [c,b]=zahlen(big(q.html)),ok=o=>restOk(c,b,...zahlen(o));return q.options.filter(ok).length===1&&ok(q.correct)||'Rest'});
each('rest','ganz',q=>restOk(...zahlen(big(q.html).replace('●',q.ans)))||'Rest-Lücke');
each('rest','restzahl',q=>restOk(...zahlen(big(q.html).replace('●',q.ans)))||'Rest-Lücke');
each('rest','tippen',q=>{const [c,b]=zahlen(big(q.html));box.innerHTML=q.html;if(q.accept.some(x=>box.querySelector('.tip').textContent.endsWith(' '+x)))return 'Beispiel verrät die Lösung';return q.accept.every(a=>restOk(c,b,...zahlen(a)))&&q.accept.includes(q.correct)||'Rest tippen'});
each('rest','zugross',q=>{const st=q.options.map(zahlen),gross=st.filter(([c,b,x,r])=>r>=b);return st.every(([c,b,x,r])=>x*b+r===c)&&gross.length===1&&zahlen(q.correct)[3]>=zahlen(q.correct)[1]&&st.filter(x=>restOk(...x)).length===3||'Rest zu groß'});
each('rest','ohne',q=>{const ok=o=>{const [c,b]=zahlen(o);return c%b===0};return q.options.filter(ok).length===1&&ok(q.correct)||'ohne Rest'});
each('rest','runden',q=>{box.innerHTML=q.html;const [c,b]=zahlen(box.querySelector('p').textContent),hoch=/braucht man/.test(box.querySelector('b').textContent);
  return c%b>0&&Math.floor(c/b)>=2&&q.ans===(hoch?Math.ceil(c/b):Math.floor(c/b))||'Runden'});
each('rest','sach',q=>{box.innerHTML=q.html;const [c,b]=zahlen(box.textContent);return q.ans===(/voll/.test(box.textContent)?Math.floor(c/b):c%b)&&c%b>0||'Sachaufgabe'});
// Sprache: keine Mehrzahl nach „1“ („1 Eier“), keine Großbuchstaben-Zahl in Überschriften („2ER-REIHE“)
{let ok=true;for(const isl of Object.keys(SUB))for(const sub of Object.keys(SUB[isl]))for(let i=0;i<150;i++){const q=gen(isl,sub),t=(q.html||'').replace(/<[^>]+>/g,' ')+' '+q.sol;
  if(/\b1 (Eier|Äpfel|Kinder|Stifte|Murmeln|Tüten|Gruppen|Dosen|Schachteln|Säckchen|Autos|Tische|Kisten|Hefte|Stücke|Mannschaften)\b/.test(t)||/\d(er|ER)\b/.test(q.label)){ok=false;P(`Sprache ${isl}.${sub}: ${q.label} | ${t}`)}}
 A('Sprache: Einzahl nach 1, keine Zahl mit Endung in der Überschrift',ok)}
each('punkt','zuerst',q=>{const t=big(q.html),punkt=o=>/[·:]/.test(o);return punkt(q.correct)&&q.options.filter(punkt).length===1&&q.options.every(o=>o.split(' und ').every(x=>t.includes(x)))||'Was zuerst?'});
each('punkt','falle',q=>{const [l,r]=big(q.html).split(' = ');return (calc(l)===+r?'Stimmt':'Stimmt nicht')===q.correct||'Stimmt das?'});
for(const isl of ['plus','minus']){const m=isl==='minus',ab=t=>t.match(/\d+/g).map(Number);
  each(isl,'ohne',q=>carry(...ab(big(q.html)),m)===0||'hat einen Übertrag');
  each(isl,'mit',q=>carry(...ab(big(q.html)),m)>0||'hat keinen Übertrag');
  each(isl,'uebertrag',q=>{const c=o=>carry(...ab(o),m)>0;return q.options.filter(c).length===1&&c(q.correct)||'Übertrag'})}
const geprueft=new Set(['mal.mal','mal.luecke','mal.tausch','mal.reihe','geteilt.durch','geteilt.luecke','geteilt.umkehr',...['auswahl','ganz','restzahl','tippen','zugross','ohne','sach','runden'].map(s=>'rest.'+s),'punkt.rechnen','punkt.klammer','punkt.zuerst','punkt.falle',
  ...['plus','minus'].flatMap(i=>['ohne','mit','glatt','luecke','uebertrag'].map(s=>i+'.'+s))]);
A('jede Aufgabenart hat eine Prüfung',Object.entries(SUB).every(([i,o])=>Object.keys(o).every(k=>geprueft.has(i+'.'+k))));
A('alle Aufgabenarten nachgerechnet: keine Fehler',probs.n===0);
// Runden, Check, Blitzrunde
const runs=[...TOPICS.map(t=>t.id),'mix','check'].map(t=>[t,perfect(t).stars]);A('fehlerfreie Runde = 3 Sterne (alle Inseln, Rundfahrt, Check)',runs.every(r=>r[1]===3));
start('check');A('Check: 12 Aufgaben aus allen 6 Themen',G.total===12&&new Set(G.queue.map(q=>q.isl)).size===6);
let g=0;while(!$('.end')&&g++<80){const q=G.queue[0];g<=2?solveWrong(q):solve(q);$('#nx').click()}
const rows=$$('.cancheck tr').slice(1).map(r=>r.querySelector('.face').textContent);
A('Check-Tabelle: erstes Thema 🙁, Rest 😀',rows.length===6&&rows[0]==='🙁'&&rows.slice(1).every(f=>f==='😀'));
let qq=true;for(let i=0;i<500;i++){const x=quickQ();if(x.kind!=='mc'||new Set(x.options).size!==x.options.length||!x.options.includes(x.correct)||x.options.length<2)qq=false}
A('Blitzrunde: nur Auswahlfragen mit eindeutigen Antworten',qq);
{const ein=(t,x)=>{start('rest');const q=gen('rest','tippen');G.queue=[q];G.total=1;show();const [c,b]=zahlen(big(q.html));answer(null,t(Math.floor(c/b),c%b));return G.first===x};
 A('Rest eintippen: „4 Rest 3“, „4 rest 3“, „4 r 3“, „4R3“ richtig, falscher Rest falsch',ein((q,r)=>`${q} Rest ${r}`,1)&&ein((q,r)=>`${q} rest ${r}`,1)&&ein((q,r)=>`${q} r ${r}`,1)&&ein((q,r)=>`${q}R${r}`,1)&&ein((q,r)=>`${q} Rest ${r+1}`,0))}
// Memory: jede Aufgabe passt zu genau einer Zahl
let mOk=true;for(let i=0;i<100;i++){home();$('#gm').click();const t=M.cards.map(c=>c.t),nums=t.filter(x=>/^\d+$/.test(x));
  if(t.length!==12||new Set(t).size!==12)mOk=false;for(const x of t.filter(x=>/[·:]/.test(x)))if(nums.filter(n=>+n===calc(x)).length!==1)mOk=false}
A('Memory: 12 Karten, jede Aufgabe passt zu genau einer Zahl',mOk);
// Kopfrechen-Sprint
home();$('#gs').click();for(let k=0;k<5;k++){$('#ti').value=String(X.q.ans);$('#tf').requestSubmit()}
A('Sprint: richtige Ergebnisse zählen, gleich die nächste Aufgabe',X.n===5&&!$('#ti').disabled&&$('#ti').value==='');
$('#ti').value=String(X.q.ans+1);$('#tf').requestSubmit();A('Sprint: falsches Ergebnis zeigt die Lösung',$('#ti').disabled&&/Richtig ist/.test($('#fb').textContent)&&X.missed.length===1);
sprintNeu();sprintEnde();A('Sprint: Ende mit Rekord und Fehlerliste',!!$('.end')&&save.sprint===5&&$$('.mist li').length===1);
home();
done();
