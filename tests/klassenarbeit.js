// Class-Test-Inseln (Englisch 5, 2. Arbeit): jede Aufgabe unabhängig aus der Anzeige nachprüfen, nur bekannte Wörter, Ich-kann-Check, Spiele
VOICE={name:'Test',lang:'en-GB',localService:true};save.sound=true; // Hör-Fragen gibt es nur mit Stimme; Headless-Chrome hat keine
const N=150;
const show_=q=>`${q.prompt||''} ${q.say||''} → ${q.correct||q.ans||q.target||(q.accept||[])[0]}`;
function each(isl,sub,f,ohneA){let bad=0;for(let i=0;i<N;i++){const q=gen(isl,sub);try{const r=f(q);if(r!==true){bad++;P(`${isl}.${sub}: ${r} | ${show_(q)}`)}}catch(e){bad++;P(`${isl}.${sub}: ${e.message} | ${show_(q)}`)}
  if(['mc','listen'].includes(q.kind)&&(new Set(q.options).size!==q.options.length||!q.options.includes(q.correct)||q.options.length<2)){bad++;P(`${isl}.${sub}: Optionen ${q.options}`)}}
  A(`${isl}.${sub}: ${ohneA?'Antworten verschieden, die richtige ist dabei':'aus der Anzeige nachgeprüft'}`,bad===0)}
for(const [isl,o] of Object.entries(SUB))for(const sub of Object.keys(o))each(isl,sub,()=>true,true); // jede Unterart: Antworten eindeutig

// Feste Tabellen aus dem Buch (nicht aus dem Seitencode abgeleitet)
const ORDT=['','first','second','third','fourth','fifth','sixth','seventh','eighth','ninth','tenth','eleventh','twelfth','thirteenth','fourteenth','fifteenth','sixteenth','seventeenth','eighteenth','nineteenth','twentieth',
 'twenty-first','twenty-second','twenty-third','twenty-fourth','twenty-fifth','twenty-sixth','twenty-seventh','twenty-eighth','twenty-ninth','thirtieth','thirty-first'];
const ABKT=['','1st','2nd','3rd','4th','5th','6th','7th','8th','9th','10th','11th','12th','13th','14th','15th','16th','17th','18th','19th','20th','21st','22nd','23rd','24th','25th','26th','27th','28th','29th','30th','31st'];
A('Ordnungszahlen 1st bis 31st wie im Buch (first, second, third, fifth, eighth, ninth, twelfth, twentieth, twenty-first …)',ORDT.slice(1).every((w,i)=>ord(i+1)===w&&abk(i+1)===ABKT[i+1]));
const ZT={0:'zero',11:'eleven',12:'twelve',13:'thirteen',14:'fourteen',15:'fifteen',18:'eighteen',19:'nineteen',20:'twenty',21:'twenty-one',40:'forty',45:'forty-five',50:'fifty',80:'eighty',90:'ninety',99:'ninety-nine',100:'a hundred'};
A('Zahlwörter wie im Buch (fourteen, forty, ninety, a hundred …)',Object.entries(ZT).every(([n,w])=>num(+n)===w));
const UT=[[7,0,'seven o’clock','seven o’clock'],[7,15,'quarter past seven','seven fifteen'],[7,30,'half past seven','seven thirty'],[7,45,'quarter to eight','seven forty-five'],
 [12,45,'quarter to one','twelve forty-five'],[11,35,'twenty-five to twelve','eleven thirty-five'],[9,5,'five past nine','nine oh five'],[12,30,'half past twelve','twelve thirty'],[1,50,'ten to two','one fifty']];
A('Uhrzeiten wie im Buch (half past seven = 7:30, quarter to one = 12:45, nine oh five = 9:05)',UT.every(([h,m,a,b])=>uhr(h,m)===a&&digi(h,m)===b));

