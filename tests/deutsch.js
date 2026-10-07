// Deutsch-Inseln: Daten prüfen, jede Aufgabenart unabhängig nachprüfen (genau eine richtige Antwort), Runden, Check, Memory
const N=250,noun=w=>NOMEN.find(n=>n[0]===w);
const art=new Set(['der','die','das']),grp=new Set(['Mensch','Tier','Pflanze','Ding']);
A('Nomen-Daten: Artikel und Gruppe gültig, keine doppelten Wörter',NOMEN.every(n=>art.has(n[1])&&grp.has(n[3])&&n[0][0]===n[0][0].toUpperCase())&&new Set(NOMEN.map(n=>n[0])).size===NOMEN.length);
A('Wörter ohne Nomen sind keine Nomen der Liste',KEIN_NOMEN.every(w=>!noun(cap(w))));
// zusammengesetzte Nomen: Teile ergeben das Wort, Artikel der Teile passen zu den Nomen-Daten
let zOk=true;for(const z of ZUS){const w=z[4];if(!w.startsWith(z[0])||!w.endsWith(z[2].toLowerCase())||!art.has(z[1])||!art.has(z[3]))zOk=false,P('Zusammensetzung: '+z);
  for(const [p,a] of [[z[0],z[1]],[z[2],z[3]]]){const n=noun(p);if(n&&n[1]!==a)zOk=false,P(`Artikel passt nicht zu den Nomen-Daten: ${a} ${p}`)}}
A('zusammengesetzte Nomen: Teile ergeben das Wort, Artikel stimmen',zOk);
A('Satzdaten: Fragen beginnen mit Fragewort oder Verb',SAETZE.filter(s=>s[1]==='F').every(s=>/^(Wo|Was|Wann|Wer|Wie|Warum|Kommst|Hast|Spielst|Darf)\b/.test(s[0])));
A('Silben: jede Silbe hat einen Selbstlaut',SILBEN.every(w=>w.split('-').every(t=>/[aeiouäöüy]/i.test(t))));
const bigOf=h=>{box.innerHTML=h;const b=box.querySelector('.big');return (b||box).textContent.replace(/\u202F/g,'').replace(/\s+/g,' ').trim()};
function each(isl,sub,f){for(let i=0;i<N;i++){const q=gen(isl,sub),t=q.html?bigOf(q.html):'';try{const r=f(q,t);if(r!==true)P(`${isl}.${sub}: ${r} | ${t} | ${q.correct||q.accept||q.ans||q.target}`)}catch(e){P(`${isl}.${sub}: Ausnahme ${e.message} | ${t}`)}
  if(q.options&&(new Set(q.options).size!==q.options.length||!q.options.includes(q.correct)))P(`${isl}.${sub}: Optionen ${q.options}`)}}
