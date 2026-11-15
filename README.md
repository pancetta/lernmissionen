# Lernmissionen

Lernmissionen ist eine Sammlung kleiner Übungsseiten für Schulkinder (zum Beispiel Deutsch und Mathe Klasse 3, Englisch und Mathe Klasse 5). Sie laufen direkt im Browser, auf iPad, iPhone oder PC, ohne Installation.
Die Seiten sammeln keine Daten, nutzen kein Tracking und laden nichts von fremden Servern.
Der Lernfortschritt wird nur im Browser des jeweiligen Geräts gespeichert (localStorage) und verlässt dieses Gerät nie.

Aufbau: `index.html` ist die Übersicht, jede Mission liegt in einem eigenen Ordner `fach-klasse/mission/index.html`.
Alle Missionen teilen sich Gestaltung und Spielablauf im Ordner `gemeinsam/` (`stil.css`, `gemeinsam.js`, `runde.js`, `spiele.js` für Spiele wie Artikel-Häfen oder „Größer oder kleiner?“). Die Vokabel-Inseln (Englisch, Spanisch) teilen sich die Logik in `gemeinsam/vokabeln.js`; jede Sprache hat ihre Wortliste (`englisch-5/wortschatz.js`, `spanisch-a1/wortschatz.js`) und Lesetexte. Die Englisch-Missionen nutzen die Wortliste `englisch-5/wortschatz.js` (neue Wörter nur hinten anhängen und in `LIEFERUNGEN` die neue Unit eintragen; die Seite zeigt dann bis zur nächsten Unit „neu“ an den betroffenen Inseln). Die Lesetexte stehen in `englisch-5/lesetexte.js`; ein Test erlaubt darin nur Wörter aus der Wortliste und eine kleine Liste von Grundwörtern. Dasselbe gilt für `grammatik.js` jeder Sprache (Regel-Detektiv: Beispiele, selbst entdeckte Regel, Aufgaben; Szenen: Gespräche zum Mitspielen).

Tests: `python3 tests/lauf.py` prüft alle Missionen automatisch in Google Chrome ohne Fenster (etwa 1 Minute; braucht Chrome und Node.js). Mit Stichwort nur einen Teil, zum Beispiel `python3 tests/lauf.py mathe`.
