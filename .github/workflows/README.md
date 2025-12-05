# GitHub Actions Workflows - Cliente

Este directorio contiene los workflows de CI/CD para el cliente de Solentine.

## 📋 Workflows Disponibles

### 1. `ci.yml` - Continuous Integration
**Cuándo se ejecuta:**
- Push a `main` o `develop`
- Pull requests a `main` o `develop`

**Qué hace:**
- Lint del código
- Build check de la aplicación

**No despliega**, solo verifica que el código sea válido.

---

### 2. `deploy.yml` - Despliegue a Netlify
**Cuándo se ejecuta:**
- Push a `main`
- Manualmente desde GitHub Actions

**Qué hace:**
- Instala dependencias
- Ejecuta linter
- Build de la aplicación
- Despliega a Netlify

**Secrets requeridos:**
- `NETLIFY_SITE_ID` - ID de tu sitio en Netlify
- `NETLIFY_AUTH_TOKEN` - Token de autenticación de Netlify
- `VITE_APP_API_URL` (opcional) - URL del servidor backend

---

## 🔧 Configuración de Secrets

### Netlify

1. Ve a [Netlify Dashboard](https://app.netlify.com)
2. Ve a "User settings" → "Applications" → "New access token"
3. Crea un token y cópialo
4. Ve a tu sitio → "Site settings" → "General" → "Site details"
5. Copia el "Site ID"

En GitHub:
1. Ve a tu repositorio → "Settings" → "Secrets and variables" → "Actions"
2. Añade estos secrets:
   - `NETLIFY_AUTH_TOKEN`: El token que creaste
   - `NETLIFY_SITE_ID`: El Site ID de tu sitio
   - `VITE_APP_API_URL`: `https://server-solentine.fly.dev` (opcional)

---

## 🚀 Uso

### Despliegue Automático

Una vez configurados los secrets, los despliegues se ejecutarán automáticamente cuando:
- Haces push a `main`
- Haces merge de un pull request a `main`

### Despliegue Manual

1. Ve a tu repositorio en GitHub
2. Haz clic en "Actions"
3. Selecciona el workflow "Deploy to Netlify"
4. Haz clic en "Run workflow"
5. Selecciona la rama y haz clic en "Run workflow"

---

## 📊 Monitoreo

Puedes ver el estado de los workflows en:
- GitHub → "Actions" tab
- Cada workflow muestra el estado (✅ success, ❌ failure, 🟡 in progress)

---

## 🔍 Troubleshooting

### El despliegue falla

1. **Verifica los secrets**: Asegúrate de que todos los secrets estén configurados correctamente
2. **Revisa los logs**: En GitHub Actions, haz clic en el workflow fallido para ver los logs
3. **Verifica permisos**: Asegúrate de que los tokens tengan los permisos necesarios

### El cliente no se despliega

- Verifica que `NETLIFY_SITE_ID` y `NETLIFY_AUTH_TOKEN` estén configurados
- Verifica que el build sea exitoso (revisa los logs)

---

## 📝 Notas

- Los workflows se ejecutan en la rama `main` por defecto
- El workflow de CI se ejecuta en cada push/PR para verificar que el código sea válido

