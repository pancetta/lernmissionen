/* Lesetexte für die Vokabel-Inseln (Englisch Klasse 5): kurze Geschichten, Witze, Fun Facts und Hintergründe.
   Jeder Text darf nur Wörter aus der Wortliste (wortschatz.js) und aus GRUND enthalten; ein Test prüft das bei jedem Lauf.
   Neue Vokabeln: neue Texte HINTEN an TEXTE anhängen (die Seite merkt sich gelesene Texte über die id).
   Form: {id, art:'Geschichte'|'Witz'|'Fun Fact'|'Hintergrund', titel, text (Zeilen mit \n), fragen:[[Aussage, true/false], …]} */
const LESETEXTE=(()=>{
// Grundwörter, die in der Wortliste nicht einzeln vorkommen, und Namen (mit deutscher Bedeutung zum Antippen)
const GRUND={a:'ein / eine',an:'ein / eine',the:'der / die / das',and:'und',i:'ich',you:'du / ihr',he:'er',she:'sie',it:'es',we:'wir',they:'sie (Mehrzahl)',
 am:'bin',is:'ist',are:'bist / sind / seid',"it's":'es ist',has:'hat',"doesn't":'(er / sie / es) … nicht',not:'nicht',my:'mein / meine',from:'aus / von',in:'in',
 to:'zu / nach',on:'an / auf',this:'dies / das',that:'das',there:'dort / da',
 tim:'Tim (Name)',ben:'Ben (Name)',lea:'Lea (Name)',mia:'Mia (Name)',sam:'Sam (Name)',plymouth:'Plymouth (Stadt in England)'};
const TEXTE=[
 {id:'uhr',art:'Witz',titel:'What time is it?',text:"Miss Bell: Tim, what time is it?\nTim: I don't know. I don't have a watch.\nMiss Bell: Look at the clock, please!\nTim: Oh, it's half past ten. So it's time for the break!",
  fragen:[["Tim has a watch.",false],["It's half past ten.",true],["Tim looks at the clock.",true]]},
 {id:'sam',art:'Hintergrund',titel:'A British school day',text:"Hello! My name is Sam. I'm eleven years old and I live in Plymouth.\nSchool starts at nine o'clock. Lots of British students wear a school uniform. My uniform is navy and white.\nOur lunch break is an hour long. In class, we say 'Miss' to our teacher.\nMy favourite subject is PE. What about you?",
  fragen:[["Sam lives in Plymouth.",true],["School starts at ten o'clock.",false],["Sam's favourite subject is maths.",false]]},
 {id:'mia',art:'Geschichte',titel:'The new girl',text:"It's the first day at school. A new girl comes in.\n'Good morning,' says Miss Bell. 'This is Mia. She is from Germany.'\nMia is ten years old. She is sad and she doesn't say a word.\nThen Ben throws a ball to Mia. Mia catches the ball.\n'Can I ask you a question?' says Ben. 'What's your favourite colour?'\nMia answers: 'Green! And you?' Now Mia isn't sad.",
  fragen:[["Mia is from Germany.",true],["Mia throws the ball to Ben.",false],["Mia's favourite colour is green.",true]]},
 {id:'ich',art:'Witz',titel:'A sentence with I',text:"Miss Bell: Tim, please say a sentence with the word 'I'.\nTim: I is …\nMiss Bell: No, Tim! Say 'I am'.\nTim: Yes, Miss Bell. I am a letter!",
  fragen:[["Miss Bell is Tim's teacher.",true],["Tim says a sentence with the word 'you'.",false]]},
 {id:'zeit',art:'Fun Fact',titel:'Lots of minutes',text:"There are sixty minutes in an hour.\nThere are twenty-four hours in a day.\nThere are seven days from Monday to Sunday.\nSo a day has a lot of minutes!",
  fragen:[["There are sixty minutes in an hour.",true],["There are twenty hours in a day.",false]]},
 {id:'telefon',art:'Hintergrund',titel:"Say 'o' and 'double'",text:"In English, you can say 'o' for 0.\nAnd for 22, you can say 'double two'.\nSo 0166 204 is 'o one double six two o four'.\nNow you: say 0122 in English!",
  fragen:[["In English, you can say 'o' for 0.",true],["'Double five' is 55.",true],["'Double five' is 10.",false]]},
 {id:'ball',art:'Geschichte',titel:'The ball game',text:"It's a game in Miss Bell's class. Miss Bell throws a ball to a student.\nThe student catches the ball and answers a question. Then the student throws the ball to a classmate and asks a question.\n'When is your birthday?' asks Lea. 'In September,' answers Ben.\nBen throws the ball to Lea, but the ball goes to the window. Watch out!",
  fragen:[["Ben's birthday is in September.",true],["The ball goes to the door.",false],["Lea asks a question.",true]]}
];
return {GRUND,TEXTE};
})();
