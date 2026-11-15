/* Wortschatz Englisch Klasse 5: gemeinsame Grundlage aller Englisch-5-Missionen (Vokabel-Inseln, Pronomen-Inseln, ...).
   Neue Wörter NUR HINTEN an W anhängen, denn gespeicherte Runden merken sich Positionen.
   Form: [Insel, Englisch (Alternativen mit |), Deutsch (Alternativen mit /)]. Eine neue Insel zusätzlich in TOPICS eintragen. */
const WORTSCHATZ=(()=>{
const W = [
 ['zahlen','one','eins'],['zahlen','two','zwei'],['zahlen','three','drei'],['zahlen','four','vier'],['zahlen','five','fünf'],
 ['zahlen','six','sechs'],['zahlen','seven','sieben'],['zahlen','eight','acht'],['zahlen','nine','neun'],['zahlen','ten','zehn'],
 ['zahlen','eleven','elf'],['zahlen','twelve','zwölf'],['zahlen','thirteen','dreizehn'],['zahlen','fourteen','vierzehn'],
 ['zahlen','fifteen','fünfzehn'],['zahlen','sixteen','sechzehn'],['zahlen','seventeen','siebzehn'],['zahlen','eighteen','achtzehn'],
 ['zahlen','nineteen','neunzehn'],['zahlen','twenty','zwanzig'],

 ['zeit','Monday','Montag'],['zeit','Tuesday','Dienstag'],['zeit','Wednesday','Mittwoch'],['zeit','Thursday','Donnerstag'],
 ['zeit','Friday','Freitag'],['zeit','Saturday','Samstag'],['zeit','Sunday','Sonntag'],['zeit','every day','jeden Tag'],
 ['zeit','on Monday','am Montag'],['zeit','time','Zeit / Uhrzeit'],['zeit','minute','Minute'],
 ['zeit',"at 1 o'clock|at one o'clock",'um ein Uhr / um 13 Uhr'],['zeit','appointment','Termin / Verabredung'],
 ['zeit','now','jetzt / nun'],['zeit','before school|before lessons','vor der Schule / vor dem Unterricht'],
 ['zeit','the first day','der erste Tag'],

 ['farben','red','rot'],['farben','yellow','gelb'],['farben','blue','blau'],['farben','green','grün'],['farben','brown','braun'],
 ['farben','orange','orange'],['farben','grey','grau'],['farben','pink','rosa / pink'],['farben','purple','lila / violett'],
 ['farben','white','weiß'],['farben','black','schwarz'],['farben','navy','marineblau / Marine'],['farben','dark','dunkel'],
 ['farben','colour','Farbe'],['farben','uniform','Schuluniform / Uniform'],['farben','shoe','Schuh'],
 ['farben','trainer','Sportschuh / Turnschuh'],['farben','to wear|wear','tragen (Kleidung)'],

 ['beschreiben','big','groß'],['beschreiben','long','lang'],['beschreiben','short','kurz'],['beschreiben','new','neu'],
 ['beschreiben','different','anders / verschieden'],['beschreiben','British','britisch'],['beschreiben','nice','schön / nett'],
 ['beschreiben','great','toll / großartig'],['beschreiben','good','gut'],['beschreiben','strange','komisch / merkwürdig'],
 ['beschreiben','silly','albern / doof'],['beschreiben','sad','traurig'],['beschreiben','friendly','freundlich'],

 ['tiere','zoo','Zoo'],['tiere','animal','Tier'],['tiere','pet','Haustier'],['tiere','seal','Robbe / Seehund'],['tiere','bear','Bär'],
 ['tiere','elephant','Elefant'],['tiere','giraffe','Giraffe'],['tiere','lion','Löwe'],['tiere','monkey','Affe'],['tiere','pig','Schwein'],
 ['tiere','snake','Schlange'],['tiere','whale','Wal'],['tiere','ant','Ameise'],['tiere','bird','Vogel'],['tiere','butterfly','Schmetterling'],
 ['tiere','cat','Katze'],['tiere','dog','Hund'],['tiere','frog','Frosch'],['tiere','guinea pig','Meerschweinchen'],['tiere','horse','Pferd'],
 ['tiere','rabbit','Kaninchen / Hase'],['tiere','rat','Ratte'],

 ['klasse','classroom','Klassenraum / Klassenzimmer'],['klasse','board','Tafel'],['klasse','cupboard','Schrank'],['klasse','chair','Stuhl'],
 ['klasse','desk','Schreibtisch / Pult'],['klasse','door','Tür'],['klasse','window','Fenster'],['klasse','clock','Uhr (Wanduhr, Turmuhr)'],
 ['klasse','watch','Armbanduhr'],['klasse','school bag|schoolbag','Schultasche / Schulranzen'],['klasse','book','Buch'],
 ['klasse','exercise book','Heft / Schulheft'],['klasse','ruler','Lineal'],['klasse','pen','Kuli / Füller / Stift'],['klasse','pencil','Bleistift'],
 ['klasse','pencil case','Federmäppchen / Mäppchen'],['klasse','glue stick','Klebestift'],['klasse','glue','Kleber / Klebstoff'],
 ['klasse','rubber','Radiergummi'],['klasse','sharpener','Spitzer / Anspitzer'],

 ['schule','school','Schule'],['schule','at school','in der Schule'],['schule','class','Klasse (Schulklasse)'],
 ['schule','lesson','Unterrichtsstunde / Stunde'],['schule','teacher','Lehrer / Lehrerin'],['schule','student','Schüler / Schülerin'],
 ['schule','classmate','Mitschüler / Mitschülerin'],['schule','English','Englisch'],['schule','library','Bücherei / Bibliothek'],
 ['schule','language','Sprache'],['schule','sentence','Satz'],['schule','speaker','Sprecher / Sprecherin'],
 ['schule','profile','Steckbrief / Profil'],['schule','form of|form','Form (von)'],['schule','rhyme','Reim'],['schule','game','Spiel'],
 ['schule','tip','Tipp'],

 ['leute','boy','Junge'],['leute','girl','Mädchen'],['leute','kid','Kind'],['leute','people','Menschen / Leute'],['leute','mum','Mama'],
 ['leute','mother','Mutter'],['leute','dad','Papa'],['leute','father','Vater'],['leute','brother','Bruder'],['leute','sister','Schwester'],
 ['leute','flat','Wohnung'],['leute','home','Zuhause'],['leute','at home','zu Hause / daheim'],
 ['leute','to go home|go home','nach Hause gehen'],['leute','to come home|come home','nach Hause kommen'],
 ['leute','hometown','Heimatstadt'],

 ['stadt','town','Stadt'],['stadt','sea','Meer'],['stadt','river','Fluss'],['stadt','harbour','Hafen'],['stadt','boat','Boot'],
 ['stadt','castle','Burg / Schloss'],['stadt','tower','Turm'],['stadt','swimming pool|pool','Schwimmbad'],['stadt','big wheel','Riesenrad'],
 ['stadt','map','Karte / Stadtplan'],['stadt','card','Karte (zum Beispiel Postkarte)'],['stadt','picture','Bild'],['stadt','photo','Foto'],
 ['stadt','place','Ort / Platz'],['stadt','here','hier'],['stadt','there','dort / dorthin'],['stadt','near','nahe bei / in der Nähe von'],
 ['stadt','at','an / bei / in (wo?)'],

 ['verben','to see|see','sehen'],['verben','to go|go','gehen / fahren'],['verben','to look at|look at','anschauen / ansehen'],
 ['verben','can','können'],['verben','to think|think','denken / glauben'],['verben','to say|say','sagen'],['verben','to show|show','zeigen'],
 ['verben','to come|come','kommen'],['verben','to put|put','legen / stellen / hintun'],
 ['verben','to talk to|talk to|to talk|talk','sprechen mit / reden mit'],['verben','to open|open','öffnen / aufmachen'],
 ['verben','to touch|touch','anfassen / berühren'],['verben','to give|give','geben'],['verben','to know|know','wissen / kennen'],
 ['verben','to wait for|wait for|to wait|wait','warten (auf)'],['verben','to hurry up|hurry up','sich beeilen'],
 ['verben','to forget|forget','vergessen'],['verben','to have|have','haben'],['verben','to speak|speak','sprechen'],

 ['kleine','too','auch'],['kleine','of','von'],['kleine','for','für'],['kleine','what?|what','was?'],['kleine','who?|who','wer?'],
 ['kleine','where?|where','wo? / wohin?'],['kleine','your','dein / deine / euer / eure'],['kleine','our','unser / unsere'],
 ['kleine','me','mich / mir'],['kleine','or','oder'],['kleine','but','aber'],['kleine','with','mit'],['kleine','without','ohne'],
 ['kleine','please','bitte'],['kleine','when','wenn'],['kleine','thing','Ding / Sache'],['kleine','his mum','seine Mama'],
 ['kleine','her best friend','ihre beste Freundin / ihr bester Freund'],['kleine','their first day','ihr erster Tag'],

 ['hallo','Hello.','Hallo.'],['hallo','My name is ...','Ich heiße ...'],['hallo',"I'm from Germany.",'Ich komme aus Deutschland.'],
 ['hallo',"I'm ten years old.",'Ich bin zehn Jahre alt.'],['hallo',"What's your name?",'Wie heißt du?'],
 ['hallo','How old are you?','Wie alt bist du?'],['hallo','Where are you from?','Woher kommst du?'],
 ['hallo','What about you?','Und du?'],['hallo','Nice to meet you.','Schön, dich kennenzulernen.'],['hallo','Thank you.','Danke.'],
 ['hallo','Bye.','Tschüs.'],['hallo','See you.','Bis bald.'],['hallo',"I'm sorry.|Sorry.",'Tut mir leid. / Entschuldigung.'],
 ['hallo','Welcome to our school.','Willkommen an unserer Schule.'],['hallo',"Let's go!",'Los geht’s!'],
 ['hallo','about me/you/...','über mich/dich/...'],

 ['saetze',"Yes, that's right.",'Ja, das stimmt.'],['saetze',"No, that's wrong.",'Nein, das ist falsch.'],
 ['saetze','Is it Monday?','Ist heute Montag?'],['saetze','What time is it?','Wie spät ist es?'],['saetze',"You're late.",'Du bist zu spät.'],
 ['saetze','Watch out!','Vorsicht! / Pass auf!'],['saetze',"Don't go.",'Geh nicht.'],['saetze','So?','Na und?'],
 ['saetze','Have a go.','Probier es mal.'],['saetze','Follow me.','Folge mir. / Folgt mir.'],['saetze','Simon says ...','Simon sagt ...'],
 ['saetze','Let me show you ...','Ich zeige dir ...'],['saetze','This is ...','Das ist ...'],['saetze','Here are ...','Hier sind ...'],
 ['saetze','There are ...','Da sind ... / Es gibt ...'],['saetze',"There's ...",'Da ist ... / Es gibt ...'],
 ['saetze','my favourite colour','meine Lieblingsfarbe'],['saetze','I like ...','Ich mag ...'],['saetze',"I don't like ...",'Ich mag ... nicht.'],
 ['saetze',"A snake isn't a good pet.",'Eine Schlange ist kein gutes Haustier.'],['saetze','an elephant','ein Elefant'],
 ['saetze',"she's ...",'sie ist ...'],['saetze',"they're ...",'sie sind ...'],['saetze',"he/she/it isn't ...",'er/sie/es ist nicht ...'],
 ['saetze',"you aren't ...",'du bist nicht ... / ihr seid nicht ...'],['saetze','lots of ...|a lot of ...','viel ... / viele ...'],
 ['saetze','on the way to ...','auf dem Weg zu ...'],
 // Unit 1, Seite 192 und 193 (neue Wörter immer hier hinten anhängen)
 ['zahlen','twenty-one|twenty one','einundzwanzig'],['zahlen','twenty-two|twenty two','zweiundzwanzig'],['zahlen','twenty-three|twenty three','dreiundzwanzig'],
 ['zahlen','twenty-four|twenty four','vierundzwanzig'],['zahlen','twenty-five|twenty five','fünfundzwanzig'],['zahlen','twenty-six|twenty six','sechsundzwanzig'],
 ['zahlen','thirty','dreißig'],['zahlen','thirty-one|thirty one','einunddreißig'],['zahlen','thirty-two|thirty two','zweiunddreißig'],
 ['zahlen','forty','vierzig'],['zahlen','fifty','fünfzig'],['zahlen','sixty','sechzig'],['zahlen','seventy','siebzig'],['zahlen','eighty','achtzig'],['zahlen','ninety','neunzig'],
 ['zahlen','a hundred|one hundred','hundert / einhundert'],['zahlen','zero','Null'],['zahlen','o|oh','Null (in Telefonnummern)'],['zahlen','double','Doppel-'],['zahlen','telephone|phone','Telefon'],
 ['zeit','birthday','Geburtstag'],['zeit','September','September'],
 ['tag','subject|school subject','Schulfach'],['tag','art','Kunst'],['tag','design and technology','Design und Technik'],['tag','French','Französisch'],
 ['tag','geography','Geografie'],['tag','history','Geschichte (Schulfach)'],['tag','ICT','Informations- und Kommunikationstechnologie'],['tag','maths|mathematics','Mathematik'],
 ['tag','music','Musik'],['tag','PE','Sportunterricht / Turnen'],['tag','religion','Religion'],['tag','science','Naturwissenschaft'],
 ['tag','timetable','Stundenplan'],['tag','hour','Stunde'],['tag','lunch','Mittagessen'],['tag','break','Pause'],
 ['tag','quarter past ten|a quarter past ten','Viertel nach zehn'],['tag','half past ten','halb elf'],['tag','quarter to eleven|a quarter to eleven','Viertel vor elf'],
 ['klasse','ball','Ball'],['klasse','football','Fußball'],
 ['schule','question','Frage'],['schule','answer','Antwort'],['schule','word','Wort'],['schule','letter','Buchstabe'],
 ['schule','in English','auf Englisch'],['schule','in German','auf Deutsch'],
 ['schule','Miss Bell','Frau Bell (Anrede für Lehrerinnen)'],['schule','Mr Brown','Herr Brown'],['schule','Mrs Brown','Frau Brown'],
 ['stadt','street','Straße'],
 ['verben','to help|help','helfen'],['verben','to come in|come in','hereinkommen'],['verben','to start|start|to begin|begin','anfangen / beginnen'],['verben','to throw|throw','werfen'],
 ['verben','to ask|ask','fragen'],['verben','to catch|catch','fangen'],['verben','to answer|answer','antworten / beantworten'],['verben','to do|do','machen / tun'],
 ['verben','to live|live','leben / wohnen'],['verben','to learn|learn','lernen'],
 ['kleine','help','Hilfe'],['kleine','so','also / deshalb / daher'],['kleine','then','dann'],['kleine','again','wieder / noch einmal'],['kleine','only','nur / bloß'],['kleine','when?','wann?'],
 ['hallo','Good morning.','Guten Morgen.'],['hallo','about yourself','über dich selbst'],
 ['saetze','Can you help me, please?','Kannst du mir bitte helfen?'],['saetze','Can you say that again, please?','Kannst du das bitte noch einmal sagen?'],
 ['saetze','Can I ask you a question?','Kann ich dir eine Frage stellen?'],['saetze','They live at 88 School Street.','Sie wohnen in der Schulstraße 88.'],
 ['saetze','When is the lunch break at your school?','Wann ist die Mittagspause an deiner Schule?']
];
const TOPICS = [
 {id:'zahlen',name:'Zahlen-Insel',map:'Zahlen',sub:'one bis a hundred, Telefonnummern'},
 {id:'zeit',name:'Uhren-Insel',map:'Uhren',sub:'Wochentage, Uhrzeit, Termine'},
 {id:'farben',name:'Farben-Insel',map:'Farben',sub:'Farben und was man anzieht'},
 {id:'beschreiben',name:'Wie-ist-das-Insel',map:'Wie ist das?',sub:'groß, kurz, albern, freundlich ...'},
 {id:'tiere',name:'Tier-Insel',map:'Tiere',sub:'vom Meerschweinchen bis zum Wal'},
 {id:'klasse',name:'Klassenzimmer-Insel',map:'Klasse',sub:'Tafel, Lineal, Radiergummi ...'},
 {id:'schule',name:'Schul-Insel',map:'Schule',sub:'Lehrer, Unterricht, Sprache ...'},
 {id:'leute',name:'Familien-Insel',map:'Familie',sub:'Mama, Papa, Geschwister, Zuhause'},
 {id:'stadt',name:'Hafen-Insel',map:'Hafen',sub:'Meer, Burg, Riesenrad ...'},
 {id:'verben',name:'Tu-Wörter-Insel',map:'Tu-Wörter',sub:'sehen, sagen, geben, vergessen ...'},
 {id:'kleine',name:'Mini-Wörter-Insel',map:'Mini',sub:'mit, ohne, aber, wer, wo ...'},
 {id:'hallo',name:'Hallo-Insel',map:'Hallo',sub:'Sich vorstellen und begrüßen'},
 {id:'saetze',name:'Plauder-Insel',map:'Plaudern',sub:'Sätze für jeden Tag'},
 {id:'tag',name:'Stundenplan-Insel',map:'Stundenplan',sub:'Schulfächer, Pausen, Uhrzeiten'}
];
const NOTYPE=['hallo','saetze']; // Satz-Inseln: nicht zum Tippen, dafür Satzbaukasten
// Bedeutungsnahe Wörter (englisch, wie angezeigt): nie gegeneinander als falsche Antwort, denn „mum = Mutter“ oder „photo = Bild“ ist nicht falsch
const NAH=[['mum','mother'],['dad','father'],['pen','pencil'],['glue','glue stick'],['class','lesson','classroom'],['student','classmate'],['home','at home','flat'],
 ['map','card'],['picture','photo'],['to say','to speak','to talk to'],['to see','to look at'],['nice','good','great','big'],['strange','silly'],['navy','blue','dark','black'],['shoe','trainer'],
 ['pet','animal'],['Monday','on Monday'],['book','exercise book','library'],['town','hometown'],['to think','to know'],['to put','to give'],['clock','watch','time'],['to go','to come','to come in','to go home','to come home'],
 ['rabbit','guinea pig','rat'],['when','when?'],['help','to help'],['answer','to answer'],['zero','o'],['so','So?'],['hour','lesson'],['Miss Bell','Mrs Brown'],
 ['English','in English'],['ball','football'],['lunch','break'],
 ...['art','design and technology','French','geography','history','ICT','maths','music','PE','religion','science'].map(f=>['subject',f])]; // jedes Fach ist ein Schulfach
return {W,TOPICS,NOTYPE,NAH};
})();
const enShow=e=>e[1].split('|')[0];
const deShow=e=>e[2].replace(/ \/ /g,' / ');
