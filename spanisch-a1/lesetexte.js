/* Lesetexte für die Spanisch-Inseln (A1, Kinder von 8 bis 10 Jahren): kurze Geschichten, Witze und Hintergründe.
   Jeder Text darf nur Wörter aus der Wortliste (wortschatz.js) und aus GRUND enthalten; ein Test prüft das bei jedem Lauf.
   Neue Texte HINTEN an TEXTE anhängen. Form: {id, art, titel, text (Zeilen mit \n), fragen:[[Aussage, true/false], …]} */
const LESETEXTE=(()=>{
// Grundwörter und Verbformen, die in der Wortliste nicht einzeln vorkommen, und Namen (mit deutscher Bedeutung zum Antippen)
const GRUND={el:'der / das',la:'die',los:'die (Mehrzahl)',las:'die (Mehrzahl)',un:'ein',una:'eine',es:'ist',son:'sind',de:'von / aus',del:'vom',en:'in / an',a:'nach / zu / um',al:'zum',
 mi:'mein / meine',su:'sein / ihr',tu:'dein / deine',yo:'ich',ella:'sie',él:'er',le:'ihm / ihr',se:'sich',llama:'heißt',come:'isst',bebe:'trinkt',tiene:'hat',juega:'spielt',
 va:'geht',hay:'es gibt',dice:'sagt',pregunta:'fragt',habla:'spricht',haces:'machst',otro:'ein anderer',nada:'nichts / er schwimmt',bueno:'gut',para:'für',
 lucía:'Lucía (Name)',pablo:'Pablo (Name)',toby:'Toby (Name eines Hundes)',españa:'Spanien',tú:'du'};
const TEXTE=[
 {id:'toby',art:'Geschichte',titel:'Mi perro Toby',text:"¡Hola! Me llamo Lucía y tengo ocho años.\nTengo un perro. Se llama Toby. Es pequeño y marrón.\nToby come mucho y bebe agua.\nPero no come chocolate: el chocolate no es bueno para perros.",
  fragen:[["Lucía tiene ocho años.",true],["Toby es grande.",false],["Toby come chocolate.",false]]},
 {id:'pez',art:'Witz',titel:'El pez',text:"Un pez pregunta a otro pez: «¿Qué haces?»\nEl otro pez dice: «¡Nada!»",
  fragen:[["Un pez habla con otro pez.",true],["Un pez habla con un gato.",false]]},
 {id:'cena',art:'Hintergrund',titel:'La cena en España',text:"En España, la comida es a las dos o a las tres.\n¡Y la cena es a las nueve o a las diez!\n¿Y tú? ¿A qué hora es la cena en tu casa?",
  fragen:[["En España, la cena es a las seis.",false],["En España, la comida es a las dos o a las tres.",true]]},
 {id:'lunes',art:'Geschichte',titel:'El lunes',text:"Hoy es lunes. Hace sol.\nPablo va al colegio con su mochila.\nEn la mochila hay un libro, un cuaderno y un lápiz.\n¡Pero no hay goma!",
  fragen:[["Hoy es martes.",false],["Hace sol.",true],["Pablo tiene una goma en la mochila.",false]]}
];
return {GRUND,TEXTE};
})();
