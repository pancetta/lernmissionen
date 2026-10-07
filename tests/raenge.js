// Ränge (gemeinsam.js): Leiter, Aufstiegsmeldung am Rundenende, keine Herabstufung, endlose Legenden-Stufen
save.xp=0;save.rk=0;save.best={};
const log=[];let jumps=0,ups=0;
for(let r=1;r<=30;r++){const before=lvl();start(TOPICS[r%TOPICS.length].id);let g=0;
  while(G&&!$('.end')&&g++<100){solve(G.queue[0]);$('#nx').click()}
  const after=lvl();if(after-before>1)jumps++;if(/Neuer Rang/.test($('#app').textContent))ups++;
  if(after>before)log.push(`Runde ${r}: ${levelName(after)} (${save.xp} P.)`)}
A('nie mehr als ein Rang pro fehlerfreier Runde',jumps===0);
A('jeder Aufstieg wird gemeldet',ups===log.length);
A('Kapitän/in frühestens nach 10 fehlerfreien Runden',(()=>{const i=log.findIndex(l=>/Kapitän\/in \(/.test(l)&&!/Flotten/.test(l));return i>=0&&+log[i].match(/Runde (\d+)/)[1]>=10})());
// keine Herabstufung: alter Spielstand mit 700 Punkten war "Kapitän/in"
save={name:'',xp:700,best:{},weak:{}};initRank();home();
A('Altstand 700 Punkte bleibt Kapitän/in',rank()==='Kapitän/in'&&/Noch 2100 Punkte bis Flottenkapitän\/in/.test($('.rnext').textContent));
save={name:'',xp:1200,best:{},weak:{}};initRank();A('Altstand 1200 Punkte bleibt Admiral/in',rank()==='Admiral/in');
save={name:'',xp:0,best:{},weak:{}};initRank();A('neuer Spielstand: Leichtmatrose',rank()==='Leichtmatrose'&&save.rk===0);
// endlos: Legenden-Stufen
save={name:'',xp:9100,best:{},weak:{},rk:0};A('9100: Legende',rank()==='Legende der sieben Meere');
save.xp=12100;A('12100: Legende Stufe 3',rank()==='Legende der sieben Meere · Stufe 3');home();
A('Balken zeigt nächstes Ziel auch als Legende',/Noch 1500 Punkte bis Legende der sieben Meere · Stufe 4/.test($('.rnext').textContent));
save.xp=350;save.rk=0;home();const w=parseFloat($('.rbar i').style.width);A('Balken 350 P.: 1/6 zwischen 300 und 600',Math.abs(w-100*50/300)<0.5);
done();
