#!/usr/bin/env python3
"""Alle Tests der Lernmissionen ausführen: python3 tests/lauf.py   (nur einige: python3 tests/lauf.py mathe layout)
Braucht Google Chrome (Pfad notfalls per Umgebungsvariable CHROME) und Node.js. Dauer etwa 1 Minute.
Jede Seite wird mit ihren Nachbardateien, tests/hilfen.js und ihren Tests zu einer Datei zusammengesetzt und einmal
in Chrome ohne Fenster ausgeführt; die Ergebnisse stehen danach im Seitentitel."""
import os, re, sys, json, html, subprocess, tempfile, time
T = os.path.dirname(os.path.abspath(__file__)); ROOT = os.path.dirname(T)
CHROME = os.environ.get('CHROME', '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome')
V, P, M = 'englisch-5/vokabeln', 'englisch-5/pronomen', 'mathe-5/zahlen-und-groessen'
# Jede Seite wird einmal in Chrome geladen (ein Start kostet etwa 6 s), darin laufen ihre Tests nacheinander.
# Gemeinsamer Code (gemeinsam.js, runde.js) wird dort geprüft, wo er läuft, nicht in jeder Mission erneut.
# layout.js zuletzt, weil es die Seite schmal macht (288 px = iPhone SE; was hier passt, passt auch breiter).
SUITES = [(V, ['vokabeln.js', 'raenge.js', 'layout.js']),                 # eigener Rundenablauf der Vokabel-Inseln
          (P, ['pronomen.js', 'layout.js']),
          (M, ['mathe.js', 'mathe_ziehen.js', 'raenge.js', 'layout.js'])]  # gemeinsamer Rundenablauf (runde.js)

def run(rel, tests):
    base = os.path.join(ROOT, rel); s = open(os.path.join(base, 'index.html')).read()
    s = re.sub(r'<script src="([^"]+)"></script>', lambda m: '<script>\n' + open(os.path.join(base, m.group(1))).read() + '\n</script>', s)
    s = re.sub(r'<link rel="stylesheet" href="([^"]+)">', lambda m: '<style>' + open(os.path.join(base, m.group(1))).read() + '</style>', s)
    s = s.replace('<div id="app"></div>', '<div id="app"></div><script>window.ERR=[];window.onerror=(m,s,l)=>{ERR.push(m+" @"+l);document.title="ERR:"+JSON.stringify(ERR)};</script>', 1)
    body = open(os.path.join(T, 'hilfen.js')).read()
    for t in tests:  # jeder Test in eigenem Block, damit sich ihre Variablen nicht stören; ein Absturz trifft nur diesen Test
        name = t[:-3]; pre = 'const BREITE=288;\n' if t == 'layout.js' else ''
        body += f'\nCUR={json.dumps(name)};try{{\n{pre}{open(os.path.join(T, t)).read()}\n}}catch(x){{A("läuft ohne Absturz ("+x.message+")",false)}}\n'
    i = s.rindex('\n</script>')
    s = s[:i] + '\n' + body + '\n__bericht();' + s[i:]
    d = tempfile.mkdtemp(); f = os.path.join(d, 'index.html'); open(f, 'w').write(s)
    # eigenes Profil pro Lauf: sonst blockieren sich parallele Chrome-Instanzen (und ein offenes Chrome)
    # eigene Prozessgruppe: bei einem Hänger (z. B. während Chrome sich aktualisiert) wird Chrome samt Hilfsprozessen beendet
    p = subprocess.Popen([CHROME, '--headless', '--disable-gpu', '--no-first-run', '--user-data-dir=' + os.path.join(d, 'profil'), '--virtual-time-budget=3000', '--dump-dom', 'file://' + f],
                         stdout=subprocess.PIPE, stderr=subprocess.DEVNULL, text=True, start_new_session=True)
    try: out = p.communicate(timeout=300)[0]
    except subprocess.TimeoutExpired:
        try: os.killpg(p.pid, 9)
        except OSError: p.kill()
        p.communicate()
        return 'ERR:hängt seit 5 Minuten und wurde abgebrochen (aktualisiert sich Chrome gerade? Dann später erneut starten.)'
    m = re.search(r'<title>([^<]*)', out)
    return html.unescape(m.group(1)) if m else 'ERR:keine Ausgabe von Chrome'

def main():
    if not os.path.exists(CHROME): sys.exit(f'Chrome nicht gefunden: {CHROME} (Pfad mit CHROME=... angeben)')
    bad = 0
    d = subprocess.run(['node', os.path.join(T, 'daten_vokabeln.js'), os.path.join(ROOT, V, 'index.html')], capture_output=True, text=True)
    ok = d.returncode == 0 and not d.stderr.strip(); bad += not ok
    print(('✓' if ok else '✗'), 'Wortliste der Vokabel-Inseln', '' if ok else d.stderr.strip()[:300], flush=True)
    pick = sys.argv[1:]  # optional: nur Seiten/Tests, deren Name eines dieser Wörter enthält
    for rel, tests in SUITES:
        tests = [t for t in tests if not pick or any(w in rel + t for w in pick)]
        if not tests: continue
        t0 = time.time(); t = run(rel, tests); sec = time.time() - t0
        if not t.startswith('R:'): bad += 1; print('✗', rel, t[:300], flush=True); continue
        r = json.loads(t[2:]); res = r.get('R', {})
        print(f'{rel} ({sec:.0f} s)', flush=True)
        for test in tests:
            mine = {k: v for k, v in res.items() if k.startswith(test[:-3] + ' › ')}
            fails = [k.split(' › ', 1)[1] for k, v in mine.items() if v != 'ok']
            bad += bool(fails)
            print('  ✓' if not fails else '  ✗', test, f'({len(mine) - len(fails)}/{len(mine)})', flush=True)
            for f in fails: print('      ✗', f)
            if fails:
                for p in [p for p in r.get('probs', []) if p.startswith(test[:-3] + ' › ')][:10]: print('        ', p.split(' › ', 1)[1])
        for e in r.get('err', []): bad += 1; print('  ✗ JS-Fehler', e)
    print('\nAlles in Ordnung.' if not bad else f'\n{bad} Test(s) mit Fehlern.')
    sys.exit(1 if bad else 0)

if __name__ == '__main__': main()
