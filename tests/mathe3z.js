// Tausender-Inseln (Mathe 3, Zahlen bis 1000): jede Aufgabe aus der Anzeige unabhängig nachprüfen; Runden, Check, Spiele
const N=250,zahlen=t=>(t.match(/\d+/g)||[]).map(Number);
const text=h=>{box.innerHTML=h;return box.textContent.replace(/\s+/g,' ').trim()},bigT=h=>{box.innerHTML=h;return box.querySelector('.big').textContent.trim()};
function each(isl,sub,f){for(let i=0;i<N;i++){const q=gen(isl,sub);try{const r=f(q);if(r!==true)P(`${isl}.${sub}: ${r} | ${text(q.html||'')} | ${q.correct||q.ans||q.target||q.hits}`)}catch(e){P(`${isl}.${sub}: ${e.message} | ${text(q.html||'')}`)}
  if(q.kind==='mc'&&(new Set(q.options).size!==q.options.length||!q.options.includes(q.correct)||q.options.length<2))P(`${isl}.${sub}: Optionen ${q.options}`)}}
const ziffernSumme=n=>String(n).split('').reduce((a,b)=>a+ +b,0);
// Zahlbilder und Plättchen: Formen zählen
const stw=()=>[...box.querySelectorAll('.stw td')].map(t=>t.querySelectorAll('.pl').length);
each('bild','lesen',q=>{box.innerHTML=q.html;return box.querySelectorAll('rect.hq').length*100+box.querySelectorAll('line.zs').length*10+box.querySelectorAll('circle.ep').length===q.ans||'Geheimschrift'});
each('bild','plaettchen',q=>{box.innerHTML=q.html;const d=stw();return d[0]*100+d[1]*10+d[2]===q.ans||'Plättchen'});
each('bild','schieben',q=>{box.innerHTML=q.html;const d=stw(),W={Hundertern:100,Zehnern:10,Einern:1},m=box.textContent.match(/von den (\w+) zu den (\w+)/);
  return d[0]*100+d[1]*10+d[2]-W[m[1]]+W[m[2]]===q.ans&&m[1]!==m[2]||'verschieben'});
each('bild','mitk',q=>{const k=+q.html.match(/genau <b>(\d) Plättchen/)[1],h=q.tiles.flatMap((t,i)=>ziffernSumme(t)===k?[i]:[]);return h.join()===q.hits.join()&&h.length>=1&&h.length<q.tiles.length||'mit k Plättchen'});
for(const s of ['zeichnen','legen'])each('bild',s,q=>q.ans===zahlen(text(q.html))[0]&&q.ans>0&&q.ans<1000||'zeichnen');
// Tausenderbuch: Zeile und Spalte selbst bestimmen (118 steht in der 2. Zeile und 8. Spalte)
const zl=n=>Math.ceil((n%100||100)/10),sp=n=>n%10||10,tafel=n=>Math.ceil(n/100);
A('Tausenderbuch: Beispiel aus dem Buch (118: 2. Zeile, 8. Spalte)',zl(118)===2&&sp(118)===8&&zeile(118)===2&&spalte(118)===8);
each('buch','nachbar',q=>{const t=text(q.html),n=zahlen(t)[0],w=t.match(/direkt (unter|über|links neben|rechts neben)/)[1],d={'unter':10,'über':-10,'links neben':-1,'rechts neben':1}[w],a=n+d;
  return a===q.ans&&tafel(a)===tafel(n)&&(Math.abs(d)===1?zl(a)===zl(n):sp(a)===sp(n))||'Nachbar im Buch'});
each('buch','lage',q=>{const t=text(q.html),n=zahlen(t)[0];return (/In welcher Zeile/.test(t)?zl(n):sp(n))===q.ans||'Zeile/Spalte'});
each('buch','ausschnitt',q=>{box.innerHTML=q.html;const c=[...box.querySelectorAll('.tafel td')].map(t=>t.textContent.trim()),vis=c.map((v,i)=>[v,i]).filter(([v])=>/^\d+$/.test(v)),[v0,i0]=vis[0],base=+v0-10*Math.floor(i0/3)-i0%3,hid=c.findIndex(v=>!/^\d+$/.test(v));
  return vis.every(([v,i])=>+v===base+10*Math.floor(i/3)+i%3)&&q.ans===base+10*Math.floor(hid/3)+hid%3&&new Set(c.map((v,i)=>tafel(base+10*Math.floor(i/3)+i%3))).size===1&&zl(base)<=8&&sp(base)<=8||'Ausschnitt'});