const EMO=/^[\p{Extended_Pictographic}\u200d\ufe0f]+/u;                      // Bild-Emoji am Anfang (steht ohne Leerzeichen vor dem Wort)
const emoOf=t=>(t.match(EMO)||[''])[0],word=t=>t.replace(EMO,'').trim();
const fill=(t,x)=>word(t).replace('?',x);
each('nomen','erkennen',q=>q.options.filter(o=>NOMEN.some(n=>UP(n[0])===o)).length===1&&NOMEN.some(n=>UP(n[0])===q.correct)||'nicht genau ein Nomen');
each('nomen','artikel',(q,t)=>noun(word(t).replace('? ',''))[1]===q.correct||'Artikel');
each('nomen','unbestimmt',(q,t)=>(noun(word(t).replace('? ',''))[1]==='die'?'eine':'ein')===q.correct||'ein/eine');
each('nomen','welcherArt',(q,t)=>(/\b(der|die|das) ein/.test(t)?'bestimmter Artikel':'unbestimmter Artikel')===q.correct||'bestimmt/unbestimmt');
each('nomen','mehrzahl',(q,t)=>{const n=noun(word(t).split(' ')[1]);return n[2].split('|').every(p=>q.accept.includes(p))&&q.accept.length===n[2].split('|').length||'Mehrzahl'});
each('nomen','einzahl',q=>{const plurals=new Set(NOMEN.flatMap(n=>n[2].split('|'))),sing=new Set(NOMEN.map(n=>n[0]));return q.options.filter(o=>plurals.has(o)).length===1&&plurals.has(q.correct)&&!sing.has(q.correct)||'nicht genau eine Mehrzahl'});
each('nomen','gruppe',(q,t)=>noun(word(t).split(' ')[1])[3]===q.correct||'Gruppe');
each('zusammen','bilden',(q,t)=>{const m=t.match(/(\S+) (\S+) \+ (\S+) (\S+) =/),ok=q.options.filter(o=>ZUS.some(z=>z[0]===m[2]&&z[2]===m[4]&&z[4]===o));return ok.length===1&&ok[0]===q.correct||'Wort bilden'});
each('zusammen','schreiben',(q,t)=>{const m=t.match(/(\S+) (\S+) \+ (\S+) (\S+) = (\S+) \?/);return q.accept.length===1&&q.accept[0]===m[2]+m[4].toLowerCase()&&m[5]===ZUS.find(z=>z[4]===q.accept[0])[3]||'Wort schreiben'});
each('zusammen','artikel',q=>{box.innerHTML=q.html;const w=box.querySelector('.big').textContent.replace('? ','').trim();return ZUS.find(z=>z[4]===w)[3]===q.correct||'Artikel'});
each('zusammen','zerlegen',(q,t)=>{const z=ZUS.find(z=>z[4]===t.match(/^\S+ (\S+) =/)[1]),need=t.includes('= ?')?z[0]:z[2];return need===q.correct&&q.options.filter(o=>o===z[0]||o===z[2]).length===1||'zerlegen'});
each('zusammen','finden',q=>q.options.filter(o=>ZUS.some(z=>z[4]===o)).length===1&&ZUS.some(z=>z[4]===q.correct)||'nicht genau ein zusammengesetztes Nomen');
const S=t=>SAETZE.find(s=>s[0]===t);
each('satz','zeichen',(q,t)=>(S(t.replace(/ \?$/,''))[1]==='F'?'?':'.')===q.correct||'Satzzeichen');
each('satz','satzart',(q,t)=>(S(t.slice(0,-1))[1]==='F'?'Fragesatz':'Aussagesatz')===q.correct||'Satzart');
each('satz','gross',(q,t)=>{const parts=t.match(/[^.?]+[.?]/g).map(x=>x.trim()),must=parts.map(p=>p.split(' ')[0]).filter(w=>w===w.toLowerCase()&&!NAMEN_NOMEN.includes(w));
  return must.length===1&&must[0]===q.correct&&q.options.filter(o=>must.includes(o)).length===1||'Großschreibung'});
const richtig=x=>{const parts=x.match(/[^.?]+[.?]/g);if(!parts||parts.join('').length!==x.replace(/ (?=\S)/g,' ').length&&parts.join(' ').replace(/\s+/g,' ')!==x)return false;
  return parts.map(p=>p.trim()).every(p=>{const s=S(p.slice(0,-1));return s&&p.endsWith(s[1]==='F'?'?':'.')})};
each('satz','grenzen',q=>{const ok=q.options.filter(richtig);return ok.length===1&&ok[0]===q.correct||'nicht genau ein richtiger Text: '+q.options.filter(richtig).length});
each('abc','luecke',(q,t)=>{const l=t.split(' '),i=l.indexOf('?'),k=ABC.indexOf(l.find(x=>x!=='?'))+(i===0?-1:l.findIndex(x=>x!=='?')===0?i:i-l.findIndex(x=>x!=='?'));
  const letters=l.map((x,j)=>x==='?'?q.correct:x).join('');return ABC.includes(letters)&&q.accept.includes(q.correct.toLowerCase())||'Buchstabe'});
