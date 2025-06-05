# EmailJS Configuration Guide for Viajar al Sur

Este archivo explica cómo configurar EmailJS para que el formulario de contacto envíe emails a contacto@viajaralsur.cl

## 1. Crear cuenta en EmailJS

1. Ve a https://www.emailjs.com/
2. Crea una cuenta gratuita
3. Verifica tu email

## 2. Conectar tu servicio de email

### Opción A: Gmail (Recomendado)
1. Ve a la sección "Email Services"
2. Selecciona "Gmail"
3. Autoriza el acceso a tu cuenta Gmail
4. **Importante**: Usa la cuenta que tenga acceso a contacto@viajaralsur.cl

### Opción B: Outlook/Hotmail
1. Ve a la sección "Email Services"  
2. Selecciona "Outlook"
3. Configura con las credenciales de contacto@viajaralsur.cl

### Opción C: SMTP personalizado (Para contacto@viajaralsur.cl)
Si tienes un servidor de email personalizado para viajaralsur.cl:

**Primero, necesitas tener configurado el email en tu hosting:**
1. Accede a tu panel de hosting (cPanel, Plesk, etc.)
2. Crea la cuenta: contacto@viajaralsur.cl
3. Obtén la configuración SMTP de tu proveedor

**Luego, en EmailJS:**
1. Selecciona "SMTP Server"
2. Configura:
   - **SMTP Server**: mail.viajaralsur.cl (o el que te dé tu hosting)
   - **Port**: 587 (TLS) o 465 (SSL)
   - **Username**: contacto@viajaralsur.cl
   - **Password**: la contraseña que creaste
   - **Secure**: TLS (recomendado)

**Configuraciones comunes por proveedor:**
- **Hostinger**: mail.hostinger.com, puerto 587
- **SiteGround**: mail.siteground.com, puerto 587  
- **GoDaddy**: smtpout.secureserver.net, puerto 587
- **Bluehost**: mail.bluehost.com, puerto 587

> 💡 **Tip**: Si no tienes hosting o quieres algo más simple, considera Google Workspace ($6/mes) que te da contacto@viajaralsur.cl con la confiabilidad de Gmail.

## 3. Crear Template de Email

1. Ve a "Email Templates"
2. Crea un nuevo template
3. Usa este contenido:

### Subject
```
Nuevo mensaje de contacto - Viajar al Sur
```

### Template Body (HTML)
```html
<!DOCTYPE html>
<html>
<head>
    <meta charset="utf-8">
    <title>Nuevo Contacto - Viajar al Sur</title>
    <style>
        body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
        .container { max-width: 600px; margin: 0 auto; padding: 20px; }
        .header { background: #3b82f6; color: white; padding: 20px; border-radius: 8px 8px 0 0; }
        .content { background: #f9f9f9; padding: 20px; border: 1px solid #ddd; }
        .footer { background: #333; color: white; padding: 15px; border-radius: 0 0 8px 8px; font-size: 12px; }
        .info-item { margin: 10px 0; padding: 10px; background: white; border-radius: 4px; }
        .label { font-weight: bold; color: #3b82f6; }
    </style>
</head>
<body>
    <div class="container">
        <div class="header">
            <h2>🗺️ Nuevo mensaje de contacto - Viajar al Sur</h2>
        </div>
        <div class="content">
            <div class="info-item">
                <span class="label">Nombre:</span> {{from_name}}
            </div>
            <div class="info-item">
                <span class="label">Email:</span> {{from_email}}
            </div>
            <div class="info-item">
                <span class="label">Fecha:</span> {{timestamp}}
            </div>
            <div class="info-item">
                <span class="label">Mensaje:</span><br>
                <div style="margin-top: 10px; padding: 15px; background: #f0f9ff; border-left: 4px solid #3b82f6; border-radius: 4px;">
                    {{message}}
                </div>
            </div>
        </div>
        <div class="footer">
            <p>Este mensaje fue enviado desde el formulario de contacto de viajaralsur.cl</p>
            <p>Para responder, usa directamente el email: {{reply_to}}</p>
        </div>
    </div>
</body>
</html>
```

## 4. Configurar variables en el código

Después de crear el servicio y template, obtén:

1. **Service ID**: En la sección "Email Services" (ej: service_xyz123)
2. **Template ID**: En "Email Templates" (ej: template_abc456)  
3. **Public Key**: En "Account" → "General" (ej: user_DEF789)

Luego actualiza el archivo `js/services/emailService.js`:

```javascript
constructor() {
    // Reemplaza estos valores con los reales de tu cuenta
    this.serviceId = 'service_qofvbee'; // ← Tu Service ID real
    this.templateId = 'template_g33e509';  // ← Tu Template ID real
    this.publicKey = 'xKGDXjgj-othuhpVc'; // ← Tu Public Key real
    
    this.init();
}
```

## 5. Pruebas

1. Guarda los cambios
2. Abre el sitio web
3. Completa el formulario de contacto
4. Verifica que llegue el email a contacto@viajaralsur.cl

## 6. Configuración adicional

### Límites de EmailJS (plan gratuito)
- 200 emails/mes
- Para más, considera upgrade a plan pagado

### Configurar autorespuesta (opcional)
Puedes crear un segundo template para enviar confirmación automática al usuario.

### Configurar filtros de spam
En tu servidor de email, asegúrate de que emails de EmailJS no vayan a spam.

## 7. Troubleshooting

### Si no llegan los emails:
1. Verifica las credenciales en EmailJS
2. Revisa la carpeta de spam
3. Confirma que el Service ID, Template ID y Public Key son correctos
4. Usa la consola del navegador para ver errores

### Si hay errores de CORS:
EmailJS maneja automáticamente CORS, pero verifica que el dominio esté autorizado en tu cuenta.

### Para desarrollo local:
EmailJS funciona desde localhost, pero para producción registra tu dominio real.

---

## Contacto de soporte

Si necesitas ayuda adicional:
- Documentación EmailJS: https://www.emailjs.com/docs/
- Soporte: support@emailjs.com

Una vez configurado correctamente, el formulario enviará automáticamente todos los mensajes a contacto@viajaralsur.cl ✅

---

## FAQ: Preguntas Frecuentes

### ¿Puedo usar mi propio dominio (contacto@viajaralsur.cl)?
**¡SÍ!** Tienes varias opciones:
- **Google Workspace** (recomendado): $6/mes, fácil configuración
- **SMTP de tu hosting**: Gratis si ya tienes hosting web
- Ver archivo `EMAIL-DOMAIN-SETUP.md` para guía detallada

### ¿Cuántos emails puedo enviar gratis?
- **Plan gratuito EmailJS**: 200 emails/mes
- **Suficiente para**: Sitios web pequeños y medianos
- **Para más volumen**: Upgrade a plan pagado ($15/mes = 1000 emails)

### ¿Los emails van a spam?
- **Gmail/Google Workspace**: Excelente deliverability
- **SMTP hosting**: Depende de la configuración del hosting
- **Solución**: Configurar registros SPF, DKIM, DMARC (Google Workspace los maneja automáticamente)

### ¿Funciona desde localhost?
- **SÍ**: EmailJS funciona desde localhost para desarrollo
- **Producción**: Registra tu dominio real en EmailJS

### ¿Qué pasa si cambio de hosting?
- Solo necesitas actualizar la configuración SMTP en EmailJS
- El código del sitio web no cambia

### ¿Puedo tener autorespuesta automática?
- **SÍ**: Crea un segundo template en EmailJS
- Envía confirmación automática al usuario
- Requiere configuración adicional en el código
