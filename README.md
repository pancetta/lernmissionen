# Lernmissionen

Lernmissionen ist eine Sammlung kleiner Übungsseiten für Schulkinder (zum Beispiel Deutsch Klasse 3, Englisch und Mathe Klasse 5). Sie laufen direkt im Browser, auf iPad, iPhone oder PC, ohne Installation.
Die Seiten sammeln keine Daten, nutzen kein Tracking und laden nichts von fremden Servern.
Der Lernfortschritt wird nur im Browser des jeweiligen Geräts gespeichert (localStorage) und verlässt dieses Gerät nie.

Aufbau: `index.html` ist die Übersicht, jede Mission liegt in einem eigenen Ordner `fach-klasse/mission/index.html`.
Alle Missionen teilen sich Gestaltung und Spielablauf im Ordner `gemeinsam/` (`stil.css`, `gemeinsam.js`, `runde.js`, `spiele.js` für Spiele wie Artikel-Häfen oder „Größer oder kleiner?“). Die Englisch-Missionen nutzen zusätzlich die Wortliste `englisch-5/wortschatz.js` (neue Wörter nur hinten anhängen).

Tests: `python3 tests/lauf.py` prüft alle Missionen automatisch in Google Chrome ohne Fenster (etwa 1 Minute; braucht Chrome und Node.js). Mit Stichwort nur einen Teil, zum Beispiel `python3 tests/lauf.py mathe`.
