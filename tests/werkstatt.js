// Regel-Detektiv und Szenen (Englisch und Spanisch): Daten eindeutig, nur bekannte Wörter, Ablauf, Punkte nur bis zum ersten fehlerfreien Durchgang
{const ok=[];for(const g of GRAMMATIK){const a=g.antworten,auf=g.aufgaben;
  if(a.length<2||new Set(a).size!==a.length||!g.regel||!g.beispiele.length||auf.length<4)ok.push(g.id);
  for(const x of auf)if(x.length<3||new Set(x.slice(1)).size!==x.length-1||(x[0].split('___').length>2))ok.push(g.id+': '+x[0])}
 for(const s of SZENEN){const du=s.zeilen.filter(z=>z[0]==='du');if(du.length<2||!s.zeilen.every(z=>['a','du'].includes(z[0])&&z[2]))ok.push(s.id);
  for(const z of du)if(z[1].length<3||new Set(z[1]).size!==z[1].length)ok.push(s.id+': '+z[1][0])}
 ok.forEach(P);A('Regeln und Szenen: Aufgaben vollständig, Antworten verschieden, ids eindeutig',!ok.length&&new Set(GRAMMATIK.map(g=>g.id)).size===GRAMMATIK.length&&new Set(SZENEN.map(s=>s.id)).size===SZENEN.length)}
// Wortcheck wie im Lese-Hafen: Beispiele, richtige Lösungen und alle Sätze der Szenen nur mit Wörtern aus der Wortliste und den Grundwörtern
{const tk=t=>t.toLowerCase().replace(/[‘’]/g,"'").replace(/\*\*/g,'').match(/\p{L}[\p{L}'-]*\p{L}|\p{L}/gu)||[],known=new Set([...W.flatMap(e=>e[1].split('|').flatMap(tk)),...Object.keys(LESETEXTE.GRUND)]);
 const ok=w=>[w,w.replace(/'s$/,''),w.replace(/es$/,''),w.replace(/s$/,'')].some(v=>known.has(v)),pruef=(wo,ts)=>{const bad=[...new Set(ts.flatMap(tk).filter(w=>!ok(w)))];if(bad.length)P(`${wo}: unbekannte Wörter ${bad.join(', ')}`);return bad.length};
 let fremd=0;for(const g of GRAMMATIK)fremd+=pruef('Regel '+g.id,[...g.beispiele.map(b=>b[0]),...g.aufgaben.map(a=>a[0].includes('___')?a[0].replace('___',a[1]):a[1])]);
 for(const s of SZENEN)fremd+=pruef('Szene '+s.id,s.zeilen.flatMap(z=>z[0]==='a'?[z[1]]:z[1]));
 A('Regeln und Szenen: nur Wörter aus der Wortliste und Grundwörter',fremd===0)}
// Startseite: zwei neue Kacheln
home();$('#grg').click();A('Regel-Detektiv: eine Kachel je Regel',$$('[data-rg]').length===GRAMMATIK.length);
home();$('#gsz').click();A('Szenen: eine Kachel je Szene',$$('[data-sz]').length===SZENEN.length);
// Regel-Detektiv: falsche Vermutung kostet nichts und bleibt auf der Seite; richtige zeigt die Regel; Aufgaben mit Punkten, beim Wiederholen ohne
{save.regeln={};const g=GRAMMATIK[0],xp0=save.xp;regel(g.id);const b=t=>$$('.opt').find(x=>x.textContent===t);
 b(g.antworten[1]).click();const nachFehler=!$('#nx')&&b(g.antworten[1]).disabled&&!b(g.antworten[0]).disabled;
 b(g.antworten[0]).click();A('Regel-Detektiv: falsche Vermutung sperrt nur diese Antwort, die richtige zeigt die Regel',nachFehler&&$('#fb').textContent.includes(g.regel)&&!!$('#nx'));
 $('#nx').click();const loes=()=>{const s=$('.big').textContent,a=g.aufgaben.find(x=>x[0]===s);return a[1]};
 let erst=true;for(let i=0;i<g.aufgaben.length;i++){const r=loes();if(erst){$$('.opt').find(x=>x.textContent!==r).click();erst=false;A('Regel-Detektiv: Fehler zeigt Lösung und Regel',$('#fb').textContent.includes('Richtig ist: '+r)&&$('#fb').textContent.includes(g.regel))}else $$('.opt').find(x=>x.textContent===r).click();$('#nx').click()}
 A('Regel-Detektiv: Ergebnis gespeichert, 2 Punkte je richtige Aufgabe',save.regeln[g.id]===g.aufgaben.length-1&&save.xp===xp0+2*(g.aufgaben.length-1)&&!!$('.end'));
 const run=()=>{regel(g.id);$$('.opt').find(x=>x.textContent===g.antworten[0]).click();$('#nx').click();for(let i=0;i<g.aufgaben.length;i++){const r=loes();$$('.opt').find(x=>x.textContent===r).click();$('#nx').click()}};
 run();const xp1=save.xp;run();A('Regel-Detektiv: Punkte nur, bis alles einmal richtig war',save.regeln[g.id]===g.aufgaben.length&&xp1===xp0+2*(g.aufgaben.length-1)+2*g.aufgaben.length&&save.xp===xp1);
 regeln();A('Regel-Detektiv: Liste zeigt „alles richtig“',$(`[data-rg="${g.id}"]`).textContent.includes('alles richtig'))}
// Szenen: Gesprächspartner spricht zuerst, falsche Antwort sperrt nur diese, richtige erscheint als eigene Sprechblase; am Ende alle Zeilen sichtbar
{save.szenen={};const s=SZENEN[0],du=s.zeilen.filter(z=>z[0]==='du'),xp0=save.xp;szene(s.id);
 A('Szenen: erst spricht '+s.wer,$$('.sz').length===s.zeilen.findIndex(z=>z[0]==='du')&&!$('.sz.du'));
 let k=0,zwei=true;while($('#wahl .opt')){const z=du[k++],btn=t=>$$('#wahl .opt').find(x=>x.textContent===t);
  if(k===1){btn(z[1][1]).click();btn(z[1][2]).click();zwei=btn(z[1][1]).disabled&&btn(z[1][2]).disabled&&!$('#nx')}
  btn(z[1][0]).click();if($('#nx'))$('#nx').click()}
 A('Szenen: alle Zeilen erscheinen, deine Antworten rechts',zwei&&$$('.sz').length===s.zeilen.length&&$$('.sz.du').length===du.length&&$$('.sz.du p span').map(p=>p.textContent).every((t,i)=>t===du[i][1][0]));
 A('Szenen: zwei Fehlversuche in einer Zeile = ein Fehler, Punkte nur für die anderen Zeilen',save.szenen[s.id]===1&&save.xp===xp0+2*(du.length-1));
 const fehlerfrei=()=>{szene(s.id);let k=0;while($('#wahl .opt')){const t=du[k++][1][0];$$('#wahl .opt').find(x=>x.textContent===t).click();if($('#nx'))$('#nx').click()}};
 fehlerfrei();const xp1=save.xp;fehlerfrei();
 A('Szenen: ohne Fehler gespeichert, danach keine Punkte mehr',save.szenen[s.id]===0&&save.xp===xp1);
 szenen();A('Szenen: Liste zeigt „ohne Fehler“',$(`[data-sz="${s.id}"]`).textContent.includes('ohne Fehler'))}
home();
done();
