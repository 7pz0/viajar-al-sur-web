# Guía de Despliegue - Viajar al Sur

Esta guía explica cómo desplegar el sitio web de Viajar al Sur en Vercel desde GitHub.

## Preparación Pre-Despliegue

### 1. Configurar EmailJS (IMPORTANTE)
Antes de desplegar, configura EmailJS para que el formulario de contacto funcione:

1. **Lee EMAILJS-SETUP.md** para instrucciones detalladas
2. **Actualiza js/services/emailService.js** con tus credenciales reales:
   ```javascript
   this.serviceId = 'tu_service_id_real';
   this.templateId = 'tu_template_id_real'; 
   this.publicKey = 'tu_public_key_real';
   ```
3. **Prueba localmente** que el formulario envía emails a contacto@viajaralsur.cl

### 2. Actualizar Favicons
Reemplaza los archivos placeholder en `/assets/` con los favicons reales:
- favicon.ico (bandera chilena + montañas)
- apple-touch-icon.png
- android-chrome-192x192.png
- android-chrome-512x512.png

Ver FAVICON-GUIDE.md para detalles.

## 2. Subir a GitHub

### Opción A: Crear repositorio desde GitHub.com
1. Ve a [github.com](https://github.com) e inicia sesión
2. Haz clic en "New repository"
3. Nombra tu repositorio (ej: "mi-proyecto-web")
4. NO inicialices con README (ya tienes uno)
5. Haz clic en "Create repository"
6. Copia los comandos que te da GitHub, algo así:

```powershell
git remote add origin https://github.com/tu-usuario/mi-proyecto-web.git
git branch -M main
git push -u origin main
```

### Opción B: Usar GitHub CLI (si lo tienes instalado)
```powershell
gh repo create mi-proyecto-web --public --push
```

## 3. Conectar con Vercel

1. Ve a [vercel.com](https://vercel.com)
2. Inicia sesión con tu cuenta de GitHub
3. Haz clic en "New Project"
4. Selecciona tu repositorio "mi-proyecto-web"
5. Configuración del proyecto:
   - **Framework Preset**: Other
   - **Root Directory**: `./` (mantener vacío)
   - **Build Command**: (mantener vacío)
   - **Output Directory**: (mantener vacío)
   - **Install Command**: (mantener vacío)
6. Haz clic en "Deploy"

## 4. Configuración de Dominio (Opcional)

Una vez desplegado, puedes:
- Usar el dominio que te da Vercel (.vercel.app)
- Conectar tu propio dominio personalizado
- Configurar redirects o aliases

## 5. Actualizaciones Automáticas

Cada vez que hagas push a la rama main en GitHub:
```powershell
git add .
git commit -m "Descripción de los cambios"
git push
```

Vercel automáticamente detectará los cambios y redesplegará tu sitio.

## 6. Variables de Entorno (Si necesitas)

En Vercel dashboard:
1. Ve a tu proyecto
2. Settings > Environment Variables
3. Agrega las variables que necesites

## 7. Análisis y Métricas

Vercel te proporciona:
- Analytics de rendimiento
- Core Web Vitals
- Logs de despliegue
- Preview deployments para ramas

## Comandos Útiles para Desarrollo Local

```powershell
# Servidor con Python
python -m http.server 3000

# Servidor con Node.js (si tienes http-server)
npx http-server -p 3000

# Servidor con PHP
php -S localhost:3000
```

Luego abre: http://localhost:3000
