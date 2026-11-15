// Spanisch-Inseln (A1): Besonderheiten der Sprache (Akzente, Artikel, ñ, ¿) und die gemeinsamen Spiele mit spanischen Daten
A('Startseite: jede Insel auf der Karte und mit Platz auf der Seekarte',$$('.isl').length===TOPICS.length&&MAP.length===TOPICS.length&&!!$('#gb')&&!!$('#gm'));
A('Nur eine Unit: keine Schilder „neu“, keine Fahrt nach Units',!$('.map .neu')&&!$('#gbs'));
// Eintippen wie ein Kind
const tippe=(e,t)=>{start(e[0]);const q=makeQ(e);q.kind='type';q.type=true;q.dir='de2en';G.queue=[q];G.total=1;show();$('#ti').value=t;$('#tf').requestSubmit();return {ok:G.first===1,fb:$('#fb').textContent}};
const lapiz=W.find(e=>e[1]==='el lápiz'),que=W.find(e=>e[1]==='¿qué?'),lunes=W.find(e=>e[1]==='lunes');
A('Tippen: „el lápiz“ und „lápiz“ (ohne Artikel) sind richtig',tippe(lapiz,'el lápiz').ok&&tippe(lapiz,'lápiz').ok);
{const r=tippe(lapiz,'el lapiz');A('Tippen: ohne Akzent falsch mit Hinweis auf die Akzente',!r.ok&&/Akzente/.test(r.fb))}
{const r=tippe(lapiz,'la lápiz');A('Tippen: falscher Artikel falsch mit Hinweis auf den Artikel',!r.ok&&/Artikel/.test(r.fb))}
{const r=tippe(lunes,'Lunes');A('Tippen: Wochentage klein, „Lunes“ mit Hinweis auf Groß- und Kleinschreibung',!r.ok&&/Groß- und Kleinschreibung/.test(r.fb))}
A('Tippen: „qué“ für „¿qué?“ ist richtig (¿ und ? zählen nicht)',tippe(que,'qué').ok&&tippe(que,'¿qué?').ok);
{start('escuela');const q=makeQ(lapiz);q.kind='type';q.type=true;q.dir='de2en';G.queue=[q];G.total=1;show();const i=$('#ti');i.value='el lpiz';i.setSelectionRange(4,4);
 $('[data-z="á"]').click();A('Sonderzeichen-Taste setzt á an der Schreibstelle ein',i.value==='el lápiz'&&$$('[data-z]').length===SPRACHE.sonder.length);
 $('#hint').click();A('Tipp zeigt Artikel und ersten Buchstaben des Nomens',/^e l\s+l /.test($('#slots').textContent.replace(/ /g,' ')))}
// Fehlerfreie Runden auf allen Inseln
const runs=[...TOPICS.map(t=>t.id),'mix'].map(t=>[t,perfect(t).stars]);runs.forEach(([t,s])=>{if(s!==3)P('keine 3 Sterne: '+t)});
A('fehlerfreie Runde = 3 Sterne (alle Inseln und Rundfahrt)',runs.every(r=>r[1]===3));
// Schatztruhe: á zählt als a, ñ ist ein eigener Buchstabe
{truhe();X.e=W.find(e=>e[1]==='la niña');X.w='la niña';X.got=new Set(['l']);X.wrong=0;truheDraw();truheRate('n');const zu=$$('.bs:not(.frei)').filter(b=>!b.textContent).length;
 truheRate('i');truheRate('a');const fast=!$('#fb .fb');truheRate('ñ');A('Schatztruhe: „n“ öffnet nicht das ñ, „a“ öffnet a, „ñ“ hat eine eigene Taste',zu===4&&fast&&/Truhe ist offen/.test($('#fb').textContent)&&!!$('[data-c="ñ"]'))}
{truhe();X.e=W.find(e=>e[1]==='el ratón');X.w='el ratón';X.got=new Set(['e']);X.wrong=0;truheDraw();for(const c of 'lratn')truheRate(c);const offen=!/Truhe ist offen/.test($('#fb').textContent);truheRate('o');
 A('Schatztruhe: „o“ öffnet auch das ó',offen&&/Truhe ist offen/.test($('#fb').textContent))}
