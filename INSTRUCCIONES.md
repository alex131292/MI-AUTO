# 🚗 Mi Auto — PWA para iPhone / Android

## ¿Cómo instalar en tu iPhone 11?

### Opción 1: GitHub Pages (Gratis, recomendado)

1. Ve a **github.com** e inicia sesión
2. Crea un **repositorio nuevo** (ej: `mi-auto`)
3. Sube TODOS estos archivos manteniendo la misma estructura de carpetas:
   ```
   index.html
   manifest.json
   sw.js
   icons/
     icon-192.png
     icon-512.png
     apple-touch-icon.png
     apple-touch-icon-167.png
   ```
4. En tu repo → **Settings → Pages → Source: main branch → Save**
5. Tu URL quedará: `https://TU-USUARIO.github.io/mi-auto/`

6. **En tu iPhone**: Abre Safari → ve a esa URL → toca **Compartir ⬆️** → **"Agregar a pantalla de inicio"**

✅ ¡Listo! Aparece el ícono en tu pantalla de inicio como una app nativa.

---

### Opción 2: Vercel (También gratis, aún más fácil)

1. Ve a **vercel.com** → New Project
2. Arrastra la carpeta completa `MiAuto-PWA`
3. Deploy automático → te da una URL HTTPS
4. Abre en iPhone Safari → Compartir → Agregar a inicio

---

## Características PWA incluidas

- ✅ Ícono en pantalla de inicio
- ✅ Se abre sin barra de Safari (pantalla completa)
- ✅ Funciona offline (datos guardados localmente)
- ✅ Safe area para notch y barra home del iPhone
- ✅ Accesos directos desde el ícono (mantener presionado)
- ✅ Caché inteligente de recursos

## Estructura de archivos

```
MiAuto-PWA/
├── index.html          ← La app principal
├── manifest.json       ← Configuración PWA
├── sw.js               ← Service Worker (offline)
└── icons/
    ├── icon-192.png
    ├── icon-512.png
    ├── apple-touch-icon.png      ← Ícono iPhone
    └── apple-touch-icon-167.png  ← Ícono iPad
```

## Notas importantes

- **HTTPS es obligatorio** para que funcione el Service Worker
  (tanto GitHub Pages como Vercel lo incluyen gratis)
- Los datos del auto se guardan en el **localStorage** del navegador de tu iPhone
- Si limpias Safari/datos del navegador, se borran los datos de la app
