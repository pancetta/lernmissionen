const fs=require('fs');console.assert=(c,m)=>{if(!c){console.error('Fehler: '+m);process.exitCode=1}};
for(const f of process.argv.slice(2)){
  const dir=require('path').dirname(f),inc=n=>fs.existsSync(dir+'/'+n)?fs.readFileSync(dir+'/'+n,'utf8'):'';
  const js=inc('../wortschatz.js')+'\n'+inc('../../gemeinsam/gemeinsam.js')+'\n'+fs.readFileSync(f,'utf8').match(/<script>([\s\S]*)<\/script>/)[1].replace(/^home\(\);$/m,'');
  const stub={querySelector:()=>null,querySelectorAll:()=>[],addEventListener(){},documentElement:{dataset:{}}};
  const r=new Function('window','document','localStorage','location','matchMedia',js+';return {W,TOPICS,makeQ,NOTYPE,G:typeof G}')({},stub,{getItem:()=>null,setItem(){},removeItem(){}},{hash:''},()=>({matches:false}));
  const {W,TOPICS,makeQ}=r, ids=new Set(TOPICS.map(t=>t.id));
  console.assert(W.every(e=>ids.has(e[0])),'unbekanntes Thema');
  const keys=W.map(e=>e[1]); const dup=keys.filter((k,i)=>keys.indexOf(k)!==i); console.assert(!dup.length,'doppelt: '+dup);
  const de=W.map(e=>e[2]); const dupde=de.filter((k,i)=>de.indexOf(k)!==i);
  for(const e of W)for(let i=0;i<30;i++){const q=makeQ(e,true);console.assert(q.options.length===4&&new Set(q.options).size===4&&q.options.includes(q.correct),'Optionen '+e[1])}
  console.log(f, 'Wörter:',W.length, TOPICS.map(t=>t.id+'='+W.filter(e=>e[0]===t.id).length).join(' '), dupde.length?'gleiches Deutsch: '+dupde:'');
}