// Stimmt's? und Memory mit spanischen Wörtern: nie bedeutungsnahe Wörter gegeneinander
{let ok=true,ja=0;for(let i=0;i<400;i++){const it=DUELL.next();box.innerHTML=it.html;const [es,de]=box.textContent.split(' = '),e=W.find(x=>x[1].split('|').includes(es)),von=W.find(x=>deShow(x)===de);
  const wahr=deShow(e)===de;if(wahr)ja++;if((wahr?'Stimmt':'Stimmt nicht')!==it.bin||(!wahr&&von&&nah(e,von))){ok=false;P(`Stimmt's: ${es} = ${de} → ${it.bin}`)}}
 A('Stimmt’s?: jedes Paar richtig bewertet, nie bedeutungsnah',ok&&ja>100&&ja<300)}
{let ok=true;for(let i=0;i<200;i++){memory('words');const es=[...new Set(M.cards.map(c=>c.e))].map(p=>W.find(e=>enShow(e)===p.a&&deShow(e)===p.b));if(es.some((e,j)=>!e||es.some((x,k)=>k!==j&&nah(x,e))))ok=false}home();
 A('Memory: nie zwei bedeutungsnahe Wörter im selben Spiel (madre und mamá, ser und estar)',ok)}
// Lese-Hafen: Wortcheck mit spanischen Buchstaben, jedes Wort hat eine Bedeutung, Fragen auf Spanisch
{const tk=t=>t.toLowerCase().match(/\p{L}[\p{L}'-]*\p{L}|\p{L}/gu)||[],known=new Set([...W.flatMap(e=>e[1].split('|').flatMap(tk)),...Object.keys(LESETEXTE.GRUND)]);
 const ok=w=>[w,w.replace(/es$/,''),w.replace(/s$/,'')].some(v=>known.has(v));let fremd=0;
 for(const t of TEXTE){const bad=[...new Set([t.titel,t.text,...t.fragen.map(f=>f[0])].flatMap(tk).filter(w=>!ok(w)))];if(bad.length){fremd++;P(`Lesetext ${t.id}: unbekannte Wörter ${bad.join(', ')}`)}}
 A('Lesetexte: nur Wörter aus der Wortliste und Grundwörter',fremd===0)}
{let ohne=0;for(const t of TEXTE){leseText(t.id);for(const b of $$('.lw')){b.click();if(!$('.lw.an')){ohne++;P(`Lesetext ${t.id}: keine Bedeutung für „${b.textContent}“`)}}}
 A('Lesetexte: jedes Wort zeigt beim Antippen eine Bedeutung, Fragen auf Spanisch',ohne===0&&/Verdadero o falso/.test($('#app').textContent))}
leseText('lunes');{const b=$$('.lw').find(x=>x.textContent==='sol');b.click();A('Lesetexte: „sol“ zeigt die Wendung „Hace sol.“',/Hace sol/.test($('#lb').textContent)&&/Sonne/.test($('#lb').textContent))}
leseText('toby');{const b=$$('.lw').find(x=>x.textContent==='perros');b.click();A('Lesetexte: „perros“ zeigt direkt „el perro = Hund“, nicht als Beispiel',/el perro = Hund/.test($('#lb').textContent)&&!/Beispiel/.test($('#lb').textContent))}
{let bsp=0;for(const t of TEXTE){leseText(t.id);for(const b of $$('.lw')){b.click();const w=b.textContent.toLowerCase();
  if(/Beispiel/.test($('#lb').textContent)&&W.some(e=>e[1].split('|').some(a=>a.replace(SPRACHE.artikel,'').toLowerCase()===w))){bsp++;P('als Beispiel statt direkt: '+w)}}}
 A('Lesetexte: Wörter aus der Wortliste zeigen ihre Bedeutung direkt, nicht als Beispiel',bsp===0)}
{let ok=true;const comida=W.find(e=>e[1]==='la comida');for(const x of W.filter(e=>e[0]==='comida'&&e!==comida))if(nah(comida,x)!==true)ok=false;
 A('„la comida“ (auch: Essen) steht nie gegen ein Lebensmittel',ok)}
// el oder la?: nur Nomen im Singular mit el oder la, Lösung aus der Wortliste, vorgelesen wird nur das Nomen
{let ok=true,el=0;for(let i=0;i<300;i++){const it=ARTIKELSPIEL.next();box.innerHTML=it.html;const n=box.querySelector('.big').textContent,e=W.find(x=>x[1].split('|').includes(it.bin+' '+n));
  if(!e||!['el','la'].includes(it.bin)||it.say!==n||/\b(el|la|los|las)\b/.test(n))ok=false;if(it.bin==='el')el++}
 A('el oder la?: jede Aufgabe aus der Wortliste, beide Artikel kommen vor, Lösung wird nicht vorgelesen',ok&&el>60&&el<240)}
home();$('#gart').click();$(`[data-b="${ARTIKELSPIEL.bins.indexOf(X.it.bin)}"]`).click();A('el oder la?: richtige Antwort zählt',X.n===1);
sortWeiter();for(let k=0;k<3;k++){$(`[data-b="${1-ARTIKELSPIEL.bins.indexOf(X.it.bin)}"]`).click();sortWeiter()}
A('el oder la?: nach drei Fehlern Ende mit Rekord',!!$('.end')&&save.artikel===1);
home();
done();
