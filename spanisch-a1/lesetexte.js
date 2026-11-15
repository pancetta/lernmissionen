/* Lesetexte für die Spanisch-Inseln (A1, Kinder von 8 bis 10 Jahren): kurze Geschichten, Witze und Hintergründe.
   Jeder Text darf nur Wörter aus der Wortliste (wortschatz.js) und aus GRUND enthalten; ein Test prüft das bei jedem Lauf.
   Neue Texte HINTEN an TEXTE anhängen. Form: {id, art, titel, text (Zeilen mit \n), fragen:[[Aussage, true/false], …]} */
const LESETEXTE=(()=>{
// Grundwörter und Verbformen, die in der Wortliste nicht einzeln vorkommen, und Namen (mit deutscher Bedeutung zum Antippen)
const GRUND={el:'der / das',la:'die',los:'die (Mehrzahl)',las:'die (Mehrzahl)',un:'ein',una:'eine',es:'ist',son:'sind',de:'von / aus',del:'vom',en:'in / an',a:'nach / zu / um',al:'zum',
 mi:'mein / meine',su:'sein / ihr',tu:'dein / deine',yo:'ich',ella:'sie',él:'er',le:'ihm / ihr',se:'sich',llama:'heißt',come:'isst',bebe:'trinkt',tiene:'hat',juega:'spielt',
 va:'geht',hay:'es gibt',dice:'sagt',pregunta:'fragt',habla:'spricht',haces:'machst',otro:'ein anderer',nada:'nichts / er schwimmt',bueno:'gut',para:'für',
 lucía:'Lucía (Name)',pablo:'Pablo (Name)',toby:'Toby (Name eines Hundes)',españa:'Spanien',tú:'du',ana:'Ana (Name)',tom:'Tom (Name)',está:'ist (wo?)',pequeña:'klein',bonita:'schön',alta:'groß / hoch',lenta:'langsam',rápida:'schnell',mia:'Mia (Name)',muchos:'viele',comen:'essen (sie)',roja:'rot',blanca:'weiß',quieres:'willst du / möchtest du',madrid:'Madrid (Hauptstadt von Spanien)'};
const TEXTE=[
 {id:'toby',art:'Geschichte',titel:'Mi perro Toby',text:"¡Hola! Me llamo Lucía y tengo ocho años.\nTengo un perro. Se llama Toby. Es pequeño y marrón.\nToby come mucho y bebe agua.\nPero no come chocolate: el chocolate no es bueno para perros.",
  fragen:[["Lucía tiene ocho años.",true],["Toby es grande.",false],["Toby come chocolate.",false]]},
 {id:'pez',art:'Witz',titel:'El pez',text:"Un pez pregunta a otro pez: «¿Qué haces?»\nEl otro pez dice: «¡Nada!»",
  fragen:[["Un pez habla con otro pez.",true],["Un pez habla con un gato.",false]]},
 {id:'cena',art:'Hintergrund',titel:'La cena en España',text:"En España, la comida es a las dos o a las tres.\n¡Y la cena es a las nueve o a las diez!\n¿Y tú? ¿A qué hora es la cena en tu casa?",
  fragen:[["En España, la cena es a las seis.",false],["En España, la comida es a las dos o a las tres.",true]]},
 {id:'lunes',art:'Geschichte',titel:'El lunes',text:"Hoy es lunes. Hace sol.\nPablo va al colegio con su mochila.\nEn la mochila hay un libro, un cuaderno y un lápiz.\n¡Pero no hay goma!",
  fragen:[["Hoy es martes.",false],["Hace sol.",true],["Pablo tiene una goma en la mochila.",false]]},
 {id:'familia',art:'Geschichte',titel:'Mi familia',text:"Me llamo Pablo y tengo nueve años. Vivo en Alemania con mi familia.\nMi madre se llama Ana y mi padre se llama Tom.\nTengo una hermana. Se llama Mia y tiene seis años.\nMi abuela tiene un gato. ¡El gato es muy viejo!",
  fragen:[["Pablo tiene nueve años.",true],["La hermana de Pablo se llama Ana.",false],["El gato es muy viejo.",true]]},
 {id:'cuaderno',art:'Witz',titel:'¿Dónde está tu cuaderno?',text:"La profesora: «Pablo, ¿dónde está tu cuaderno?»\nPablo: «En casa.»\nLa profesora: «¿Y tu libro?»\nPablo: «En casa.»\nLa profesora: «¿Y tú? ¿Qué haces aquí?»",
  fragen:[["El cuaderno de Pablo está en casa.",true],["El libro de Pablo está en el colegio.",false]]},
 {id:'grande',art:'Fun Fact',titel:'Grande y pequeño',text:"Una jirafa es muy alta.\nUna tortuga es muy lenta.\nUn ratón es pequeño, pero un elefante es muy grande.\n¿Y tu animal favorito? ¿Es grande o pequeño?",
  fragen:[["La tortuga es rápida.",false],["La jirafa es alta.",true]]},
 {id:'casa',art:'Geschichte',titel:'Mi casa',text:"Mi casa es pequeña, pero bonita.\nEn el salón hay un sofá y una televisión.\nEn mi dormitorio hay una cama y un ordenador.\n¡Me gusta mi casa!",
  fragen:[["En el salón hay una cama.",false],["En el dormitorio hay un ordenador.",true]]},
 {id:'bocadillo',art:'Hintergrund',titel:'El bocadillo',text:"En España, muchos niños comen un bocadillo en el colegio.\nUn bocadillo es pan con queso, pan con pollo o pan con chocolate.\n¿Y tú? ¿Qué comes en el colegio?",
  fragen:[["En el colegio, muchos niños comen un bocadillo.",true],["Un bocadillo es una sopa.",false]]}
];
return {GRUND,TEXTE};
})();
