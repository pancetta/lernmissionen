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
const hitsOf=(q,f)=>q.tiles.flatMap((w,i)=>f(w,i)?[i]:[]).join(),alle=(q,f,min)=>new Set(q.tiles).size===q.tiles.length&&q.hits.length>=min&&hitsOf(q,f)===q.hits.join();
each('nomen','alle',q=>alle(q,w=>NOMEN.some(n=>UP(n[0])===w),2)||'Nomen antippen');
each('nomen','artikel',(q,t)=>noun(word(t).replace('? ',''))[1]===q.correct||'Artikel');
each('nomen','unbestimmt',(q,t)=>(noun(word(t).replace('? ',''))[1]==='die'?'eine':'ein')===q.correct||'ein/eine');
each('nomen','welcherArt',(q,t)=>(/^„(der|die|das)“$/.test(t)?'bestimmter Artikel':'unbestimmter Artikel')===q.correct||'bestimmt/unbestimmt');
each('nomen','mehrzahl',(q,t)=>{const n=noun(word(t).split(' ')[1]);return n[2].split('|').every(p=>q.accept.includes(p))&&q.accept.length===n[2].split('|').length||'Mehrzahl'});
each('nomen','einzahl',q=>{const plurals=new Set(NOMEN.flatMap(n=>n[2].split('|'))),sing=new Set(NOMEN.map(n=>n[0]));return q.options.filter(o=>plurals.has(o)).length===1&&plurals.has(q.correct)&&!sing.has(q.correct)||'nicht genau eine Mehrzahl'});
each('nomen','gruppe',(q,t)=>noun(word(t).split(' ')[1])[3]===q.correct||'Gruppe');
each('zusammen','bilden',(q,t)=>{const m=t.match(/(\S+) (\S+) \+ (\S+) (\S+) =/),ok=q.options.filter(o=>ZUS.some(z=>z[0]===m[2]&&z[2]===m[4]&&z[4]===o));return ok.length===1&&ok[0]===q.correct||'Wort bilden'});
each('zusammen','schreiben',(q,t)=>{const m=t.match(/(\S+) (\S+) \+ (\S+) (\S+) = (\S+) \?/);return q.accept.length===1&&q.accept[0]===m[2]+m[4].toLowerCase()&&m[5]===ZUS.find(z=>z[4]===q.accept[0])[3]||'Wort schreiben'});
each('zusammen','artikel',q=>{box.innerHTML=q.html;const w=box.querySelector('.big').textContent.replace('? ','').trim();return ZUS.find(z=>z[4]===w)[3]===q.correct||'Artikel'});
each('zusammen','zerlegen',(q,t)=>{const z=ZUS.find(z=>z[4]===t.match(/^\S+ (\S+) =/)[1]),need=t.includes('= ?')?`${z[1]} ${z[0]}`:`${z[3]} ${z[2]}`;return need===q.correct||'zerlegen'});
each('zusammen','finden',q=>alle(q,w=>ZUS.some(z=>z[4]===w),2)||'zusammengesetzte Nomen antippen');
const S=t=>SAETZE.find(s=>s[0]===t);
each('satz','zeichen',(q,t)=>(S(t.replace(/ \?$/,''))[1]==='F'?'?':'.')===q.correct||'Satzzeichen');
each('satz','satzart',(q,t)=>(S(t.slice(0,-1))[1]==='F'?'Fragesatz':'Aussagesatz')===q.correct||'Satzart');
const richtig=x=>{const parts=x.match(/[^.?]+[.?]/g);if(!parts||parts.join('').length!==x.replace(/ (?=\S)/g,' ').length&&parts.join(' ').replace(/\s+/g,' ')!==x)return false;
  return parts.map(p=>p.trim()).every(p=>{const s=S(p.slice(0,-1));return s&&p.endsWith(s[1]==='F'?'?':'.')})};
each('satz','gross',q=>{const ws=q.sol.split(' '),start=i=>i===0||/[.?]$/.test(ws[i-1]); // groß = Satzanfang oder Nomen/Name aus der Liste
  return richtig(q.sol)&&q.sol.toLowerCase()===q.tiles.join(' ')&&hitsOf(q,(w,i)=>start(i)||NAMEN_NOMEN.includes(ws[i].replace(/[.?]$/,'')))===q.hits.join()||'Großschreibung'});
