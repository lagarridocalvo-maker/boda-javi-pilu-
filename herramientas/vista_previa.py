"""Genera la vista previa en un solo archivo (para el Artifact). Uso: python3 herramientas/vista_previa.py SALIDA.html"""
import re, base64, os, sys, json
s = open('index.html', encoding='utf-8').read()
css = open('css/estilos.css', encoding='utf-8').read()
mime = {'webp': 'image/webp', 'png': 'image/png', 'jpg': 'image/jpeg', 'jpeg': 'image/jpeg'}
uri = lambda f: f'data:{mime[f.rsplit(".",1)[1].lower()]};base64,' + base64.b64encode(open('img/' + f, 'rb').read()).decode()
for f in os.listdir('img'):
    if f'url(../img/{f})' in css: css = css.replace(f'url(../img/{f})', f'url({uri(f)})')
s = s.replace('<link rel="stylesheet" href="css/estilos.css">', '<style>\n' + css + '\n</style>')
for f in ['config', 'datos', 'main']:
    s = s.replace(f'<script src="js/{f}.js"></script>', '<script>\n' + open(f'js/{f}.js', encoding='utf-8').read() + '\n</script>')
emb = {}
for f in os.listdir('img'):
    if f'src="img/{f}"' in s:
        emb[f] = uri(f); s = s.replace(f'src="img/{f}"', f'data-emb="{f}"')
# las imágenes que pinta datos.js (hoteles, turismo) se piden como img/...: las resolvemos también
for f in os.listdir('img'):
    if f'"{f}"' in s and f not in emb: emb[f] = uri(f)
loader = ('<script>(function(){var M=' + json.dumps(emb) + ';function fix(r){r.querySelectorAll("img[data-emb]").forEach(function(i){i.src=M[i.dataset.emb];});'
          'r.querySelectorAll("img[src^=\'img/\']").forEach(function(i){var k=i.getAttribute("src").slice(4);if(M[k])i.src=M[k];});}'
          'fix(document);new MutationObserver(function(){fix(document)}).observe(document.documentElement,{childList:true,subtree:true});})();</script>\n')
k = s.rfind('<script>', 0, s.index('window.BODA_CONFIG')); s = s[:k] + loader + s[k:]
head = re.search(r'<head>(.*?)</head>', s, re.S).group(1); body = re.search(r'<body class="intro-activa">(.*?)</body>', s, re.S).group(1)
head = re.sub(r'<meta charset[^>]*>\s*', '', head); head = re.sub(r'<meta name="viewport"[^>]*>\s*', '', head)
open(sys.argv[1], 'w', encoding='utf-8').write(head.strip() + '\n<script>document.body.classList.add("intro-activa")</script>\n' + body)
print(sys.argv[1], os.path.getsize(sys.argv[1]) // 1024, 'KB')
