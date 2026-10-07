// Vokabel-Inseln (eigener Rundenablauf): Fragearten, Satzbau, Tastatur, alte Spielstände, Blitzrunde, Memory, Sterne
A('Startseite: 13 Inseln auf der Karte, Spiele',$$('.isl').length===13&&!!$('#gb')&&!!$('#gm'));
const cnt=(e,n,quick)=>{const c={};for(let i=0;i<n;i++){const k=makeQ(e,false,quick).kind;c[k]=(c[k]||0)+1}return c};
const lion=W.find(e=>e[1]==='lion'),hs=W.find(e=>e[1]==='How old are you?');
const wc=cnt(lion,800),sc=cnt(hs,800);
A('Wort: Auswahl, Tippen, Hören, Stimmt das? (kein Satzbau)',wc.mc&&wc.type&&wc.listen&&wc.tf&&!wc.build);
A('Satz: Auswahl, Satzbau, Hören, Stimmt das? (kein Tippen)',sc.mc&&sc.build&&sc.listen&&sc.tf&&!sc.type);
save.sound=false;A('Ton aus: keine Hör-Fragen',!cnt(lion,300).listen);save.sound=true;
A('Blitzrunde: nur Auswahl und Stimmt das?',Object.keys(cnt(W[5],300,true)).every(k=>k==='mc'||k==='tf'));
const one=(e,kind)=>{start('mix');let q;do q=makeQ(e);while(q.kind!==kind);G.queue=[q];show();return q};
let q=one(lion,'tf');A('Stimmt das?: zeigt „lion = …“',$('.prompt').textContent.startsWith('lion = '));solve(q);A('Stimmt das?: richtig gewertet',G.first===1);
q=one(lion,'listen');A('Hören: Anhören-Knopf, englische Antworten, Wort nicht sichtbar',!!$('#hear')&&q.options.includes('lion')&&!$('.prompt').textContent.includes('lion'));
answer(q.options.indexOf('lion'));A('Hören: richtig gewertet, Vorlesen-Knopf',G.first===1&&!!$('#say'));
const want=toks('How old are you?');
q=one(hs,'build');want.forEach(w=>[...$('#bc').children].find(c=>c.textContent===w).click());$('#bp').click();
A('Satzbau: richtige Reihenfolge',G.first===1&&$('#bl').classList.contains('right'));
q=one(hs,'build');[...want].reverse().forEach(w=>[...$('#bc').children].find(c=>c.textContent===w).click());$('#bp').click();
A('Satzbau: falsche Reihenfolge',G.first===0&&$('#bl').classList.contains('wrong')&&G.missed.length===1);
q=one(hs,'build');$('#bc').children[0].click();$('#bl').children[0].click();
A('Satzbau: Wort zurücklegen',$('#bl').children.length===0&&$('#bc').children.length===want.length);
$('#bp').click();A('Satzbau: Hinweis bei fehlenden Wörtern',!G.answered&&/alle Wörter/.test($('#fb').textContent));
document.body.focus();taste(document.body,'ArrowDown');A('Pfeiltasten wählen Satzwörter',document.activeElement.classList.contains('chip'));
save.round={topic:'tiere',total:2,done:0,first:0,xp:0,streak:0,best:0,missed:[],queue:[{i:W.indexOf(lion),type:true,dir:'de2en',redo:false}]};
home();A('alter Spielstand: Weiterspielen-Kachel',!!$('#rs'));$('#rs').click();A('alter Spielstand: Tippfrage',!!$('#ti'));
home();$('#gb').click();A('Blitzrunde läuft',!!B&&!!$('#tm'));blitzEnd();A('Blitzrunde: Ende-Seite',/Zeit ist um|Rekord/.test($('h2').textContent));
// gemeinsamer Memory-Ablauf (gemeinsam.js), wird nur hier geprüft
home();$('#gm').click();const cards=$$('.card');A('Memory: 12 Karten',cards.length===12);
flip(cards[0]);flip(cards.find((c,i)=>i>0&&M.cards[i].e!==M.cards[0].e));A('Memory: falsches Paar sperrt kurz',M.lock&&M.tries===1);
M.lock=false;M.open.forEach(o=>{o.textContent='?';o.classList.remove('up')});M.open=[];
const byE=new Map();M.cards.forEach((c,i)=>byE.set(c.e,(byE.get(c.e)||[]).concat(i)));for(const[,ix]of byE){flip(cards[ix[0]]);flip(cards[ix[1]])}
A('Memory: alle Paare gefunden',M.found===6&&M.tries===7);memoEnd();A('Memory: Ende und Rekord',save.memo===7&&/Rekord|Paare/.test($('h2').textContent));
// fehlerfreie Runden: jede Insel, Rundfahrt und eine kleine Insel mit 8 Wörtern geben 3 Sterne
const runs=[...TOPICS.map(t=>t.id),'mix'].map(t=>[t,perfect(t)]);
runs.forEach(([t,r])=>{if(r.stars!==3)P('keine 3 Sterne: '+t)});
A('fehlerfreie Runde = 3 Sterne (alle Inseln und Rundfahrt)',runs.every(([,r])=>r.stars===3));
A('kleine Insel (8 Wörter): fehlerfrei = 3 Sterne',perfect('zeit',W.filter(e=>e[0]==='zeit').slice(0,8).map(e=>makeQ(e))).stars===3);
done();
