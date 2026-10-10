/* Rundenablauf für Missionen, deren Fragen reine Daten sind (Pronomen-Inseln, Mathe-Inseln).
   Die Seite legt fest: TOPICS, save/persist, home(), makeQ(topic), quickQ() und optional
   makeRound(topic) (eigene Fragenliste), redoQ(q) (Ersatzfrage nach einem Fehler), finishExtra(G), MISSED, TYPE_PH.
   Felder einer Frage: kind mc|type|num|money|build|listen, label, prompt (**fett**) oder html (fertiges HTML),
   options/correct (raw:true = Optionen sind HTML), accept (type), ans (num: Zahl, money: Cent), unit,
   tiles/target/extra (build: extra = so viele Kärtchen bleiben übrig), sol, say, wk (Übungs-Schlüssel).
   kind alle: alle passenden Kärtchen antippen, tiles = Kärtchen, hits = Nummern der richtigen (aufsteigend).
   kind widget: Aufgabe zum Ziehen/Setzen, die Seite liefert WIDGETS[q.w] = {html(q), init(q), empty(), check(q), done(q,ok)}. */
const md=t=>esc(t).replace(/\*\*(.+?)\*\*/g,'<b>$1</b>');            // **fett** im Fragetext
const plain=t=>t.replace(/\*\*/g,'');
const parseNum=t=>{t=t.replace(/[\s.  ']/g,'');return /^\d+$/.test(t)?+t:null};
const parseMoney=t=>{t=t.replace(/€|\s| | /g,'').replace(',','.');return /^\d+$/.test(t)?+t*100:/^\d*\.\d{1,2}$/.test(t)?Math.round(parseFloat(t)*100):null};
const qHtml=q=>q.html||md(q.prompt||'');
const missedText=q=>q.sol.replace(/^Richtig heißt es: /,'');
function mistList(list){return list.length?`<div class="mist"><h3>${typeof MISSED!=='undefined'?MISSED:'Diese Aufgaben üben wir weiter'}</h3><ul>${list.map(t=>`<li>${md(t)}</li>`).join('')}</ul></div>`:'<div class="mist"><h3>Keine Fehler. Wow!</h3></div>'}
function saveRound(){save.round=G&&G.queue.length?{topic:G.topic,total:G.total,done:G.done,first:G.first,xp:G.xp,streak:G.streak,best:G.best,missed:G.missed,queue:G.queue}:null;persist()}
const optsHtml=q=>`<div class="opts${q.raw?' raw':''}" role="group" aria-label="Antworten, mit Pfeiltasten wählen">${q.options.map((o,i)=>`<button class="opt nav" data-i="${i}"${q.raw?` aria-label="Antwort ${i+1}"`:''}>${q.raw?o:md(o)}</button>`).join('')}</div>`;
const $$c=()=>[...document.querySelectorAll('.chip')];
function markOpts(q,i){document.querySelectorAll('.opt').forEach((b,k)=>{b.disabled=true;if(q.options[k]===q.correct)b.classList.add('right');else if(k===i)b.classList.add('wrong')})}

function start(topic){
  let qs;
  if(typeof makeRound==='function'&&(qs=makeRound(topic)));
  else{qs=[];const seen=new Set();for(let i=0;i<60&&qs.length<ROUND;i++){const q=makeQ(topic),k=(q.html||q.prompt)+'|'+q.sol;if(!seen.has(k)){seen.add(k);qs.push(q)}}}
  G={topic,queue:qs,total:qs.length,done:0,first:0,xp:0,streak:0,best:0,missed:[],answered:false,res:[]};
  show();
}
function show(){
  if(!G.queue.length)return finish();
  let q=G.queue[0];
  if(q.kind==='listen'&&!canSpeak()){q=G.queue[0]=Object.assign(makeQ(G.topic==='mix'?'mix':G.topic),{redo:q.redo})} // Ton inzwischen aus
  saveRound();
  const k=q.kind,pct=Math.round(G.done/G.total*100);
  const prompt=k==='listen'?`<button class="btn" id="hear" type="button">🔊 Anhören</button> <button class="btn ghost small" id="slow" type="button">🐢 langsam</button>`:qHtml(q);
  let body;
  if(k==='type'||k==='num'||k==='money'){
    const im=k==='num'?' inputmode="numeric"':k==='money'?' inputmode="decimal"':'';
    const ph=k==='money'?'z. B. 7,25':k==='num'?'Zahl':(typeof TYPE_PH!=='undefined'?TYPE_PH:'Antwort');
    body=`<form class="typebox" id="tf" autocomplete="off"><input type="text" id="ti"${im} aria-label="Antwort" autocapitalize="off" autocorrect="off" spellcheck="false" placeholder="${ph}">${q.unit?`<span class="unit">${esc(q.unit)}</span>`:''}<button class="btn" type="submit">Prüfen</button></form>`;
  }else if(k==='build'){
    body=`<div class="line" id="bl" aria-label="Deine Reihenfolge"></div>
    <div class="chips" id="bc" role="group" aria-label="Kärtchen, mit Pfeiltasten wählen">${q.tiles.map(t=>`<button class="chip nav" type="button">${esc(t)}</button>`).join('')}</div>
    ${q.extra?'<p class="tip" style="margin:8px 0 0">Ein Wort bleibt übrig.</p>':''}<p style="margin:12px 0 0"><button class="btn" id="bp" type="button">Prüfen</button></p>`;
  }else if(k==='alle'){
    body=`<div class="chips" role="group" aria-label="Kärtchen, mit Pfeiltasten wählen">${q.tiles.map(t=>`<button class="chip nav" type="button" aria-pressed="false">${esc(t)}</button>`).join('')}</div>
    <p style="margin:12px 0 0"><button class="btn" id="bp" type="button">Prüfen</button></p>`;
  }else if(k==='widget'){
    body=`${WIDGETS[q.w].html(q)}<p style="margin:12px 0 0"><button class="btn" id="bp" type="button">Prüfen</button></p>`;
  }else body=optsHtml(q);
  $('#app').innerHTML=`
  <div class="q-head"><button class="back" id="bk" aria-label="Zurück zur Seekarte">Ende</button>
   <div class="track" role="progressbar" aria-valuenow="${G.done}" aria-valuemax="${G.total}"><i style="width:${pct}%"></i><span style="position:absolute;left:calc(${pct}% );top:0">${boat.replace('<svg','<svg style="position:absolute;top:-14px;left:-12px;width:34px;color:var(--ink)"')}</span></div>
   <span class="pill streak">${G.streak>=2?'Serie '+G.streak:'Serie 0'}</span></div>
  <div class="qcard"><div class="kind ${q.redo?'redo':''}">${q.redo?'Noch einmal üben · ':''}${q.label}</div><div class="prompt sm">${prompt}</div>${body}<div id="fb"></div></div>`;
  G.answered=false;
  $('#bk').onclick=home;
  if(k==='type'||k==='num'||k==='money'){
    $('#ti').focus();
    $('#tf').onsubmit=ev=>{ev.preventDefault();if(!G.answered)answer(null,$('#ti').value)};
  }else if(k==='build'){
    // Antippen schiebt ein Kärtchen in die Reihe, nochmal antippen schiebt es zurück
    document.querySelectorAll('.chip').forEach(b=>b.onclick=()=>{if(G.answered)return;const from=b.parentNode;(from.id==='bc'?$('#bl'):$('#bc')).appendChild(b);(from.querySelector('.chip')||$('#bp')).focus()});
    $('#bp').onclick=()=>{if(G.answered)return;
      if(q.extra?!$('#bl').children.length:$('#bc').children.length){$('#fb').innerHTML=`<p class="tip">${q.extra?'Tippe die Wörter in der richtigen Reihenfolge an.':'Benutze alle Kärtchen.'}</p>`;return}
      answer(null,[...$('#bl').children].map(c=>c.textContent).join(' '))};
  }else if(k==='alle'){
    document.querySelectorAll('.chip').forEach(b=>b.onclick=()=>{if(!G.answered)b.setAttribute('aria-pressed',b.getAttribute('aria-pressed')==='false')});
    $('#bp').onclick=()=>{if(G.answered)return;const on=$$c().flatMap((b,i)=>b.getAttribute('aria-pressed')==='true'?[i]:[]);
      if(!on.length){$('#fb').innerHTML='<p class="tip">Tippe zuerst die passenden Kärtchen an.</p>';return}answer(null,on.join(','))};
  }else if(k==='widget'){
    WIDGETS[q.w].init(q);
    $('#bp').onclick=()=>{if(G.answered)return;const e=WIDGETS[q.w].empty();if(e){$('#fb').innerHTML=`<p class="tip">${e}</p>`;return}answer(null,null)};
  }else{
    if(k==='listen'){say(q.say);$('#hear').onclick=()=>say(q.say);$('#slow').onclick=()=>say(q.say,true)}
    document.querySelectorAll('.opt').forEach(b=>b.onclick=()=>answer(+b.dataset.i,null));
  }
}
function answer(i,text){
  if(G.answered)return;
  const q=G.queue[0],k=q.kind;let ok,caseOnly=false;
  if(k==='type'){
    const t=norm(text||'');if(!t){$('#ti').focus();return}
    const alts=q.accept.map(norm);ok=alts.includes(t); // Groß- und Kleinschreibung zählt
    caseOnly=!ok&&alts.some(a=>a.toLowerCase()===t.toLowerCase());
  }else if(k==='num'||k==='money'){
    const t=(text||'').trim();if(!t){$('#ti').focus();return}
    const v=k==='num'?parseNum(t):parseMoney(t);
    if(v===null){$('#fb').innerHTML=`<p class="tip">${k==='num'?'Bitte nur eine Zahl eingeben, zum Beispiel 3400.':'Bitte einen Betrag eingeben, zum Beispiel 7,25.'}</p>`;$('#ti').focus();return}
    ok=v===q.ans;
  }else if(k==='build'){
    ok=text===q.target;
    document.querySelectorAll('.chip').forEach(b=>b.disabled=true);$('#bp').disabled=true;$('#bl').classList.add(ok?'right':'wrong');
  }else if(k==='alle'){ // grün = richtig gewählt, rot = falsch gewählt, gestrichelt = übersehen
    ok=text===q.hits.join(',');const on=text.split(',');
    $$c().forEach((b,i)=>{const h=q.hits.includes(i),p=on.includes(String(i));b.disabled=true;if(p||h)b.classList.add(h?(p?'right':'miss'):'wrong')});$('#bp').disabled=true;
  }else if(k==='widget'){
    ok=WIDGETS[q.w].check(q);WIDGETS[q.w].done(q,ok);$('#bp').disabled=true;
  }else{ok=q.options[i]===q.correct;markOpts(q,i)}
  if($('#ti')){$('#ti').disabled=true;document.querySelector('#tf button').disabled=true}
  G.answered=true;
  const again=()=>Object.assign(typeof redoQ==='function'?redoQ(q):Object.assign({},q,{kind:k==='type'?'mc':k}),{redo:true});
  if(!q.redo){
    if(ok){G.first++;G.streak++;G.best=Math.max(G.best,G.streak);const gain=10+Math.min(G.streak-1,5);G.xp+=gain;save.xp+=gain;if(save.weak[q.wk])save.weak[q.wk]--}
    else{G.streak=0;save.weak[q.wk]=(save.weak[q.wk]||0)+1;G.missed.push(missedText(q));G.queue.push(again())}
    G.done++;(G.res=G.res||[]).push({isl:q.isl,ok});
  }else if(!ok){G.queue.push(again())}
  persist();
  $('#fb').innerHTML=`<div class="fb ${ok?'ok':'no'}" role="status"><strong>${ok?pick(CHEER):caseOnly?'Fast! Achte auf Groß- und Kleinschreibung.':pick(OOPS)}</strong>
   <span class="ans">${ok?md(q.sol):(q.sol.startsWith('Richtig heißt es')?'':'Richtig ist: ')+md(q.sol)}</span>
   <div class="row">${canSpeak()&&q.say?'<button class="btn ghost small" id="say" type="button" style="margin-right:auto">🔊 Anhören</button>':''}<button class="btn" id="nx">${G.queue.length>1?'Weiter':'Fertig'}</button></div></div>`;
  if($('#say'))$('#say').onclick=()=>say(q.say);
  $('#nx').focus();
  $('#nx').onclick=()=>{G.queue.shift();show()};
  document.querySelector('.streak').textContent=G.streak>=2?'Serie '+G.streak:'Serie 0';
}
function finish(){
  const n=G.first,need=p=>Math.ceil(G.total*p),stars=n>=need(.9)?3:n>=need(.7)?2:n>=need(.5)?1:0;
  const tk=G.topic,before=save.best[tk]||0;if(stars>before)save.best[tk]=stars;
  const bonus=stars*10;G.xp+=bonus;save.xp+=bonus;save.round=null;persist();
  const msg=stars===3?'Insel erobert. Das war Spitze!':stars===2?'Sehr gut! Eine Runde noch für den dritten Stern?':stars===1?'Gut gemacht. Mit etwas Übung klappen mehr Sterne.':'Das war ein Anfang. Probiere es noch einmal, es wird jedes Mal leichter.';
  const isl=TOPICS.find(t=>t.id===tk);
  const treasure=stars===3&&before<3&&isl?`<p class="treasure pop"><svg viewBox="0 0 18 16" width="40" aria-hidden="true">${chest(0,0)}</svg> Du hast den Schatz der ${esc(isl.name)} gefunden!</p>`:'';
  $('#app').innerHTML=`${topBar()}
  <div class="qcard end"><h2>${esc(msg)}</h2>
   <div class="bigstars" aria-label="${stars} von 3 Sternen">${[1,2,3].map(i=>i<=stars?`<b><span class="pop" style="animation-delay:${i*.25}s">★</span></b>`:'★').join('')}</div>
   ${treasure}${rankUp()}
   <div class="stats"><span class="pill">${n} von ${G.total} gleich richtig</span><span class="pill">Beste Serie ${G.best}</span><span class="pill sun">+${G.xp} Punkte</span></div>
   ${typeof finishExtra==='function'?finishExtra(G):''}
   ${mistList([...new Set(G.missed)])}
   <div class="actions"><button class="btn" id="again">Nochmal spielen</button><button class="btn ghost" id="hm">Zur Seekarte</button></div>
   <p class="tip">Rang: ${rank()} · ${save.xp} Punkte insgesamt</p></div>`;
  bindTheme();
  $('#again').onclick=()=>start(tk);$('#hm').onclick=home;
  document.querySelectorAll('[data-go]').forEach(b=>b.onclick=()=>start(b.dataset.go)); // z. B. "Üben" im Ich-kann-Check
}

/* ---------- Blitzrunde: 60 Sekunden, nur Antippen ---------- */
function blitz(){
  G=null;M=null;
  B={end:Date.now()+BLITZ*1000,ok:0,missed:[],last:''};
  B.timer=setTimeout(blitzEnd,BLITZ*1000);
  blitzQ();
}
function blitzQ(){
  if(!B)return;
  let q;do q=quickQ();while(qHtml(q)===B.last);B.last=qHtml(q);
  const left=Math.max(0,B.end-Date.now()),busy={v:false};
  $('#app').innerHTML=`<div class="q-head"><button class="back" id="bk" aria-label="Blitzrunde beenden">Ende</button>
   <div class="track timer" role="timer" aria-label="Restzeit"><i id="tm" style="width:${left/BLITZ/10}%;transition:width ${left}ms linear"></i></div>
   <span class="pill sun" id="bs">${B.ok} richtig</span></div>
  <div class="qcard"><div class="kind">Blitzrunde · ${q.label}</div><div class="prompt sm">${qHtml(q)}</div>${optsHtml(q)}</div>`;
  requestAnimationFrame(()=>requestAnimationFrame(()=>{const t=$('#tm');if(t)t.style.width='0%'}));
  $('#bk').onclick=home;
  document.querySelectorAll('.opt').forEach(b=>b.onclick=()=>{
    if(busy.v||!B)return;busy.v=true;
    const i=+b.dataset.i,ok=q.options[i]===q.correct;markOpts(q,i);
    if(ok){B.ok++;save.xp+=3;if(save.weak[q.wk])save.weak[q.wk]--}else{const m=missedText(q);if(!B.missed.includes(m))B.missed.push(m);save.weak[q.wk]=(save.weak[q.wk]||0)+1}
    persist();$('#bs').textContent=B.ok+' richtig';
    setTimeout(()=>{if(B&&Date.now()<B.end)blitzQ()},ok?450:1300);
  });
}
function blitzEnd(){
  if(!B)return;const r=B;B=null;
  const rec=r.ok>0&&r.ok>(save.blitz||0);if(rec)save.blitz=r.ok;persist();
  $('#app').innerHTML=`${topBar()}
  <div class="qcard end"><h2>${rec?'Neuer Rekord!':'Zeit ist um!'}</h2>
   <div class="bignum pop">${r.ok}</div><p>richtige Antworten in ${BLITZ} Sekunden</p>${rankUp()}
   <div class="stats"><span class="pill">Rekord: ${save.blitz||0}</span><span class="pill sun">+${r.ok*3} Punkte</span></div>
   ${mistList(r.missed)}
   <div class="actions"><button class="btn" id="again">Nochmal</button><button class="btn ghost" id="hm">Zur Seekarte</button></div></div>`;
  bindTheme();$('#again').onclick=blitz;$('#hm').onclick=home;$('#again').focus();
}
