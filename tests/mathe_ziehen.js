// Mathe-Inseln: Säulen/Balken zeichnen und Zahlenstrahl markieren, bedient wie ein Kind (antippen, ziehen, Tastatur)
const num=s=>+String(s).replace(/[\s\u202F.]/g,'');
const one=q=>{start(q.isl||'diagramm');G.queue=[q];G.total=1;show()};
// 1) Vorlagen stimmen mit der Lösung überein
let srcOk=true;for(let i=0;i<150;i++){const q=gen('diagramm','zeichnen');box.innerHTML=q.html;
  const tv=box.querySelector('.vt')?[...box.querySelectorAll('.vt td')].map(x=>num(x.textContent)):[...box.querySelectorAll('.strich tr')].map(r=>r.querySelectorAll('line').length);
  if(tv.join()!==q.vals.join()||q.vals.some(v=>v%q.step||v>q.max||v<=0)){srcOk=false;P('Vorlage: '+tv+' / '+q.vals)}}
A('Diagramm zeichnen: Tabelle/Strichliste passt zur Lösung',srcOk);
let midOk=true,nm=0;for(let i=0;i<150;i++){const q=gen('strahl','markieren');box.innerHTML=q.html;const t=box.textContent.replace(/ /g,'');let m;
  const target=(m=t.match(/zwischen (\d+) und (\d+)/))?(nm++,(+m[1]+ +m[2])/2):+t.match(/Zahl (\d+)\./)[1];
  if(target!==q.start+q.i*q.step||q.i<1||q.i>19||q.i===10){midOk=false;P('Strahl: '+t+' i='+q.i)}}
A('Zahlenstrahl markieren: Zielzahl (auch „Mitte zwischen“) stimmt',midOk&&nm>20);
// 2) Säulen ziehen: antippen, ziehen, Tastatur
let tapOk=true,dragOk=true,keyOk=true,orient={h:0,v:0};
for(let n=0;n<30;n++){const q=gen('diagramm','zeichnen');q.isl='diagramm';q.horiz=n%2===0; // abwechselnd liegend/stehend, damit beide sicher vorkommen
  one(q);const svg=$('.drawsvg'),g=barGeo(q);orient[q.horiz?'h':'v']++;
  q.vals.forEach((v,i)=>{const cw=(g.b1-g.b0)/g.n,c=g.b0+cw*i+cw/2,a=g.a0+(g.a1-g.a0)*v/q.max;
    const [x,y]=g.horiz?client(svg,a,c):client(svg,c,a);
    if(n%3===0){ptr(svg,'pointerdown',x,y);ptr(svg,'pointerup',x,y);if(WS.v[i]!==v)tapOk=false}
    else if(n%3===1){const [x0,y0]=g.horiz?client(svg,g.a0,c):client(svg,c,g.a0);ptr(svg,'pointerdown',x0,y0);ptr(svg,'pointermove',(x0+x)/2,(y0+y)/2);ptr(svg,'pointermove',x,y);ptr(svg,'pointerup',x,y);if(WS.v[i]!==v)dragOk=false}
    else{const el=svg.querySelector(`.dbar[data-i="${i}"]`);for(let k=0;k<v/q.step;k++)taste(el,q.horiz?'ArrowRight':'ArrowUp');if(WS.v[i]!==v)keyOk=false}});
  $('#bp').click();if(G.first!==1||svg.querySelectorAll('.dbar.good').length!==q.vals.length){tapOk=dragOk=keyOk=false;P('richtig gezeichnet, aber nicht erkannt')}}
A('Säulen antippen setzt die richtige Höhe',tapOk);A('Säulen ziehen setzt die richtige Höhe',dragOk);A('Säulen per Pfeiltasten',keyOk);A('senkrecht und waagerecht vorgekommen',orient.h>5&&orient.v>5);
// falsch gezeichnet und leer
{const q=gen('diagramm','zeichnen');q.isl='diagramm';one(q);$('#bp').click();A('ohne Ziehen: Hinweis, keine Wertung',!G.answered&&/Zieh zuerst/.test($('#fb').textContent));
 q.vals.forEach((v,i)=>WS.set(i,i===0?(v+q.step<=q.max?v+q.step:v-q.step):v));$('#bp').click();
 A('eine Säule falsch: Fehler, rot markiert, Soll gestrichelt',G.first===0&&$('.dbar.bad')&&$('.dbar.bad .target')&&$$('.dbar.good').length===q.vals.length-1&&G.queue[1].sub==='zeichnen');}
// 3) Pfeil setzen
let mTap=true,mKey=true;
for(let n=0;n<30;n++){const q=gen('strahl','markieren');q.isl='strahl';one(q);const svg=$('.marksvg');
  if(n%2){const [x,y]=client(svg,SX(q.i)+4,40);ptr(svg,'pointerdown',x,y);ptr(svg,'pointerup',x,y);if(WS.k!==q.i)mTap=false}
  else{for(let k=0;k<=q.i;k++)taste(svg,'ArrowRight');if(WS.k!==q.i)mKey=false}
  $('#bp').click();if(G.first!==1)mTap=mKey=false}
A('Pfeil antippen trifft den nächsten Teilstrich',mTap);A('Pfeil per Pfeiltasten',mKey);
{const q=gen('strahl','markieren');q.isl='strahl';one(q);$('#bp').click();const hint=!G.answered;WS.put(q.i===19?18:q.i+1);$('#bp').click();
 A('Pfeil: Hinweis wenn leer, falscher Strich rot und richtiger grün',hint&&$('.mark.live.bad')&&$('.mark.right')&&G.first===0);}
done();
