# Roxibell Galarraga — sitio de demostración (PMU)

Sitio de una sola página, en español, creado como propuesta/spec pitch para
Roxibell Galarraga, artista de micropigmentación en Mijas (Málaga). Es HTML +
CSS + JS estático, sin build, sin dependencias — pensado para desplegarse tal
cual en Cloudflare Pages.

La página lleva `<meta name="robots" content="noindex, nofollow">` a
propósito: usa fotos y datos de la clienta que aún no están confirmados, así
que no debe indexarse mientras sea una demo.

## Estructura

```
roxibell-galarraga-pmu-demo/
  index.html
  styles.css
  script.js
  images/       (vacía, con .gitkeep — ver lista de archivos abajo)
  README.md
```

## Imágenes que faltan por añadir

Coloca estos archivos dentro de `images/` con estos nombres exactos (el sitio
ya está enlazado a ellos; si un archivo no existe, el hueco se ve como un
degradado de color en vez de un icono de imagen rota):

- `hero.jpg` — retrato principal (vertical, recomendado ~4:5, por ejemplo 1200×1500 px)
- `about.jpg` — foto para "Conóceme" (cuadrada, ~1000×1000 px)
- `ba-1-antes.jpg` / `ba-1-despues.jpg` — antes/después de **cejas** (misma proporción ~4:5 en ambas, ideal mismo encuadre/cámara)
- `ba-2-antes.jpg` / `ba-2-despues.jpg` — antes/después de **mirada / ojos**
- `ba-3-antes.jpg` / `ba-3-despues.jpg` — antes/después de **labios**
- `galeria-1.jpg` a `galeria-9.jpg` — 9 fotos cuadradas para la galería (recomendado ~1000×1000 px), en el orden que prefieras; están repartidas de fábrica como 3 de cejas, 3 de ojos y 3 de labios para que el filtro tenga contenido en las tres categorías

Consejo: comprime las fotos antes de subirlas (JPEG calidad ~75–80) para que
la página cargue rápido en 4G.

## Desplegar en Cloudflare Pages

1. Sube este repositorio a GitHub (ver comandos más abajo).
2. En Cloudflare Pages, conecta el repositorio.
3. Configuración de build:
   - **Framework preset:** None
   - **Build command:** (vacío / ninguno)
   - **Build output directory:** `/` (la raíz del repositorio)
4. Deploy. No hace falta variable de entorno ni paso de compilación.

## Cosas marcadas como PLACEHOLDER a confirmar con la clienta

Buscar `PLACEHOLDER` en el código para localizarlas todas:

- Número real de WhatsApp (ahora mismo hay un número de ejemplo en `script.js` e `index.html`)
- Precios de cejas, ojos y labios (rangos orientativos de la zona, no reales)
- Horario de apertura del estudio
- Texto de "Conóceme" (formación, certificaciones, años de experiencia — no se ha inventado ninguno)
- Las 4 reseñas son de ejemplo; sustituir por reseñas reales de Google Business Profile
