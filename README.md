# Viajar al Sur - Turismo Auténtico

Sitio web oficial de Viajar al Sur, empresa de turismo especializada en experiencias auténticas en el sur de Chile. Proyecto web moderno y responsivo optimizado para desplegarse en Vercel.

## 🚀 Características

- **Experiencia Turística**: Información sobre tours, alojamientos y servicios de turismo en el sur de Chile
- **Diseño Responsivo**: Se adapta perfectamente a todos los dispositivos móviles y desktop
- **Arquitectura Modular**: Código organizado en componentes reutilizables y mantenibles
- **Optimizado para SEO**: Meta tags específicos para turismo y estructura semántica optimizada
- **PWA Ready**: Configurado como Progressive Web App para experiencia móvil nativa
- **Formulario de Contacto Inteligente**: 
  - Validación en tiempo real
  - Guardado automático en localStorage
  - Integración completa con EmailJS
  - Envío a contacto@viajaralsur.cl
  - Estados de carga y mensajes de error/éxito
- **WhatsApp Business Integration**: 
  - Botón flotante persistente
  - Tarjeta de contacto dedicada
  - Enlaces pre-configurados para consultas turísticas
  - Mensajes personalizados por contexto
- **Navegación Inteligente**: Menú responsive con scroll suave y indicadores activos
- **Alto Rendimiento**: Optimizado para Core Web Vitals y experiencia de usuario

## 📁 Estructura del Proyecto

```
web/
├── index.html              # Página principal
├── css/                    # Hojas de estilo
│   ├── reset.css          # Reset de estilos
│   ├── variables.css      # Variables CSS (colores, tamaños, etc.)
│   ├── components.css     # Estilos de componentes
│   └── main.css           # Estilos principales y layout
├── js/                     # JavaScript modular
│   ├── utils.js           # Funciones utilitarias
│   ├── components/        # Componentes JavaScript
│   │   ├── navigation.js  # Componente de navegación
│   │   └── form.js        # Componente de formulario con EmailJS
│   ├── services/          # Servicios de la aplicación
│   │   └── emailService.js # Servicio EmailJS para contacto
│   ├── utils/             # Utilidades adicionales
│   │   └── emailTester.js # Tester de configuración de email
│   └── main.js            # Archivo principal de la aplicación
├── assets/                 # Recursos estáticos
│   ├── favicon.ico        # Icono tradicional
│   ├── favicon-16x16.png  # Icono 16x16
│   ├── favicon-32x32.png  # Icono 32x32
│   ├── apple-touch-icon.png # Icono iOS
│   ├── android-chrome-192x192.png # Icono Android
│   ├── android-chrome-512x512.png # Icono PWA
│   ├── og-image.jpg       # Imagen para redes sociales
│   └── browserconfig.xml  # Config Microsoft
├── manifest.json          # Configuración PWA
├── package.json           # Configuración del proyecto
├── EMAILJS-SETUP.md       # Guía de configuración EmailJS
├── EMAIL-DOMAIN-SETUP.md  # Configurar email con dominio propio
└── README.md              # Documentación
```

## 🛠️ Tecnologías Utilizadas

- **HTML5**: Estructura semántica y accesible
- **CSS3**: Estilos modernos con variables CSS y Flexbox/Grid
- **JavaScript ES6+**: Funcionalidad interactiva sin frameworks
- **EmailJS**: Servicio de envío de emails para formulario de contacto
- **WhatsApp Business**: Integración para contacto directo
- **Vercel**: Plataforma de despliegue

## 🚀 Cómo Empezar

### Prerrequisitos

- Git instalado en tu sistema
- Cuenta en GitHub
- Cuenta en Vercel (conectada con GitHub)

### Instalación Local

1. **Clona el repositorio**
   ```bash
   git clone https://github.com/tu-usuario/mi-proyecto-web.git
   cd mi-proyecto-web
   ```

