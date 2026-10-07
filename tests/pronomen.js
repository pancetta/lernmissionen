// Pronomen-Inseln: ein Durchgang über alle Fragearten prüft Grammatik, Daten und Eindeutigkeit; dazu Runden und Bedienung
A('Startseite: 7 Inseln, Spickzettel ohne Objektformen',$$('.isl').length===7&&!/\b(me|him|us|them)\b/.test($('details').textContent));
const OBJ=/\b(me|him|her|us|them)\b/i;
const agree=t=>/(?<!and )\bI (is|are)\b|\b(he|she|it) (am|are)\b|\b(we|they) (am|is)\b|\byou (am|is)\b/i.test(t);
const animals=W.filter(e=>e[0]==='tiere').map(enShow).concat(['boat']);
const isAnimal=t=>{const m=t.match(/^the (.+)$/i);return !!m&&animals.includes(m[1].toLowerCase())};
const bold=p=>((p||'').match(/\*\*(.+?)\*\*/)||[])[1]||'';
const lc=a=>(a||[]).map(x=>x.toLowerCase());
const heShe=a=>lc(a).some(x=>x==='he'||x==='she');
const topicOf=w=>(W.find(e=>enShow(e)===w)||[])[0];
const gens={trans:()=>qTrans(),simple:qSimple,replace:qReplace,gap:qGap,who:qWho,fehler:qFehler,build:qBuild,listen:qListen,quick:quickQ};
for(const [g,f] of Object.entries(gens))for(let i=0;i<1000;i++){const q=f(),all=[q.prompt||'',q.sol,q.say,...(q.options||[]),...(q.tiles||[])].join(' | ');
  // Grammatik und Daten
  if(OBJ.test(all))P(g+' Objektform: '+all);
  if(/\{\}|undefined|null|NaN|  /.test(all))P(g+' Platzhalter: '+all);
  if(agree(q.sol.replace(/^.*?: /,''))||agree(q.say))P(g+' Verbform: '+all);
  if(/\bi am\b/.test(q.sol)||/\bi am\b/.test(q.say))P(g+' „i“ klein in der Lösung: '+all);
  if(q.options&&(new Set(q.options).size!==q.options.length||!q.options.includes(q.correct)||q.options.length<(q.options[0]==='Stimmt'?2:3)))P(g+' Optionen: '+all);
  if(q.kind==='type'&&q.accept[0]!==q.correct)P(g+' accept: '+all);
  if(q.kind==='build'){const tl=q.tiles.slice();for(const w of q.target.split(' ')){const j=tl.indexOf(w);if(j<0){P(g+' Kärtchen fehlen: '+all);break}tl.splice(j,1)}if(tl.length!==1)P(g+' nicht genau ein übriges Wort: '+all)}
  if(g==='fehler'&&q.correct==='Stimmt'&&plain(q.prompt)!==q.sol)P('Fehler-Insel: stimmt, aber Lösung anders: '+all);
  if(g==='listen'&&q.options.length!==3)P('Hören: nicht 3 Antworten: '+all);
  // Eindeutigkeit: Tiere/Boote nie mit he/she, Bezug aufs fette Wort, kein it bei Personen, kein "Here it is"
  const b=bold(q.prompt);
  if(['simple','replace','gap'].includes(g)&&isAnimal(g==='simple'?q.prompt.replace(' → ?',''):b)&&heShe(q.options))P(g+' Tier mit he/she: '+all);
  if(g==='gap'){if(!/fetten? Wort/.test(q.label))P('Lücke ohne Bezug: '+q.label);if(/Where/.test(q.prompt))P('Lücke mit Where: '+q.prompt);
    if(/^This is \*\*(the (boy|girl)|my |[A-Z])/.test(q.prompt)&&lc(q.options).includes('it'))P('Lücke Person mit it: '+all)}
  if(g==='fehler'){if(/Where/.test(q.prompt))P('Fehler mit Where: '+q.prompt);if(/^This is \*\*/.test(q.prompt)&&/\. It /.test(q.prompt))P('Fehler Person mit It: '+q.prompt);
    if(isAnimal(b))P('Fehler mit Tier: '+q.prompt);if(q.wk!=='I'&&!/fetten Wort/.test(q.label))P('Fehler ohne Bezug: '+q.label)}
  if(g==='build'){if(/ (here|there)\b/.test(q.target))P('Satzbau mit here/there: '+q.target);if(isAnimal(b)&&!/ and /.test(b)&&heShe(q.tiles))P('Satzbau Tier mit he/she: '+all)}
  const pair=b.match(/^the (.+) and the (.+)$/i);
  if(pair&&(topicOf(pair[1].toLowerCase())!==topicOf(pair[2].toLowerCase())||[pair[1],pair[2]].some(x=>['zoo','animal','pet'].includes(x.toLowerCase()))))P('schiefes Paar: '+q.prompt);
}
for(let i=0;i<500;i++){const s=sentence(NOUNS);if(/ new\./.test(s.out)&&s.n.e&&!['klasse','farben'].includes(s.n.e[0]))P('„new“ bei: '+s.orig)}
A('9000 Fragen: Grammatik, Daten und Eindeutigkeit sauber',probs.n===0);
A('I und you (Einzahl) kommen in Lücken vor',(()=>{let I=0,Y=0;for(let i=0;i<400;i++){const q=qGap(true);if(q.correct==='I')I++;if(/^Hello/.test(q.prompt))Y++}return I>10&&Y>10})());
const runs=[...TOPICS.map(t=>t.id),'mix'].map(t=>[t,perfect(t)]);runs.forEach(([t,r])=>{if(r.stars!==3)P('keine 3 Sterne: '+t)});
A('fehlerfreie Runde = 3 Sterne (alle Inseln und Rundfahrt)',runs.every(([,r])=>r.stars===3));
start('luecken');let q;do q=qGap();while(q.kind!=='type'||q.correct!=='I');G.queue=[q];G.total=1;show();
answer(null,'i');A('„i“ klein geschrieben = falsch mit Hinweis',G.first===0&&/Groß- und Kleinschreibung/.test($('#fb').textContent));
start('bauen');q=qBuild();G.queue=[q];G.total=1;show();for(const w of q.target.split(' '))[...$('#bc').children].find(c=>c.textContent===w).click();
$('#bp').click();A('Satzbau: richtig, ein Wort bleibt übrig',G.first===1&&$('#bc').children.length===1);
start('wer');const p0=G.queue[0].prompt;saveRound();home();$('#rs').click();A('Fortsetzen: gleiche Frage',G.queue[0].prompt===p0);
let memoOk=true;for(let i=0;i<200;i++){const m=MEMO(),t=m.flatMap(p=>[p.a,p.b]);if(m.length!==6||new Set(t).size!==12||t.some(x=>OBJ.test(x))||m.some(p=>isAnimal(p.b)))memoOk=false}
A('Memory-Paare: eindeutig, keine Objektformen, keine Tiere als Person',memoOk);
done();