each('buch','schritte',q=>{const [a,b]=zahlen(text(q.html));return b-a===q.ans||'Schritte'});
each('buch','gemeinsam',q=>{const ns=bigT(q.html).split(', ').map(Number),gilt=o=>{const d=+o.match(/eine (\d)/)[1],i=/Einer/.test(o)?2:/Zehner/.test(o)?1:0;return ns.every(n=>String(n).padStart(3,'0')[i]===String(d))};
  return q.options.filter(gilt).length===1&&gilt(q.correct)||'Gemeinsamkeit'});
// Zerlegen
const stellenwert=x=>x>0&&/^[1-9]0*$/.test(String(x));
each('zerlegen','luecke',q=>{const [l,r]=bigT(q.html).replace('●',q.ans).split(' = '),t=r.split(' + ').map(Number);return t.reduce((a,b)=>a+b,0)===+l&&t.every(stellenwert)||'zerlegen'});
each('zerlegen','zusammen',q=>{const t=bigT(q.html).replace(' = ?','').split(' + ').map(Number);return t.reduce((a,b)=>a+b,0)===q.ans&&t.every(stellenwert)||'zusammensetzen'});
each('zerlegen','hze',q=>{let v=0;for(const m of bigT(q.html).matchAll(/(\d) ([HZE])/g))v+=+m[1]*{H:100,Z:10,E:1}[m[2]];return v===q.ans||'H Z E'});
each('zerlegen','stelle',q=>{const t=text(q.html),n=String(zahlen(t)[0]),i=/Hunderter/.test(t)?0:/Zehner/.test(t)?1:2;return +n[i]===q.ans||'Stelle'});
each('zerlegen','wert',q=>{const t=text(q.html),[n,d]=zahlen(t),s=String(n),i=s.indexOf(String(d));return s.split(String(d)).length===2&&+q.correct===d*10**(2-i)||'Wert der Ziffer'});
const FAKT={'10 Hunderter sind …':'1000','Wie viele Hunderter sind 1000?':'10','Wie viele Zehner sind 1000?':'100','Wie viele Zehner sind 100?':'10','10 Zehner sind …':'100','1000 Einer sind …':'1 Tausender'};
each('zerlegen','tausender',q=>FAKT[text(q.html)]===q.correct||'Tausender-Fakt');
// Zahlwörter: eigener Leser
const TOK=/(dreizehn|vierzehn|fünfzehn|sechzehn|siebzehn|achtzehn|neunzehn|zwanzig|dreißig|vierzig|fünfzig|sechzig|siebzig|achtzig|neunzig|zehn|elf|zwölf|eins|ein|zwei|drei|vier|fünf|sechs|sieben|acht|neun|hundert|tausend|und)/g;
const V={eins:1,ein:1,zwei:2,drei:3,vier:4,fünf:5,sechs:6,sieben:7,acht:8,neun:9,zehn:10,elf:11,zwölf:12,dreizehn:13,vierzehn:14,fünfzehn:15,sechzehn:16,siebzehn:17,achtzehn:18,neunzehn:19,zwanzig:20,dreißig:30,vierzig:40,fünfzig:50,sechzig:60,siebzig:70,achtzig:80,neunzig:90};
const lies=s=>{if(s.replace(TOK,'')!=='')return NaN;let tot=0,cur=0;for(const t of s.match(TOK)){if(t==='und')continue;if(t==='hundert')cur=(cur||1)*100;else if(t==='tausend'){tot+=(cur||1)*1000;cur=0}else cur+=V[t]}return tot+cur};
A('Zahlwörter: Beispiele aus dem Buch',lies('einhundertsiebenunddreißig')===137&&words(137)==='einhundertsiebenunddreißig'&&words(851)==='achthunderteinundfünfzig'&&words(909)==='neunhundertneun'&&words(273)==='zweihundertdreiundsiebzig'&&words(802)==='achthundertzwei'&&words(980)==='neunhundertachtzig');
{let bad=0;for(let n=1;n<=1000;n++)if(lies(words(n))!==n){bad++;P('Zahlwort '+n+': '+words(n))}A('Zahlwörter: alle Zahlen von 1 bis 1000 richtig',bad===0)}
each('wort','lesen',q=>{box.innerHTML=q.html;return lies(box.querySelector('.words').textContent)===q.ans||'Zahlwort lesen'});
each('wort','schreiben',q=>{const n=+bigT(q.html);return q.options.filter(o=>lies(o)===n).length===1&&lies(q.correct)===n||'Zahlwort wählen'});
each('wort','dreher',q=>{box.innerHTML=q.html;const w=lies(box.querySelector('.words').textContent),z=+bigT(q.html).replace('= ','');return (w===z?'Stimmt':'Stimmt nicht')===q.correct||'Stimmt das?'});
// Zahlenstrahl: Beschriftung und Pfeil auslesen
const strahl=h=>{box.innerHTML=h;const svg=box.querySelector('svg'),lab=[...svg.querySelectorAll('text')].map(x=>+x.textContent),a=svg.querySelector('.arrowline');return {lab,st:(lab[1]-lab[0])/10,i:a?Math.round((+a.getAttribute('x1')-30)/13):null}};
each('strahl','pfeil',q=>{const s=strahl(q.html);return s.lab[0]+s.i*s.st===q.ans&&s.lab[2]<=1000&&s.lab[0]>=0||'Pfeil'});
each('strahl','schritt',q=>strahl(q.html).st===+q.correct||'Schritt');
each('strahl','markieren',q=>q.start+q.i*q.step===zahlen(text(q.html))[0]&&q.start+20*q.step<=1000||'Markieren');
each('strahl','zwischen',q=>{const [a,b]=zahlen(text(q.html));return q.options.filter(o=>+o>a&&+o<b).length===1&&+q.correct>a&&+q.correct<b||'dazwischen'});
// Nachbarn
each('nachbar','vn',q=>{const t=text(q.html),n=zahlen(t)[0];return (/Vorgänger/.test(t)?n-1:n+1)===q.ans&&q.ans>=0&&q.ans<=1000||'Vorgänger/Nachfolger'});
for(const [s,st] of [['nz',10],['nh',100]])each('nachbar',s,q=>{const n=zahlen(text(q.html))[0],ok=o=>{const [a,b]=zahlen(o);return a%st===0&&b===a+st&&a<n&&n<b};
  return q.options.filter(ok).length===1&&ok(q.correct)&&q.options.every(o=>zahlen(o).every(x=>x>=0&&x<=1000))||'Nachbarzehner/-hunderter'});