each('satz','grenzen',q=>{const ok=q.options.filter(richtig);return ok.length===1&&ok[0]===q.correct||'nicht genau ein richtiger Text: '+q.options.filter(richtig).length});
each('abc','luecke',(q,t)=>{const fits=o=>{const f=o.split(' und ');let k=0;const r=t.split(' ').map(x=>x==='?'?f[k++]:x).join('');return r.length===5&&ABC.includes(r)};
  return q.options.filter(fits).length===1&&fits(q.correct)&&(t.match(/\?/g)||[]).length===2||'Buchstaben'});
each('abc','nachbar',(q,t)=>{const m=t.match(/kommt (nach|vor) (\w)/),i=ABC.indexOf(m[2]);return ABC[m[1]==='nach'?i+1:i-1]===q.correct||'Nachbar'});
each('abc','ordnen',q=>{const s=q.tiles.slice().sort((a,b)=>a.localeCompare(b,'de'));return s.join(' ')===q.target&&new Set(q.tiles).size===q.tiles.length||'Reihenfolge'});
each('abc','erstes',q=>q.options.slice().sort((a,b)=>a.localeCompare(b,'de'))[0]===q.correct||'erstes Wort');
each('abc','raetsel',q=>{box.innerHTML=q.html;const nums=box.querySelector('.big').textContent.split(' – ').map(Number);return nums.map(n=>ABC[n-1]).join('')===q.correct||'Rätsel'});
each('laute','selbst',(q,t)=>{const w=SELBST.find(x=>x[0]===emoOf(t));return w&&fill(t,q.correct)===w[1]&&/^[aeiou]$/i.test(q.correct)||'Selbstlaut'});
each('laute','umlaut',(q,t)=>{const w=UMLAUT.find(x=>x[0]===emoOf(t)&&x[1]===fill(t,q.correct));return w&&q.options.filter(o=>UMLAUT.some(x=>x[1]===fill(t,o))).length===1&&/^[äöü]$/.test(q.correct)||'Umlaut'});
each('laute','zwie',(q,t)=>{const w=ZWIE.find(x=>x[0]===emoOf(t));return w&&fill(t,q.correct)===w[1]&&ZWIELAUTE.includes(q.correct.toLowerCase())||'Zwielaut'});
const LAUT={a:'Selbstlaut',e:'Selbstlaut',i:'Selbstlaut',o:'Selbstlaut',u:'Selbstlaut',ä:'Umlaut',ö:'Umlaut',ü:'Umlaut',ai:'Zwielaut',au:'Zwielaut',äu:'Zwielaut',ei:'Zwielaut',eu:'Zwielaut'};
each('laute','gruppe',(q,t)=>(LAUT[t]||'Mitlaut')===q.correct||'Laut-Gruppe');
each('laute','welcher',q=>q.options.filter(o=>/^[aeiou]$/.test(o)).length===1&&/^[aeiou]$/.test(q.correct)||'Selbstlaut-Auswahl');
each('laute','silben',(q,t)=>{const w=SILBEN.find(x=>x.replace(/-/g,'')===t.split(' ')[0]);return w.split('-').length===q.ans||'Silben'});
// ie oder i nach der Silbenmethode: Daten folgen der Regel (offene 1. Silbe → ie, geschlossene → i, Merkwort: offen ohne e)
const IEX=w=>IE.find(x=>ieWord(x)===w);
let ieData=true;for(const x of IE){const f=ieFirst(x),open=ieOpen(x),ok=x[0].split('-').length>=2&&x[0].split('-').every(t=>/[aeiouäöü]/i.test(t))&&
  (x[2]==='ie'?open&&/ie$/i.test(f):x[2]==='i'?!open&&/i/i.test(f)&&!/ie/i.test(x[0]):open&&/i$/i.test(f)&&!/ie/i.test(x[0]));if(!ok){ieData=false;P('Silbenregel passt nicht: '+x)}}
