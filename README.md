# Representaciones Pozo — demo React

Prototipo corporativo desarrollado con React, TypeScript y Vite. Está preparado para desplegarse en Vercel.

## Requisitos
- Node.js 20 o superior
- npm

## Desarrollo local
```bash
npm install
npm run dev
```

## Compilar
```bash
npm run build
npm run preview
```

## Despliegue en Vercel
1. Sube el contenido de esta carpeta a un repositorio Git.
2. Importa el repositorio en Vercel.
3. Vercel detectará Vite automáticamente.
4. Build command: `npm run build`
5. Output directory: `dist`

`vercel.json` define el *fallback* SPA, cabeceras de seguridad y caché inmutable para `/assets`.

### Indexación en buscadores
Mientras sea una versión de demostración, la web se sirve con `noindex` para no competir con la web oficial. Al publicarla como definitiva:
- Eliminar `<meta name="robots">` de `index.html`.
- Eliminar la cabecera `X-Robots-Tag` de `vercel.json`.

## Personalización pendiente antes de publicación
- Sustituir el logotipo tipográfico provisional por el logotipo corporativo autorizado.
- Validar textos, marcas, teléfonos, dirección y horario con la empresa.
- Reemplazar fotografías de stock por imágenes corporativas con derechos de uso confirmados.
- Conectar el formulario a un servicio de envío (Resend, Formspree u otro). Actualmente muestra un aviso de demostración y no envía datos.
- Añadir textos legales (aviso legal, privacidad, cookies) aprobados por la empresa y enlazar la política de privacidad desde la casilla del formulario.

Las fotografías externas utilizan URLs de Unsplash como recurso provisional.