each('nachbar','naeher',q=>{const t=text(q.html),n=zahlen(t)[0],st=/zehner/.test(t)?10:100,lo=Math.floor(n/st)*st;return n-lo!==st/2&&q.ans===(n-lo<st/2?lo:lo+st)||'näher'});
each('nachbar','ergaenzen',q=>{const t=bigT(q.html).replace('●',q.ans),[l,r]=t.split(' = '),[a,op,b]=l.split(' ');const v=op==='+'?+a+ +b:+a-b;return v===+r&&+r%10===0&&Math.abs(+r-+a)<10||'Nachbarzehner rechnen'});
each('nachbar','folge',q=>{const f=bigT(q.html).split(', ').slice(0,3).map(Number),d=f[1]-f[0];return f[2]-f[1]===d&&q.ans===f[2]+d&&q.ans>=0&&q.ans<=1000||'Folge'});
// Ordnen
const wertVon=x=>/[HZE]/.test(x)?[...x.matchAll(/(\d) ([HZE])/g)].reduce((a,m)=>a+m[1]*{H:100,Z:10,E:1}[m[2]],0):x.split(' + ').reduce((a,b)=>a+ +b,0);
each('ordnen','ordnen',q=>{const up=/kleinsten/.test(q.label),s=q.tiles.map(Number).sort((a,b)=>up?a-b:b-a);return s.join(' ')===q.target&&new Set(q.tiles).size===q.tiles.length||'Ordnen'});
each('ordnen','vergleich',q=>{const [l,r]=bigT(q.html).split(' ● '),a=wertVon(l),b=wertVon(r);return (a<b?'<':a>b?'>':'=')===q.correct&&a>0&&b>0||'Vergleich'});
each('ordnen','groesste',q=>{const v=q.options.map(Number);return +q.correct===(/größte/.test(q.label)?Math.max(...v):Math.min(...v))||'größte/kleinste'});
each('ordnen','ziffern',q=>{const t=text(q.html),d=zahlen(t.match(/Ziffern ([\d, und]+)/)[1]),g=/größte/.test(t),s=d.slice().sort((a,b)=>g?b-a:a-b).join('');return +s===q.ans&&d.length===3||'Zahlen bilden'});
// Körper: eigene Tabelle
const K={'Würfel':{e:8,k:12,f:6,rollt:0},'Quader':{e:8,k:12,f:6,rollt:0},'Pyramide':{e:5,k:8,f:5,rollt:0},'Kugel':{e:0,k:0,f:1,rollt:1},'Zylinder':{e:0,k:2,f:3,rollt:1},'Kegel':{rollt:1}};
const beide=q=>['Würfel','Quader'].includes(q.correct)&&q.options.includes('Würfel')&&q.options.includes('Quader'); // ein Würfel ist auch ein Quader
each('koerper','name',q=>!beide(q)&&Object.keys(K).includes(q.correct)||'Name');
each('koerper','steckbrief',q=>{const t=text(q.html),k=Object.keys(K).find(x=>t.includes(x)),w=t.match(/(Ecken|Kanten|Flächen)/)[1];return k!=='Kegel'&&K[k][{Ecken:'e',Kanten:'k',Flächen:'f'}[w]]===q.ans||'Steckbrief'});
const ALLTAG={'ein Ball':'Kugel','eine Murmel':'Kugel','eine Dose':'Zylinder','eine Kerze':'Zylinder','ein Spielwürfel':'Würfel','ein Schuhkarton':'Quader','ein Ziegelstein':'Quader','eine Eistüte (ohne Eis)':'Kegel','ein Partyhut':'Kegel','eine Pyramide in Ägypten':'Pyramide'};
each('koerper','alltag',q=>!beide(q)&&ALLTAG[text(q.html).match(/hat (.+)\?/)[1]]===q.correct||'Alltag');
const RAETSEL=[[/gleich große Quadrate/,'Würfel'],[/nicht alle gleich groß/,'Quader'],[/keine Ecken und keine Kanten/,'Kugel'],[/zwei Kreise/,'Zylinder'],[/Spitze/,'Kegel'],[/Dreiecke/,'Pyramide']];
each('koerper','raetsel',q=>{const t=text(q.html),m=RAETSEL.filter(([r])=>r.test(t));return m.length===1&&m[0][1]===q.correct&&!beide(q)||'Rätsel'});
each('koerper','rollen',q=>{const ecken=/Ecken/.test(q.label),f=k=>ecken?K[k].e>0:K[k].rollt===1;return (!ecken||!q.tiles.includes('Kegel'))&&q.tiles.flatMap((k,i)=>f(k)?[i]:[]).join()===q.hits.join()||'Rollen/Ecken'});
const geprueft=['bild.lesen','bild.zeichnen','bild.plaettchen','bild.legen','bild.schieben','bild.mitk','buch.nachbar','buch.lage','buch.ausschnitt','buch.schritte','buch.gemeinsam',
 'zerlegen.luecke','zerlegen.zusammen','zerlegen.hze','zerlegen.stelle','zerlegen.wert','zerlegen.tausender','wort.lesen','wort.schreiben','wort.dreher','strahl.pfeil','strahl.markieren','strahl.schritt','strahl.zwischen',
 'nachbar.vn','nachbar.nz','nachbar.nh','nachbar.naeher','nachbar.ergaenzen','nachbar.folge','ordnen.ordnen','ordnen.vergleich','ordnen.groesste','ordnen.ziffern','koerper.name','koerper.alltag','koerper.steckbrief','koerper.raetsel','koerper.rollen'];
