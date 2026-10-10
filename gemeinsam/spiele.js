/* Spiele neben Runde, Blitzrunde und Memory: gemeinsame Teile und das Sortier-Spiel.
   Die Seite bindet diese Datei nach gemeinsam.js ein und ruft in home() stopSpiel() auf.
   Sortier-Spiel: sortGame({key, title, intro, bins:[Beschriftungen], t:[Startzeit, schneller pro Treffer, schnellste Zeit] (ms), endText, next()})
   next() liefert {html, bin (eine der Beschriftungen), sol (Lösung, **fett** erlaubt), wk (Übungs-Schlüssel, optional), say (vorlesen, optional)}. */
let X=null; // laufendes Spiel; verzögerte Schritte laufen nur, solange ihr Spiel noch läuft
const later=(f,ms)=>{const me=X;setTimeout(()=>{if(X===me&&X)f()},ms)};
function stopSpiel(){if(X){clearTimeout(X.timer);X=null}}
const fett=t=>esc(t).replace(/\*\*(.+?)\*\*/g,'<b>$1</b>');
const lives=(n,sym='⛵')=>`<span class="pill" aria-label="${n} Leben">${sym.repeat(n)}</span>`;
const gameHead=(title,extra)=>`<div class="q-head"><button class="back" id="bk" aria-label="${esc(title)} beenden">Ende</button>${extra}</div>`;
const weakUp=k=>{if(k)save.weak[k]=(save.weak[k]||0)+1}; // Fehler im Spiel: diese Aufgabe kommt beim Üben öfter
function spielEnde(key,n,text,missed,again){
  X=null;const rec=n>0&&n>(save[key]||0);if(rec)save[key]=n;const gain=n*3;save.xp+=gain;persist();
  $('#app').innerHTML=`${topBar()}<div class="qcard end"><h2>${rec?'Neuer Rekord!':'Geschafft!'}</h2>${rec?confetti():''}<div class="bignum pop">${n}</div><p>${text}</p>${rankUp()}
   <div class="stats"><span class="pill">Rekord: ${save[key]||0}</span><span class="pill sun">+${gain} Punkte</span></div>
   ${missed.length?`<div class="mist"><h3>Das üben wir noch</h3><ul>${missed.map(t=>`<li>${fett(t)}</li>`).join('')}</ul></div>`:'<div class="mist"><h3>Keine Fehler. Wow!</h3></div>'}
   <div class="actions"><button class="btn" id="again">Nochmal</button><button class="btn ghost" id="hm">Zur Seekarte</button></div></div>`;
  bindTheme();$('#again').onclick=again;$('#hm').onclick=home;$('#again').focus();
}

/* ---------- Sortier-Spiel: in den richtigen Hafen, bevor die Zeit abläuft; drei Leben, es wird immer schneller ---------- */
function sortGame(c){G=null;M=null;if(B){clearTimeout(B.timer);B=null}X={game:c.key,c,n:0,lives:3,missed:[],t:c.t[0],it:null};sortQ()}
function sortQ(){
  const c=X.c;let it;do it=c.next();while(X.it&&it.html===X.it.html);X.it=it;X.busy=false;
  $('#app').innerHTML=`${gameHead(c.title,`<div class="track timer" role="timer" aria-label="Restzeit"><i id="tm" style="width:100%;transition:width ${X.t}ms linear"></i></div>${lives(X.lives)}<span class="pill sun">${X.n}</span>`)}
  <div class="qcard"><div class="kind">${esc(c.title)}</div><div class="prompt">${it.html}</div><p class="tip">${esc(c.intro)}</p>
  <div class="opts haefen" style="grid-template-columns:repeat(${c.bins.length},minmax(0,1fr))" role="group" aria-label="Antworten, mit Pfeiltasten wählen">${c.bins.map((b,i)=>`<button class="opt nav" data-b="${i}">${esc(b)}</button>`).join('')}</div><div id="fb"></div></div>`;
  requestAnimationFrame(()=>requestAnimationFrame(()=>{const t=$('#tm');if(t)t.style.width='0%'}));
  $('#bk').onclick=home;document.querySelectorAll('[data-b]').forEach(b=>b.onclick=()=>sortA(+b.dataset.b));$('[data-b]').focus();
  if(it.say&&canSpeak())say(it.say);
  const me=X;X.timer=setTimeout(()=>{if(X===me)sortA(-1)},X.t);
}
function sortA(i){
  if(!X||X.busy)return;X.busy=true;clearTimeout(X.timer);const c=X.c,it=X.it,ok=c.bins[i]===it.bin,t=$('#tm');
  if(t){t.style.width=getComputedStyle(t).width;t.style.transition='none'}
  document.querySelectorAll('[data-b]').forEach(b=>{const k=+b.dataset.b;b.disabled=true;if(c.bins[k]===it.bin)b.classList.add('right');else if(k===i)b.classList.add('wrong')});
  if(ok){X.n++;X.t=Math.max(c.t[2],X.t-c.t[1])}else{X.lives--;X.missed.push(it.sol);weakUp(it.wk)}
  persist();
  $('#fb').innerHTML=`<p class="tip" role="status">${ok?'Richtig!':`${i<0?'Die Zeit ist um. ':''}Richtig ist: ${fett(it.sol)}`}</p>`;
  later(sortWeiter,ok?500:2000);
}
function sortWeiter(){const c=X.c;X.lives>0?sortQ():spielEnde(c.key,X.n,c.endText,[...new Set(X.missed)],()=>sortGame(c))}