2. **Inicia un servidor local**
   
   Con Python:
   ```bash
   python -m http.server 3000
   ```
   
   Con Node.js (si tienes http-server instalado):
   ```bash
   npx http-server -p 3000
   ```
   
   Con PHP:
   ```bash
   php -S localhost:3000
   ```

3. **Abre tu navegador**
   ```
   http://localhost:3000
   ```

## 🌐 Despliegue en Vercel

### Método 1: Desde GitHub (Recomendado)

1. **Sube tu código a GitHub**
   ```bash
   git add .
   git commit -m "Initial commit"
   git push origin main
   ```

2. **Conecta con Vercel**
   - Ve a [vercel.com](https://vercel.com)
   - Inicia sesión con tu cuenta de GitHub
   - Haz clic en "New Project"
   - Selecciona tu repositorio
   - Configura el proyecto:
     - **Framework Preset**: Other
     - **Root Directory**: `./` (o `./web` si está en subcarpeta)
     - **Build Command**: (dejar vacío para sitios estáticos)
     - **Output Directory**: (dejar vacío)
   - Haz clic en "Deploy"

### Método 2: Usando Vercel CLI

1. **Instala Vercel CLI**
   ```bash
   npm i -g vercel
   ```

2. **Inicia sesión**
   ```bash
   vercel login
   ```

3. **Despliega**
   ```bash
   vercel
   ```

## 📱 Características del Proyecto

### Navegación Responsiva
- Menú hamburguesa en móviles
- Scroll suave entre secciones
- Indicador de sección activa
- Navegación por teclado accesible

### Formulario de Contacto
- Validación en tiempo real
- Guardado automático en localStorage
- Estados de carga y error
- Mensajes de confirmación

### Optimizaciones de Rendimiento
- CSS y JS modulares
- Imágenes optimizadas
- Lazy loading de contenido
- Core Web Vitals optimizados

### Accesibilidad
- Semántica HTML correcta
- Navegación por teclado
- Contraste de colores adecuado
- Etiquetas ARIA donde corresponde

## 🎨 Personalización

### Colores y Temas
Edita `css/variables.css` para cambiar:
- Colores principales y secundarios
- Tipografía y tamaños
- Espaciados y márgenes
- Sombras y efectos

### Contenido
Modifica `index.html` para:
- Cambiar textos y títulos
- Añadir o quitar secciones
- Actualizar información de contacto
- Modificar estructura de navegación

### Funcionalidad
Extiende la funcionalidad en:
- `js/components/` para nuevos componentes
- `js/utils.js` para funciones utilitarias
- `js/main.js` para lógica de aplicación

## 📊 SEO y Meta Tags

El proyecto incluye:
- Meta tags esenciales
- Open Graph para redes sociales
- Structured Data (Schema.org)
- Sitemap XML
- Robots.txt

## 🔧 Scripts Disponibles

```bash
# Servidor de desarrollo
npm run dev

# Construcción para producción
npm run build

# Servidor de producción
npm start

# Linting de código
npm run lint

# Ejecutar tests
npm run test

# Desplegar a Vercel
npm run deploy
```

## 🤝 Contribuir

1. Fork el proyecto
2. Crea tu rama de feature (`git checkout -b feature/AmazingFeature`)
3. Commit tus cambios (`git commit -m 'Add some AmazingFeature'`)
4. Push a la rama (`git push origin feature/AmazingFeature`)
5. Abre un Pull Request

## 📝 Licencia

Este proyecto está bajo la Licencia MIT - mira el archivo [LICENSE](LICENSE) para detalles.

## 📞 Contacto

Tu Nombre - [tu-email@ejemplo.com](mailto:tu-email@ejemplo.com)

Enlace del Proyecto: [https://github.com/tu-usuario/mi-proyecto-web](https://github.com/tu-usuario/mi-proyecto-web)

---

⭐ ¡No olvides dar una estrella al proyecto si te resulta útil!