A('ie-Wörter folgen der Silbenregel (offen → ie, geschlossen → i)',ieData);
each('ie','einsetzen',(q,t)=>{const w=fill(t,q.correct),x=IEX(w);return !!x&&x[2]===q.correct&&!/ /.test(w)||'ie/i'});
each('ie','offen',(q,t)=>{const x=IE.find(x=>x[0]===t);return (ieOpen(x)?'offen':'geschlossen')===q.correct||'offen/geschlossen'});
each('ie','tabelle',q=>q.options.filter(o=>ieOpen(IE.find(x=>x[0]===o))).length===1&&ieOpen(IE.find(x=>x[0]===q.correct))||'nicht genau eine offene Silbe');
each('ie','lang',(q,t)=>(IEX(word(t))[2]==='i'?'kurz':'lang')===q.correct||'lang/kurz');
each('ie','schreiben',(q,t)=>{const x=IE.find(x=>x[1]&&t.startsWith(x[1]));return !!x&&q.accept.length===1&&q.accept[0]===ieWord(x)||'Wort zum Bild'});
each('ie','merk',q=>{const merk=o=>IE_MERK1.includes(o)||(IEX(o)||[])[2]==='merk';return q.options.filter(merk).length===1&&merk(q.correct)||'Merkwort'});
{let ok=true;for(let i=0;i<N;i++){const q=gen('ie','hoeren'),x=IEX(q.say);if(!x||(x[2]==='i'?'kurz':'lang')!==q.correct)ok=false}A('Hören: lang/kurz passt zum vorgelesenen Wort',ok)}
{let ok=true;for(const s of ['lang','hoeren','offen'])for(let i=0;i<N;i++){const q=gen('ie',s);if(/Merkwort/.test(q.sol))ok=false}A('Merkwörter (Igel, Tiger …) nur in der Merkwort-Aufgabe, nicht bei lang/kurz oder offen/geschlossen',ok)}
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
// Memory: alle Arten und Stufen; jede Karte passt zu genau einer anderen (Bild: nur Namen mit Artikel, Mehrzahl oder allein, nicht Wortteile)
const PL=w=>{const n=noun(w);return n?n[2].split('|'):[]};
let memoOk=true;for(const art of ['mix','silben','hoeren'])for(const n of [6,8,10])for(let i=0;i<40;i++){memoStart(art,n);const cs=M.cards,t=cs.map(c=>c.t);
  if(cs.length!==2*n||new Set(t.filter(x=>x!=='🔊')).size!==t.filter(x=>x!=='🔊').length){memoOk=false;P(`Memory ${art} ${n}: ${t}`)}
  if(art==='mix'||art==='hoeren')for(const c of cs.filter(c=>c.t!=='🔊'&&/\p{Extended_Pictographic}/u.test(c.t))){const L=(NOMEN.find(n=>n[4]===c.t)||[])[0]||ieWord(IE_BILD.find(x=>x[1]===c.t)),g=oberOf(L),
    names=x=>x.includes('+')?[]:x.split(' ').concat(ZUS.filter(z=>z[4]===x).map(z=>z[2])), // ein zusammengesetztes Nomen benennt auch sein Grundwort (Haustür → Tür)
    fits=cs.filter(d=>d.t!==c.t&&(d.e.sa?[d.e.sa.split(' ')[1]]:names(d.t)).some(w=>oberOf(w)===g||NOMEN.some(n=>oberOf(n[0])===g&&PL(n[0]).includes(w))));
    if(fits.length!==1){memoOk=false;P(`Memory-Bild ${c.t} passt zu ${fits.length} Karten: ${t}`)}}
  if(art==='silben'&&new Set(cs.filter(c=>c.en).map(c=>c.e.b.split('-')[1])).size!==n){memoOk=false;P('Silben-Memory: gleiche 2. Silbe '+t)}
  if(art==='silben')for(const c of cs.filter(c=>c.en))if(!SILBEN.includes(c.t+c.e.b.slice(1))||c.e.sa!==(c.t+c.e.b.slice(1)).replace(/-/g,'')){memoOk=false;P('Silben-Paar '+c.t+c.e.b)}
  if(art==='hoeren')for(const c of cs.filter(c=>c.en)){const n=NOMEN.find(n=>`${n[1]} ${n[0]}`===c.e.sa);if(!n||t.filter(x=>x===n[4]).length!==1){memoOk=false;P('Hör-Paar '+c.e.sa)}}}
{let both=0;for(let i=0;i<300;i++){memoStart('mix',10);const t=M.cards.map(c=>c.t);if(t.includes('🌷')&&t.includes('die Blume'))both++}A('Memory: nie Bild und Oberbegriff zugleich (🌷 und „die Blume“)',both===0)}
A('Memory: gemischt, Silben, Hören je 6/8/10 Paare, jede Karte eindeutig',memoOk);
{memoStart('silben',8);const bs=$$('.card');for(const e of new Set(M.cards.map(c=>c.e)))M.cards.forEach((c,i)=>{if(c.e===e)flip(bs[i])});const tries=M.tries;memoEnd();
 A('Memory: Rekord je Art und Stufe',save.memo_silben8===tries&&tries===8&&/8 Paare/.test($('.end').textContent))}
