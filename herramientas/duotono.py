"""Duotono acuarela para fotos de hoteles y turismo de la web.
Uso: python3 herramientas/duotono.py ENTRADA SALIDA.webp [x0 y0 x1 y1] [semilla]"""
import sys, numpy as np
from PIL import Image
from scipy.ndimage import gaussian_filter
Image.MAX_IMAGE_PIXELS = None
src, dst = sys.argv[1], sys.argv[2]
box = tuple(map(int, sys.argv[3:7])) if len(sys.argv) >= 7 else None
seed = int(sys.argv[7]) if len(sys.argv) >= 8 else 7
W = 900
im = Image.open(src).convert('RGB')
if box: im = im.crop(box)
im = im.resize((W, round(im.height * W / im.width)), Image.LANCZOS)
a = np.asarray(im).astype(float)
lum = a @ np.array([.299, .587, .114])
azul = np.clip((a[..., 2] - np.maximum(a[..., 0], a[..., 1])) / 60, 0, 1)   # cielos azules cuentan como claros
g = lum * (1 - azul) + a.max(axis=2) * azul
g = np.clip((g - np.percentile(g, 1)) / (np.percentile(g, 99) - np.percentile(g, 1) + 1e-6), 0, 1)
g = np.clip((g - .5) * 1.08 + .5 + .05, 0, 1) ** .9
oscuro, medio, claro = np.array([40, 66, 94.]), np.array([129, 156, 170.]), np.array([246, 243, 236.])
t = g[..., None]
rgb = np.where(t < .55, oscuro + (medio - oscuro) * (t / .55), medio + (claro - medio) * ((t - .55) / .45))
rng = np.random.default_rng(seed)
h, w = g.shape
rgb += (gaussian_filter(rng.normal(0, 1, (h, w)), .8) * 4)[..., None]
yy, xx = np.mgrid[0:h, 0:w]
d = ((np.abs((xx - w / 2) / (w * .5)) ** 5) + (np.abs((yy - h / 2) / (h * .5)) ** 5)) ** (1 / 5)
n = sum(gaussian_filter(rng.normal(0, 1, (h, w)), s) * k for s, k in [(40, 9), (14, 4), (5, 1.5)])
n = n / np.abs(n).max()
m = gaussian_filter(np.clip((.98 - d + n * .07) / .3, 0, 1) ** 1.3, 2.5)
fundido = np.clip(gaussian_filter(m, 22) / .85, 0, 1)[..., None] ** .9   # aclarado amplio y suave hacia el borde (evita halos en fotos oscuras)
rgb = rgb * fundido + claro * (1 - fundido)
Image.fromarray(np.dstack([np.clip(rgb, 0, 255), m * 255]).astype('uint8'), 'RGBA').save(dst, 'WEBP', quality=86, method=6)
print(dst, (w, h))
