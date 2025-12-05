# 🔧 Configurar Variables de Entorno en Netlify

## 📋 Problema

En local funciona pero en producción (Netlify) sigue apareciendo el error:
> "Advertencia: La API key de Google Maps no está configurada"

## ✅ Solución: Configurar Variables en Netlify

Hay **dos formas** de configurar variables de entorno en Netlify:

### Opción 1: Netlify Dashboard (Recomendado) ⭐

1. **Ve a tu sitio en Netlify**:
   - Abre https://app.netlify.com
   - Selecciona tu sitio (solentine)

2. **Ve a Site settings**:
   - En el menú lateral, haz clic en **"Site settings"**
   - O ve directamente a: `https://app.netlify.com/sites/TU_SITE_ID/configuration/env`

3. **Añade las variables de entorno**:
   - Haz clic en **"Environment variables"** (o "Add variable")
   - Añade las siguientes variables:

   ```
   Variable name: VITE_APP_API_URL
   Value: https://server-solentine.fly.dev
   Scope: All scopes (o Production)
   ```

   ```
   Variable name: VITE_GOOGLE_MAPS_API_KEY
   Value: AIzaSyAR1E-Va_121IJ74cRdBh4GvXhI5BVfgj0
   Scope: All scopes (o Production)
   ```

4. **Guarda y redespliega**:
   - Haz clic en **"Save"**
   - Ve a **"Deploys"** en el menú
   - Haz clic en **"Trigger deploy"** → **"Deploy site"**
   - O simplemente haz un nuevo push a `main` para que se redesplegue automáticamente

### Opción 2: GitHub Secrets (Para CI/CD)

Si usas GitHub Actions para desplegar, también puedes configurar los secrets en GitHub:

1. **Ve a tu repositorio en GitHub**
2. **Settings** → **Secrets and variables** → **Actions**
3. **New repository secret**
4. Añade:
   - `VITE_APP_API_URL` = `https://server-solentine.fly.dev`
   - `VITE_GOOGLE_MAPS_API_KEY` = `AIzaSyAR1E-Va_121IJ74cRdBh4GvXhI5BVfgj0`

El workflow de GitHub Actions ya está configurado para usar estos secrets.

## 🔍 Verificación

Después de configurar y redesplegar:

1. **Espera a que termine el deploy** (puede tardar 1-2 minutos)
2. **Abre tu sitio en producción**: https://solentine.netlify.app
3. **Abre la consola del navegador** (F12)
4. **Busca el mensaje**: `✅ Google Maps API cargada correctamente`

Si ves ese mensaje, ¡todo está funcionando! 🎉

## ⚠️ Importante

- **Las variables deben empezar con `VITE_`** para que Vite las incluya en el build
- **Después de añadir variables, debes redesplegar** el sitio
- **Los cambios en variables de entorno requieren un nuevo build**

## 📝 Variables Necesarias

| Variable | Valor | Descripción |
|----------|-------|-------------|
| `VITE_APP_API_URL` | `https://server-solentine.fly.dev` | URL del servidor backend |
| `VITE_GOOGLE_MAPS_API_KEY` | `AIzaSyAR1E-Va_121IJ74cRdBh4GvXhI5BVfgj0` | API key de Google Maps |

## 🚨 Si Sigue Sin Funcionar

1. **Verifica que las variables estén en "Production" scope** (no solo en "Deploy preview")
2. **Verifica que el nombre de la variable sea exacto**: `VITE_GOOGLE_MAPS_API_KEY` (con `VITE_` al inicio)
3. **Verifica que no haya espacios extra** en el valor
4. **Asegúrate de haber redesplegado** después de añadir las variables
5. **Limpia la caché del navegador** (Ctrl+Shift+R o Cmd+Shift+R)

## 🔐 Seguridad

⚠️ **IMPORTANTE**: La API key de Google Maps en el cliente es pública (se incluye en el bundle de JavaScript). 

**Asegúrate de**:
- ✅ Restringir la API key por dominio en Google Cloud Console
- ✅ Solo permitir `Maps JavaScript API` (no Geocoding API en el cliente)
- ✅ Configurar restricciones HTTP referrers para tu dominio de Netlify

### Cómo Restringir la API Key en Google Cloud:

1. Ve a [Google Cloud Console](https://console.cloud.google.com/)
2. **APIs & Services** → **Credentials**
3. Selecciona tu API key
4. En **"Application restrictions"**:
   - Selecciona **"HTTP referrers (web sites)"**
   - Añade: `https://solentine.netlify.app/*`
   - Añade: `https://*.netlify.app/*` (para previews)
5. En **"API restrictions"**:
   - Selecciona **"Restrict key"**
   - Marca solo: **"Maps JavaScript API"**
6. **Save**

---

**¿Necesitas ayuda?** Revisa los logs de deploy en Netlify para ver si hay errores durante el build.