home();$('#gm').click();A('Memory-Auswahl mit Stufen',$$('[data-n]').length===3&&$$('[data-art]').length>=2);
// Artikel-Häfen (gemeinsames Sortier-Spiel)
const binOf=a=>`[data-b="${HAEFEN.bins.indexOf(a)}"]`,wordOf=()=>noun($('.prompt .big').textContent.replace(EMO,'').trim());
haefen();let hOk=true;for(let i=0;i<15;i++){const w=wordOf();if(!w||w[1]!==X.it.bin)hOk=false;$(binOf(w[1])).click();if(X.n!==i+1||!$('.opt.right'))hOk=false;sortWeiter()}
A('Artikel-Häfen: richtiger Hafen zählt, es wird schneller',hOk&&X.t===Math.max(HAEFEN.t[2],HAEFEN.t[0]-15*HAEFEN.t[1]));
sortA(-1);A('Artikel-Häfen: Zeit um kostet ein Leben',X.lives===2&&/Zeit ist um/.test($('#fb').textContent)&&!!$('.opt.right'));
for(let k=0;k<2;k++){sortWeiter();const w=wordOf();$(binOf(w[1]==='der'?'die':'der')).click();if(!$('.opt.wrong'))hOk=false}sortWeiter();
A('Artikel-Häfen: nach drei Fehlern Ende mit Rekord und Fehlerliste',hOk&&!!$('.end')&&save.hafen===15&&$$('.mist li').length>=1);
// Satz-Detektiv
detektiv();let dOk=true;
for(let f=0;f<DET_N;f++){const d=X.d,re=d.words.map((w,i)=>(i===0||d.marks[i-1]?cap(w):w)+d.marks[i]).join(' ');
  if(re!==d.ok||!richtig(d.ok)||d.marks.filter(Boolean).length!==d.ok.match(/[.?]/g).length){dOk=false;P('Detektiv-Text: '+re+' | '+d.ok)}
  if(f<DET_N-1){d.marks.forEach((m,i)=>{for(let k=0;k<{'':0,'.':1,'?':2}[m];k++)$(`.dgap[data-k="${i}"]`).click()});
    const ws=$$('.dw').map(x=>x.textContent);if(ws.join(' ')!==d.ok.replace(/[.?]/g,''))dOk=false} // nach einem Zeichen groß weiter
  $('#bp').click();if(f<DET_N-1?!/Fall gelöst/.test($('#fb').textContent):!($('.dgap.miss')&&/Fast/.test($('#fb').textContent)))dOk=false;$('#nx').click()}
A('Satz-Detektiv: Antippen setzt . und ?, danach groß, gelöste Fälle zählen, Fehler zeigt fehlende Zeichen',dOk&&!!$('.end')&&save.detektiv===DET_N-1);
// Abc-Leiter
leiter();let lOk=true;const two=x=>x.slice(0,2).toLowerCase();
for(let k=0;k<LEITER_N-1;k++){const w=X.w,list=X.list.slice();if(list.some(x=>two(x)===two(w))||list.includes(w))lOk=false;
  const p=list.filter(x=>x.localeCompare(w,'de')<0).length;$(`.slot[data-p="${p}"]`).click();if(X.n!==k+1)lOk=false;leiterWeiter()}
const LL=X.list.slice();if(LL.join()!==LL.slice().sort((a,b)=>a.localeCompare(b,'de')).join())lOk=false;
{const p=X.list.filter(x=>x.localeCompare(X.w,'de')<0).length;$(`.slot[data-p="${p===0?1:0}"]`).click()}
A('Abc-Leiter: falsche Stelle kostet ein Leben, die richtige wird gezeigt',X.lives===2&&!!$('.slot.right')&&!!$('.slot.wrong'));
leiterWeiter();A('Abc-Leiter: richtig einsortiert zählt, Leiter bleibt sortiert, Ende nach 10 Wörtern',lOk&&!!$('.end')&&save.leiter===LEITER_N-1);
home();
done();
