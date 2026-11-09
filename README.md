# Web de boda · Javi & Pilu · 24.07.2027

Web estática (HTML + CSS + JS, sin dependencias ni compilación). Se publica tal cual en Vercel.

## Estructura

```
index.html          Todas las secciones y textos
css/estilos.css     Diseño (paleta y tipografías arriba del todo, en :root)
js/config.js        ⚠️ DATOS PENDIENTES: formulario, IBAN, enlace Innside, modo huecos
js/datos.js         Hoteles, aparcamientos y turismo (para añadir/quitar tarjetas)
js/main.js          Funcionamiento (sobre, menú, cuenta atrás, carruseles…)
img/                Imágenes
vercel.json         Cabecera noindex (que Google no la indexe)
robots.txt
```

## Publicar en GitHub + Vercel

1. Crea un repositorio en GitHub (privado) y sube esta carpeta tal cual.
2. En vercel.com → *Add New → Project* → importa el repo.
   - Framework Preset: **Other**. Sin build command. Output directory: raíz.
3. Cada vez que hagas push, Vercel la vuelve a publicar sola.
4. Dominio propio (opcional): Vercel → Settings → Domains.
5. Para la vista previa de WhatsApp, cambia en `index.html` la línea `og:image`
   por la URL completa (p. ej. `https://javiypilu.com/img/og-imagen.jpg`).

## Cómo añadir las imágenes que faltan

Guarda cada archivo en `img/` **con exactamente este nombre**. Aparece solo en su sitio.
Con `mostrarHuecos: true` (en `js/config.js`) verás en la web un recuadro con el nombre
y la medida de cada imagen que falta. Antes de enseñarla a invitados, ponlo en `false`.

Consejo: exporta en WebP o PNG comprimido (TinyPNG / Squoosh). Ideal < 300 KB por imagen.

### Ya incluidas
| Archivo | Uso |
|---|---|
| fotomaton.webp | Tira de fotomatón de la pedida (hero) |
| iglesia.webp | Ilustración iglesia (intro + ceremonia) |
| palacio.webp | Ilustración palacio (intro + celebración) |
| mapa-hoteles.webp | Mapa ilustrado de hoteles |
| mapa-ceremonia.webp | Mapa aparcamiento iglesia |
| mapa-celebracion.webp | Mapa aparcamiento palacio |

### Decoración (si no existen, se ocultan)
| Archivo | Medida | Notas |
|---|---|---|
| flores-esquina-a.webp | — | Hortensias (esquinas superiores) ✅ incluida |
| flores-esquina-b.webp | — | Amapolas en ramo (esquinas inferiores) ✅ incluida |
| flores-lateral.webp y hojas-sobre.webp | — | Dos amapolas (laterales de Ceremonia y detrás del sobre) ✅ incluidas |

### Fotos
| Archivo | Medida | Notas |
|---|---|---|
| pareja-hero.png | 900×1100 | Javi y Pilu recortados de cintura/cadera hacia arriba, fondo transparente |
| foto-futuro.webp | 1000×1250 | Foto vertical con la Basílica del Pilar de fondo (sección Nuestro futuro) |
| og-imagen.jpg | 1200×630 | Imagen que sale al compartir el enlace por WhatsApp |

### Ilustraciones (línea fina azul, fondo blanco o transparente)
| Archivo | Medida |
|---|---|
| ilustracion-alojamiento.png | 600×300 (cabecera Alojamiento) |
| rsvp.png | 900×1000 (sobre RSVP con flores, lazo, pluma y sellos Madrid/Zaragoza) |
| hotel-innside.png, hotel-oriente.png, hotel-alfonso.png, hotel-goya.png, hotel-palafox.png, hotel-reina-petronila.png, hotel-hiberus.png, hotel-catalonia.png, hotel-bb.png | 600×420 |
| hotel-nh-ciudad.png, hotel-nh-gran-hotel.png, hotel-avenida.png, hotel-ibis.png, hotel-hesperia.png | 600×420 |
| turismo-pilar.png, turismo-la-seo.png, turismo-aljaferia.png | 600×450 |
| turismo-el-tubo.png, turismo-puerta-cinegia.png, turismo-calamar-bravo.png, turismo-bula.png, turismo-parthenope.png, turismo-gambrinus.png | 600×450 |
| turismo-moonlight.png, turismo-ginger-fizz.png, turismo-dona-hipolita.png, turismo-mi-habitacion.png | 600×450 |
| turismo-puente-piedra.png, turismo-ribera.png, turismo-parque-grande.png | 600×450 |

Las ilustraciones con fondo blanco se integran solas en el papel (mix-blend-mode: multiply).
Si alguna tarjeta de turismo se queda sin ilustración, también puedes usar una foto con el mismo nombre.

## Pendiente de confirmar con Pilar
- [ ] Enlace al formulario de confirmación → `js/config.js` (formularioURL). Debe preguntar por el autobús.
- [ ] IBAN → `js/config.js`.
- [ ] Enlace de reserva Innside by Meliá → `js/config.js`.
- [ ] Código del B&B: pone «BODA JAVIER 27 JULIO» pero la boda es el 24. ¿Es el código real del hotel?
- [ ] Reina Petronila (51 min) e Hiberus (46 min): ¿minutos andando? ¿% de descuento? No estaban en la tabla original; se han añadido.
- [ ] Palafox, Hesperia, Reina Petronila e Hiberus no aparecen en el mapa ilustrado (salen sin número en la tabla).
- [ ] Alfonso, Goya, Palafox, Reina Petronila e Hiberus enlazan a la portada de Palafox Hoteles: mejor enlace directo a cada hotel.
- [ ] Turismo: «Nuestro favorito» solo aparece en las tarjetas con corazón relleno. Confirmar cuáles son favoritas (`favorito: true/false` en `js/datos.js`).
- [ ] Aljafería: no había descripción; se ha puesto «Uno de los grandes ejemplos de arquitectura islámica en España».
- [ ] Frase de aparcamiento gratis en fin de semana: comprobar antes de publicar.
- [ ] Hora de la ceremonia (17:30) y horario del timeline: siguen siendo orientativos.