each('abc','nachbar',(q,t)=>{const m=t.match(/kommt (nach|vor) (\w)/),i=ABC.indexOf(m[2]);return ABC[m[1]==='nach'?i+1:i-1]===q.correct||'Nachbar'});
each('abc','ordnen',q=>{const s=q.tiles.slice().sort((a,b)=>a.localeCompare(b,'de'));return s.join(' ')===q.target&&new Set(q.tiles).size===q.tiles.length||'Reihenfolge'});
each('abc','erstes',q=>q.options.slice().sort((a,b)=>a.localeCompare(b,'de'))[0]===q.correct||'erstes Wort');
each('abc','raetsel',q=>{box.innerHTML=q.html;const nums=box.querySelector('.big').textContent.split(' – ').map(Number);return nums.map(n=>ABC[n-1]).join('')===q.correct||'Rätsel'});
each('laute','selbst',(q,t)=>{const w=SELBST.find(x=>x[0]===emoOf(t));return w&&fill(t,q.correct)===w[1]&&/^[aeiou]$/i.test(q.correct)||'Selbstlaut'});
each('laute','umlaut',(q,t)=>{const w=UMLAUT.find(x=>x[0]===emoOf(t));return w&&fill(t,q.correct)===w[1]&&/^[äöü]$/.test(q.correct)||'Umlaut'});
each('laute','zwie',(q,t)=>{const w=ZWIE.find(x=>x[0]===emoOf(t));return w&&fill(t,q.correct)===w[1]&&ZWIELAUTE.includes(q.correct.toLowerCase())||'Zwielaut'});
const LAUT={a:'Selbstlaut',e:'Selbstlaut',i:'Selbstlaut',o:'Selbstlaut',u:'Selbstlaut',ä:'Umlaut',ö:'Umlaut',ü:'Umlaut',ai:'Zwielaut',au:'Zwielaut',äu:'Zwielaut',ei:'Zwielaut',eu:'Zwielaut'};
each('laute','gruppe',(q,t)=>(LAUT[t]||'Mitlaut')===q.correct||'Laut-Gruppe');
each('laute','welcher',q=>q.options.filter(o=>/^[aeiou]$/.test(o)).length===1&&/^[aeiou]$/.test(q.correct)||'Selbstlaut-Auswahl');
each('laute','silben',(q,t)=>{const w=SILBEN.find(x=>x.replace(/-/g,'')===t.split(' ')[0]);return w.split('-').length===q.ans||'Silben'});
const IEX=w=>IE.find(x=>x[0]===w);
each('ie','einsetzen',(q,t)=>{const w=fill(t,q.correct),x=IEX(w);return !!x&&x[2]===(q.correct.toLowerCase()==='ie'?'ie':'i')||'ie/i'});
each('ie','lang',(q,t)=>(IEX(word(t))[2]==='i'?'kurz':'lang')===q.correct||'lang/kurz');
each('ie','schreiben',(q,t)=>{const x=IE.find(x=>x[1]&&t.startsWith(x[1]));return !!x&&q.accept.length===1&&q.accept[0]===x[0]||'Wort zum Bild'});
each('ie','merk',q=>q.options.filter(o=>IEX(o)[2]==='merk').length===1&&IEX(q.correct)[2]==='merk'||'Merkwort');
{let ok=true;for(let i=0;i<N;i++){const q=gen('ie','hoeren'),x=IEX(q.say);if(!x||(x[2]==='i'?'kurz':'lang')!==q.correct)ok=false}A('Hören: lang/kurz passt zum vorgelesenen Wort',ok)}
const all=Object.entries(AUFG).flatMap(([i,o])=>Object.keys(o).map(k=>i+'.'+k));
A('alle Aufgabenarten nachgeprüft: genau eine richtige Antwort, keine Fehler',probs.n===0);
// Runden, Eingaben, Check, Spiele
const runs=[...TOPICS.map(t=>t.id),'mix','check'].map(t=>[t,perfect(t)]);runs.forEach(([t,r])=>{if(r.stars!==3)P('keine 3 Sterne: '+t)});
A('fehlerfreie Runde = 3 Sterne (alle Inseln, Rundfahrt, Check)',runs.every(([,r])=>r.stars===3));
start('nomen');let q;do q=gen('nomen','mehrzahl');while(!/Hund\b/.test(q.html));G.queue=[q];G.total=1;show();answer(null,'hunde');
A('Mehrzahl klein geschrieben = falsch mit Hinweis Groß/klein',G.first===0&&/Groß- und Kleinschreibung/.test($('#fb').textContent));
start('nomen');do q=gen('nomen','mehrzahl');while(!/Junge\b/.test(q.html));G.queue=[q];G.total=1;show();answer(null,'Jungs');A('Mehrzahl: auch „Jungs“ ist richtig',G.first===1);
start('check');A('Check: 12 Aufgaben aus allen 6 Themen',G.total===12&&new Set(G.queue.map(q=>q.isl)).size===6);
let g=0;while(!$('.end')&&g++<80){const q=G.queue[0];g<=2?solveWrong(q):solve(q);$('#nx').click()}
const rows=$$('.cancheck tr').slice(1).map(r=>r.querySelector('.face').textContent);
A('Check-Tabelle: erstes Thema 🙁 mit Üben-Knopf, Rest 😀',rows.length===6&&rows[0]==='🙁'&&rows.slice(1).every(f=>f==='😀')&&!!$('[data-go="nomen"]'));
let qq=true;for(let i=0;i<400;i++){const x=quickQ();if(x.kind!=='mc')qq=false}A('Blitzrunde: nur Auswahlfragen',qq);
let memoOk=true;for(let i=0;i<150;i++){home();$('#gm').click();const t=M.cards.map(c=>c.t);if(t.length!==12||new Set(t).size!==12)memoOk=false;
  for(const c of M.cards.filter(c=>/\p{Extended_Pictographic}/u.test(c.t))){const fits=NOMEN.filter(n=>n[4]===c.t).map(n=>`${n[1]} ${n[0]}`);if(t.filter(x=>fits.includes(x)).length!==1)memoOk=false}}
A('Memory: 12 eindeutige Karten, jedes Bild passt zu genau einer Karte',memoOk);
done();