A('jede Aufgabenart hat eine Prüfung',Object.entries(SUB).every(([i,o])=>Object.keys(o).every(k=>geprueft.includes(i+'.'+k))));
// Sprache: keine Mehrzahl nach „1“, keine Zahl mit Endung in der Überschrift
{let ok=true;for(const isl of Object.keys(SUB))for(const sub of Object.keys(SUB[isl]))for(let i=0;i<100;i++){const q=gen(isl,sub),t=text(q.html||'')+' '+q.sol;
  if(/(^|\D)1 (Quadrate|Striche|Punkte|Schritte|Ecken|Kanten|Flächen|Zeilen|Spalten)\b/.test(t)||/\?:/.test(t)||/\d(er|ER)\b/.test(q.label)){ok=false;P(`Sprache ${isl}.${sub}: ${q.label} | ${t}`)}}A('Sprache: Einzahl nach 1, keine Zahl mit Endung in der Überschrift',ok)}
A('alle Aufgabenarten nachgeprüft: keine Fehler',probs.n===0);
// Bedienen wie ein Kind: Zeichnen mit + und −, Pfeil setzen
{start('bild');const q=gen('bild','zeichnen');G.queue=[q];G.total=1;show();const [h,z,e]=String(q.ans).padStart(3,'0').split('').map(Number),plus=i=>$$(`.zaehler [data-i="${i}"][data-s="1"]`)[0];
 plus(1).click();$$('.zaehler [data-i="1"][data-s="-1"]')[0].click();for(let k=0;k<h;k++)plus(0).click();for(let k=0;k<z;k++)plus(1).click();for(let k=0;k<e;k++)plus(2).click();
 const svg=$('#zb svg');const ok=svg.querySelectorAll('rect.hq').length===h&&svg.querySelectorAll('line.zs').length===z&&svg.querySelectorAll('circle.ep').length===e;$('#bp').click();
 A('Zeichnen: mit + und − die Geheimschrift legen, Bild wächst mit, dann richtig',ok&&G.first===1)}
{start('bild');const q=gen('bild','legen');G.queue=[q];G.total=1;show();$('#bp').click();A('Zeichnen: ohne Plättchen gibt es einen Hinweis statt einer Wertung',!G.answered&&/Tippe auf \+/.test($('#fb').textContent))}
{start('strahl');const q=gen('strahl','markieren');G.queue=[q];G.total=1;show();const svg=$('.marksvg'),[x,y]=client(svg,30+q.i*13,40);ptr(svg,'pointerdown',x,y);ptr(svg,'pointerup',x,y);$('#bp').click();
 A('Zahlenstrahl: Teilstrich antippen setzt den Pfeil, dann richtig',G.first===1)}