// Unabhängige Leser für Uhrzeiten: englisch (britisch und digital), deutsch, Ziffern → Minuten (0–719)
const WZ={};['zero','one','two','three','four','five','six','seven','eight','nine','ten','eleven','twelve','thirteen','fourteen','fifteen','sixteen','seventeen','eighteen','nineteen'].forEach((w,i)=>WZ[w]=i);
['twenty','thirty','forty','fifty'].forEach((w,i)=>WZ[w]=20+10*i);
const zahlAus=t=>t.split(/[- ]/).reduce((a,w)=>a+(w==='oh'?0:WZ[w]),0);
function liesUhr(t){t=t.replace(/[‘’]/g,"'").replace(/^It's |^It is /,'').replace(/\.$/,'').replace(/^./,c=>c.toLowerCase()).replace(/^a /,'');let m;
  const H=w=>WZ[w]%12;
  if(m=t.match(/^(\w+) o'clock$/))return H(m[1])*60;
  if(m=t.match(/^(quarter|half|[\w -]+?) past (\w+)$/))return H(m[2])*60+(m[1]==='quarter'?15:m[1]==='half'?30:zahlAus(m[1]));
  if(m=t.match(/^(quarter|[\w -]+?) to (\w+)$/))return (H(m[2])*60-(m[1]==='quarter'?15:zahlAus(m[1]))+720)%720;
  if(m=t.match(/^(\w+) ((oh )?[\w -]+)$/)){const z=zahlAus(m[2]);return z<10&&!m[3]?NaN:H(m[1])*60+z} // 2:08 = two oh eight, nicht two eight
  return NaN}
const liesZf=t=>{const [h,m]=t.split(':').map(Number);return (h%12)*60+m};
const DZ={ein:1,eins:1,zwei:2,drei:3,vier:4,fünf:5,sechs:6,sieben:7,acht:8,neun:9,zehn:10,elf:11,zwölf:12};
function liesDeutsch(t){let m;if(m=t.match(/^(\S+) Uhr$/))return (DZ[m[1]]%12)*60;if(m=t.match(/^Viertel nach (\S+)$/))return (DZ[m[1]]%12)*60+15;
  if(m=t.match(/^halb (\S+)$/))return ((DZ[m[1]]+11)%12)*60+30;if(m=t.match(/^Viertel vor (\S+)$/))return ((DZ[m[1]]+11)%12)*60+45;return NaN}
A('Leser für Uhrzeiten (Testhilfe) arbeiten richtig',liesUhr('It’s quarter to one.')===45&&isNaN(liesUhr('two eight'))&&liesUhr('twenty five past four')===265&&liesUhr('two forty five')===165&&liesUhr('twenty-five to twelve')===695&&liesUhr('It’s nine oh five.')===545&&liesDeutsch('halb acht')===450&&liesDeutsch('halb fünf')===270&&liesDeutsch('zwölf Uhr')===0&&liesDeutsch('Viertel vor eins')===765%720);
const uhrAusSvg=html=>{box.innerHTML=html;const w=c=>{const l=box.querySelector('line.'+c);return (Math.atan2(+l.getAttribute('x2')-50,-(+l.getAttribute('y2')-50))*180/Math.PI+360)%360};
  const m=Math.round(w('min')/6)%60,h=Math.floor((w('std')-m/2+.5)/30+12)%12;return h*60+m};
const fett=t=>(t.match(/\*\*(.+?)\*\*/)||[])[1];

// Hör-Insel: Stundenplan aus der Tabelle lesen und jede Aussage selbst prüfen
function lesePlan(html){box.innerHTML=html;const rows=[...box.querySelectorAll('.plan tr')],tage=[...rows[0].querySelectorAll('th')].slice(1).map(t=>t.textContent),f=tage.map(()=>[]),z=[];let pause,mittag;
  for(const r of rows.slice(1)){const td=[...r.querySelectorAll('td')];if(r.classList.contains('pz')){if(td[1].textContent==='break')pause=liesZf(td[0].textContent);else mittag=liesZf(td[0].textContent);continue}
    z.push(liesZf(td[0].innerHTML.split('<br>')[1]));td.slice(1).forEach((c,i)=>f[i].push(c.textContent))}
  return {tage,f,z,pause,mittag}}
const ORDI=w=>['first','second','third','fourth','fifth'].indexOf(w);
function stimmt(p,s){let m;const d=t=>p.tage.indexOf(t);
  if(m=s.match(/^On (\w+), the (\w+) lesson is (.+)\.$/))return p.f[d(m[1])][ORDI(m[2])]===m[3];
  if(m=s.match(/^On (\w+), (.+) is in the (\w+) lesson\.$/))return p.f[d(m[1])][ORDI(m[3])]===m[2];
  if(m=s.match(/^The (\w+) lesson starts at (.+)\.$/))return p.z[ORDI(m[1])]===liesUhr(m[2]);
  if(m=s.match(/^The lunch break is at (.+)\.$/))return p.mittag===liesUhr(m[1]);
  if(m=s.match(/^The break is at (.+)\.$/))return p.pause===liesUhr(m[1]);
  if(m=s.match(/^There is no (.+) on (\w+)\.$/))return !p.f[d(m[2])].includes(m[1]);
  throw new Error('unbekannte Aussage')}
each('hoeren','tf',q=>{const p=lesePlan(q.html),w=stimmt(p,q.say);return (q.correct==='True')===w&&p.tage.length===3&&p.f.every(t=>t.length===5&&new Set(t).size===5)||'Aussage falsch bewertet'});
each('hoeren','frage',q=>{const p=lesePlan(q.html);let m;
  if(m=q.say.match(/^What is the (\w+) lesson on (\w+)\?$/))return q.correct===p.f[p.tage.indexOf(m[2])][ORDI(m[1])]||'Fach';
  if(m=q.say.match(/^What time is the (.+)\?$/)){const t=m[1]==='lunch break'?p.mittag:m[1]==='break'?p.pause:p.z[ORDI(m[1].split(' ')[0])];return liesZf(q.correct)===t||'Zeit'}
  return 'unbekannte Frage'});
{const alt=save.sound;save.sound=false;let ok=true;for(let i=0;i<40;i++){const q=gen('hoeren');if(q.kind!=='mc'||!q.html.includes(esc(q.say)))ok=false}save.sound=alt;
 A('Hör-Insel ohne Ton: dieselben Aufgaben zum Lesen',ok)}

// Wörter-Insel
const ZW=n=>n===100?'a hundred':n<20?Object.keys(WZ)[n]:['twenty','thirty','forty','fifty','sixty','seventy','eighty','ninety'][Math.floor(n/10)-2]+(n%10?'-'+Object.keys(WZ)[n%10]:'');
each('woerter','zahlwort',q=>{const n=+fett(q.prompt);return q.accept.includes(ZW(n))||'Zahlwort'});
each('woerter','zahlmc',q=>{const n=+fett(q.prompt);return q.correct===ZW(n)&&q.options.filter(o=>o.replace(/ /g,'-')===ZW(n)).length===1||'Schreibweise'});
each('woerter','zahllesen',q=>ZW(q.ans)===fett(q.prompt)||'Zahl');
each('woerter','luecke',q=>LUECKE.some(l=>l[0].replace('___','**___**')===q.prompt&&l[1]===q.correct)||'Lücke');
each('woerter','wort',q=>W.some(e=>deShow(e)===fett(q.prompt)&&e[1].split('|').includes(q.accept[0]))||'Wort');

// Uhrzeit-Insel
each('uhr','analog',q=>{const t=uhrAusSvg(q.html);return liesUhr(q.correct)===t&&q.options.every(o=>o===q.correct||liesUhr(o)!==t)||'Zeiger und Antwort passen nicht'});
each('uhr','bauen',q=>liesUhr(q.target.replace(/ \.$/,'').replace(/ /g,' '))===uhrAusSvg(q.html)||'Satz zur Uhr');
each('uhr','digital',q=>{const t=liesZf(fett(q.prompt));return liesUhr(q.correct)===t&&q.options.every(o=>o===q.correct||liesUhr(o)!==t)||'digital'});
each('uhr','lesen',q=>{const t=liesUhr(fett(q.prompt));return liesZf(q.correct)===t&&q.options.every(o=>o===q.correct||liesZf(o)!==t)||'lesen'});
each('uhr','deutsch',q=>{const t=liesDeutsch(fett(q.prompt)),fa=t%60===30&&q.options.some(o=>liesUhr(o)===(t+60)%720);
  return liesUhr(q.correct)===t&&q.options.every(o=>o===q.correct||liesUhr(o)!==t)&&(t%60!==30||fa)||'deutsch (halb = half past + Stunde davor, Falle muss dabei sein)'});
each('uhr','schreiben',q=>{const t=liesZf(fett(q.prompt)),h=Math.floor(t/60)||12,m=t%60;
  return q.accept.every(a=>liesUhr(a)===t)&&q.accept.length>=5&&q.accept.some(a=>/^It’s /.test(a))||'Schreiben'});

// Geburtstags-Insel
const MO=['January','February','March','April','May','June','July','August','September','October','November','December'],MD=['Januar','Februar','März','April','Mai','Juni','Juli','August','September','Oktober','November','Dezember'];
each('datum','ordwort',q=>q.accept[0]===ORDT[ABKT.indexOf(fett(q.prompt))]||'ausschreiben');
each('datum','ordmc',q=>q.correct===ORDT[ABKT.indexOf(fett(q.prompt))]||'Schreibweise');
each('datum','endung',q=>ABKT[+fett(q.prompt).replace('__','')]===fett(q.prompt).replace('__',q.correct)||'Endung');
each('datum','schreiben',q=>{const [,d,mo]=q.prompt.match(/\*\*(\d+)\. ([^*]+)\*\*/),M=MO[MD.indexOf(mo)];
  return +d<=[31,28,31,30,31,30,31,31,30,31,30,31][MD.indexOf(mo)]&&q.accept.includes(`on ${ABKT[d]} ${M}`)&&q.accept.includes(`on the ${ORDT[d]} of ${M}`)||'Datum'});
each('datum','sagen',q=>{const [,a,M]=fett(q.prompt).match(/^on (\w+) (\w+)$/);return q.correct===`on the ${ORDT[ABKT.indexOf(a)]} of ${M}`||'sagen'});
each('datum','inon',q=>q.correct===(/is \*\*___\*\* \w+\.$/.test(q.prompt)&&MO.some(m=>q.prompt.endsWith(m+'.'))?'in':'on')||'in/on');
each('datum','monat',q=>q.accept[0]===MO[MD.indexOf(fett(q.prompt))]||'Monat');
each('datum','folge',q=>{const i=MO.indexOf(fett(q.prompt));return q.correct===MO[(i+(/nach/.test(q.label)?1:11))%12]||'Reihenfolge'});

// a-oder-an-Insel: der Klang des Wortes direkt danach (Sonderfälle: hour, ICT, uniform, PE)
const artikel=w=>/^(hour|ICT)\b/.test(w)?'an':/^(uniform|PE)\b/.test(w)?'a':/^[aeiou]/i.test(w)?'an':'a';
each('aan','luecke',q=>q.correct===artikel(q.prompt.replace('**___** ',''))||'a/an');
each('aan','tippen',q=>q.accept[0]===artikel(q.prompt.split('**___** ')[1])||'a/an im Satz');
each('aan','fehler',q=>q.options.filter(o=>{const [a,...r]=o.split(' ');return a!==artikel(r.join(' '))}).join()===q.correct||'genau ein falscher');

// be-Insel
const FORM=s=>s==='I'?'am':/^(he|she|it|Tim|Mia|my mum|my dad|the cat)$/i.test(s)?'is':'are';
each('be','form',q=>q.correct===FORM(q.prompt.split(' **___**')[0])||'Form');
each('be','nicht',q=>{const s=fett(q.prompt).replace(/ (am|is|are) .*/,'');return q.correct===`${s}${{am:'’m not',is:' isn’t',are:' aren’t'}[FORM(s)]} `+fett(q.prompt).replace(/^.* (am|is|are) /,'')||'Verneinung'});
each('be','frage',q=>{const s=fett(q.prompt).replace(/ (am|is|are) .*/,'');return q.target.startsWith(cap(FORM(s))+' ')&&q.target.endsWith('?')||'Frage'});
const KURZ={I:['Yes, you are.','No, you aren’t.'],you:['Yes, I am.','No, I’m not.'],'you and Ben':['Yes, we are.','No, we aren’t.'],he:['Yes, he is.','No, he isn’t.'],she:['Yes, she is.','No, she isn’t.'],
 it:['Yes, it is.','No, it isn’t.'],they:['Yes, they are.','No, they aren’t.'],Tim:['Yes, he is.','No, he isn’t.'],Mia:['Yes, she is.','No, she isn’t.'],'my mum':['Yes, she is.','No, she isn’t.'],
 'my dad':['Yes, he is.','No, he isn’t.'],'the cat':['Yes, it is.','No, it isn’t.'],'Tim and Mia':['Yes, they are.','No, they aren’t.'],'the dogs':['Yes, they are.','No, they aren’t.'],'my friends':['Yes, they are.','No, they aren’t.']};
each('be','kurz',q=>{const [,s]=fett(q.prompt).match(/^\w+ (.+?) (ten years old|from Germany|late|at school|at home|nice|sad|friendly|in the classroom|black|big|here)\?$/);
  return q.correct===KURZ[s][/\(Ja\)/.test(q.prompt)?0:1]||'Kurzantwort'});
each('be','kurzform',q=>{const t={'I am':'I’m','You are':'You’re','He is':'He’s','She is':'She’s','It is':'It’s','We are':'We’re','They are':'They’re','I am not':'I’m not','You are not':'You aren’t','He is not':'He isn’t','She is not':'She isn’t','It is not':'It isn’t','We are not':'We aren’t','They are not':'They aren’t'};
  return q.correct===t[fett(q.prompt)]||'Kurzform'});

// there-is-Insel: das Bild zählen
const zaehle=(html,emo)=>{box.innerHTML=html;return [...box.querySelectorAll('.bild span')].reduce((a,s)=>a+s.textContent.split(emo).length-1,0)};
const DINGE=ZOO.concat(RAUM),wort=w=>DINGE.find(x=>x[1]===w||pl(x)===w);
const erwartet=(n,x)=>n===0?`There aren’t any ${pl(x)}.`:n===1?`There is ${x[2]} ${x[1]}.`:`There are ${ZW(n)} ${pl(x)}.`;
each('there','bild',q=>{box.innerHTML=q.html;const name=box.querySelector('p b').textContent.split(' ').slice(1).join(' '),x=wort(name);return q.correct===erwartet(zaehle(q.html,x[0]),x)||'Bild'});
each('there','luecke',q=>{box.innerHTML=q.html;const s=box.querySelector('p.big').textContent,m=s.match(/There ___ (a|an|any|[\w-]+) (.+)\.$/),x=wort(m[2]),n=zaehle(q.html,x[0]);
  const c=n===0?(m[1]==='any'?'aren’t':'isn’t'):n===1?'is':'are';return q.correct===c&&(n<2||ZW(n)===m[1])||'Lücke'});
each('there','frage',q=>{box.innerHTML=q.html;const f=box.querySelector('p.big').textContent,m=f.match(/^(Is there (?:a|an)|Are there any) (.+)\?$/),x=wort(m[2]),n=zaehle(q.html,x[0]),sg=m[1].startsWith('Is');
  return (sg?n<=1:n!==1)&&q.correct===(sg?(n?'Yes, there is.':'No, there isn’t.'):(n?'Yes, there are.':'No, there aren’t.'))||'Kurzantwort'});
each('there','tippen',q=>{box.innerHTML=q.html;const s=box.querySelector('p.big').textContent,m=s.match(/There ___ (a|an|[\w-]+) (.+)\.$/),n=zaehle(q.html,wort(m[2])[0]);return q.accept[0]===(n===1?'is':'are')&&n>0||'tippen'});
each('there','bauen',q=>/^(Is there (a|an) [\w ]+|Are there any [\w ]+) (at the zoo|in the classroom) \?$/.test(q.target)||'Frage bauen');

// Schreib-Insel: die richtigen Sätze sind wirklich richtig (Großschreibung, Wortstellung, britische Schreibweise)
each('schreiben','richtig',q=>!/favorite|On Monday have|\bit gives\b|\bund\b/i.test(q.correct)&&/^[A-Z]/.test(q.correct)||'Satz');
A('Schreib-Insel: jeder Fehlersatz ist wirklich anders als der richtige',RICHTIG.every(r=>new Set(r.slice(0,4)).size===4&&r[4]));

// Wortcheck: alle englischen Sätze nur mit Wörtern aus der Wortliste (bis Seite 194), Grundwörtern, Kurzformen von be und Zahlen nach den Regeln
{const tk=t=>t.toLowerCase().replace(/[‘’]/g,"'").match(/[a-z][a-z'-]*[a-z]|[a-z]/g)||[];
 const known=new Set([...W.flatMap(e=>e[1].split('|').flatMap(tk)),'a','an','the','and','i','you','he','she','it','we','they','am','is','are','not','my','in','to','on','this','that','there','at','of',
  "it's","he's","she's","we're","you're","they're","i'm","isn't","aren't","there's",'tim','ben','lea','mia','sam','plymouth','true','false','yes','no','st','nd','rd','th',
  ...Array.from({length:101},(_,n)=>ZW(n)).flatMap(tk),...ORDT.flatMap(tk)]);
 const ok=w=>w.length===1||[w,w.replace(/'s$/,''),w.replace(/es$/,''),w.replace(/s$/,'')].some(v=>known.has(v));let bad=new Set();
 for(const [isl,o] of Object.entries(SUB))for(const sub of Object.keys(o))for(let i=0;i<60;i++){const q=gen(isl,sub);
   const en=[q.say,q.target,q.kind==='type'?q.accept[0]:'',['mc','listen'].includes(q.kind)?q.correct:''].filter(Boolean).join(' ');
   for(const w of tk(en))if(!ok(w)&&!bad.has(w)){bad.add(w);P(`${isl}.${sub}: unbekanntes Wort „${w}“ in ${en}`)}}
 A('Wortcheck: nur bekannte Wörter',bad.size===0)}

// Ich-kann-Check: zwei Aufgaben je Punkt der Checkliste, am Ende die Liste
{start('check');A('Ich-kann-Check: 16 Aufgaben, zwei je Insel, verschiedene Arten',G.total===16&&TOPICS.every(t=>G.queue.filter(q=>q.isl===t.id).length===2&&new Set(G.queue.filter(q=>q.isl===t.id).map(q=>q.sub)).size===2));
 let g=0;while(!$('.end')&&g++<40){solve(G.queue[0]);$('#nx').click()}
 A('Ich-kann-Check: alles richtig = acht lachende Gesichter',$$('.cancheck tr').length===9&&$$('.cancheck .face').every(f=>f.textContent==='😀'))}
{start('uhr');let g=0;while(!$('.end')&&g++<40){const q=G.queue[0];q.redo?solve(q):solveWrong(q);$('#nx').click()}A('Uhrzeit-Insel: Runde mit Fehlern läuft bis zum Ende',!!$('.end'))}
// Startseite, Spickzettel, Spiele
home();A('Startseite: acht Inseln, Ich-kann-Check, Spickzettel',$$('.isles .tile').length===8&&!!$('[data-t="check"]')&&/on the fifth of August/.test($('details').textContent));
{let ok=true;for(let i=0;i<200;i++){const q=quickQ();if(q.kind!=='mc'||q.isl==='hoeren')ok=false}A('Blitzrunde: nur Antippen, ohne Hör-Insel',ok)}
home();$('#gm').click();A('Memory: sechs Paare, alle Karten verschieden',$$('.card').length===12&&new Set(M.cards.map(c=>c.t)).size===12);
home();
done();
