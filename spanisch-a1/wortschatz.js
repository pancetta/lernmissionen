/* Wortschatz Spanisch A1 für Kinder (8 bis 10 Jahre): Grundwortschatz der A1-Themen, europäisches Spanisch (zumo, ordenador).
   Neue Wörter NUR HINTEN an W anhängen, denn gespeicherte Runden merken sich Positionen.
   Form: [Insel, Spanisch (Alternativen mit |), Deutsch (Alternativen mit /)]. Nomen mit Artikel (el, la, los, las); beim Tippen zählt das Nomen auch ohne Artikel.
   Eine neue Insel zusätzlich in TOPICS eintragen. */
const WORTSCHATZ=(()=>{
const W = [
 ['hola','¡Hola!','Hallo!'],['hola','¡Adiós!','Tschüs! / Auf Wiedersehen!'],['hola','¡Hasta luego!','Bis später! / Bis bald!'],
 ['hola','¡Buenos días!','Guten Morgen!'],['hola','¡Buenas tardes!','Guten Tag! (am Nachmittag)'],['hola','¡Buenas noches!','Guten Abend! / Gute Nacht!'],
 ['hola','¿Qué tal?','Wie geht’s?'],['hola','Muy bien, gracias.','Sehr gut, danke.'],['hola','¿Cómo te llamas?','Wie heißt du?'],['hola','Me llamo …','Ich heiße …'],
 ['hola','¿Cuántos años tienes?','Wie alt bist du?'],['hola','Tengo ocho años.','Ich bin acht Jahre alt.'],['hola','¿De dónde eres?','Woher kommst du?'],
 ['hola','Soy de Alemania.','Ich komme aus Deutschland.'],['hola','Gracias.','Danke.'],['hola','Por favor.','Bitte.'],['hola','De nada.','Gern geschehen.'],['hola','Perdón.','Entschuldigung.'],

 ['numeros','cero','null'],['numeros','uno','eins'],['numeros','dos','zwei'],['numeros','tres','drei'],['numeros','cuatro','vier'],['numeros','cinco','fünf'],
 ['numeros','seis','sechs'],['numeros','siete','sieben'],['numeros','ocho','acht'],['numeros','nueve','neun'],['numeros','diez','zehn'],['numeros','once','elf'],
 ['numeros','doce','zwölf'],['numeros','trece','dreizehn'],['numeros','catorce','vierzehn'],['numeros','quince','fünfzehn'],['numeros','dieciséis','sechzehn'],
 ['numeros','diecisiete','siebzehn'],['numeros','dieciocho','achtzehn'],['numeros','diecinueve','neunzehn'],['numeros','veinte','zwanzig'],

 ['colores','rojo','rot'],['colores','azul','blau'],['colores','amarillo','gelb'],['colores','verde','grün'],['colores','negro','schwarz'],['colores','blanco','weiß'],
 ['colores','naranja','orange'],['colores','rosa','rosa'],['colores','morado','lila'],['colores','marrón','braun'],['colores','gris','grau'],['colores','el color','die Farbe'],

 ['familia','la familia','Familie'],['familia','la madre','Mutter'],['familia','el padre','Vater'],['familia','la mamá','Mama'],['familia','el papá','Papa'],
 ['familia','el hermano','Bruder'],['familia','la hermana','Schwester'],['familia','el abuelo','Opa / Großvater'],['familia','la abuela','Oma / Großmutter'],
 ['familia','el tío','Onkel'],['familia','la tía','Tante'],['familia','el bebé','Baby'],['familia','el amigo','Freund'],['familia','la amiga','Freundin'],
 ['familia','el niño','Junge'],['familia','la niña','Mädchen'],

 ['animales','el animal','Tier'],['animales','el perro','Hund'],['animales','el gato','Katze'],['animales','el pájaro','Vogel'],['animales','el pez','Fisch'],
 ['animales','el caballo','Pferd'],['animales','el conejo','Kaninchen'],['animales','el ratón','Maus'],['animales','la vaca','Kuh'],['animales','el cerdo','Schwein'],
 ['animales','la oveja','Schaf'],['animales','el pato','Ente'],['animales','el león','Löwe'],['animales','el elefante','Elefant'],['animales','el oso','Bär'],
 ['animales','el mono','Affe'],['animales','la jirafa','Giraffe'],['animales','la serpiente','Schlange'],['animales','la tortuga','Schildkröte'],['animales','la rana','Frosch'],

 ['escuela','el colegio','Schule'],['escuela','la clase','Klasse / Unterricht'],['escuela','el profesor','Lehrer'],['escuela','la profesora','Lehrerin'],
 ['escuela','el alumno','Schüler'],['escuela','la alumna','Schülerin'],['escuela','el libro','Buch'],['escuela','el cuaderno','Heft'],['escuela','el lápiz','Bleistift'],
 ['escuela','el bolígrafo','Kuli'],['escuela','la goma','Radiergummi'],['escuela','la regla','Lineal'],['escuela','la mochila','Schulranzen / Rucksack'],
 ['escuela','las tijeras','Schere'],['escuela','el estuche','Federmäppchen'],['escuela','la mesa','Tisch'],['escuela','la silla','Stuhl'],['escuela','la pizarra','Tafel'],
 ['escuela','la puerta','Tür'],['escuela','la ventana','Fenster'],

 ['comida','el pan','Brot'],['comida','la leche','Milch'],['comida','el agua','Wasser'],['comida','el zumo','Saft'],['comida','la manzana','Apfel'],
 ['comida','el plátano','Banane'],['comida','la naranja','Orange / Apfelsine'],['comida','la fruta','Obst'],['comida','el queso','Käse'],['comida','el huevo','Ei'],
 ['comida','el pollo','Hähnchen'],['comida','la sopa','Suppe'],['comida','la pizza','Pizza'],['comida','el helado','Eis'],['comida','el chocolate','Schokolade'],
 ['comida','el bocadillo','belegtes Brötchen'],['comida','el desayuno','Frühstück'],['comida','la comida','Mittagessen / Essen'],['comida','la cena','Abendessen'],

 ['cuerpo','el cuerpo','Körper'],['cuerpo','la cabeza','Kopf'],['cuerpo','el pelo','Haare'],['cuerpo','el ojo','Auge'],['cuerpo','la nariz','Nase'],
 ['cuerpo','la boca','Mund'],['cuerpo','la oreja','Ohr'],['cuerpo','el diente','Zahn'],['cuerpo','la mano','Hand'],['cuerpo','el brazo','Arm'],
 ['cuerpo','la pierna','Bein'],['cuerpo','el pie','Fuß'],['cuerpo','el dedo','Finger'],['cuerpo','la espalda','Rücken'],

 ['ropa','la ropa','Kleidung'],['ropa','la camiseta','T-Shirt'],['ropa','los pantalones','Hose'],['ropa','la falda','Rock'],['ropa','el vestido','Kleid'],
 ['ropa','los zapatos','Schuhe'],['ropa','el jersey','Pullover'],['ropa','la chaqueta','Jacke'],['ropa','el gorro','Mütze'],['ropa','la gorra','Kappe / Schirmmütze'],
 ['ropa','los calcetines','Socken'],

 ['tiempo','lunes','Montag'],['tiempo','martes','Dienstag'],['tiempo','miércoles','Mittwoch'],['tiempo','jueves','Donnerstag'],['tiempo','viernes','Freitag'],
 ['tiempo','sábado','Samstag'],['tiempo','domingo','Sonntag'],['tiempo','hoy','heute'],['tiempo','mañana','morgen'],['tiempo','el día','Tag'],['tiempo','la semana','Woche'],
 ['tiempo','Hace sol.','Die Sonne scheint.'],['tiempo','Hace calor.','Es ist heiß.'],['tiempo','Hace frío.','Es ist kalt.'],['tiempo','Llueve.','Es regnet.'],['tiempo','Nieva.','Es schneit.'],

 ['casa','la casa','Haus'],['casa','la cocina','Küche'],['casa','el baño','Bad / Badezimmer'],['casa','el dormitorio','Schlafzimmer'],['casa','el salón','Wohnzimmer'],
 ['casa','el jardín','Garten'],['casa','la cama','Bett'],['casa','el sofá','Sofa'],['casa','la televisión','Fernseher'],['casa','el ordenador','Computer'],['casa','la lámpara','Lampe'],

 ['verbos','ser','sein (wer oder was jemand ist)'],['verbos','estar','sein (wo oder wie jemand ist)'],['verbos','tener','haben'],['verbos','jugar','spielen'],
 ['verbos','comer','essen'],['verbos','beber','trinken'],['verbos','leer','lesen'],['verbos','escribir','schreiben'],['verbos','hablar','sprechen'],
 ['verbos','cantar','singen'],['verbos','bailar','tanzen'],['verbos','nadar','schwimmen'],['verbos','correr','rennen / laufen'],['verbos','dormir','schlafen'],
 ['verbos','vivir','wohnen / leben'],['verbos','mirar','anschauen / ansehen'],['verbos','escuchar','hören / zuhören'],['verbos','ir','gehen / fahren'],

 ['como','grande','groß'],['como','pequeño','klein'],['como','alto','groß (Körpergröße) / hoch'],['como','bajo','klein (Körpergröße) / niedrig'],
 ['como','bonito','schön / hübsch'],['como','nuevo','neu'],['como','viejo','alt'],['como','simpático','nett'],['como','divertido','lustig'],
 ['como','contento','froh / zufrieden'],['como','triste','traurig'],['como','rápido','schnell'],['como','lento','langsam'],

 ['mini','sí','ja'],['mini','no','nein / nicht'],['mini','y','und'],['mini','o','oder'],['mini','pero','aber'],['mini','con','mit'],['mini','también','auch'],
 ['mini','muy','sehr'],['mini','mucho','viel'],['mini','aquí','hier'],['mini','¿qué?','was?'],['mini','¿quién?','wer?'],['mini','¿dónde?','wo?'],['mini','¿cómo?','wie?'],

 ['frases','Me gusta el chocolate.','Ich mag Schokolade.'],['frases','No me gusta la leche.','Ich mag keine Milch.'],['frases','Tengo un perro.','Ich habe einen Hund.'],
 ['frases','Mi color favorito es el azul.','Meine Lieblingsfarbe ist Blau.'],['frases','Vivo en Alemania.','Ich wohne in Deutschland.'],['frases','¿Qué hora es?','Wie spät ist es?'],
 ['frases','Hoy es lunes.','Heute ist Montag.'],['frases','Tengo hambre.','Ich habe Hunger.'],['frases','Tengo sed.','Ich habe Durst.'],
 ['frases','¿Puedo ir al baño?','Darf ich auf die Toilette gehen?'],['frases','No entiendo.','Ich verstehe das nicht.'],['frases','¿Cómo se dice … en español?','Wie sagt man … auf Spanisch?'],
 ['frases','Me gusta jugar al fútbol.','Ich spiele gern Fußball.'],['frases','Mi hermano tiene diez años.','Mein Bruder ist zehn Jahre alt.']
];
const TOPICS = [
 {id:'hola',name:'Hola-Insel',map:'Hola',sub:'Begrüßen und sich vorstellen'},
 {id:'numeros',name:'Zahlen-Insel',map:'Zahlen',sub:'cero bis veinte'},
 {id:'colores',name:'Farben-Insel',map:'Farben',sub:'rojo, azul, verde …'},
 {id:'familia',name:'Familien-Insel',map:'Familie',sub:'Mama, Papa, Geschwister, Freunde'},
 {id:'animales',name:'Tier-Insel',map:'Tiere',sub:'vom Hund bis zur Giraffe'},
 {id:'escuela',name:'Schul-Insel',map:'Schule',sub:'Klassenzimmer und Schulsachen'},
 {id:'comida',name:'Essens-Insel',map:'Essen',sub:'Essen und Trinken'},
 {id:'cuerpo',name:'Körper-Insel',map:'Körper',sub:'Kopf, Hand, Fuß …'},
 {id:'ropa',name:'Kleider-Insel',map:'Kleidung',sub:'Was ziehst du an?'},
 {id:'tiempo',name:'Tage-und-Wetter-Insel',map:'Tage & Wetter',sub:'Wochentage, heute, Wetter'},
 {id:'casa',name:'Haus-Insel',map:'Haus',sub:'Zimmer und Möbel'},
 {id:'verbos',name:'Tu-Wörter-Insel',map:'Tu-Wörter',sub:'spielen, essen, schlafen …'},
 {id:'como',name:'Wie-ist-das-Insel',map:'Wie ist das?',sub:'groß, klein, lustig …'},
 {id:'mini',name:'Mini-Wörter-Insel',map:'Mini',sub:'ja, nein, und, aber …'},
 {id:'frases',name:'Plauder-Insel',map:'Plaudern',sub:'Sätze für jeden Tag'}
];
const NOTYPE=['hola','frases']; // Satz-Inseln: nicht zum Tippen, dafür Satzbaukasten
// Bedeutungsnahe Wörter (spanisch, wie angezeigt): nie gegeneinander als falsche Antwort
const NAH=[['la madre','la mamá'],['el padre','el papá'],['ser','estar'],['grande','alto'],['pequeño','bajo'],['naranja','la naranja'],['el gorro','la gorra'],
 ['¡Buenos días!','¡Buenas tardes!','¡Buenas noches!'],['¡Adiós!','¡Hasta luego!'],['el niño','el hermano'],['la niña','la hermana'],['bonito','simpático'],['contento','divertido'],
 ['la comida','el desayuno','la cena'],['el pájaro','el pato'],['la clase','el colegio'],['mucho','muy'],['correr','ir'],['mirar','escuchar'],
 ...['el perro','el gato','el pájaro','el pez','el caballo','el conejo','el ratón','la vaca','el cerdo','la oveja','el pato','el león','el elefante','el oso','el mono','la jirafa','la serpiente','la tortuga','la rana'].map(x=>['el animal',x]),
 ...['la manzana','el plátano','la naranja'].map(x=>['la fruta',x]),
 ...['el pan','la leche','el agua','el zumo','la manzana','el plátano','la naranja','la fruta','el queso','el huevo','el pollo','la sopa','la pizza','el helado','el chocolate','el bocadillo'].map(x=>['la comida',x]), // la comida heißt auch „Essen“
 ...['la cabeza','el pelo','el ojo','la nariz','la boca','la oreja','el diente','la mano','el brazo','la pierna','el pie','el dedo','la espalda'].map(x=>['el cuerpo',x]),
 ...['la camiseta','los pantalones','la falda','el vestido','los zapatos','el jersey','la chaqueta','el gorro','la gorra','los calcetines'].map(x=>['la ropa',x]),
 ...['rojo','azul','amarillo','verde','negro','blanco','naranja','rosa','morado','marrón','gris'].map(x=>['el color',x])];
// Lieferungen (Units): ab welchem Wort neue Vokabeln dazukamen. Neue Unit = Wörter hinten an W anhängen und hier eine Zeile ergänzen.
const LIEFERUNGEN=[{name:'Start',ab:'¡Hola!'}];
return {W,TOPICS,NOTYPE,NAH,LIEFERUNGEN};
})();
const enShow=e=>e[1].split('|')[0]; // zeigt das Wort der Fremdsprache (Name wie bei Englisch)
const deShow=e=>e[2].replace(/ \/ /g,' / ');