// Runden, Check, Blitzrunde, Memory, Vergleichs-Spiel
const runs=[...TOPICS.map(t=>t.id),'mix','check'].map(t=>[t,perfect(t).stars]);A('fehlerfreie Runde = 3 Sterne (alle Inseln, Rundfahrt, Check)',runs.every(r=>r[1]===3));
start('check');A('Check: 16 Aufgaben aus allen 8 Themen der Checkliste',G.total===16&&new Set(G.queue.map(q=>q.isl)).size===8);
let g=0;while(!$('.end')&&g++<90){const q=G.queue[0];g<=2?solveWrong(q):solve(q);$('#nx').click()}
const rows=$$('.cancheck tr').slice(1).map(r=>r.querySelector('.face').textContent);A('Check-Tabelle: erstes Thema 🙁, Rest 😀',rows.length===8&&rows[0]==='🙁'&&rows.slice(1).every(f=>f==='😀'));
let qq=true;for(let i=0;i<500;i++){const x=quickQ();if(x.kind!=='mc'||new Set(x.options).size!==x.options.length||!x.options.includes(x.correct)||x.options.length<2)qq=false}
A('Blitzrunde: nur Auswahlfragen mit eindeutigen Antworten',qq);
let mOk=true;for(let i=0;i<100;i++){home();$('#gm').click();const t=M.cards.map(c=>c.t),nums=t.filter(x=>/^\d+$/.test(x));
  if(t.length!==12||new Set(t).size!==12)mOk=false;for(const x of t.filter(x=>!/^\d+$/.test(x)))if(nums.filter(n=>+n===(/[HZE]/.test(x)?wertVon(x):lies(x))).length!==1)mOk=false}
A('Memory: 12 Karten, jede Karte passt zu genau einer Zahl',mOk);
home();$('#gv').click();{const it=X.it;$(`[data-b="${VERGLEICH.bins.indexOf(it.bin)}"]`).click();A('Größer oder kleiner?: richtige Antwort zählt',X.n===1)}
sortWeiter();for(let k=0;k<3;k++){$(`[data-b="${(VERGLEICH.bins.indexOf(X.it.bin)+1)%3}"]`).click();sortWeiter()}
A('Größer oder kleiner?: nach drei Fehlern Ende mit Rekord',!!$('.end')&&save.vergleich===1);
home();
done();
